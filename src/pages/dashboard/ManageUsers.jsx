import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import MyContainer from "../../components/MyContainer";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../../config/apiBaseUrl";
import { getAuthToken } from "../../utils/getAuthToken";
import { RingLoader } from "react-spinners";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadUsers();
  }, [search, roleFilter, statusFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const token = await getAuthToken(user);
      if (!token) throw new Error("Failed to get auth token");

      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to load users");

      let data = await response.json();
      data = Array.isArray(data) ? data : [];

      // Apply filters client-side
      if (search) {
        data = data.filter(
          (u) =>
            (u.displayName || u.name || "")
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (roleFilter && roleFilter !== "all") {
        data = data.filter((u) => (u.role || "user") === roleFilter);
      }

      if (statusFilter && statusFilter !== "all") {
        data = data.filter((u) => (u.status || "active") === statusFilter);
      }

      setUsers(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateRole = async (selectedUser) => {
    const { value: role } = await Swal.fire({
      title: `Update role for ${
        selectedUser.displayName || selectedUser.name || "user"
      }`,
      input: "select",
      inputOptions: {
        admin: "Admin",
        user: "User",
      },
      inputValue: selectedUser.role || "user",
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!role || role === selectedUser.role) return;

    try {
      const token = await getAuthToken(user);
      const response = await fetch(
        `${API_BASE_URL}/admin/users/${selectedUser.uid}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role }),
        }
      );

      if (!response.ok) throw new Error("Failed to update role");

      toast.success("User role updated successfully");
      loadUsers();
    } catch (error) {
      toast.error(error.message || "Failed to update role");
    }
  };

  const handleToggleStatus = async (selectedUser) => {
    const isSuspending = selectedUser.status !== "suspended";

    if (isSuspending) {
      const { value } = await Swal.fire({
        title: `Suspend ${
          selectedUser.displayName || selectedUser.name || "user"
        }?`,
        html: `
          <div class="text-left space-y-3">
            <div>
              <label class="font-semibold text-sm">Suspend Reason<span class="text-red-500">*</span></label>
              <input id="swal-suspend-reason" class="swal2-input" placeholder="e.g. Policy violation" />
            </div>
            <div>
              <label class="font-semibold text-sm">Feedback (visible to user)<span class="text-red-500">*</span></label>
              <textarea id="swal-suspend-feedback" class="swal2-textarea" placeholder="Explain why the account is suspended"></textarea>
            </div>
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Suspend user",
        preConfirm: () => {
          const reason = Swal.getPopup()
            .querySelector("#swal-suspend-reason")
            ?.value?.trim();
          const feedback = Swal.getPopup()
            .querySelector("#swal-suspend-feedback")
            ?.value?.trim();
          if (!reason || !feedback) {
            Swal.showValidationMessage("Reason and feedback are required");
            return null;
          }
          return { reason, feedback };
        },
      });

      if (!value) return;

      try {
        const token = await getAuthToken(user);
        const response = await fetch(
          `${API_BASE_URL}/admin/users/${selectedUser.uid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: "suspended",
              suspendReason: value.reason,
              suspendFeedback: value.feedback,
              suspendedAt: new Date().toISOString(),
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to suspend user");

        toast.success("User has been suspended");
        loadUsers();
      } catch (error) {
        toast.error(error.message || "Failed to suspend user");
      }
    } else {
      const confirmed = await Swal.fire({
        title: "Reactivate user?",
        text: "This will allow the user to resume activity.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, activate",
      });

      if (!confirmed.isConfirmed) return;

      try {
        const token = await getAuthToken(user);
        const response = await fetch(
          `${API_BASE_URL}/admin/users/${selectedUser.uid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: "active",
              suspendReason: null,
              suspendFeedback: null,
              suspendedAt: null,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to reactivate user");

        toast.success("User has been reactivated");
        loadUsers();
      } catch (error) {
        toast.error(error.message || "Failed to reactivate user");
      }
    }
  };

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <RingLoader color="#357fa7" size={60} />
        <p className="mt-4 text-base-content/70">Loading users...</p>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">
          Manage Users
        </h1>
        <p className="text-base-content/70">
          Add, update roles, or suspend accounts.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="input input-bordered w-full"
          />
          <button
            onClick={() => {
              setSearch("");
              setRoleFilter("all");
              setStatusFilter("all");
            }}
            className="btn btn-outline"
            title="Clear filters"
          >
            Clear
          </button>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select select-bordered flex-1 md:flex-initial"
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered flex-1 md:flex-initial"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      {users.length === 0 ? (
        <div className="alert alert-info">
          <span>No users found</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((userItem) => (
                  <tr key={userItem.uid || userItem._id} className="hover">
                    <td className="font-semibold">
                      {userItem.displayName || userItem.name || "N/A"}
                    </td>
                    <td>{userItem.email}</td>
                    <td>
                      <span className="badge badge-outline">
                        {userItem.role || "user"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          userItem.status === "suspended"
                            ? "badge-error"
                            : "badge-success"
                        }`}
                      >
                        {userItem.status || "active"}
                      </span>
                    </td>
                    <td className="flex justify-end gap-2">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleUpdateRole(userItem)}
                      >
                        Update Role
                      </button>
                      <button
                        className={`btn btn-sm ${
                          userItem.status === "suspended"
                            ? "btn-success"
                            : "btn-warning"
                        }`}
                        onClick={() => handleToggleStatus(userItem)}
                      >
                        {userItem.status === "suspended"
                          ? "Activate"
                          : "Suspend"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-sm"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`btn btn-sm ${
                        page === currentPage ? "btn-active" : ""
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          )}

          {/* Page Info */}
          <div className="text-center text-sm text-base-content/60 mt-4">
            Page {currentPage} of {totalPages} | Showing {paginatedUsers.length}{" "}
            of {users.length} users
          </div>
        </>
      )}
    </MyContainer>
  );
};

export default ManageUsers;

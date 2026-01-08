import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import MyContainer from "../../components/MyContainer";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../../config/apiBaseUrl";
import { getAuthToken } from "../../utils/getAuthToken";
import { RingLoader } from "react-spinners";

const statusOptions = ["all", "pending", "approved", "rejected", "shipped"];

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const token = await getAuthToken(user);
      if (!token) throw new Error("Failed to get auth token");

      const params =
        statusFilter === "all" ? "" : `?status=${statusFilter.toLowerCase()}`;
      const response = await fetch(`${API_BASE_URL}/orders${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to load orders");

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error(error.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => (o.status || "").toLowerCase() === statusFilter);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedOrders = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusUpdate = async (order, status) => {
    const confirmed = await Swal.fire({
      title: `Mark as ${status}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });
    if (!confirmed.isConfirmed) return;

    try {
      const token = await getAuthToken(user);
      const response = await fetch(
        `${API_BASE_URL}/orders/${order._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.code === "SUSPENDED") {
          throw new Error(
            errorData.suspendFeedback ||
              errorData.suspendReason ||
              errorData.message ||
              "You cannot update order status while suspended."
          );
        }
        throw new Error("Failed to update order status");
      }

      toast.success("Order status updated");
      loadOrders();
    } catch (error) {
      toast.error(error.message || "Failed to update order status");
    }
  };

  if (loading) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <RingLoader color="#357fa7" size={60} />
        <p className="mt-4 text-base-content/70">Loading orders...</p>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">
          All Orders
        </h1>
        <p className="text-base-content/70">
          Review every order, filter by status, and update progress.
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-sm font-semibold whitespace-nowrap">
            Status
          </label>
          <select
            className="select select-bordered flex-1 md:flex-initial"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="badge badge-outline">
          Total: {filtered.length} orders
        </div>
      </div>

      {/* Orders Table */}
      {filtered.length === 0 ? (
        <div className="alert alert-info">
          <span>No orders found for this filter</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order._id} className="hover">
                    <td className="font-mono text-sm">{order._id}</td>
                    <td>
                      <div className="font-semibold">{order.name || "N/A"}</div>
                      <div className="text-xs text-base-content/60">
                        {order.email}
                      </div>
                    </td>
                    <td>{order.productTitle || order.parcelName || "N/A"}</td>
                    <td>{order.quantity || 1}</td>
                    <td>
                      <span className="badge badge-outline">
                        {order.status}
                      </span>
                    </td>
                    <td className="flex justify-end gap-2">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-sm btn-outline"
                        >
                          Update
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-40"
                        >
                          {["approved", "rejected", "shipped"].map((status) => (
                            <li key={status}>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order, status)
                                }
                              >
                                {status}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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
            Page {currentPage} of {totalPages} | Showing{" "}
            {paginatedOrders.length} of {filtered.length} orders
          </div>
        </>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="bg-base-100 rounded-lg shadow-lg p-6 mt-8 border border-base-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-base-content">
                Order Details
              </h3>
              <p className="text-sm text-base-content/60">
                Tracking and full information
              </p>
            </div>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-base-content">Order ID</p>
              <p className="text-sm text-base-content/70">
                {selectedOrder._id}
              </p>
            </div>
            <div>
              <p className="font-semibold text-base-content">User</p>
              <p className="text-sm text-base-content/70">
                {selectedOrder.name} ({selectedOrder.email})
              </p>
            </div>
            <div>
              <p className="font-semibold text-base-content">Product</p>
              <p className="text-sm text-base-content/70">
                {selectedOrder.productTitle || selectedOrder.parcelName}
              </p>
            </div>
            <div>
              <p className="font-semibold text-base-content">Quantity</p>
              <p className="text-sm text-base-content/70">
                {selectedOrder.quantity}
              </p>
            </div>
            <div>
              <p className="font-semibold text-base-content">Status</p>
              <p className="text-sm text-base-content/70 capitalize">
                {selectedOrder.status}
              </p>
            </div>
            <div>
              <p className="font-semibold text-base-content">
                Delivery Address
              </p>
              <p className="text-sm text-base-content/70">
                {selectedOrder.deliveryAddress}
              </p>
            </div>
            <div>
              <p className="font-semibold text-base-content">Total Price</p>
              <p className="text-sm text-base-content/70">
                ৳{selectedOrder.totalPrice || selectedOrder.cost}
              </p>
            </div>
            <div>
              <p className="font-semibold text-base-content">Created</p>
              <p className="text-sm text-base-content/70">
                {selectedOrder.orderDate
                  ? new Date(selectedOrder.orderDate).toLocaleString()
                  : selectedOrder.createdAt
                  ? new Date(selectedOrder.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </MyContainer>
  );
};

export default AdminOrders;

import React, { useState, useEffect, useContext } from "react";
import MyContainer from "../../components/MyContainer";
import { AuthContext } from "../../context/AuthContext";
import { getAuthToken } from "../../utils/getAuthToken";
import { RingLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../../config/apiBaseUrl";

const AdminReports = () => {
  const { user } = useContext(AuthContext);
  const [reportType, setReportType] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getAuthToken(user);
        if (!token) throw new Error("Not authenticated");

        const headers = { Authorization: `Bearer ${token}` };

        const [listRes, ordersRes, usersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/listings`, { headers }),
          fetch(`${API_BASE_URL}/orders`, { headers }),
          fetch(`${API_BASE_URL}/admin/users`, { headers }),
        ]);

        if (!listRes.ok) throw new Error("Failed to load listings");
        if (!ordersRes.ok) throw new Error("Failed to load orders");
        if (!usersRes.ok) throw new Error("Failed to load users");

        const [listData, ordersData, usersData] = await Promise.all([
          listRes.json(),
          ordersRes.json(),
          usersRes.json(),
        ]);

        setListings(Array.isArray(listData) ? listData : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        console.error("Report load error:", err);
        setError(err.message || "Failed to load report data");
        toast.error(err.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  // Calculate metrics
  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role === "admin").length;
  const regularUsers = users.filter((u) => u.role === "user").length;
  const totalListings = listings.length;
  const approvedListings = listings.filter(
    (l) => l.status === "approved"
  ).length;
  const pendingListings = listings.filter((l) => l.status === "pending").length;
  const totalOrders = orders.length;

  // Group listings by category
  const listingsByCategory = Object.entries(
    listings.reduce((acc, l) => {
      const c = l.category || "Other";
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {})
  );

  const listingsByCategoryApproved = Object.entries(
    listings
      .filter((l) => l.status === "approved")
      .reduce((acc, l) => {
        const c = l.category || "Other";
        acc[c] = (acc[c] || 0) + 1;
        return acc;
      }, {})
  );

  const listingsByCategoryPending = Object.entries(
    listings
      .filter((l) => l.status === "pending")
      .reduce((acc, l) => {
        const c = l.category || "Other";
        acc[c] = (acc[c] || 0) + 1;
        return acc;
      }, {})
  );

  // Group orders by status
  const ordersByStatus = Object.entries(
    orders.reduce((acc, o) => {
      const s = (o.status || "unknown").toLowerCase();
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {})
  );

  if (loading) {
    return (
      <MyContainer className="flex-1 py-8 px-4 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <RingLoader color="#357fa7" size={48} />
          <p className="mt-4 text-base-content/70">Loading reports...</p>
        </div>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Reports</h1>
          <p className="text-base-content/70">
            Analyze system performance and user activity
          </p>
        </div>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        {/* Report Type Selector */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setReportType("overview")}
            className={`btn ${
              reportType === "overview" ? "btn-primary" : "btn-outline"
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setReportType("users")}
            className={`btn ${
              reportType === "users" ? "btn-primary" : "btn-outline"
            }`}
          >
            👥 Users
          </button>
          <button
            onClick={() => setReportType("listings")}
            className={`btn ${
              reportType === "listings" ? "btn-primary" : "btn-outline"
            }`}
          >
            📝 Listings
          </button>
          <button
            onClick={() => setReportType("orders")}
            className={`btn ${
              reportType === "orders" ? "btn-primary" : "btn-outline"
            }`}
          >
            📦 Orders
          </button>
        </div>

        {/* Overview Report */}
        {reportType === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-base-100 shadow p-6">
              <h3 className="font-semibold text-base-content/70 text-sm">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-primary mt-2">
                {totalUsers}
              </p>
              <p className="text-xs text-base-content/60 mt-1">
                {adminUsers} admin, {regularUsers} regular
              </p>
            </div>
            <div className="card bg-base-100 shadow p-6">
              <h3 className="font-semibold text-base-content/70 text-sm">
                Total Listings
              </h3>
              <p className="text-3xl font-bold text-info mt-2">
                {totalListings}
              </p>
              <p className="text-xs text-base-content/60 mt-1">
                {approvedListings} approved, {pendingListings} pending
              </p>
            </div>
            <div className="card bg-base-100 shadow p-6">
              <h3 className="font-semibold text-base-content/70 text-sm">
                Total Orders
              </h3>
              <p className="text-3xl font-bold text-success mt-2">
                {totalOrders}
              </p>
              <p className="text-xs text-base-content/60 mt-1">
                All order statuses combined
              </p>
            </div>
            <div className="card bg-base-100 shadow p-6">
              <h3 className="font-semibold text-base-content/70 text-sm">
                Pending Approvals
              </h3>
              <p className="text-3xl font-bold text-warning mt-2">
                {pendingListings}
              </p>
              <p className="text-xs text-base-content/60 mt-1">
                Awaiting admin review
              </p>
            </div>
          </div>
        )}

        {/* Users Report */}
        {reportType === "users" && (
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-bold text-base-content mb-4">
              User Report
            </h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>Metric</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Registered Users</td>
                    <td className="font-semibold">{totalUsers}</td>
                  </tr>
                  <tr>
                    <td>Admin Users</td>
                    <td className="font-semibold">{adminUsers}</td>
                  </tr>
                  <tr>
                    <td>Regular Users</td>
                    <td className="font-semibold">{regularUsers}</td>
                  </tr>
                  <tr>
                    <td>Suspended Users</td>
                    <td className="font-semibold">
                      {users.filter((u) => u.status === "suspended").length}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings Report */}
        {reportType === "listings" && (
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-bold text-base-content mb-4">
              Listings Report
            </h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>Category</th>
                    <th>Total</th>
                    <th>Approved</th>
                    <th>Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {listingsByCategory.length > 0 ? (
                    listingsByCategory.map(([category, total]) => {
                      const approved =
                        listingsByCategoryApproved.find(
                          ([cat]) => cat === category
                        )?.[1] || 0;
                      const pending =
                        listingsByCategoryPending.find(
                          ([cat]) => cat === category
                        )?.[1] || 0;
                      return (
                        <tr key={category}>
                          <td>{category}</td>
                          <td className="font-semibold">{total}</td>
                          <td className="text-success">{approved}</td>
                          <td className="text-warning">{pending}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center text-base-content/60"
                      >
                        No listings data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Report */}
        {reportType === "orders" && (
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-bold text-base-content mb-4">
              Orders Report
            </h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>Status</th>
                    <th>Count</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersByStatus.length > 0 ? (
                    ordersByStatus.map(([status, count]) => {
                      const percentage =
                        totalOrders > 0
                          ? ((count / totalOrders) * 100).toFixed(1)
                          : "0";
                      return (
                        <tr key={status}>
                          <td className="capitalize">{status}</td>
                          <td className="font-semibold">{count}</td>
                          <td>{percentage}%</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-base-content/60"
                      >
                        No orders data
                      </td>
                    </tr>
                  )}
                  <tr className="bg-base-200 font-bold">
                    <td>Total</td>
                    <td>{totalOrders}</td>
                    <td>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="alert alert-info mt-8">
          <span>
            📊 Reports updated with real-time data from {totalUsers} users,{" "}
            {totalListings} listings, and {totalOrders} orders.
          </span>
        </div>
      </div>
    </MyContainer>
  );
};

export default AdminReports;

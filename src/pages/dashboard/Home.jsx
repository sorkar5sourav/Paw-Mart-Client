import React, { useEffect, useState, useContext } from "react";
import MyContainer from "../../components/MyContainer";
import API_BASE_URL from "../../config/apiBaseUrl";
import { AuthContext } from "../../context/AuthContext";
import { getAuthToken } from "../../utils/getAuthToken";
import { RingLoader } from "react-spinners";

const OverviewCard = ({ title, value }) => (
  <div className="card p-4">
    <div className="text-sm text-muted">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const BarChart = ({ data, height = 140 }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full h-36">
      {data.map((d, i) => {
        const y = i * (height / data.length) + 6;
        const barHeight = Math.max(height / data.length - 6, 8);
        const widthPct = (d.value / max) * 100;
        return (
          <g key={d.label}>
            <rect
              x={0}
              y={y}
              width={`${widthPct}`}
              height={barHeight}
              fill="#3b82f6"
              rx={4}
              style={{ transition: "width 700ms ease" }}
            />
            <text
              x={Math.min(widthPct + 2, 99)}
              y={y + barHeight / 1.6}
              fontSize="8"
              fill="#0f172a"
            >
              {d.label} ({d.value})
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
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
        console.error("Dashboard load error:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  // compute simple stats
  const totalListings = listings.length;
  const totalOrders = orders.length;
  const totalUsers = users.length;

  const listingsByCategory = Object.entries(
    listings.reduce((acc, l) => {
      const c = l.category || "Other";
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value }));

  const ordersByStatus = Object.entries(
    orders.reduce((acc, o) => {
      const s = (o.status || "unknown").toLowerCase();
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value }));

  const usersByRole = Object.entries(
    users.reduce((acc, u) => {
      const r = u.role || "user";
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value }));

  const recentListings = listings.slice(0, 5);
  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <MyContainer>
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <RingLoader color="#357fa7" size={48} />
          <p className="mt-4 text-base-content/70">Loading dashboard...</p>
        </div>
      </MyContainer>
    );
  }

  return (
    <MyContainer>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {error && <div className="alert alert-error mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <OverviewCard title="Active Listings" value={totalListings} />
        <OverviewCard title="Orders" value={totalOrders} />
        <OverviewCard title="Users" value={totalUsers} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Listings by Category</h3>
          {listingsByCategory.length ? (
            <BarChart data={listingsByCategory} />
          ) : (
            <p className="text-sm text-muted">No listings data</p>
          )}
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-2">Orders by Status</h3>
          {ordersByStatus.length ? (
            <BarChart data={ordersByStatus} />
          ) : (
            <p className="text-sm text-muted">No orders data</p>
          )}
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-2">Users by Role</h3>
          {usersByRole.length ? (
            <BarChart data={usersByRole} />
          ) : (
            <p className="text-sm text-muted">No users data</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Recent Listings</h3>
          {recentListings.length ? (
            <ul className="space-y-2">
              {recentListings.map((l) => (
                <li key={l._id} className="text-sm">
                  <div className="font-semibold">{l.name || l.title}</div>
                  <div className="text-xs text-muted">
                    {l.category} • {l.email}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">No recent listings</p>
          )}
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-2">Recent Orders</h3>
          {recentOrders.length ? (
            <ul className="space-y-2">
              {recentOrders.map((o) => (
                <li key={o._id} className="text-sm">
                  <div className="font-semibold">
                    {o.productTitle || o.parcelName}
                  </div>
                  <div className="text-xs text-muted">
                    {o.name} • {o.status}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">No recent orders</p>
          )}
        </div>
      </div>
    </MyContainer>
  );
};

export default DashboardHome;

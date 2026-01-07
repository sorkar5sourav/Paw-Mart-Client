import React, { useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer";
import API_BASE_URL from "../../config/apiBaseUrl";

const OverviewCard = ({ title, value }) => (
  <div className="card p-4">
    <div className="text-sm text-muted">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const DashboardHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // fetch dashboard stats (best-effort)
    fetch(`${API_BASE_URL}/dashboard/stats`)
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => setStats({ adopted: "—", listings: "—", orders: "—" }));
  }, []);

  return (
    <MyContainer>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <OverviewCard title="Pets Adopted" value={stats?.adopted || "0"} />
        <OverviewCard title="Active Listings" value={stats?.listings || "0"} />
        <OverviewCard title="Orders" value={stats?.orders || "0"} />
      </div>

      <div className="card p-4">
        <h3 className="font-semibold mb-2">Recent Activity</h3>
        <p className="text-sm text-muted">
          Recent listings and orders will appear here.
        </p>
      </div>
    </MyContainer>
  );
};

export default DashboardHome;

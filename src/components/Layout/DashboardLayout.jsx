import React, { useContext } from "react";
import { Link, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const SidebarLink = ({ to, children }) => (
  <Link to={to} className="block px-4 py-2 rounded hover:bg-base-200">
    {children}
  </Link>
);

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex">
        <aside className="w-64 border-r h-screen p-4 sticky top-0 hidden md:block">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {isAdmin ? "Admin Dashboard" : "User Dashboard"}
            </h2>
          </div>
          <nav className="space-y-1">
            <SidebarLink to="/dashboard">Overview</SidebarLink>

            {isAdmin ? (
              // Admin Navigation
              <>
                <SidebarLink to="/dashboard/admin-listings">
                  📋 All Listings
                </SidebarLink>
                <SidebarLink to="/dashboard/users">👥 Manage Users</SidebarLink>
                <SidebarLink to="/dashboard/admin-orders">
                  📦 All Orders
                </SidebarLink>
                <hr className="my-3" />
                <SidebarLink to="/dashboard/reports">📊 Reports</SidebarLink>
                <SidebarLink to="/dashboard/settings">⚙️ Settings</SidebarLink>
              </>
            ) : (
              // User Navigation
              <>
                <SidebarLink to="/dashboard/listings">
                  📝 My Listings
                </SidebarLink>
                <SidebarLink to="/dashboard/orders">📦 My Orders</SidebarLink>
                <SidebarLink to="/dashboard/profile">👤 Profile</SidebarLink>
                <hr className="my-3" />
                <SidebarLink to="/add-listing">➕ Create Listing</SidebarLink>
              </>
            )}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-base-content">
                Welcome back, {user?.displayName || user?.email || "User"}
              </h1>
              <p className="text-sm text-base-content/60">
                {isAdmin ? "Admin Access" : "User Account"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-base-content/70">
                Role:{" "}
                <span className="font-semibold">
                  {isAdmin ? "Admin" : "User"}
                </span>
              </div>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

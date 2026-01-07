import React from "react";
import { Link, Outlet } from "react-router";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const SidebarLink = ({ to, children }) => (
  <Link to={to} className="block px-4 py-2 rounded hover:bg-base-200">
    {children}
  </Link>
);

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex">
        <aside className="w-64 border-r h-screen p-4 sticky top-0 hidden md:block">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">Dashboard</h2>
            <ThemeToggle />
          </div>
          <nav className="space-y-1">
            <SidebarLink to="/dashboard">Overview</SidebarLink>
            <SidebarLink to="/dashboard/listings">My Listings</SidebarLink>
            <SidebarLink to="/dashboard/orders">Orders</SidebarLink>
            <SidebarLink to="/dashboard/profile">Profile</SidebarLink>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div />
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">Welcome back</div>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

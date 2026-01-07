import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router";

const SITE_NAME = "PawMart";

const getTitleForPath = (pathname) => {
  // Exact routes
  const map = {
    "/": "Home",
    "/login": "Log In",
    "/register": "Register",
    "/add-listing": "Add Listing",
    "/pets-supply": "Pets & Supply",
    "/my-listings": "My Listings",
    "/my-orders": "My Orders",
    "/contact": "Contact",
    "/terms": "Terms & Conditions",
  };

  if (map[pathname]) return `${map[pathname]} | ${SITE_NAME}`;

  // Dynamic /listing-details/:id
  if (/^\/listing-details\/[\w-]+/.test(pathname)) {
    return `Listing Details | ${SITE_NAME}`;
  }

  // Fallback: use last segment
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `Home | ${SITE_NAME}`;
  const last = parts[parts.length - 1]
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `${last} | ${SITE_NAME}`;
};

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const title = getTitleForPath(location.pathname);
    document.title = title;
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100 transition-colors duration-300">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 py-8">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

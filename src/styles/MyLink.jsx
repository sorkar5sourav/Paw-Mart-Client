import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-emerald-600 text-lg" : `${className} font-800`
      }
      style={{
        transition: "color 0.3s ease",
      }}
    >
      {children}
    </NavLink>
  );
};

export default MyLink;

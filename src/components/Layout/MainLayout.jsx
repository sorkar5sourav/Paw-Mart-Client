import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 transition-colors duration-300">
      <Navbar />
      <Outlet />
      {/* <SpringLoader targetPercent={100}></SpringLoader> */}
      <Footer />
    </div>
  );
};

export default MainLayout;

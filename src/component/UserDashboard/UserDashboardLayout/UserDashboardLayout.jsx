"use client";

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar";
import UserDashboardNavbar from "../UserDashboardNavbar/UserDashboardNavbar";

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile and set initial sidebar state
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Set sidebar closed by default on mobile
      setIsSidebarOpen(!mobile);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-[#20325A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20325A]"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[2px] bg-opacity-50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white h-full fixed z-50 transition-transform duration-300 ease-in-out border-r border-gray-100 ${
          isMobile
            ? isSidebarOpen
              ? "w-72 translate-x-0"
              : "w-0 -translate-x-full"
            : isSidebarOpen
            ? "w-72 translate-x-0"
            : "w-16 translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          <UserDashboardSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
          isMobile ? "ml-0" : isSidebarOpen ? "lg:ml-72" : "lg:ml-16"
        }`}
      >
        {/* Navbar */}
        <div
          className="fixed top-0 z-30 bg-white border-b border-gray-200 w-full transition-all duration-300 ease-in-out"
          style={{
            left: isMobile ? "0" : isSidebarOpen ? "288px" : "64px",
            width: isMobile
              ? "100%"
              : isSidebarOpen
              ? "calc(100% - 288px)"
              : "calc(100% - 64px)",
          }}
        >
          <UserDashboardNavbar />
        </div>

        {/* Outlet (Main Content) */}
        <div
          className={`flex-1 mt-16 overflow-auto  ${
            isMobile ? "pt-16 px-4" : "p-6"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;

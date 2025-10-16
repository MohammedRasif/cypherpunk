"use client";

import {
  AiOutlineUser,
  AiOutlineLineChart,
  AiOutlineTeam,
  AiOutlinePieChart,
  AiOutlineLogout,
  AiOutlineClose,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsFillPieChartFill } from "react-icons/bs";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { PiChartLineFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

const UserDashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobile }) => {
  // Get the current location
  const location = useLocation();

  // Navigation items
  const navItems = [
    {
      name: "Portfolio",
      icon: <FaUser size={24} />,
      path: "/",
      active: location.pathname === "/",
    },
    {
      name: "My Trade",
      icon: <PiChartLineFill size={24} />,
      path: "/trade",
      active: location.pathname === "/trade",
    },
    {
      name: "Social feed",
      icon: <FaUserFriends size={24} />,
      path: "/social-feed",
      active: location.pathname === "/social-feed",
    },
    {
      name: "Analytics",
      icon: <BsFillPieChartFill size={24} />,
      path: "/analytics",
      active: location.pathname === "/analytics",
    },
    { name: "Log out", icon: <IoLogOut size={24} />, path: "/logout", active: location.pathname === "/logout" },
  ];

  // Close sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar on mobile when close button is clicked
  const handleCloseClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-8 bg-white roboto">
      {/* Sidebar Header/Logo */}
      <div className="flex items-center justify-between mb-8">
        {isSidebarOpen && (
          <div className="flex items-center space-x-2">
            <span className="text-[32px] font-bold ">
              <span className="text-[#4880FF]">Dash</span>Stack
            </span>
          </div>
        )}
        {!isSidebarOpen && !isMobile && (
          <div className="flex justify-center w-full">
            <span className="text-lg font-bold text-[#007BFF]">D</span>
          </div>
        )}
        {isMobile && isSidebarOpen && (
          <button
            onClick={handleCloseClick}
            className="p-2 rounded-md bg-[#20325A] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20325A]"
            aria-label="Close menu"
          >
            <AiOutlineClose size={24} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center space-x-4 lg:p-3.5 p-2 rounded-lg transition-colors duration-200 ${
                  isSidebarOpen ? "justify-start" : "justify-center"
                } ${
                  item.active
                    ? "bg-[#E7F0FF] text-[#007BFF]"
                    : item.name === "Log out"
                    ? "text-[#DC3545]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label={item.name}
              >
                <span>{item.icon}</span>
                {isSidebarOpen && (
                  <span className="lg:text-[20px] text-sm font-semibold">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isSidebarOpen && (
        <div className="mt-auto flex items-center space-x-2 p-2 rounded-full border border-gray-200 bg-gray-50">
          <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
            {/* Placeholder for user image */}
            <img
              src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg"
              className="rounded-full"
              alt=""
            />
          </div>
          <div className="flex-1">
            <span className="lg:text-[20px] text-sm font-medium text-gray-600">
              Jhon
            </span>
          </div>
          <IoSettings size={24} className="text-gray-500 object-cover" />
        </div>
      )}
    </div>
  );
};

export default UserDashboardSidebar;
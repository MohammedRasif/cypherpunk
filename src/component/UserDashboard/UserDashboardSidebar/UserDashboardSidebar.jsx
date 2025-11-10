"use client";

import { useTranslation } from "react-i18next";
import {
  AiOutlineClose,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsFillPieChartFill } from "react-icons/bs";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { PiChartLineFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

const UserDashboardSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
}) => {
  const location = useLocation();
  const { t } = useTranslation(); // এটা যোগ হলো

  // Navigation items - এখানে t() দিয়ে ট্রান্সলেট করা হয়েছে
  const navItems = [
    {
      name: t("portfolio"),
      icon: <FaUser size={24} />,
      path: "/",
      active: location.pathname === "/",
    },
    {
      name: t("my_trade"),
      icon: <PiChartLineFill size={24} />,
      path: "/trade",
      active: location.pathname === "/trade",
    },
    {
      name: t("social_feed"),
      icon: <FaUserFriends size={24} />,
      path: "/social-feed",
      active: location.pathname === "/social-feed",
    },
    {
      name: t("analytics"),
      icon: <BsFillPieChartFill size={24} />,
      path: "/analytics",
      active: location.pathname === "/analytics",
    },
    {
      name: t("logout"),
      icon: <IoLogOut size={24} />,
      path: "/logout",
      active: location.pathname === "/logout",
    },
  ];

  const handleLinkClick = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleCloseClick = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="h-full flex flex-col justify-between p-8 bg-white roboto">
      {/* Logo / Header */}
      <div className="flex items-center justify-between mb-8">
        {isSidebarOpen && (
          <div className="flex items-center space-x-2">
            <span className="text-[32px] font-bold">
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
            className="p-2 rounded-md bg-[#20325A] text-white"
            aria-label={t("close_menu")}
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
                    : item.name === t("logout")
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

      {/* User Profile Section */}
      {isSidebarOpen && (
        <Link
          to="/profile"
          className="mt-auto flex items-center space-x-2 p-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          aria-label={t("user_profile")}
        >
          <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden">
            <img
              src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg"
              className="w-full h-full object-cover"
              alt={t("user_profile")}
            />
          </div>
          <div className="flex-1">
            <span className="lg:text-[20px] text-sm font-medium text-gray-600">
              {localStorage.getItem("name") || "Jhon"}
            </span>
          </div>
          <IoSettings size={24} className="text-gray-500" />
        </Link>
      )}
    </div>
  );
};

export default UserDashboardSidebar;
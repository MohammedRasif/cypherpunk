import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useShowProfileInformationQuery } from "../../../redux/features/withAuth";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const UserDashboardNavbar = () => {
  const { t, i18n } = useTranslation();
  const { data: userInformation } = useShowProfileInformationQuery();
  
  const currentLang = i18n.language;
  const isFrench = currentLang === "fr";

  const toggleLanguage = () => {
    const newLang = isFrench ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  const user = userInformation?.user;
  const name = userInformation?.name?.trim();
  const displayName = name || user?.username?.split("@")[0] || "User";
  const email = userInformation?.email || user?.email;
  const profilePic = userInformation?.profile_picture;

  return (
    <div className="flex justify-end items-center gap-6 py-3 pr-10">
      <motion.div
        className="w-[150px] h-11 bg-gray-200 rounded-full flex justify-between items-center py-1 cursor-pointer relative shadow-md select-none"
        onClick={toggleLanguage}
        layout
        transition={spring}
      >
        <motion.div
          className="w-[72px] h-9 rounded-full absolute top-[5px] left-[5px] flex justify-center items-center font-bold text-white shadow-lg bg-[#8280FF]"
          layout
          transition={spring}
          style={{ x: isFrench ? 70 : 0 }}
        />

        <motion.span
          className={`text-sm w-1/2 text-center z-10 font-semibold transition-colors ${
            isFrench ? "text-gray-500" : "text-white"
          }`}
        >
          {t("English")}
        </motion.span>

        <motion.span
          className={`text-sm w-1/2 text-center z-10 font-semibold transition-colors ${
            isFrench ? "text-white" : "text-gray-500"
          }`}
        >
          {t("French")}
        </motion.span>
      </motion.div>

      {/* User Profile Section */}
      <div className="flex items-center gap-3">
        {/* Profile Picture */}
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#8280FF] shadow-md">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#8280FF] to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name & Email */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">
            {displayName}
          </p>
          <p className="text-xs text-gray-500">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardNavbar;
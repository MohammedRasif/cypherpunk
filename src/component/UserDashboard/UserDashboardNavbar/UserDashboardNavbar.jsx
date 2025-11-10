import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const UserDashboardNavbar = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;
  const isFrench = currentLang === "fr";

  const toggleLanguage = () => {
    const newLang = isFrench ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };
  
  return (
    <div className="flex justify-end py-3 pr-10">
      <motion.div
        className="w-[150px] h-11 bg-gray-200 rounded-full flex justify-between items-center py-1 cursor-pointer relative shadow-md"
        onClick={toggleLanguage}
        layout
        transition={spring}
      >
        <motion.div
          className="w-[72px] h-9 rounded-full absolute top-[5px] flex justify-center items-center font-bold text-white shadow-lg bg-[#8280FF]"
          animate={{ x: isFrench ? 75 : 5 }}
          transition={spring}
        />

        <motion.span
          className={`text-sm w-1/2 pl-2 pt-[1px] text-center z-10 font-semibold ${
            isFrench ? "text-gray-500" : "text-white"
          }`}
        >
          {t("English")}
        </motion.span>

        <motion.span
          className={`text-sm w-1/2 pt-[1px] text-center z-10 font-semibold ${
            isFrench ? "text-white" : "text-gray-500"
          }`}
        >
          {t("French")}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default UserDashboardNavbar;
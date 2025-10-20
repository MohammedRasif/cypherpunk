import React, { useState } from "react";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const UserDashboardNavbar = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const isFrench = language === "fr";

  const knobX = isFrench ? "translate-x-[75px]" : "translate-x-[0px]";

  const knobBgColor = isFrench ? "bg-[#8280FF]" : "bg-[#8280FF]";

  return (
    <div className="flex justify-end py-3 pr-10">
      <motion.div
        className="w-[150px] h-11 bg-gray-200 rounded-full flex justify-between items-center py-1 cursor-pointer relative shadow-md"
        onClick={toggleLanguage}
        layout
        transition={spring}
      >
        <motion.div
          className={`w-[72px] h-9 rounded-full absolute top-[5px] flex justify-center items-center font-bold text-white shadow-lg ${knobBgColor}`}
          animate={{ x: isFrench ? 75 : 5 }} 
          transition={spring}
        ></motion.div>

        <motion.span
          className={`text-sm w-1/2 pl-2 pt-[1px] text-center z-10 font-semibold ${
            isFrench ? "text-gray-500" : "text-white "
          }`}
          initial={false}
          animate={{ color: isFrench ? "#6B7280" : "#FFFFFF" }}
          transition={{ duration: 0.3 }}
        >
          ENGLISH
        </motion.span>

        <motion.span
          className={`text-sm w-1/2 pt-[1px]  text-center z-10 font-semibold ${
            isFrench ? "text-white" : "text-gray-500"
          }`}
          initial={false}
          animate={{ color: isFrench ? "#FFFFFF" : "#6B7280" }}
          transition={{ duration: 0.3 }}
        >
          FRANCE
        </motion.span>
      </motion.div>
    </div>
  );
};

export default UserDashboardNavbar;

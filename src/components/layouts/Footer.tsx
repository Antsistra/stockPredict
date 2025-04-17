import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.footer
      className={`w-full py-4 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-screen-xl mx-auto px-4 pb-4">
        <motion.div
          variants={itemVariants}
          className={`mt-8   ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          } text-center`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © {new Date().getFullYear()} Stock Predict. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

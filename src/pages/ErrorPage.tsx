import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

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
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        className="max-w-4xl mx-auto px-4 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <svg
            className="w-64 h-64 mx-auto mb-8"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M100 20 C40 20, 20 40, 20 100 C20 160, 40 180, 100 180 C160 180, 180 160, 180 100 C180 40, 160 20, 100 20"
              fill="none"
              stroke={isDarkMode ? "#4F46E5" : "#6366F1"}
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.text
              x="100"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isDarkMode ? "#E5E7EB" : "#1F2937"}
              className="text-6xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              404
            </motion.text>
          </svg>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={`text-4xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Oops! Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`text-xl mb-8 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className={`px-6 py-3 rounded-lg font-medium ${
              isDarkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            } transition-colors duration-200`}
          >
            Go Back Home
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12">
          <div className="flex justify-center space-x-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  isDarkMode ? "bg-indigo-500" : "bg-indigo-400"
                }`}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;

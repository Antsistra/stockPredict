import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 p-1 cursor-pointer" 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-gray-300"
        animate={{
          x: isDarkMode ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <div className="flex items-center justify-between h-full px-1">
        <Sun className="w-3 h-3 text-yellow-500" />
        <Moon className="w-3 h-3 text-blue-500" />
      </div>
    </motion.button>
  );
} 
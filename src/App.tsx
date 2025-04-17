import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import ErrorPage from "@/pages/ErrorPage";
import DashboardPage from "@/pages/DashboardPage";
import StockPage from "./pages/StockPage";
import LandingPage from "@/pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "@/context/ThemeContext";
import SettingPage from "@/pages/SettingPage";
import { Toaster } from "@/components/ui/toaster";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Define routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/stock/:symbol" element={<StockPage />} />
            <Route path="/setting" element={<SettingPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/" element={<LandingPage />} />

          {/* 404 Not Found */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import ErrorPage from "@/pages/ErrorPage";
import DashboardPage from "@/pages/DashboardPage";
import StockPage from "./pages/StockPage";
import LandingPage from "@/pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/stock/:symbol" element={<StockPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<LandingPage />} />

        {/* 404 Not Found */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

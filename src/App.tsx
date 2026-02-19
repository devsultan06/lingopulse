import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import JoinModal from "./components/home/JoinModal";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./screens/home/Home";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-daisy-white">
        <div className="w-16 h-16 border-8 border-black border-t-blue-violet rounded-full animate-spin" />
      </div>
    );

  if (!user) return <Navigate to="/" />;
  return <>{children}</>;
};

const AppContent = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [user, location.pathname, navigate]);

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleJoinClick = () => {
    if (user) {
      // If user is already logged in, redirect to dashboard if they are on home
      window.location.href = "/dashboard";
    } else {
      setIsJoinModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      {!isDashboard && <Navbar onJoinClick={handleJoinClick} />}
      <Routes>
        <Route path="/" element={<Home onJoinClick={handleJoinClick} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isDashboard && <Footer />}

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

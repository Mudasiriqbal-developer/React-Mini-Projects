import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CVBuilder from "./pages/Cvbuilder";
import CertificatePage from "./pages/Certificatepage";
import PrintingPage from "./pages/Printingpage";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import LoginModal from "./components/LoginModal";
import Toast from "./components/Toast";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null); // { name, email, role: 'user'|'admin' }
  const [toast, setToast] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (msg, type = "default") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    showToast(`Welcome back, ${userData.name}!`, "success");
    if (userData.role === "admin") navigate("admin");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("home");
    showToast("Logged out successfully.");
  };

  const noFooterPages = ["admin"];

  const renderPage = () => {
    const props = { navigate, user, showToast };
    switch (currentPage) {
      case "home":
        return <Home {...props} />;
      case "cv":
        return <CVBuilder {...props} />;
      case "certificate":
        return <CertificatePage {...props} />;
      case "printing":
        return <PrintingPage {...props} />;
      case "admin":
        return <AdminPanel {...props} />;
      case "dashboard":
        return <Dashboard {...props} />;
      default:
        return <Home {...props} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        user={user}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      <main className="page-wrapper">{renderPage()}</main>

      {!noFooterPages.includes(currentPage) && <Footer navigate={navigate} />}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          showToast={showToast}
        />
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

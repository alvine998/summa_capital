import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Gem, Image, Users, Settings, LogOut } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <img
            src="/images/logo.png"
            alt="Summa Capital Logo"
            className="sidebar-logo-icon"
          />
        </div>
        <div className="sidebar-title">Summa Capital</div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <button
            className={`nav-item ${isActive("/office/dashboard") ? "active" : ""}`}
            onClick={() => navigate("/office/dashboard")}
          >
            <LayoutDashboard className="nav-icon" size={20} />
            <span className="nav-label">Dashboard</span>
          </button>

          <button
            className={`nav-item ${isActive("/office/asset") ? "active" : ""}`}
            onClick={() => navigate("/office/asset")}
          >
            <Gem className="nav-icon" size={20} />
            <span className="nav-label">Asset</span>
          </button>

          <button
            className={`nav-item ${isActive("/office/galeri") ? "active" : ""}`}
            onClick={() => navigate("/office/galeri")}
          >
            <Image className="nav-icon" size={20} />
            <span className="nav-label">Galeri</span>
          </button>

          <button
            className={`nav-item ${isActive("/office/pengguna") ? "active" : ""}`}
            onClick={() => navigate("/office/pengguna")}
          >
            <Users className="nav-icon" size={20} />
            <span className="nav-label">Pengguna</span>
          </button>

          <button
            className={`nav-item ${isActive("/office/pengaturan") ? "active" : ""}`}
            onClick={() => navigate("/office/pengaturan")}
          >
            <Settings className="nav-icon" size={20} />
            <span className="nav-label">Pengaturan</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("summacapital_token");
            localStorage.removeItem("summacapital_user");
            navigate("/office/login");
          }}
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Gem, Image, Users, Settings, LogOut, ChevronDown, Gavel, Sparkles, Mail, History } from "lucide-react";
import { logActivity, ACTIVITY_TYPES } from "../../services/activityLog";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAssetSection = location.pathname.startsWith("/office/asset") || location.pathname.startsWith("/office/early-access");
  const [assetOpen, setAssetOpen] = useState(isAssetSection);

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

          {/* Asset Accordion */}
          <div className="nav-accordion">
            <button
              className={`nav-item nav-accordion-trigger ${isAssetSection ? "active" : ""}`}
              onClick={() => setAssetOpen(prev => !prev)}
            >
              <Gem className="nav-icon" size={20} />
              <span className="nav-label">Asset</span>
              <ChevronDown
                className={`nav-chevron ${assetOpen ? "open" : ""}`}
                size={16}
              />
            </button>
            {assetOpen && (
              <div className="nav-sub">
                <button
                  className={`nav-sub-item ${isActive("/office/asset") ? "active" : ""}`}
                  onClick={() => navigate("/office/asset")}
                >
                  <Gavel size={15} />
                  <span>Auction</span>
                </button>
                <button
                  className={`nav-sub-item ${isActive("/office/early-access") ? "active" : ""}`}
                  onClick={() => navigate("/office/early-access")}
                >
                  <Sparkles size={15} />
                  <span>Early Access</span>
                </button>
              </div>
            )}
          </div>

          <button
            className={`nav-item ${isActive("/office/galeri") ? "active" : ""}`}
            onClick={() => navigate("/office/galeri")}
          >
            <Image className="nav-icon" size={20} />
            <span className="nav-label">Gallery</span>
          </button>

          <button
            className={`nav-item ${isActive("/office/messages") ? "active" : ""}`}
            onClick={() => navigate("/office/messages")}
          >
            <Mail className="nav-icon" size={20} />
            <span className="nav-label">Messages</span>
          </button>

          <button
            className={`nav-item ${isActive("/office/pengguna") ? "active" : ""}`}
            onClick={() => navigate("/office/pengguna")}
          >
            <Users className="nav-icon" size={20} />
            <span className="nav-label">Users</span>
          </button>

          <button
            className={`nav-item ${isActive("/office/pengaturan") ? "active" : ""}`}
            onClick={() => navigate("/office/pengaturan")}
          >
            <Settings className="nav-icon" size={20} />
            <span className="nav-label">Settings</span>
          </button>

          <button
            className={`nav-item ${isActive("/office/activity-log") ? "active" : ""}`}
            onClick={() => navigate("/office/activity-log")}
          >
            <History className="nav-icon" size={20} />
            <span className="nav-label">Activity Log</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={() => {
            logActivity(ACTIVITY_TYPES.LOGOUT, {
              timestamp: new Date().toISOString()
            })
            localStorage.removeItem("summacapital_token");
            localStorage.removeItem("summacapital_user");
            navigate("/office/login");
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

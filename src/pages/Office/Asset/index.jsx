import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gem } from "lucide-react";
import { assetService } from "../../../services/assetService";
import { useToast } from "../../../components/Toast/Toast";
import "./asset.css";

export default function Asset() {
  const navigate = useNavigate();
  const { toasts, addToast, removeToast, Toast } = useToast();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: null,
    title: "",
  });

  const tabConfig = [
    { id: "Pending", label: "Pending" },
    { id: "Publish", label: "Published" },
    { id: "Rejected", label: "Rejected" },
    { id: "Active", label: "Active" },
    { id: "Closed", label: "Closed" },
  ];

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const result = await assetService.listAdmin(1, 100);
      setAssets(Array.isArray(result) ? result : result?.data || []);
    } catch (err) {
      addToast("Failed to load assets", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const filteredAssets = assets.filter(
    (a) => (a.status || "").toLowerCase() === activeTab.toLowerCase(),
  ).map((item) => ({
    ...item,
    images: item.images?.length > 0 ? JSON.parse(item.images) : "",
  }));

  const tabsWithCount = tabConfig.map((tab) => ({
    ...tab,
    count: assets.filter(
      (a) => (a.status || "").toLowerCase() === tab.id.toLowerCase(),
    ).length,
  }));

  const handleDeleteClick = (id, title) => {
    setDeleteModal({ show: true, id, title });
  };

  const handleConfirmDelete = async () => {
    try {
      await assetService.delete(deleteModal.id);
      setAssets((prev) => prev.filter((a) => a.id !== deleteModal.id));
      addToast("Asset deleted successfully", "success");
    } catch (err) {
      addToast(
        err.response?.data?.message || "Failed to delete asset",
        "error",
      );
    } finally {
      setDeleteModal({ show: false, id: null, title: "" });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, id: null, title: "" });
  };

  console.log(filteredAssets, "filet")

  return (
    <div className="office-page">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title">
            <Gem className="inline-icon" size={28} /> Asset Management
          </h1>
          <button
            className="add-btn"
            onClick={() => navigate("/office/asset/create")}
          >
            + Add Asset
          </button>
        </div>
      </div>

      <div className="office-content">
        <div className="tabs">
          {tabsWithCount.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-badge">{tab.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading assets...</div>
        ) : filteredAssets.length === 0 ? (
          <div className="empty-state">
            <Gem size={48} />
            <h3>No assets found</h3>
            <p>No assets with status "{activeTab}"</p>
          </div>
        ) : (
          <div className="asset-grid">
            {filteredAssets.map((item) => (
              <div key={item.id} className="asset-card">
                <div className="asset-image">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_IMAGE_URL}/${item.images[0]}`}
                      alt={item.title}
                    />
                  ) : (
                    <div className="asset-img-placeholder">
                      <Gem size={32} />
                    </div>
                  )}
                </div>
                <div className="asset-content">
                  <h3 className="asset-title">{item.title}</h3>
                  <div className="asset-info">
                    <div className="info-item">
                      <span className="info-label">Estimate</span>
                      <span className="info-value">{item.estimate}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Deadline</span>
                      <span className="info-value">
                        {item.deadline
                          ? new Date(item.deadline).toLocaleDateString("id-ID")
                          : "-"}
                      </span>
                    </div>
                  </div>
                  <div className="asset-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => navigate(`/office/asset/edit/${item.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteClick(item.id, item.title)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Asset</h2>
              <button className="modal-close" onClick={handleCancelDelete}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteModal.title}</strong>?
              </p>
              <p className="modal-warning">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button
                className="modal-btn confirm"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

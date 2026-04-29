import { useState, useEffect, useCallback } from "react";
import { History, Download, Trash2, X, Filter } from "lucide-react";
import { useToast } from "../../../components/Toast/Toast";
import { activityLogService } from "../../../services/dashboardService";
import "./style.css";

export default function ActivityLog() {
  const { toasts, addToast, removeToast, Toast: ToastComponent } = useToast();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [clearModal, setClearModal] = useState(false);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      const filters = {};
      if (searchTerm) filters.search = searchTerm;
      if (filterType) filters.type = filterType;
      if (filterUser) filters.user = filterUser;
      if (dateFilter && dateFilter !== "all") filters.date = dateFilter;
      const result = await activityLogService.list(1, 100, filters);
      setActivities(
        Array.isArray(result)
          ? result?.map((activity) => ({
              ...activity,
              details: JSON.parse(activity.details),
            }))
          : result?.data || [],
      );
    } catch (err) {
      addToast("Failed to load activity log", "error");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterType, filterUser, dateFilter]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleExport = async () => {
    try {
      const response = await activityLogService.export("csv");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "activity-log.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      addToast("Activity log exported successfully!", "success");
    } catch (error) {
      addToast("Error exporting activity log", "error");
    }
  };

  const handleClearLog = async () => {
    try {
      await activityLogService.clear();
      setActivities([]);
      setClearModal(false);
      addToast("Activity log cleared successfully!", "success");
    } catch (error) {
      addToast("Failed to clear activity log", "error");
      setClearModal(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getActivityIcon = (type = "") => {
    if (type.includes("CREATE")) return "📝";
    if (type.includes("UPDATE")) return "✏️";
    if (type.includes("DELETE")) return "🗑️";
    if (type.includes("PUBLISH")) return "📤";
    if (type.includes("LOGIN")) return "🔐";
    if (type.includes("LOGOUT")) return "🚪";
    return "📋";
  };

  const getActivityColor = (type = "") => {
    if (type.includes("CREATE")) return "activity-create";
    if (type.includes("UPDATE")) return "activity-update";
    if (type.includes("DELETE")) return "activity-delete";
    if (type.includes("PUBLISH")) return "activity-publish";
    if (type.includes("LOGIN") || type.includes("LOGOUT"))
      return "activity-auth";
    return "activity-default";
  };

  return (
    <div className="office-page">
      <ToastComponent toasts={toasts} removeToast={removeToast} />

      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title">
            <History className="inline-icon" size={28} /> Activity Log
          </h1>
          <div className="header-actions">
            <button className="btn btn--secondary" onClick={handleExport}>
              <Download size={16} /> Export
            </button>
            <button
              className="btn btn--danger"
              onClick={() => setClearModal(true)}
            >
              <Trash2 size={16} /> Clear Log
            </button>
          </div>
        </div>
      </div>

      <div className="office-content">
        <div className="activity-container">
          {/* Filters Section */}
          <div className="activity-filters">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Search by user, action, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Activity Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="LOGIN">LOGIN</option>
                <option value="LOGOUT">LOGOUT</option>
                <option value="CREATE">CREATE</option>
                <option value="UPDATE">UPDATE</option>
                <option value="DELETE">DELETE</option>
                <option value="PUBLISH">PUBLISH</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>

          {/* Statistics */}
          <div className="activity-stats">
            <div className="stat-card">
              <div className="stat-value">{activities.length}</div>
              <div className="stat-label">Results Found</div>
            </div>
          </div>

          {/* Activity List */}
          <div className="activity-list">
            {loading ? (
              <div className="loading-state">Loading activity log...</div>
            ) : activities.length === 0 ? (
              <div className="empty-state">
                <Filter size={48} className="empty-icon" />
                <p className="empty-text">No activities match your filters</p>
              </div>
            ) : (
              <div className="activities">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`activity-item ${getActivityColor(activity.type)}`}
                  >
                    <div className="activity-icon">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-content">
                      <div className="activity-main">
                        <span className="activity-user">
                          {activity.user || activity.userName}
                        </span>
                        <span className="activity-label">
                          {activity.label ||
                            activity.description ||
                            activity.action}
                        </span>
                      </div>
                      {activity.details &&
                        Object.keys(activity.details).length > 0 && (
                          <div className="activity-details">
                            {Object.entries(activity.details).map(
                              ([key, value]) => (
                                <span key={key} className="detail-tag">
                                  {key}:{" "}
                                  {typeof value === "string"
                                    ? value
                                    : JSON.stringify(value)}
                                </span>
                              ),
                            )}
                          </div>
                        )}
                      <div className="activity-meta">
                        <span className="activity-date">
                          {formatDate(activity.timestamp || activity.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {clearModal && (
        <div className="modal-overlay" onClick={() => setClearModal(false)}>
          <div
            className="modal-content modal-small"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Clear Activity Log</h2>
              <button
                className="modal-close-btn"
                onClick={() => setClearModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to clear all activity logs?</p>
              <p className="text-muted">
                This action cannot be undone. Consider exporting the log first.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn--secondary"
                onClick={() => setClearModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn--danger" onClick={handleClearLog}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

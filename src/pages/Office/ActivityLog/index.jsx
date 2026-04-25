import { useState, useEffect } from 'react'
import { History, Download, Trash2, X, Filter } from 'lucide-react'
import Toast, { useToast } from '../../../components/Toast/Toast'
import { 
  getActivityLog, 
  ACTIVITY_TYPES, 
  getActivityLabel, 
  clearActivityLog, 
  exportActivityLog 
} from '../../../services/activityLog'
import './style.css'

export default function ActivityLog() {
  const { toasts, addToast, removeToast, Toast: ToastComponent } = useToast()
  const [activities, setActivities] = useState([])
  const [filteredActivities, setFilteredActivities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [filterUser, setFilterUser] = useState('All')
  const [dateFilter, setDateFilter] = useState('all')
  const [clearModal, setClearModal] = useState(false)

  // Get unique activity types and users for filters
  const activityTypes = ['All', ...Object.values(ACTIVITY_TYPES)]
  const uniqueUsers = ['All', ...new Set(activities.map(a => a.user))]

  // Load activities on mount
  useEffect(() => {
    const log = getActivityLog()
    setActivities(log)
    filterActivities(log, searchTerm, filterType, filterUser, dateFilter)
  }, [])

  // Apply filters
  const filterActivities = (items, search, type, user, date) => {
    let filtered = items

    // Search filter
    if (search) {
      filtered = filtered.filter(activity =>
        activity.label.toLowerCase().includes(search.toLowerCase()) ||
        activity.user.toLowerCase().includes(search.toLowerCase()) ||
        JSON.stringify(activity.details).toLowerCase().includes(search.toLowerCase())
      )
    }

    // Type filter
    if (type !== 'All') {
      filtered = filtered.filter(activity => activity.type === type)
    }

    // User filter
    if (user !== 'All') {
      filtered = filtered.filter(activity => activity.user === user)
    }

    // Date filter
    const now = new Date()
    const activityDate = (activity) => new Date(activity.timestamp)

    if (date === 'today') {
      filtered = filtered.filter(activity => {
        const aDate = activityDate(activity)
        return aDate.toDateString() === now.toDateString()
      })
    } else if (date === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(activity => activityDate(activity) >= weekAgo)
    } else if (date === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(activity => activityDate(activity) >= monthAgo)
    }

    setFilteredActivities(filtered)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    filterActivities(activities, value, filterType, filterUser, dateFilter)
  }

  const handleTypeChange = (value) => {
    setFilterType(value)
    filterActivities(activities, searchTerm, value, filterUser, dateFilter)
  }

  const handleUserChange = (value) => {
    setFilterUser(value)
    filterActivities(activities, searchTerm, filterType, value, dateFilter)
  }

  const handleDateChange = (value) => {
    setDateFilter(value)
    filterActivities(activities, searchTerm, filterType, filterUser, value)
  }

  const handleExport = () => {
    try {
      exportActivityLog()
      addToast('Activity log exported successfully!', 'success')
    } catch (error) {
      addToast('Error exporting activity log', 'error')
    }
  }

  const handleClearLog = () => {
    clearActivityLog()
    setActivities([])
    setFilteredActivities([])
    setClearModal(false)
    addToast('Activity log cleared successfully!', 'success')
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type) => {
    if (type.includes('CREATE')) return '📝'
    if (type.includes('UPDATE')) return '✏️'
    if (type.includes('DELETE')) return '🗑️'
    if (type.includes('PUBLISH')) return '📤'
    if (type.includes('LOGIN')) return '🔐'
    if (type.includes('LOGOUT')) return '🚪'
    return '📋'
  }

  const getActivityColor = (type) => {
    if (type.includes('CREATE')) return 'activity-create'
    if (type.includes('UPDATE')) return 'activity-update'
    if (type.includes('DELETE')) return 'activity-delete'
    if (type.includes('PUBLISH')) return 'activity-publish'
    if (type.includes('LOGIN') || type.includes('LOGOUT')) return 'activity-auth'
    return 'activity-default'
  }

  return (
    <div className="office-page">
      <ToastComponent toasts={toasts} removeToast={removeToast} />

      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title">
            <History className="inline-icon" size={28} /> Activity Log
          </h1>
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
                onChange={(e) => handleSearchChange(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Activity Type</label>
              <select
                value={filterType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="filter-select"
              >
                {activityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">User</label>
              <select
                value={filterUser}
                onChange={(e) => handleUserChange(e.target.value)}
                className="filter-select"
              >
                {uniqueUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Date</label>
              <select
                value={dateFilter}
                onChange={(e) => handleDateChange(e.target.value)}
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
              <div className="stat-label">Total Activities</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{filteredActivities.length}</div>
              <div className="stat-label">Filtered Results</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{uniqueUsers.length - 1}</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>

          {/* Activity List */}
          <div className="activity-list">
            {filteredActivities.length === 0 ? (
              <div className="empty-state">
                <Filter size={48} className="empty-icon" />
                <p className="empty-text">
                  {activities.length === 0 ? 'No activities logged yet' : 'No activities match your filters'}
                </p>
              </div>
            ) : (
              <div className="activities">
                {filteredActivities.map((activity, index) => (
                  <div key={activity.id} className={`activity-item ${getActivityColor(activity.type)}`}>
                    <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                    <div className="activity-content">
                      <div className="activity-main">
                        <span className="activity-user">{activity.user}</span>
                        <span className="activity-label">{activity.label}</span>
                      </div>
                      {Object.keys(activity.details).length > 0 && (
                        <div className="activity-details">
                          {Object.entries(activity.details).map(([key, value]) => (
                            <span key={key} className="detail-tag">
                              {key}: {typeof value === 'string' ? value : JSON.stringify(value)}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="activity-meta">
                        <span className="activity-date">{formatDate(activity.timestamp)}</span>
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
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Clear Activity Log</h2>
              <button className="modal-close-btn" onClick={() => setClearModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to clear all activity logs?</p>
              <p className="text-muted">This action cannot be undone. Consider exporting the log first.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn--secondary" onClick={() => setClearModal(false)}>
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
  )
}

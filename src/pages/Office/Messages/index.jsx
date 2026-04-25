import { useState, useEffect } from 'react'
import { Mail, Trash2, Eye, X, ArrowLeft } from 'lucide-react'
import Toast, { useToast } from '../../../components/Toast/Toast'
import { logActivity, ACTIVITY_TYPES } from '../../../services/activityLog'
import './style.css'

export default function Messages() {
  const { toasts, addToast, removeToast, Toast: ToastComponent } = useToast()
  const [messages, setMessages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('All')
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, senderName: '' })
  const [viewModal, setViewModal] = useState({ show: false, message: null })

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('contact_messages')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        // Sort by date (newest first)
        setMessages(parsedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
      } catch (error) {
        console.error('Error loading messages:', error)
      }
    }
  }, [])

  const subjects = ['All', 'Investment Consultation', 'Auction Information', 'Early Access Program', 'Partnership', 'Other']

  const filteredMessages = messages.filter(msg => {
    const matchSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       msg.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchSubject = filterSubject === 'All' || msg.subject === filterSubject
    return matchSearch && matchSubject
  })

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, senderName: name })
  }

  const handleConfirmDelete = () => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== deleteModal.id))
    
    // Update localStorage
    const allMessages = messages.filter(msg => msg.id !== deleteModal.id)
    localStorage.setItem('contact_messages', JSON.stringify(allMessages))
    
    // Log activity
    logActivity(ACTIVITY_TYPES.DELETE_MESSAGE, {
      messageId: deleteModal.id,
      senderName: deleteModal.senderName
    })
    
    setDeleteModal({ show: false, id: null, senderName: '' })
    addToast('Message deleted successfully!', 'success')
  }

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, id: null, senderName: '' })
  }

  const handleViewMessage = (message) => {
    // Log activity
    logActivity(ACTIVITY_TYPES.VIEW_MESSAGE, {
      messageId: message.id,
      senderName: message.name,
      subject: message.subject
    })
    setViewModal({ show: true, message })
  }

  const handleCloseView = () => {
    setViewModal({ show: false, message: null })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="office-page">
      <ToastComponent toasts={toasts} removeToast={removeToast} />
      
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Mail className="inline-icon" size={28} /> Messages</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="messages-container">
          {/* Filters Section */}
          <div className="messages-filters">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="filter-select"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Messages List */}
          <div className="messages-list">
            {filteredMessages.length === 0 ? (
              <div className="empty-state">
                <Mail size={48} className="empty-icon" />
                <p className="empty-text">
                  {messages.length === 0 ? 'No messages yet' : 'No messages match your filters'}
                </p>
              </div>
            ) : (
              <>
                <div className="messages-header">
                  <div className="col-name">Name</div>
                  <div className="col-subject">Subject</div>
                  <div className="col-email">Email</div>
                  <div className="col-date">Date</div>
                  <div className="col-actions">Actions</div>
                </div>
                {filteredMessages.map((msg) => (
                  <div key={msg.id} className="message-row">
                    <div className="col-name">{msg.name}</div>
                    <div className="col-subject">{msg.subject}</div>
                    <div className="col-email">{msg.email}</div>
                    <div className="col-date">{formatDate(msg.timestamp)}</div>
                    <div className="col-actions">
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewMessage(msg)}
                        title="View message"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteClick(msg.id, msg.name)}
                        title="Delete message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* View Message Modal */}
      {viewModal.show && viewModal.message && (
        <div className="modal-overlay" onClick={handleCloseView}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Message Details</h2>
              <button className="modal-close-btn" onClick={handleCloseView}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-group">
                <label className="detail-label">From</label>
                <p className="detail-value">{viewModal.message.name}</p>
              </div>
              <div className="detail-group">
                <label className="detail-label">Email</label>
                <p className="detail-value">{viewModal.message.email}</p>
              </div>
              <div className="detail-group">
                <label className="detail-label">Phone</label>
                <p className="detail-value">{viewModal.message.phone || 'N/A'}</p>
              </div>
              <div className="detail-group">
                <label className="detail-label">Subject</label>
                <p className="detail-value">{viewModal.message.subject}</p>
              </div>
              <div className="detail-group">
                <label className="detail-label">Date</label>
                <p className="detail-value">{formatDate(viewModal.message.timestamp)}</p>
              </div>
              <div className="detail-group">
                <label className="detail-label">Message</label>
                <p className="detail-message">{viewModal.message.message}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--secondary" onClick={handleCloseView}>Close</button>
              <button
                className="btn btn--danger"
                onClick={() => {
                  handleDeleteClick(viewModal.message.id, viewModal.message.name)
                  handleCloseView()
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Message</h2>
              <button className="modal-close-btn" onClick={handleCancelDelete}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the message from <strong>{deleteModal.senderName}</strong>?</p>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn--secondary" onClick={handleCancelDelete}>Cancel</button>
              <button className="btn btn--danger" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

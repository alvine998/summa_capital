import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, X, ImageIcon } from 'lucide-react'
import { useToast } from '../../../components/Toast/Toast'
import './style.css'

const initialData = [
  { id: 1, title: 'Premium Land in Pondok Indah', estimate: 'Rp 4.5B', deadline: 'May 30, 2025', location: 'South Jakarta', status: 'Active', images: [] },
  { id: 2, title: 'Luxury Penthouse SCBD', estimate: 'Rp 12B', deadline: 'Jun 15, 2025', location: 'Central Jakarta', status: 'Active', images: [] },
  { id: 3, title: 'Commercial Space Serpong', estimate: 'Rp 3.2B', deadline: 'Apr 10, 2025', location: 'Tangerang', status: 'Closed', images: [] }
]

export default function EarlyAccessOffice() {
  const navigate = useNavigate()
  const { toasts, addToast, removeToast, Toast } = useToast()

  const [data, setData] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' })

  const statuses = ['All', 'Active', 'Closed']

  const filtered = data.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'All' || item.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleDeleteClick = (id, title) => setDeleteModal({ show: true, id, title })
  const handleCancelDelete = () => setDeleteModal({ show: false, id: null, title: '' })
  const handleConfirmDelete = () => {
    setData(prev => prev.filter(item => item.id !== deleteModal.id))
    addToast('Early Access item deleted!', 'success')
    setDeleteModal({ show: false, id: null, title: '' })
  }

  return (
    <div className="office-page">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title">
            <Sparkles className="inline-icon" size={28} /> Early Access
          </h1>
          <button className="add-btn" onClick={() => navigate('/office/early-access/create')}>
            + Add Item
          </button>
        </div>
      </div>

      <div className="office-content">
        <div className="ea-controls">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="ea-filters">
            {statuses.map(s => (
              <button
                key={s}
                className={`filter-btn ${filterStatus === s ? 'active' : ''}`}
                onClick={() => setFilterStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="ea-table-wrapper">
          <table className="ea-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Estimate</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="ea-empty">No items found</td>
                </tr>
              ) : filtered.map(item => (
                <tr key={item.id}>
                  <td className="ea-td-img">
                    {item.images && item.images.length > 0
                      ? <img src={item.images[0]} alt="" className="ea-list-thumb" />
                      : <div className="ea-list-thumb-empty"><ImageIcon size={18} /></div>
                    }
                  </td>
                  <td className="ea-td-bold">{item.title}</td>
                  <td>{item.location}</td>
                  <td>{item.estimate}</td>
                  <td>{item.deadline}</td>
                  <td>
                    <span className={`ea-status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn-small edit"
                        onClick={() => navigate(`/office/early-access/edit/${item.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn-small delete"
                        onClick={() => handleDeleteClick(item.id, item.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Delete Item</h3>
              <button className="modal-close" onClick={handleCancelDelete}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deleteModal.title}</strong>?</p>
              <p className="modal-warning">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCancelDelete}>Cancel</button>
              <button className="btn-delete" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

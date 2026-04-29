import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, X, ImageIcon } from 'lucide-react'
import { useToast } from '../../../components/Toast/Toast'
import { earlyAccessService } from '../../../services/earlyAccessService'
import './style.css'

export default function EarlyAccessOffice() {
  const navigate = useNavigate()
  const { toasts, addToast, removeToast, Toast } = useToast()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' })

  const statuses = ['All', 'Active', 'Closed']

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await earlyAccessService.listAdmin(1, 100)
      setData(Array.isArray(result) ? result : (result?.data || []))
    } catch (err) {
      addToast('Failed to load early access items', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filtered = data.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'All' || item.status === filterStatus
    return matchSearch && matchStatus
  }).map(item => ({
    ...item,
    images: item.images?.length > 0 ? JSON.parse(item.images) : "",
  }))

  const handleDeleteClick = (id, title) => setDeleteModal({ show: true, id, title })
  const handleCancelDelete = () => setDeleteModal({ show: false, id: null, title: '' })

  const handleConfirmDelete = async () => {
    try {
      await earlyAccessService.delete(deleteModal.id)
      setData(prev => prev.filter(item => item.id !== deleteModal.id))
      addToast('Early Access item deleted!', 'success')
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete item', 'error')
    } finally {
      setDeleteModal({ show: false, id: null, title: '' })
    }
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

        {loading ? (
          <div className="loading-state">Loading early access items...</div>
        ) : (
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
                        ? <img src={`${import.meta.env.VITE_BASE_IMAGE_URL}/${item.images[0]}`} alt="" className="ea-list-thumb" />
                        : <div className="ea-list-thumb-empty"><ImageIcon size={18} /></div>
                      }
                    </td>
                    <td className="ea-td-bold">{item.title}</td>
                    <td>{item.location}</td>
                    <td>{item.estimate}</td>
                    <td>{item.deadline ? new Date(item.deadline).toLocaleDateString('id-ID') : '-'}</td>
                    <td>
                      <span className={`ea-status-badge ${(item.status || '').toLowerCase()}`}>
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
        )}
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


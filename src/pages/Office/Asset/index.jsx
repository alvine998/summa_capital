import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gem } from 'lucide-react'
import './asset.css'

const assetData = {
  pending: [
    { id: 1, title: 'Premium Land in Senayan', estimate: 'Rp 5B', deadline: 'Dec 15, 2024' },
    { id: 2, title: 'Luxury Apartment South Jakarta', estimate: 'Rp 3.2B', deadline: 'Dec 20, 2024' }
  ],
  publish: [
    { id: 3, title: 'Commercial Ruko Bandung', estimate: 'Rp 2.5B', deadline: 'Dec 10, 2024' },
    { id: 4, title: 'Exclusive Villa Bali', estimate: 'Rp 8B', deadline: 'Dec 25, 2024' },
    { id: 5, title: 'Investment Property Surabaya', estimate: 'Rp 1.8B', deadline: 'Jan 5, 2025' }
  ],
  rejected: [
    { id: 6, title: 'Small Kiosk in Market', estimate: 'Rp 500M', deadline: 'Dec 1, 2024' }
  ]
}

export default function Asset() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pending')
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' })

  const tabConfig = [
    { id: 'pending', label: 'Pending', count: assetData.pending.length },
    { id: 'publish', label: 'Published', count: assetData.publish.length },
    { id: 'rejected', label: 'Rejected', count: assetData.rejected.length }
  ]

  const handleDeleteClick = (id, title) => {
    setDeleteModal({ show: true, id, title })
  }

  const handleConfirmDelete = () => {
    // Delete functionality would go here (API call)
    // For now, just close the modal
    setDeleteModal({ show: false, id: null, title: '' })
  }

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, id: null, title: '' })
  }

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Gem className="inline-icon" size={28} /> Asset Management</h1>
          <button className="add-btn" onClick={() => navigate('/office/asset/create')}>
            + Add Asset
          </button>
        </div>
      </div>

      <div className="office-content">
        <div className="tabs">
          {tabConfig.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-badge">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="asset-grid">
          {assetData[activeTab].map(item => (
            <div key={item.id} className="asset-card">
              <div className="asset-image">
                <img src={`https://images.unsplash.com/photo-${item.id}?w=400&h=300&fit=crop`} alt={item.title} />
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
                    <span className="info-value">{item.deadline}</span>
                  </div>
                </div>
                <div className="asset-actions">
                  <button className="action-btn edit" onClick={() => navigate(`/office/asset/edit/${item.id}`)}>
                    Edit
                  </button>
                  <button className="action-btn delete" onClick={() => handleDeleteClick(item.id, item.title)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Asset</h2>
              <button className="modal-close" onClick={handleCancelDelete}>×</button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete <strong>{deleteModal.title}</strong>?</p>
              <p className="modal-warning">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={handleCancelDelete}>Cancel</button>
              <button className="modal-btn confirm" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

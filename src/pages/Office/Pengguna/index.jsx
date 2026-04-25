import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users as UsersIcon, X } from 'lucide-react'
import Toast, { useToast } from '../../../components/Toast/Toast'
import { logActivity, ACTIVITY_TYPES } from '../../../services/activityLog'
import './style.css'

const initialUserData = [
  { id: 1, name: 'Alvin Reyoga', email: 'alvin@summacapital.co.id', role: 'Admin', status: 'Aktif', joinDate: '15 Jan 2024' },
  { id: 2, name: 'Budi Santoso', email: 'budi@summacapital.co.id', role: 'Manager', status: 'Aktif', joinDate: '20 Feb 2024' },
  { id: 3, name: 'Citra Dewi', email: 'citra@summacapital.co.id', role: 'Staff', status: 'Aktif', joinDate: '10 Mar 2024' },
  { id: 4, name: 'Diah Kusuma', email: 'diah@summacapital.co.id', role: 'Staff', status: 'Nonaktif', joinDate: '5 Apr 2024' },
  { id: 5, name: 'Eka Putri', email: 'eka@summacapital.co.id', role: 'Manager', status: 'Aktif', joinDate: '12 May 2024' }
]

export default function Users() {
  const navigate = useNavigate()
  const { toasts, addToast, removeToast, Toast: ToastComponent } = useToast()
  const [userData, setUserData] = useState(initialUserData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('All')
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' })

  const roles = ['All', 'Admin', 'Manager', 'Staff']
  
  const filteredUsers = userData.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchRole = filterRole === 'All' || user.role === filterRole
    return matchSearch && matchRole
  })

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name })
  }

  const handleConfirmDelete = () => {
    const deletedUser = userData.find(u => u.id === deleteModal.id)
    setUserData(prevData => prevData.filter(user => user.id !== deleteModal.id))
    
    // Log activity
    logActivity(ACTIVITY_TYPES.DELETE_USER, {
      userId: deleteModal.id,
      userName: deleteModal.name,
      userRole: deletedUser?.role
    })
    
    setDeleteModal({ show: false, id: null, name: '' })
    addToast('User deleted successfully!', 'success')
  }

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, id: null, name: '' })
  }

  return (
    <div className="office-page">
      <ToastComponent toasts={toasts} removeToast={removeToast} />
      
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><UsersIcon className="inline-icon" size={28} /> User Management</h1>
          <button className="add-btn" onClick={() => navigate('/office/pengguna/create')}>+ Add User</button>
        </div>
      </div>

      <div className="office-content">
        <div className="user-controls">
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="role-filters">
            {roles.map(role => (
              <button
                key={role}
                className={`role-btn ${filterRole === role ? 'active' : ''}`}
                onClick={() => setFilterRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">{user.name.charAt(0)}</div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn-small edit" 
                        onClick={() => navigate(`/office/pengguna/edit/${user.id}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn-small delete" 
                        onClick={() => handleDeleteClick(user.id, user.name)}
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

        {filteredUsers.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No users found</h3>
            <p className="empty-text">Try changing your search filter</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Delete User</h3>
              <button className="modal-close" onClick={handleCancelDelete}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deleteModal.name}</strong>?</p>
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

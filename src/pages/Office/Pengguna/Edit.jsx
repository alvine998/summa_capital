import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Edit2 } from 'lucide-react'
import Toast, { useToast } from '../../../components/Toast/Toast'
import './create.css'

// Sample user data - in real app, this would come from an API
const allUsers = [
  { id: 1, name: 'Alvin Reyoga', email: 'alvin@summacapital.co.id', phone: '+62 813 2298 6243', role: 'Admin', status: 'Aktif', joinDate: '15 Jan 2024' },
  { id: 2, name: 'Budi Santoso', email: 'budi@summacapital.co.id', phone: '+62 812 3456 7890', role: 'Manager', status: 'Aktif', joinDate: '20 Feb 2024' },
  { id: 3, name: 'Citra Dewi', email: 'citra@summacapital.co.id', phone: '+62 812 9876 5432', role: 'Staff', status: 'Aktif', joinDate: '10 Mar 2024' },
  { id: 4, name: 'Diah Kusuma', email: 'diah@summacapital.co.id', phone: '+62 812 5555 5555', role: 'Staff', status: 'Nonaktif', joinDate: '5 Apr 2024' },
  { id: 5, name: 'Eka Putri', email: 'eka@summacapital.co.id', phone: '+62 812 1111 1111', role: 'Manager', status: 'Aktif', joinDate: '12 May 2024' }
]

export default function EditPengguna() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { toasts, addToast, removeToast, Toast: ToastComponent } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Staff',
    status: 'Aktif',
    password: ''
  })

  useEffect(() => {
    // Find the user by ID
    const user = allUsers.find(u => u.id === parseInt(id))
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        password: '' // Don't show password in edit
      })
    } else {
      setError('User not found')
    }
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate form
      if (!form.name || !form.email || !form.phone) {
        setError("All required fields must be filled")
        setLoading(false)
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        setError("Please enter a valid email address")
        setLoading(false)
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Success - show toast and redirect
      addToast('User updated successfully!', 'success')
      setTimeout(() => {
        navigate('/office/pengguna')
      }, 500)
    } catch (err) {
      setError("An error occurred while updating the user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="office-page">
      <ToastComponent toasts={toasts} removeToast={removeToast} />
      
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Edit2 className="inline-icon" size={28} /> Edit User</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">User Data</h2>
            <p className="form-desc">Update the information of the user</p>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-row">
                <div className="form-group full">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Example: John Doe"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="user@summacapital.co.id"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+62 8XX XXXX XXXX"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Role *</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  >
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status *</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full">
                  <label className="form-label">New Password (leave empty to keep current)</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter new password (minimum 6 characters)"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate('/office/pengguna')}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

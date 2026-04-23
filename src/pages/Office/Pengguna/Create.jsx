import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Toast, { useToast } from '../../../components/Toast/Toast'
import './create.css'

export default function CreatePengguna() {
  const navigate = useNavigate()
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
      if (!form.name || !form.email || !form.password || !form.phone) {
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

      // Validate password length
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters long")
        setLoading(false)
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Success - show toast and redirect
      addToast('User created successfully!', 'success')
      setTimeout(() => {
        navigate('/office/pengguna')
      }, 500)
    } catch (err) {
      setError("An error occurred while saving the user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="office-page">
      <ToastComponent toasts={toasts} removeToast={removeToast} />
      
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Plus className="inline-icon" size={28} /> Add New User</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">User Data</h2>
            <p className="form-desc">Fill in the complete information of the user you want to add</p>

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
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter password (minimum 6 characters)"
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
                  {loading ? 'Saving...' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

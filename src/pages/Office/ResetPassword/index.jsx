import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'
import './style.css'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    email: searchParams.get('email') || '',
    code: searchParams.get('code') || '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Basic validation
      if (!form.email) {
        setError('Email harus diisi')
        setLoading(false)
        return
      }

      if (!form.code) {
        setError('Kode reset harus diisi')
        setLoading(false)
        return
      }

      if (!form.password || form.password.length < 8) {
        setError('Password minimal 8 karakter')
        setLoading(false)
        return
      }

      if (form.password !== form.confirmPassword) {
        setError('Password tidak cocok')
        setLoading(false)
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate successful reset
      setSuccess(true)
      setTimeout(() => {
        navigate('/office/login')
      }, 2000)
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="reset-container">
      <div className="reset-bg" />

      <div className="reset-content">
        {/* Left - Branding */}
        <div className="reset-brand">
          <div className="reset-logo">
            <span className="reset-logo-icon">SC</span>
          </div>
          <h1 className="reset-title">Summa Capital</h1>
          <p className="reset-subtitle">CMS Dashboard</p>
          <p className="reset-description">
            Create a new password for your account and continue accessing the admin dashboard.
          </p>
        </div>

        {/* Right - Form */}
        <div className="reset-form-wrap">
          <div className="reset-form-card">
            {!success ? (
              <>
                <h2 className="reset-form-title">Reset Password</h2>
                <p className="reset-form-desc">
                  Create a strong new password for your account
                </p>

                {error && <div className="reset-error">{error}</div>}

                <form onSubmit={handleSubmit} className="reset-form">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="admin@summacapital.co.id"
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Reset Code</label>
                    <input
                      type="text"
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter the code from your email"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <div className="password-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Minimum 8 characters"
                        disabled={loading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Repeat new password"
                      disabled={loading}
                      autoComplete="new-password"
                    />
                  </div>

                  <button type="submit" className="reset-btn" disabled={loading}>
                    {loading ? "Processing..." : "Reset Password"}
                  </button>
                </form>

                <div className="reset-footer">
                  <p>
                    <Link to="/office/login" className="back-link">← Back to Login</Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="success-state">
                <CheckCircle className="success-icon" size={48} />
                <h2 className="success-title">Password Successfully Reset!</h2>
                <p className="success-message">
                  Your password has been updated. Please log in with your new password.
                </p>
                <p className="success-redirect">Redirecting to login in 2 seconds...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

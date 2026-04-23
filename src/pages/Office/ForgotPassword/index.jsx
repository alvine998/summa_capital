import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import './style.css'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Basic validation
      if (!email) {
        setError("Email is required")
        setLoading(false)
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Email is invalid")
        setLoading(false)
        return
      }

      // Simulate successful submission
      setSubmitted(true)
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forgot-container">
      <div className="forgot-bg" />

      <div className="forgot-content">
        {/* Left - Branding */}
        <div className="forgot-brand">
          <div className="forgot-logo">
            <span className="forgot-logo-icon">SC</span>
          </div>
          <h1 className="forgot-title">Summa Capital</h1>
          <p className="forgot-subtitle">CMS Dashboard</p>
          <p className="forgot-description">
            Recover access to your account by following the instructions sent to your email.
          </p>
        </div>

        {/* Right - Form */}
        <div className="forgot-form-wrap">
          <div className="forgot-form-card">
            {!submitted ? (
              <>
                <h2 className="forgot-form-title">Forgot Password?</h2>
                <p className="forgot-form-desc">
                  Enter your email and we'll send you a password reset link.
                </p>

                {error && <div className="forgot-error">{error}</div>}

                <form onSubmit={handleSubmit} className="forgot-form">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="admin@summacapital.co.id"
                      disabled={loading}
                      autoComplete="email"
                      autoFocus
                    />
                  </div>

                  <button type="submit" className="forgot-btn" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>

                <div className="forgot-footer">
                  <p>
                    <Link to="/office/login" className="back-link">← Back to Login</Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="success-state">
                <CheckCircle className="success-icon" size={48} />
                <h2 className="success-title">Email Sent!</h2>
                <p className="success-message">
                  We've sent a password reset link to:
                </p>
                <p className="success-email">{email}</p>
                <p className="success-instruction">
                  Please check your email (including the Spam folder) and click the link provided to continue the password reset process.
                </p>
                <button
                  onClick={() => navigate("/office/login")}
                  className="success-btn"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

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
        setError('Email harus diisi')
        setLoading(false)
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Email tidak valid')
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
            Pulihkan akses ke akun Anda dengan mengikuti instruksi yang dikirim ke email Anda.
          </p>
        </div>

        {/* Right - Form */}
        <div className="forgot-form-wrap">
          <div className="forgot-form-card">
            {!submitted ? (
              <>
                <h2 className="forgot-form-title">Lupa Password?</h2>
                <p className="forgot-form-desc">
                  Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
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
                    {loading ? 'Mengirim...' : 'Kirim Link Reset'}
                  </button>
                </form>

                <div className="forgot-footer">
                  <p>
                    <Link to="/office/login" className="back-link">← Kembali ke Login</Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="success-state">
                <CheckCircle className="success-icon" size={48} />
                <h2 className="success-title">Email Terkirim!</h2>
                <p className="success-message">
                  Kami telah mengirimkan link reset password ke:
                </p>
                <p className="success-email">{email}</p>
                <p className="success-instruction">
                  Silakan cek email Anda (termasuk folder Spam) dan klik link yang disediakan untuk melanjutkan proses reset password.
                </p>
                <button
                  onClick={() => navigate('/office/login')}
                  className="success-btn"
                >
                  Kembali ke Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

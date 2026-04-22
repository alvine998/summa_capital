import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './style.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('summacapital_token')
    const userData = localStorage.getItem('summacapital_user')

    if (!token || !userData) {
      navigate('/office/login')
      return
    }

    setUser(JSON.parse(userData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('summacapital_token')
    localStorage.removeItem('summacapital_user')
    navigate('/office/login')
  }

  if (!user) return <div className="dashboard-loading">Loading...</div>

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <h1 className="dashboard-title">CMS Dashboard</h1>
          <div className="dashboard-user">
            <span className="dashboard-user-name">{user.name}</span>
            <button onClick={handleLogout} className="dashboard-logout-btn">
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-welcome">
            <h2>Selamat Datang, {user.name}! 👋</h2>
            <p>Kelola konten dan aset Summa Capital dari sini.</p>
          </div>

          <div className="dashboard-grid">
            {/* Stats */}
            <div className="dashboard-stats">
              <div className="stat-box">
                <span className="stat-icon">📊</span>
                <h3>6</h3>
                <p>Aset Aktif</p>
              </div>
              <div className="stat-box">
                <span className="stat-icon">👥</span>
                <h3>234</h3>
                <p>Pengguna Terdaftar</p>
              </div>
              <div className="stat-box">
                <span className="stat-icon">💰</span>
                <h3>Rp 2T+</h3>
                <p>AUM Total</p>
              </div>
              <div className="stat-box">
                <span className="stat-icon">✉️</span>
                <h3>12</h3>
                <p>Pesan Baru</p>
              </div>
            </div>

            {/* Menu */}
            <div className="dashboard-menu">
              <h3>Menu Manajemen</h3>
              <div className="menu-grid">
                <a href="#manage-assets" className="menu-item">
                  <span>📦</span>
                  <span>Kelola Aset</span>
                </a>
                <a href="#manage-users" className="menu-item">
                  <span>👤</span>
                  <span>Kelola Pengguna</span>
                </a>
                <a href="#manage-content" className="menu-item">
                  <span>📝</span>
                  <span>Kelola Konten</span>
                </a>
                <a href="#manage-gallery" className="menu-item">
                  <span>🖼</span>
                  <span>Kelola Galeri</span>
                </a>
                <a href="#manage-inquiries" className="menu-item">
                  <span>💬</span>
                  <span>Pertanyaan</span>
                </a>
                <a href="#settings" className="menu-item">
                  <span>⚙️</span>
                  <span>Pengaturan</span>
                </a>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-activity">
              <h3>Aktivitas Terkini</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-time">2 jam lalu</span>
                  <span className="activity-text">Aset baru ditambahkan: Gedung Komersial Jakarta</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">5 jam lalu</span>
                  <span className="activity-text">Pengguna baru terdaftar: user@example.com</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">1 hari lalu</span>
                  <span className="activity-text">Lelang ditutup: Kawasan Industri Bekasi</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">2 hari lalu</span>
                  <span className="activity-text">Galeri diperbarui dengan 5 foto baru</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

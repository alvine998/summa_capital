import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Activity, Users, TrendingUp, Mail, Gem, User, Image, Settings, MessageCircle, FileText, Hand } from 'lucide-react'
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

  if (!user) return <div className="dashboard-loading">Loading...</div>

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Activity className="inline-icon" size={28} /> Dashboard</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="dashboard-welcome">
          <h2>Selamat Datang, {user.name}! <Hand className="wave-icon" size={24} /></h2>
          <p>Kelola konten dan aset Summa Capital dari sini.</p>
        </div>

        <div className="dashboard-grid">
          {/* Stats */}
          <div className="dashboard-stats">
            <div className="stat-box">
              <Activity className="stat-icon" size={24} />
              <h3>6</h3>
              <p>Aset Aktif</p>
            </div>
            <div className="stat-box">
              <Users className="stat-icon" size={24} />
              <h3>234</h3>
              <p>Pengguna Terdaftar</p>
            </div>
            <div className="stat-box">
              <TrendingUp className="stat-icon" size={24} />
              <h3>Rp 2T+</h3>
              <p>AUM Total</p>
            </div>
            <div className="stat-box">
              <Mail className="stat-icon" size={24} />
              <h3>12</h3>
              <p>Pesan Baru</p>
            </div>
          </div>

          {/* Menu */}
          <div className="dashboard-menu">
            <h3>Menu Manajemen</h3>
            <div className="menu-grid">
              <button onClick={() => navigate('/office/asset')} className="menu-item">
                <Gem size={24} />
                <span>Kelola Aset</span>
              </button>
              <button onClick={() => navigate('/office/pengguna')} className="menu-item">
                <User size={24} />
                <span>Kelola Pengguna</span>
              </button>
              <button onClick={() => navigate('/office/galeri')} className="menu-item">
                <Image size={24} />
                <span>Kelola Galeri</span>
              </button>
              <button onClick={() => navigate('/office/pengaturan')} className="menu-item">
                <Settings size={24} />
                <span>Pengaturan</span>
              </button>
              <button className="menu-item" disabled>
                <MessageCircle size={24} />
                <span>Pertanyaan</span>
              </button>
              <button className="menu-item" disabled>
                <FileText size={24} />
                <span>Laporan</span>
              </button>
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
    </div>
  )
}

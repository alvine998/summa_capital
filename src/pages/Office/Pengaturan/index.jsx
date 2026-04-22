import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, User, Lock, CheckCircle } from 'lucide-react'
import './style.css'

const companyProfile = {
  name: 'Summa Capital',
  description: 'Perusahaan manajemen aset terpercaya dengan pengalaman lebih dari 15 tahun',
  address: 'Jl. Sudirman No. 123, Jakarta Selatan',
  phone: '(021) 5555-1234',
  email: 'info@summacapital.co.id',
  established: '2009'
}

export default function Pengaturan() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('profile')
  const [profile, setProfile] = useState(companyProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(companyProfile)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleProfileChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setProfile(editedProfile)
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Settings className="inline-icon" size={28} /> Pengaturan</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="settings-container">
          {/* Settings Menu */}
          <div className="settings-menu">
            <button
              className={`settings-menu-item ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('profile')
                setIsEditing(false)
              }}
            >
              <User size={20} /> Ubah Profil Perusahaan
            </button>
            <button
              className={`settings-menu-item ${activeSection === 'password' ? 'active' : ''}`}
              onClick={() => setActiveSection('password')}
            >
              <Lock size={20} /> Ubah Password
            </button>
          </div>

          {/* Settings Content */}
          <div className="settings-content">
            {activeSection === 'profile' && (
              <div className="settings-section">
                <h2 className="section-title">Profil Perusahaan</h2>
                <p className="section-desc">Kelola informasi dasar perusahaan Summa Capital</p>

                {saveSuccess && (
                  <div className="success-message">
                    <CheckCircle size={20} /> Profil berhasil diperbarui!
                  </div>
                )}

                <div className="profile-form">
                  {isEditing ? (
                    <>
                      <div className="form-group">
                        <label className="form-label">Nama Perusahaan</label>
                        <input
                          type="text"
                          value={editedProfile.name}
                          onChange={e => handleProfileChange('name', e.target.value)}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Deskripsi</label>
                        <textarea
                          value={editedProfile.description}
                          onChange={e => handleProfileChange('description', e.target.value)}
                          className="form-input form-textarea"
                          rows="3"
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Alamat</label>
                          <input
                            type="text"
                            value={editedProfile.address}
                            onChange={e => handleProfileChange('address', e.target.value)}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Tahun Berdiri</label>
                          <input
                            type="text"
                            value={editedProfile.established}
                            onChange={e => handleProfileChange('established', e.target.value)}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Telepon</label>
                          <input
                            type="text"
                            value={editedProfile.phone}
                            onChange={e => handleProfileChange('phone', e.target.value)}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            value={editedProfile.email}
                            onChange={e => handleProfileChange('email', e.target.value)}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <button
                          className="btn btn-primary"
                          onClick={handleSaveProfile}
                        >
                          Simpan Perubahan
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setEditedProfile(profile)
                            setIsEditing(false)
                          }}
                        >
                          Batal
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="profile-display">
                        <div className="profile-item">
                          <span className="profile-label">Nama Perusahaan</span>
                          <span className="profile-value">{profile.name}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Deskripsi</span>
                          <span className="profile-value">{profile.description}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Alamat</span>
                          <span className="profile-value">{profile.address}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Telepon</span>
                          <span className="profile-value">{profile.phone}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Email</span>
                          <span className="profile-value">{profile.email}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Tahun Berdiri</span>
                          <span className="profile-value">{profile.established}</span>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profil
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'password' && (
              <div className="settings-section">
                <h2 className="section-title">Ubah Password</h2>
                <p className="section-desc">Perbarui password akun Anda dengan yang baru dan lebih aman</p>

                <div className="password-form">
                  <div className="form-group">
                    <label className="form-label">Password Lama</label>
                    <input
                      type="password"
                      placeholder="Masukkan password lama"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password Baru</label>
                    <input
                      type="password"
                      placeholder="Minimal 8 karakter"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Konfirmasi Password</label>
                    <input
                      type="password"
                      placeholder="Ulangi password baru"
                      className="form-input"
                    />
                  </div>

                  <div className="password-note">
                    <strong>Tips keamanan:</strong>
                    <ul>
                      <li>Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol</li>
                      <li>Jangan gunakan password yang mudah ditebak</li>
                      <li>Jangan bagikan password dengan orang lain</li>
                    </ul>
                  </div>

                  <button className="btn btn-primary">
                    Perbarui Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

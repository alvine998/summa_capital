import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import './create.css'

export default function CreateAsset() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    type: 'Tanah',
    description: '',
    estimate: '',
    deadline: '',
    location: '',
    area: '',
    status: 'Menunggu'
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
      if (!form.title || !form.estimate || !form.deadline || !form.location) {
        setError('Semua field wajib diisi')
        setLoading(false)
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Success - redirect to asset list
      navigate('/office/asset')
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan asset')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Plus className="inline-icon" size={28} /> Tambah Asset Baru</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Data Asset</h2>
            <p className="form-desc">Isi informasi lengkap asset yang ingin ditambahkan</p>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit} className="asset-form">
              <div className="form-row">
                <div className="form-group full">
                  <label className="form-label">Judul Asset *</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Contoh: Tanah Premium di Senayan"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tipe Asset *</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  >
                    <option value="Tanah">Tanah</option>
                    <option value="Bangunan">Bangunan</option>
                    <option value="Apartemen">Apartemen</option>
                    <option value="Ruko">Ruko</option>
                    <option value="Vila">Vila</option>
                    <option value="Lainnya">Lainnya</option>
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
                    <option value="Menunggu">Menunggu</option>
                    <option value="Publish">Publish</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full">
                  <label className="form-label">Deskripsi</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    placeholder="Deskripsi lengkap tentang asset..."
                    rows="4"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Lokasi *</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Contoh: Jakarta Selatan"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Luas (m²)</label>
                  <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Contoh: 500"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Estimasi Harga *</label>
                  <input
                    type="text"
                    name="estimate"
                    value={form.estimate}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Contoh: Rp 5M"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deadline Lelang *</label>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Menyimpan...' : 'Simpan Asset'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/office/asset')}
                  disabled={loading}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

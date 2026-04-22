import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Edit } from 'lucide-react'
import './create.css'

// Mock data - in real app, this would come from an API
const mockAssets = {
  1: {
    id: 1,
    title: 'Tanah Premium di Senayan',
    type: 'Tanah',
    description: 'Lokasi strategis dengan akses mudah ke area komersial',
    estimate: 'Rp 5M',
    deadline: '2024-12-15',
    location: 'Jakarta Selatan',
    area: '500',
    status: 'Menunggu'
  },
  2: {
    id: 2,
    title: 'Apartemen Mewah Jakarta Selatan',
    type: 'Apartemen',
    description: 'Apartemen dengan fasilitas lengkap di pusat kota',
    estimate: 'Rp 3.2M',
    deadline: '2024-12-20',
    location: 'Jakarta Selatan',
    area: '200',
    status: 'Menunggu'
  }
}

export default function EditAsset() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState(null)

  useEffect(() => {
    // Simulate loading asset data
    const asset = mockAssets[id]
    if (asset) {
      setForm(asset)
    } else {
      setError('Asset tidak ditemukan')
      setTimeout(() => navigate('/office/asset'), 2000)
    }
  }, [id, navigate])

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

      // Success
      setSuccess(true)
      setTimeout(() => {
        navigate('/office/asset')
      }, 1500)
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan asset')
    } finally {
      setLoading(false)
    }
  }

  if (!form) {
    return (
      <div className="office-page">
        <div className="office-header">
          <div className="office-header-content">
            <h1 className="office-header-title">Edit Asset</h1>
          </div>
        </div>
        <div className="office-content">
          <div className="form-container">
            <div className="form-card">
              <p className="form-desc">Memuat data asset...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Edit className="inline-icon" size={28} /> Edit Asset</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Data Asset</h2>
            <p className="form-desc">Perbarui informasi asset</p>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="success-message">Asset berhasil diperbarui!</div>}

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
                    disabled={loading || success}
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
                    disabled={loading || success}
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
                    disabled={loading || success}
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
                    disabled={loading || success}
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
                    disabled={loading || success}
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
                    disabled={loading || success}
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
                    disabled={loading || success}
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
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || success}
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/office/asset')}
                  disabled={loading || success}
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

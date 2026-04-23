import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Edit, X, Upload } from 'lucide-react'
import './create.css'

// Mock data - in real app, this would come from an API
const mockAssets = {
  1: {
    id: 1,
    title: 'Premium Land in Senayan',
    type: 'Land',
    description: 'Strategic location with easy access to commercial areas',
    estimate: 'Rp 5B',
    deadline: '2024-12-15',
    location: 'South Jakarta',
    area: '500',
    status: 'Pending'
  },
  2: {
    id: 2,
    title: 'Luxury Apartment South Jakarta',
    type: 'Apartment',
    description: 'Apartment with complete facilities in the city center',
    estimate: 'Rp 3.2B',
    deadline: '2024-12-20',
    location: 'South Jakarta',
    area: '200',
    status: 'Pending'
  }
}

export default function EditAsset() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState(null)
  const [photos, setPhotos] = useState([])

  const MAX_PHOTOS = 10
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

  useEffect(() => {
    // Simulate loading asset data
    const asset = mockAssets[id]
    if (asset) {
      setForm(asset)
    } else {
      setError('Asset not found')
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

  const handlePhotoChange = e => {
    const files = Array.from(e.target.files || [])
    const totalPhotos = photos.length + files.length

    // Validate photo count
    if (totalPhotos > MAX_PHOTOS) {
      setError(`Maximum ${MAX_PHOTOS} photos allowed`)
      return
    }

    // Validate file sizes
    const invalidFiles = files.filter(file => file.size > MAX_FILE_SIZE)
    if (invalidFiles.length > 0) {
      setError('Each photo must be under 10 MB')
      return
    }

    // Add new photos
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2)
    }))

    setPhotos(prev => [...prev, ...newPhotos])
    setError('')

    // Reset input
    e.target.value = ''
  }

  const removePhoto = id => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === id)
      if (photo) {
        URL.revokeObjectURL(photo.preview)
      }
      return prev.filter(p => p.id !== id)
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate form
      if (!form.title || !form.estimate || !form.deadline || !form.location) {
        setError('All required fields must be filled')
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
      setError('An error occurred while saving the asset')
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
              <p className="form-desc">Loading asset data...</p>
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
            <h2 className="form-title">Asset Data</h2>
            <p className="form-desc">Update asset information</p>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="success-message">Asset updated successfully!</div>}

            <form onSubmit={handleSubmit} className="asset-form">
              <div className="form-row">
                <div className="form-group full">
                  <label className="form-label">Asset Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Example: Premium Land in Senayan"
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Asset Type *</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading || success}
                  >
                    <option value="Land">Land</option>
                    <option value="Building">Building</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Shop">Shop</option>
                    <option value="Villa">Villa</option>
                    <option value="Other">Other</option>
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
                    <option value="Pending">Pending</option>
                    <option value="Publish">Published</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    placeholder="Complete description about the asset..."
                    rows="4"
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Example: South Jakarta"
                    disabled={loading || success}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Area (m²)</label>
                  <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Example: 500"
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Estimated Price *</label>
                  <input
                    type="text"
                    name="estimate"
                    value={form.estimate}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Example: Rp 5B"
                    disabled={loading || success}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Auction Deadline *</label>
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

              {/* Photo Upload */}
              <div className="form-row">
                <div className="form-group full">
                  <label className="form-label">Photos (Max 10, each under 10 MB)</label>
                  <div className="upload-area">
                    <input
                      type="file"
                      id="photo-input"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoChange}
                      disabled={loading || success || photos.length >= MAX_PHOTOS}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="photo-input" className={`upload-label ${photos.length >= MAX_PHOTOS ? 'disabled' : ''}`}>
                      <Upload size={32} />
                      <span className="upload-text">Click or drag photos here</span>
                      <span className="upload-subtext">
                        {photos.length}/{MAX_PHOTOS} photos
                      </span>
                    </label>
                  </div>

                  {/* Photo Preview Grid */}
                  {photos.length > 0 && (
                    <div className="photos-grid">
                      {photos.map(photo => (
                        <div key={photo.id} className="photo-item">
                          <img src={photo.preview} alt={photo.name} />
                          <div className="photo-info">
                            <span className="photo-name">{photo.name}</span>
                            <span className="photo-size">{photo.size} MB</span>
                          </div>
                          <button
                            type="button"
                            className="photo-delete"
                            onClick={() => removePhoto(photo.id)}
                            disabled={loading || success}
                            title="Remove photo"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || success}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/office/asset')}
                  disabled={loading || success}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

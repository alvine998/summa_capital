import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Edit2, ImageIcon, X } from 'lucide-react'
import { useToast } from '../../../components/Toast/Toast'
import earlyAccessService from '../../../services/earlyAccessService'
import { formatPriceInput } from '../../../utils/priceFormatter'
import './style.css'

export default function EditEarlyAccess() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { toasts, addToast, removeToast, Toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState(null)
  const [existingImages, setExistingImages] = useState([])
  const [newImages, setNewImages] = useState([])

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await earlyAccessService.getPublic(id)
        setForm(item)
        setExistingImages(item.images || [])
      } catch (err) {
        console.error('Failed to load early access item:', err)
        setError('Item not found')
        setTimeout(() => navigate('/office/early-access'), 2000)
      }
    }
    if (id) fetchItem()
  }, [id, navigate])

  const handleChange = e => {
    const { name, value } = e.target
    
    // Format estimate field with thousand separators
    let formattedValue = value
    if (name === 'estimate') {
      formattedValue = formatPriceInput(value)
    }
    
    setForm(prev => ({ ...prev, [name]: formattedValue }))
    setError('')
  }

  const handleImageChange = e => {
    const files = Array.from(e.target.files)
    const imgs = files.map(file => ({ file, preview: URL.createObjectURL(file) }))
    setNewImages(prev => [...prev, ...imgs])
    e.target.value = ''
  }

  const removeExisting = index => setExistingImages(prev => prev.filter((_, i) => i !== index))

  const removeNew = index => {
    setNewImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title || !form.estimate || !form.deadline || !form.location) {
      setError('All required fields must be filled')
      return
    }
    setLoading(true)
    try {
      // Build FormData with images
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('estimate', form.estimate)
      formData.append('deadline', form.deadline)
      formData.append('location', form.location)
      formData.append('area', form.area)
      formData.append('buildingArea', form.buildingArea)
      formData.append('fieldArea', form.fieldArea)
      formData.append('status', form.status)
      
      // Add new images only
      newImages.forEach(img => {
        formData.append('images', img.file)
      })

      // Call API
      await earlyAccessService.update(id, formData)
      addToast('Early Access item updated successfully!', 'success')
      setTimeout(() => navigate('/office/early-access'), 500)
    } catch (err) {
      console.error('Failed to update early access item:', err)
      setError(err.response?.data?.message || 'An error occurred while saving')
    } finally {
      setLoading(false)
    }
  }

  if (!form && !error) return <div className="office-page"><div className="office-content"><p>Loading...</p></div></div>
  if (error && !form) return <div className="office-page"><div className="office-content"><p className="ea-form-error">{error}</p></div></div>

  return (
    <div className="office-page">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Edit2 className="inline-icon" size={28} /> Edit Early Access Item</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="ea-form-container">
          <div className="ea-form-card">
            <h2 className="ea-form-title">Item Details</h2>
            <p className="ea-form-desc">Update the Early Access listing information</p>

            {error && <div className="ea-form-error">{error}</div>}

            <form onSubmit={handleSubmit} className="ea-form">
              <div className="form-group full">
                <label className="form-label">Title *</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} className="form-input" placeholder="e.g. Premium Land in Pondok Indah" disabled={loading} />
              </div>

              <div className="form-group full">
                <label className="form-label">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="form-input form-textarea" rows="4" placeholder="Detailed description of the property..." disabled={loading} />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input type="text" name="location" value={form.location} onChange={handleChange} className="form-input" placeholder="e.g. South Jakarta" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Area (m²)</label>
                  <input type="text" name="area" value={form.area} onChange={handleChange} className="form-input" placeholder="e.g. 500" disabled={loading} />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Building Area (m²)</label>
                  <input type="text" name="buildingArea" value={form.buildingArea || ''} onChange={handleChange} className="form-input" placeholder="e.g. 300" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Field Area (m²)</label>
                  <input type="text" name="fieldArea" value={form.fieldArea || ''} onChange={handleChange} className="form-input" placeholder="e.g. 200" disabled={loading} />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Estimate Price *</label>
                  <input type="text" name="estimate" value={form.estimate} onChange={handleChange} className="form-input" placeholder="e.g. 5,000,000,000 or Rp 5B" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Deadline *</label>
                  <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="form-input" min={new Date().toISOString().split('T')[0]} disabled={loading} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select name="status" value={form.status} onChange={handleChange} className="form-input" disabled={loading}>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="form-group full">
                <label className="form-label">Images</label>
                <label className="img-upload-area">
                  <ImageIcon size={24} className="img-upload-icon" />
                  <span className="img-upload-text">Click to upload images</span>
                  <span className="img-upload-hint">PNG, JPG, WEBP — multiple allowed</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} disabled={loading} style={{ display: 'none' }} />
                </label>
                {(existingImages.length > 0 || newImages.length > 0) && (
                  <div className="img-preview-grid">
                    {existingImages.map((src, i) => (
                      <div key={`ex-${i}`} className="img-preview-item">
                        <img src={src} alt="" className="img-preview-thumb" />
                        <button type="button" className="img-remove-btn" onClick={() => removeExisting(i)}>
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    {newImages.map((img, i) => (
                      <div key={`new-${i}`} className="img-preview-item">
                        <img src={img.preview} alt="" className="img-preview-thumb" />
                        <button type="button" className="img-remove-btn" onClick={() => removeNew(i)}>
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="ea-form-actions">
                <button type="button" className="btn-secondary" onClick={() => navigate('/office/early-access')} disabled={loading}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Update Item'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

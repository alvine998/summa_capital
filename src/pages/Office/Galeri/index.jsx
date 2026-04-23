import { useState } from 'react'
import { Eye, Edit2, Trash2, X, Image, Upload } from 'lucide-react'
import './galeri.css'

const initialGalleryData = [
  { 
    id: 1, 
    title: 'Head Office', 
    category: 'Office', 
    images: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=400&fit=crop'],
    totalSize: 2.5
  },
  { 
    id: 2, 
    title: 'Meeting Room', 
    category: 'Interior', 
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop'],
    totalSize: 3.1
  },
  { 
    id: 3, 
    title: 'Building Lobby', 
    category: 'Architecture', 
    images: ['https://images.unsplash.com/photo-1540932239986-4eda003c5524?w=400&h=400&fit=crop'],
    totalSize: 2.8
  },
  { 
    id: 4, 
    title: 'Parking Area', 
    category: 'Facilities', 
    images: ['https://images.unsplash.com/photo-1506901925346-21bda4d32df4?w=400&h=400&fit=crop'],
    totalSize: 2.9
  },
  { 
    id: 5, 
    title: 'Office Garden', 
    category: 'Landscape', 
    images: ['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop'],
    totalSize: 3.2
  },
  { 
    id: 6, 
    title: 'Break Room', 
    category: 'Interior', 
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'],
    totalSize: 2.7
  }
]

export default function Gallery() {
  const [galleries, setGalleries] = useState(initialGalleryData)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedGalleryForView, setSelectedGalleryForView] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingGallery, setEditingGallery] = useState(null)
  const [deletingGallery, setDeletingGallery] = useState(null)
  const [formError, setFormError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    category: 'Office',
    images: []
  })

  const categories = ['All', ...new Set(galleries.map(g => g.category))]

  const filteredGalleries = activeCategory === 'All' 
    ? galleries 
    : galleries.filter(g => g.category === activeCategory)

  const handleOpenCreate = () => {
    setFormData({ title: '', category: 'Office', images: [] })
    setFormError('')
    setShowCreateModal(true)
  }

  const handleOpenEdit = (gallery) => {
    setEditingGallery(gallery)
    setFormData({ 
      title: gallery.title, 
      category: gallery.category, 
      images: gallery.images.map((img, idx) => ({ id: idx, preview: img }))
    })
    setFormError('')
    setShowEditModal(true)
  }

  const handleOpenDelete = (gallery) => {
    setDeletingGallery(gallery)
    setShowDeleteModal(true)
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    const currentImages = formData.images.filter(img => typeof img === 'object' && !img.file)
    const currentSize = currentImages.reduce((sum, img) => sum + (img.size || 0), 0)
    
    let totalSize = currentSize
    const newImages = []
    const maxImages = 10
    const maxTotalSize = 25 * 1024 * 1024 // 25 MB

    if (currentImages.length + files.length > maxImages) {
      setFormError(`Maximum ${maxImages} images allowed per gallery`)
      return
    }

    for (const file of files) {
      totalSize += file.size
      if (totalSize > maxTotalSize) {
        setFormError('Total gallery size cannot exceed 25 MB')
        return
      }
      newImages.push({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        size: (file.size / 1024 / 1024).toFixed(2),
        name: file.name
      })
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
    setFormError('')
    e.target.value = ''
  }

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }))
  }

  const handleCreateGallery = () => {
    if (!formData.title.trim()) {
      setFormError('Gallery title is required')
      return
    }
    if (formData.images.length === 0) {
      setFormError('Please upload at least 1 image')
      return
    }

    const imagePreviews = formData.images.map(img => img.preview || img.file)
    const totalSize = parseFloat(
      formData.images.reduce((sum, img) => sum + parseFloat(img.size || 0), 0).toFixed(1)
    )

    const newGallery = {
      id: Math.max(...galleries.map(g => g.id), 0) + 1,
      title: formData.title,
      category: formData.category,
      images: imagePreviews,
      totalSize
    }

    setGalleries([...galleries, newGallery])
    setShowCreateModal(false)
    setFormData({ title: '', category: 'Office', images: [] })
  }

  const handleUpdateGallery = () => {
    if (!formData.title.trim()) {
      setFormError('Gallery title is required')
      return
    }
    if (formData.images.length === 0) {
      setFormError('Please upload at least 1 image')
      return
    }

    const imagePreviews = formData.images.map(img => img.preview || img.file)
    const totalSize = parseFloat(
      formData.images.reduce((sum, img) => sum + parseFloat(img.size || 0), 0).toFixed(1)
    )

    setGalleries(galleries.map(g => 
      g.id === editingGallery.id 
        ? {
            ...g,
            title: formData.title,
            category: formData.category,
            images: imagePreviews,
            totalSize
          }
        : g
    ))
    setShowEditModal(false)
    setEditingGallery(null)
    setFormData({ title: '', category: 'Office', images: [] })
  }

  const handleDeleteGallery = () => {
    setGalleries(galleries.filter(g => g.id !== deletingGallery.id))
    setShowDeleteModal(false)
    setDeletingGallery(null)
  }

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Image className="inline-icon" size={28} /> Gallery</h1>
          <button className="create-btn" onClick={handleOpenCreate}>+ Create Gallery</button>
        </div>
      </div>

      <div className="office-content">
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredGalleries.map(gallery => (
            <div key={gallery.id} className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={gallery.images[0]} alt={gallery.title} />
                <div className="image-count">{gallery.images.length}/10</div>
                <div className="gallery-overlay">
                  <button 
                    className="gallery-btn view-btn"
                    onClick={() => setSelectedGalleryForView(gallery)}
                  >
                    <Eye size={18} /> View
                  </button>
                  <button 
                    className="gallery-btn edit-btn"
                    onClick={() => handleOpenEdit(gallery)}
                  >
                    <Edit2 size={18} /> Edit
                  </button>
                  <button 
                    className="gallery-btn delete-btn"
                    onClick={() => handleOpenDelete(gallery)}
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
              <div className="gallery-info">
                <h3 className="gallery-title">{gallery.title}</h3>
                <div className="gallery-meta">
                  <span className="gallery-category">{gallery.category}</span>
                  <span className="gallery-size">{gallery.totalSize} MB</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGalleries.length === 0 && (
          <div className="empty-state">
            <Image size={48} />
            <p>No galleries found</p>
          </div>
        )}
      </div>

      {/* View Gallery Modal */}
      {selectedGalleryForView && (
        <div className="modal-overlay" onClick={() => setSelectedGalleryForView(null)}>
          <div className="modal-gallery-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedGalleryForView(null)}>×</button>
            <div className="modal-gallery-header">
              <h2>{selectedGalleryForView.title}</h2>
              <span className="modal-gallery-category">{selectedGalleryForView.category}</span>
            </div>
            <div className="modal-gallery-images">
              {selectedGalleryForView.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${selectedGalleryForView.title} ${idx + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Gallery Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="modal-overlay" onClick={() => {
          setShowCreateModal(false)
          setShowEditModal(false)
          setEditingGallery(null)
        }}>
          <div className="form-modal-content" onClick={e => e.stopPropagation()}>
            <div className="form-modal-header">
              <h2>{editingGallery ? 'Edit Gallery' : 'Create Gallery'}</h2>
              <button 
                className="modal-close" 
                onClick={() => {
                  setShowCreateModal(false)
                  setShowEditModal(false)
                  setEditingGallery(null)
                }}
              >
                ×
              </button>
            </div>

            <div className="form-modal-body">
              {formError && <div className="form-error">{formError}</div>}

              <div className="form-group">
                <label className="form-label">Gallery Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Office Renovation 2024"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-input"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Office">Office</option>
                  <option value="Interior">Interior</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Landscape">Landscape</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Upload Images * ({formData.images.length}/10)
                </label>
                <div className="upload-area">
                  <input
                    type="file"
                    id="gallery-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={formData.images.length >= 10}
                    style={{display: 'none'}}
                  />
                  <label htmlFor="gallery-upload" className="upload-label" style={{opacity: formData.images.length >= 10 ? 0.5 : 1}}>
                    <Upload size={24} />
                    <span>Click to upload or drag images</span>
                    <span className="upload-hint">Max 10 images, 25 MB total</span>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="images-preview-grid">
                    {formData.images.map((img, idx) => (
                      <div key={img.id} className="preview-item">
                        <img src={img.preview} alt={`Preview ${idx + 1}`} />
                        <div className="preview-info">
                          <span className="preview-number">{idx + 1}</span>
                          {img.size && <span className="preview-size">{img.size}MB</span>}
                        </div>
                        <button
                          type="button"
                          className="preview-remove"
                          onClick={() => removeImage(img.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-modal-actions">
              <button 
                className="form-btn cancel"
                onClick={() => {
                  setShowCreateModal(false)
                  setShowEditModal(false)
                  setEditingGallery(null)
                }}
              >
                Cancel
              </button>
              <button 
                className="form-btn submit"
                onClick={editingGallery ? handleUpdateGallery : handleCreateGallery}
              >
                {editingGallery ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="confirm-modal-content" onClick={e => e.stopPropagation()}>
            <h2>Delete Gallery</h2>
            <p>Are you sure you want to delete <strong>{deletingGallery?.title}</strong>?</p>
            <p className="delete-warning">This action cannot be undone.</p>
            <div className="confirm-modal-actions">
              <button className="confirm-btn cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn delete" onClick={handleDeleteGallery}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

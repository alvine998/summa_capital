import { useState } from 'react'
import { Eye, Edit2, Trash2, X, Image } from 'lucide-react'
import './galeri.css'

const galleryImages = [
  { id: 1, title: 'Kantor Pusat', category: 'Kantor', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=400&fit=crop' },
  { id: 2, title: 'Ruang Meeting', category: 'Interior', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop' },
  { id: 3, title: 'Lobby Gedung', category: 'Arsitektur', image: 'https://images.unsplash.com/photo-1540932239986-4eda003c5524?w=400&h=400&fit=crop' },
  { id: 4, title: 'Area Parkir', category: 'Fasilitas', image: 'https://images.unsplash.com/photo-1506901925346-21bda4d32df4?w=400&h=400&fit=crop' },
  { id: 5, title: 'Taman Kantor', category: 'Lansekap', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop' },
  { id: 6, title: 'Ruang Istirahat', category: 'Interior', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' }
]

export default function Galeri() {
  const [selectedImage, setSelectedImage] = useState(null)
  const categories = ['Semua', ...new Set(galleryImages.map(img => img.category))]
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filteredImages = activeCategory === 'Semua' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Image className="inline-icon" size={28} /> Galeri</h1>
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
          {filteredImages.map(image => (
            <div key={image.id} className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={image.image} alt={image.title} />
                <div className="gallery-overlay">
                  <button 
                    className="gallery-btn view-btn"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Eye size={18} /> Lihat
                  </button>
                  <button className="gallery-btn edit-btn"><Edit2 size={18} /> Edit</button>
                  <button className="gallery-btn delete-btn"><Trash2 size={18} /> Hapus</button>
                </div>
              </div>
              <div className="gallery-info">
                <h3 className="gallery-title">{image.title}</h3>
                <span className="gallery-category">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

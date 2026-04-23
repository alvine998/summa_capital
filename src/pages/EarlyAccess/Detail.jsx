import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, DollarSign, Calendar, X, ChevronLeft, ChevronRight, TrendingUp, Ruler } from 'lucide-react'
import '../PageShared.css'
import './detail.css'

const earlyAccessData = [
  { id: 1, title: 'Superblok Residensial Bekasi Timur', type: 'Properti Residensial', location: 'East Bekasi, West Java', value: 'IDR 95,000,000,000', estimate: 'IDR 108,000,000,000', deadline: '2026-06-15', status: 'Active', area: '5,600', building: '4,200', return: '14–18% p.a.', description: 'Premium residential complex with complete facilities. Strategic location near toll road and commuter rail station.', images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'], coordinates: '-6.2383,106.9756' },
  { id: 2, title: 'Mixed-Use Development Surabaya', type: 'Properti Komersial', location: 'Central Surabaya, East Java', value: 'IDR 175,000,000,000', estimate: 'IDR 198,000,000,000', deadline: '2026-07-10', status: 'Active', area: '8,900', building: '6,500', return: '12–16% p.a.', description: 'Integrated township (hotel, retail, apartments) in the heart of Surabaya. Projected rental income IDR 18B/year.', images: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop'], coordinates: '-7.2575,112.7521' },
  { id: 3, title: 'Data Center Jakarta Barat', type: 'Properti Teknologi', location: 'Kebon Jeruk, West Jakarta', value: 'IDR 220,000,000,000', estimate: 'IDR 245,000,000,000', deadline: '2026-07-25', status: 'Active', area: '4,100', building: '3,800', return: '16–22% p.a.', description: 'Tier-3 data center facility with 800-rack capacity. Long-term contracts with global hyperscalers.', images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1478860409698-8707c313ee6b?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=600&h=400&fit=crop'], coordinates: '-6.1751,106.7914' },
  { id: 4, title: 'Apartemen Waterfront Makassar', type: 'Properti Residensial', location: 'CPI Makassar, South Sulawesi', value: 'IDR 78,000,000,000', estimate: 'IDR 88,000,000,000', deadline: '2026-10-01', status: 'Active', area: '3,800', building: '2,950', return: '13–17% p.a.', description: 'Waterfront apartment with 270° ocean views. 180 units, resort-style facilities within the complex.', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'], coordinates: '-5.1477,119.4327' },
]

const maskName = (name) => {
  const [first, ...rest] = name.split(' ')
  if (!first) return name
  const masked = first.charAt(0) + first.slice(1).replace(/./g, 'x')
  return rest.length > 0 ? masked + ' ' + rest.join(' ').charAt(0) + 'x' : masked
}

const formatNumber = (value) => {
  const digits = value.replace(/\D/g, '')
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default function EarlyAccessDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoomModal, setZoomModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [registrationForm, setRegistrationForm] = useState({ name: '', email: '', phone: '' })
  const [error, setError] = useState('')

  const asset = earlyAccessData.find(a => a.id === parseInt(id))

  if (!asset) {
    return (
      <div className="page">
        <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: '#6A6A6A' }}>Property not found</p>
          <button onClick={() => navigate('/asset/early-access')} className="btn btn--primary" style={{ marginTop: '1rem' }}>Back to Early Access</button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % asset.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + asset.images.length) % asset.images.length)
  }

  const handleRegister = () => {
    if (!registrationForm.name || !registrationForm.email || !registrationForm.phone) {
      setError('All fields are required')
      return
    }
    setShowModal(false)
    setRegistrationForm({ name: '', email: '', phone: '' })
    setError('')
    // In real app, would send to API
    alert('Registration submitted successfully!')
  }

  return (
    <div className="page">
      <div className="container">
        <div className="ea-detail__wrapper">
          {/* Left: Image & Details */}
          <div className="ea-detail__main">
            <div className="ea-detail__carousel">
              <div className="ea-carousel__container">
                <img 
                  src={asset.images[currentImageIndex]} 
                  alt={`${asset.title} ${currentImageIndex + 1}`} 
                  className="ea-carousel__img" 
                  onClick={() => setZoomModal(true)}
                  style={{ cursor: 'pointer' }}
                  onError={(e) => { e.target.style.display = 'none' }} 
                />
                {asset.images.length > 1 && (
                  <>
                    <button className="ea-carousel__btn ea-carousel__btn--prev" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="ea-carousel__btn ea-carousel__btn--next" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              {asset.images.length > 1 && (
                <div className="ea-carousel__counter">
                  {currentImageIndex + 1} / {asset.images.length}
                </div>
              )}
            </div>

            <div className="ea-detail__card">
              <h1 className="ea-detail__title">{asset.title}</h1>
              <p className="ea-detail__type">{asset.type}</p>
              <p className="ea-detail__desc">{asset.description}</p>

              <div className="ea-detail__info-grid">
                <div className="ea-detail__info-item">
                  <MapPin size={18} className="ea-detail__info-icon" />
                  <div>
                    <span className="ea-detail__info-label">Location</span>
                    <a 
                      href={`https://www.google.com/maps?q=${asset.coordinates}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ea-detail__info-value ea-detail__maps-link"
                    >
                      {asset.location} →
                    </a>
                  </div>
                </div>
                <div className="ea-detail__info-item">
                  <Calendar size={18} className="ea-detail__info-icon" />
                  <div>
                    <span className="ea-detail__info-label">Access Deadline</span>
                    <span className="ea-detail__info-value">{asset.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="ea-detail__area-grid">
                <div className="ea-detail__area-item">
                  <span className="ea-detail__area-label">Land Area</span>
                  <span className="ea-detail__area-value">{asset.area} m²</span>
                </div>
                <div className="ea-detail__area-item">
                  <span className="ea-detail__area-label">Building Area</span>
                  <span className="ea-detail__area-value">{asset.building} m²</span>
                </div>
              </div>

              <div className="ea-detail__prices">
                <div className="ea-detail__price-box">
                  <span className="ea-detail__price-label">Estimated Value</span>
                  <span className="ea-detail__price-value">{asset.value}</span>
                </div>
                <div className="ea-detail__price-box ea-detail__price-box--gold">
                  <span className="ea-detail__price-label">Projected Value</span>
                  <span className="ea-detail__price-value">{asset.estimate}</span>
                </div>
                <div className="ea-detail__price-box">
                  <span className="ea-detail__price-label">Projected Return</span>
                  <span className="ea-detail__price-value" style={{ fontSize: '1rem' }}>{asset.return}</span>
                </div>
              </div>

              <button className="ea-detail__cta" onClick={() => setShowModal(true)}>
                Register for Early Access
              </button>
            </div>
          </div>

          {/* Right: Key Details Card */}
          <div className="ea-detail__sidebar">
            <div className="ea-details-card">
              <h3 className="ea-details-card__title">Key Details</h3>
              
              <div className="ea-key-detail">
                <div className="ea-key-detail__icon">
                  <DollarSign size={20} />
                </div>
                <div>
                  <span className="ea-key-detail__label">Current Value</span>
                  <span className="ea-key-detail__value">{asset.value}</span>
                </div>
              </div>

              <div className="ea-key-detail">
                <div className="ea-key-detail__icon">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <span className="ea-key-detail__label">Projected Return</span>
                  <span className="ea-key-detail__value">{asset.return}</span>
                </div>
              </div>

              <div className="ea-key-detail">
                <div className="ea-key-detail__icon">
                  <Ruler size={20} />
                </div>
                <div>
                  <span className="ea-key-detail__label">Total Area</span>
                  <span className="ea-key-detail__value">{asset.area} m²</span>
                </div>
              </div>

              <div className="ea-key-detail">
                <div className="ea-key-detail__icon">
                  <Calendar size={20} />
                </div>
                <div>
                  <span className="ea-key-detail__label">Access Opens</span>
                  <span className="ea-key-detail__value">{asset.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="ea-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ea-modal-content" onClick={e => e.stopPropagation()}>
            <div className="ea-modal-header">
              <h3 className="ea-modal-title">Register for Early Access</h3>
              <button className="ea-modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="ea-modal-body">
              <p className="ea-modal-asset">Registering for: <strong>{asset.title}</strong></p>

              {error && <div className="ea-modal-error">{error}</div>}

              <div className="ea-modal-form">
                <div className="ea-modal-group">
                  <label className="ea-modal-label">Full Name *</label>
                  <input
                    type="text"
                    value={registrationForm.name}
                    onChange={e => { setRegistrationForm(p => ({ ...p, name: e.target.value })); setError('') }}
                    className="ea-modal-input"
                    placeholder="e.g. Alvine Yoga"
                  />
                </div>

                <div className="ea-modal-group">
                  <label className="ea-modal-label">Email Address *</label>
                  <input
                    type="email"
                    value={registrationForm.email}
                    onChange={e => { setRegistrationForm(p => ({ ...p, email: e.target.value })); setError('') }}
                    className="ea-modal-input"
                    placeholder="e.g. alvine@example.com"
                  />
                </div>

                <div className="ea-modal-group">
                  <label className="ea-modal-label">Phone Number *</label>
                  <input
                    type="tel"
                    value={registrationForm.phone}
                    onChange={e => { setRegistrationForm(p => ({ ...p, phone: e.target.value })); setError('') }}
                    className="ea-modal-input"
                    placeholder="e.g. +62812345678"
                  />
                </div>
              </div>

              <p className="ea-modal-disclaimer">By registering, you agree to receive updates about this investment opportunity. We'll contact you once early access becomes available.</p>
            </div>

            <div className="ea-modal-footer">
              <button className="ea-modal-btn ea-modal-btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="ea-modal-btn ea-modal-btn--primary" onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomModal && (
        <div className="ea-zoom-overlay" onClick={() => setZoomModal(false)}>
          <div className="ea-zoom-content" onClick={e => e.stopPropagation()}>
            <button className="ea-zoom-close" onClick={() => setZoomModal(false)}>
              <X size={28} />
            </button>
            <img 
              src={asset.images[currentImageIndex]} 
              alt={`${asset.title} zoomed`} 
              className="ea-zoom-img"
              onError={(e) => { e.target.style.display = 'none' }} 
            />
            {asset.images.length > 1 && (
              <>
                <button className="ea-zoom-nav ea-zoom-nav--prev" onClick={prevImage}>
                  <ChevronLeft size={32} />
                </button>
                <button className="ea-zoom-nav ea-zoom-nav--next" onClick={nextImage}>
                  <ChevronRight size={32} />
                </button>
                <div className="ea-zoom-counter">
                  {currentImageIndex + 1} / {asset.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

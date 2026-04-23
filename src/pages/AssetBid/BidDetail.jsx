import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, DollarSign, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react'
import '../PageShared.css'
import './bid-detail.css'

const bidData = [
  { id: 1, title: 'Commercial Building South Jakarta', type: 'Commercial Property', opening: 'IDR 15,000,000,000', estimate: 'IDR 18,000,000,000', deadline: '2026-05-30', status: 'Active', location: 'South Jakarta', description: 'A prime commercial building in the heart of South Jakarta with excellent visibility and foot traffic. Fully renovated with modern amenities.', images: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'], fieldArea: '5,500', buildingArea: '8,200', coordinates: '-6.2971,106.7904' },
  { id: 2, title: 'Bekasi Industrial Estate', type: 'Industrial Land', opening: 'IDR 8,500,000,000', estimate: 'IDR 11,000,000,000', deadline: '2026-06-15', status: 'Active', location: 'Bekasi', description: 'Strategic industrial land in Bekasi with easy access to major highways and logistics facilities.', images: ['https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop'], fieldArea: '12,000', buildingArea: '7,500', coordinates: '-6.2349,107.0149' },
  { id: 3, title: 'Premium Shophouse BSD City', type: 'Retail Property', opening: 'IDR 3,200,000,000', estimate: 'IDR 4,000,000,000', deadline: '2026-06-20', status: 'Active', location: 'Tangerang', description: 'A premium shophouse in the busy BSD City commercial area, perfect for retail or F&B business.', images: ['https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1546073328-30446330dd8d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1565183938294-7563f3ff688c?w=600&h=400&fit=crop'], fieldArea: '2,800', buildingArea: '4,200', coordinates: '-6.2943,106.6363' },
]

const mockBids = [
  { id: 1, name: 'Alvine Yoga', amount: 'IDR 15,500,000,000', time: '2 hours ago' },
  { id: 2, name: 'Bambang Sutrisno', amount: 'IDR 15,200,000,000', time: '5 hours ago' },
  { id: 3, name: 'Christina Wijaya', amount: 'IDR 15,000,000,000', time: '8 hours ago' },
  { id: 4, name: 'Daniel Hermawan', amount: 'IDR 14,800,000,000', time: '1 day ago' },
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

export default function BidDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoomModal, setZoomModal] = useState(false)
  const [bidForm, setBidForm] = useState({ name: '', email: '', bidAmount: '' })
  const [bids, setBids] = useState(mockBids)
  const [error, setError] = useState('')

  const bid = bidData.find(b => b.id === parseInt(id))

  if (!bid) {
    return (
      <div className="page">
        <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: '#6A6A6A' }}>Bid not found</p>
          <button onClick={() => navigate('/asset/bid')} className="btn btn--primary" style={{ marginTop: '1rem' }}>Back to Auctions</button>
        </div>
      </div>
    )
  }

  const handlePlaceBid = () => {
    if (!bidForm.name || !bidForm.email || !bidForm.bidAmount) {
      setError('All fields are required')
      return
    }
    const cleanAmount = bidForm.bidAmount.replace(/\D/g, '')
    if (!cleanAmount || isNaN(cleanAmount)) {
      setError('Bid amount must be a valid number')
      return
    }
    // Add bid to list
    setBids(prev => [
      { id: prev.length + 1, name: bidForm.name, amount: `IDR ${parseInt(cleanAmount).toLocaleString('id-ID')}`, time: 'just now' },
      ...prev
    ])
    setShowModal(false)
    setBidForm({ name: '', email: '', bidAmount: '' })
    setError('')
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bid.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bid.images.length) % bid.images.length)
  }

  return (
    <div className="page">
      <div className="container">
        <div className="bid-detail__wrapper">
          {/* Left: Image & Details */}
          <div className="bid-detail__main">
            <div className="bid-detail__carousel">
              <div className="bid-carousel__container">
                <img 
                  src={bid.images[currentImageIndex]} 
                  alt={`${bid.title} ${currentImageIndex + 1}`} 
                  className="bid-carousel__img" 
                  onClick={() => setZoomModal(true)}
                  style={{ cursor: 'pointer' }}
                  onError={(e) => { e.target.style.display = 'none' }} 
                />
                {bid.images.length > 1 && (
                  <>
                    <button className="bid-carousel__btn bid-carousel__btn--prev" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="bid-carousel__btn bid-carousel__btn--next" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              {bid.images.length > 1 && (
                <div className="bid-carousel__counter">
                  {currentImageIndex + 1} / {bid.images.length}
                </div>
              )}
            </div>

            <div className="bid-detail__card">
              <h1 className="bid-detail__title">{bid.title}</h1>
              <p className="bid-detail__type">{bid.type}</p>
              <p className="bid-detail__desc">{bid.description}</p>

              <div className="bid-detail__info-grid">
                <div className="bid-detail__info-item">
                  <MapPin size={18} className="bid-detail__info-icon" />
                  <div>
                    <span className="bid-detail__info-label">Location</span>
                    <a 
                      href={`https://www.google.com/maps?q=${bid.coordinates}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bid-detail__info-value bid-detail__maps-link"
                    >
                      {bid.location} →
                    </a>
                  </div>
                </div>
                <div className="bid-detail__info-item">
                  <Calendar size={18} className="bid-detail__info-icon" />
                  <div>
                    <span className="bid-detail__info-label">Deadline</span>
                    <span className="bid-detail__info-value">{bid.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="bid-detail__area-grid">
                <div className="bid-detail__area-item">
                  <span className="bid-detail__area-label">Field Area</span>
                  <span className="bid-detail__area-value">{bid.fieldArea} m²</span>
                </div>
                <div className="bid-detail__area-item">
                  <span className="bid-detail__area-label">Building Area</span>
                  <span className="bid-detail__area-value">{bid.buildingArea} m²</span>
                </div>
              </div>

              <div className="bid-detail__prices">
                <div className="bid-detail__price-box">
                  <span className="bid-detail__price-label">Opening Price</span>
                  <span className="bid-detail__price-value">{bid.opening}</span>
                </div>
                <div className="bid-detail__price-box bid-detail__price-box--gold">
                  <span className="bid-detail__price-label">Estimated Value</span>
                  <span className="bid-detail__price-value">{bid.estimate}</span>
                </div>
              </div>

              <button className="bid-detail__cta" onClick={() => setShowModal(true)}>
                <DollarSign size={18} /> Place a Bid
              </button>
            </div>
          </div>

          {/* Right: Bid List */}
          <div className="bid-detail__sidebar">
            <div className="bid-list-card">
              <h3 className="bid-list-card__title">Active Bids</h3>
              <p className="bid-list-card__count">{bids.length} bids</p>

              <div className="bid-list">
                {bids.map(b => (
                  <div key={b.id} className="bid-list__item">
                    <div className="bid-list__info">
                      <span className="bid-list__name">{maskName(b.name)}</span>
                      <span className="bid-list__time">{b.time}</span>
                    </div>
                    <span className="bid-list__amount">{b.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Place Bid Modal */}
      {showModal && (
        <div className="bid-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bid-modal-content" onClick={e => e.stopPropagation()}>
            <div className="bid-modal-header">
              <h3 className="bid-modal-title">Place Your Bid</h3>
              <button className="bid-modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="bid-modal-body">
              <p className="bid-modal-asset">Bidding on: <strong>{bid.title}</strong></p>

              {error && <div className="bid-modal-error">{error}</div>}

              <div className="bid-modal-form">
                <div className="bid-modal-group">
                  <label className="bid-modal-label">Full Name *</label>
                  <input
                    type="text"
                    value={bidForm.name}
                    onChange={e => { setBidForm(p => ({ ...p, name: e.target.value })); setError('') }}
                    className="bid-modal-input"
                    placeholder="e.g. Alvine Yoga"
                  />
                </div>

                <div className="bid-modal-group">
                  <label className="bid-modal-label">Email Address *</label>
                  <input
                    type="email"
                    value={bidForm.email}
                    onChange={e => { setBidForm(p => ({ ...p, email: e.target.value })); setError('') }}
                    className="bid-modal-input"
                    placeholder="e.g. alvine@example.com"
                  />
                </div>

                <div className="bid-modal-group">
                  <label className="bid-modal-label">Your Bid Amount (IDR) *</label>
                  <input
                    type="text"
                    value={bidForm.bidAmount}
                    onChange={e => { setBidForm(p => ({ ...p, bidAmount: formatNumber(e.target.value) })); setError('') }}
                    className="bid-modal-input"
                    placeholder="e.g. 15.500.000.000"
                  />
                  <span className="bid-modal-hint">Minimum: {bid.opening}</span>
                </div>
              </div>

              <p className="bid-modal-disclaimer">Your identity will be masked in the bid list. By placing a bid, you agree to the auction terms and conditions.</p>
            </div>

            <div className="bid-modal-footer">
              <button className="bid-modal-btn bid-modal-btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bid-modal-btn bid-modal-btn--primary" onClick={handlePlaceBid}>Confirm Bid</button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomModal && (
        <div className="bid-zoom-overlay" onClick={() => setZoomModal(false)}>
          <div className="bid-zoom-content" onClick={e => e.stopPropagation()}>
            <button className="bid-zoom-close" onClick={() => setZoomModal(false)}>
              <X size={28} />
            </button>
            <img 
              src={bid.images[currentImageIndex]} 
              alt={`${bid.title} zoomed`} 
              className="bid-zoom-img"
              onError={(e) => { e.target.style.display = 'none' }} 
            />
            {bid.images.length > 1 && (
              <>
                <button className="bid-zoom-nav bid-zoom-nav--prev" onClick={prevImage}>
                  <ChevronLeft size={32} />
                </button>
                <button className="bid-zoom-nav bid-zoom-nav--next" onClick={nextImage}>
                  <ChevronRight size={32} />
                </button>
                <div className="bid-zoom-counter">
                  {currentImageIndex + 1} / {bid.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

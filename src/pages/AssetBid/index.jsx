import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../PageShared.css'
import './style.css'

const bids = [
  { id: 1, title: 'Commercial Building South Jakarta', type: 'Commercial Property', opening: 'IDR 15,000,000,000', estimate: 'IDR 18,000,000,000', deadline: 'May 30, 2026', status: 'Active', badge: 'Popular', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=300&fit=crop' },
  { id: 2, title: 'Bekasi Industrial Estate', type: 'Industrial Land', opening: 'IDR 8,500,000,000', estimate: 'IDR 11,000,000,000', deadline: 'Jun 15, 2026', status: 'Active', badge: 'New', image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=500&h=300&fit=crop' },
  { id: 3, title: 'Premium Shophouse BSD City', type: 'Retail Property', opening: 'IDR 3,200,000,000', estimate: 'IDR 4,000,000,000', deadline: 'Jun 20, 2026', status: 'Active', badge: '', image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=300&fit=crop' },
  { id: 4, title: 'Luxury Apartment Sudirman', type: 'Residential Property', opening: 'IDR 5,700,000,000', estimate: 'IDR 6,500,000,000', deadline: 'Jul 5, 2026', status: 'Upcoming', badge: '', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop' },
  { id: 5, title: '4-Star Hotel Bali', type: 'Hospitality Property', opening: 'IDR 45,000,000,000', estimate: 'IDR 52,000,000,000', deadline: 'Jul 25, 2026', status: 'Upcoming', badge: 'Premium', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop' },
  { id: 6, title: 'Logistics Warehouse Tangerang', type: 'Industrial Property', opening: 'IDR 12,000,000,000', estimate: 'IDR 15,000,000,000', deadline: 'Aug 10, 2026', status: 'Upcoming', badge: '', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=300&fit=crop' },
]

const categories = ['All', 'Commercial Property', 'Industrial Land', 'Retail Property', 'Residential Property', 'Hospitality Property', 'Industrial Property']

export default function AssetBid() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? bids : bids.filter(b => b.type === filter)

  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Asset Auction</span>
          <h1 className="page-hero__title">Bid on<br /><span className="text-gold">Quality Assets</span></h1>
          <p className="page-hero__desc">Discover and participate in premium asset auctions selected by Summa Capital — transparent and fully trusted.</p>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bid-info-bar">
        <div className="container bid-info-bar__inner">
          <div className="bid-info-item">
            <span className="bid-info-item__value">6</span>
            <span className="bid-info-item__label">Assets Available</span>
          </div>
          <div className="bid-divider" />
          <div className="bid-info-item">
            <span className="bid-info-item__value">3</span>
            <span className="bid-info-item__label">Active Auctions</span>
          </div>
          <div className="bid-divider" />
          <div className="bid-info-item">
            <span className="bid-info-item__value">IDR 89M+</span>
            <span className="bid-info-item__label">Total Estimated Value</span>
          </div>
          <div className="bid-divider" />
          <div className="bid-info-item">
            <span className="bid-info-item__value">100%</span>
            <span className="bid-info-item__label">Verified Assets</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className="bid-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`bid-filter${filter === cat ? ' bid-filter--active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="bid-grid">
            {filtered.map(item => (
              <div key={item.id} className="bid-card">
                {item.badge && <span className={`bid-card__badge bid-card__badge--${item.badge.toLowerCase()}`}>{item.badge}</span>}
                <div className="bid-card__type">{item.type}</div>
                {/* Image */}
                <div className="bid-card__image">
                  <img src={item.image} alt={item.title} className="bid-card__image-img" onError={(e) => { e.target.style.display = 'none' }} />
                </div>
                <h3 className="bid-card__title">{item.title}</h3>
                <div className="bid-card__prices">
                  <div className="bid-card__price-row">
                    <span className="bid-card__price-label">Opening Price</span>
                    <span className="bid-card__price-value">{item.opening}</span>
                  </div>
                  <div className="bid-card__price-row">
                    <span className="bid-card__price-label">Estimated Value</span>
                    <span className="bid-card__price-value bid-card__price-value--gold">{item.estimate}</span>
                  </div>
                </div>
                <div className="bid-card__footer">
                  <div className="bid-card__deadline">
                    <span className="bid-card__deadline-icon">📅</span>
                    <span>Deadline: {item.deadline}</span>
                  </div>
                  <span className={`bid-card__status bid-card__status--${item.status === 'Active' ? 'active' : 'upcoming'}`}>
                    {item.status}
                  </span>
                </div>
                <button
                className={`bid-card__cta${item.status === 'Active' ? '' : ' bid-card__cta--disabled'}`} 
                onClick={() => item.status === 'Active' && navigate(`/bid/detail/${item.id}`)}
                disabled={item.status !== 'Active'}>
                  {item.status === 'Active' ? 'View Detail' : 'Coming Soon'}
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state__icon">🔍</div>
              <p>No assets found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Auction Process</span>
            <h2 className="section-title">How to <span className="text-gold">Participate in an Auction</span></h2>
          </div>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Register', desc: 'Sign up and complete the identity verification process.' },
              { num: '02', title: 'Choose an Asset', desc: 'Browse and select an asset that matches your investment needs.' },
              { num: '03', title: 'Submit a Bid', desc: 'Enter your bid amount in accordance with the auction terms.' },
              { num: '04', title: 'Complete the Transaction', desc: 'The auction winner will be contacted to finalize the transaction.' },
            ].map(step => (
              <div key={step.num} className="step-card">
                <div className="step-card__num">{step.num}</div>
                <h4 className="step-card__title">{step.title}</h4>
                <p className="step-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

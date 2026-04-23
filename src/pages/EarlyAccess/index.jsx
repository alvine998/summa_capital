import { Link, useNavigate } from 'react-router-dom'
import { MapPin, CalendarDays, AreaChart, Tag, ImageIcon } from 'lucide-react'
import '../PageShared.css'
import './style.css'

const assets = [
  {
    id: 1,
    title: 'Superblok Residensial Bekasi Timur',
    description: 'Premium residential complex with complete facilities. Strategic location near toll road and commuter rail station.',
    location: 'East Bekasi, West Java',
    area: '5,600 m²',
    estimate: 'Rp 95B',
    deadline: 'Jun 15, 2026',
    status: 'Active',
    image: null,
  },
  {
    id: 2,
    title: 'Mixed-Use Development Surabaya',
    description: 'Integrated township (hotel, retail, apartments) in the heart of Surabaya. Projected rental income IDR 18B/year.',
    location: 'Central Surabaya, East Java',
    area: '8,900 m²',
    estimate: 'Rp 175B',
    deadline: 'Jul 10, 2026',
    status: 'Active',
    image: null,
  },
  {
    id: 3,
    title: 'Data Center Jakarta Barat',
    description: 'Tier-3 data center facility with 800-rack capacity. Long-term contracts with global hyperscalers.',
    location: 'Kebon Jeruk, West Jakarta',
    area: '4,100 m²',
    estimate: 'Rp 220B',
    deadline: 'Jul 25, 2026',
    status: 'Active',
    image: null,
  },
  {
    id: 4,
    title: 'Apartemen Waterfront Makassar',
    description: 'Waterfront apartment with 270° ocean views. 180 units, resort-style facilities within the complex.',
    location: 'CPI Makassar, South Sulawesi',
    area: '3,800 m²',
    estimate: 'Rp 78B',
    deadline: 'Oct 01, 2026',
    status: 'Active',
    image: null,
  },
]

const benefits = [
  { icon: '🔑', title: 'Pre-Market Access', desc: 'Get information on selected assets before they are opened to the general market.' },
  { icon: '💎', title: 'Exclusive Pricing', desc: 'Enjoy more competitive pricing and investment terms reserved for early registrants.' },
  { icon: '📊', title: 'In-Depth Reports', desc: 'Access comprehensive due diligence and valuation reports for every listing.' },
  { icon: '🤝', title: 'Personal Consultation', desc: 'Direct access to our senior investment consultants for tailored guidance.' },
]

export default function EarlyAccess() {
  const navigate = useNavigate()
  
  return (
    <div className="page">
      <section className="page-hero page-hero--dark-gold">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Early Access</span>
          <h1 className="page-hero__title">Exclusive Access<br /><span className="text-gold">Before the Public</span></h1>
          <p className="page-hero__desc">An exclusive investment program for selected clients with access to premium assets curated by Summa Capital.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Program Benefits</span>
            <h2 className="section-title">Why <span className="text-gold">Early Access?</span></h2>
          </div>
          <div className="perks-grid">
            {benefits.map(b => (
              <div key={b.title} className="perk-card">
                <div className="perk-card__icon">{b.icon}</div>
                <h4 className="perk-card__title">{b.title}</h4>
                <p className="perk-card__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assets */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Exclusive Listings</span>
            <h2 className="section-title">Assets <span className="text-gold">Available</span></h2>
            <p className="section-desc">Investment opportunities are limited. Register your interest now for more information.</p>
          </div>
          <div className="ea-grid">
            {assets.map(a => (
              <div key={a.id} className={`ea-card ${a.status === 'Closed' ? 'ea-card--closed' : ''}`}>
                {/* Image */}
                <div className="ea-card__image">
                  {a.image
                    ? <img src={a.image} alt={a.title} className="ea-card__img" />
                    : <div className="ea-card__img-placeholder"><ImageIcon size={32} /></div>
                  }
                  <span className={`ea-card__status-pill ea-card__status-pill--${a.status === 'Active' ? 'active' : 'closed'}`}>
                    {a.status}
                  </span>
                </div>

                {/* Body */}
                <div className="ea-card__body">
                  <h3 className="ea-card__title">{a.title}</h3>
                  <p className="ea-card__desc">{a.description}</p>

                  <div className="ea-card__info">
                    <div className="ea-card__info-item">
                      <MapPin size={14} className="ea-card__info-icon" />
                      <span>{a.location}</span>
                    </div>
                    <div className="ea-card__info-item">
                      <AreaChart size={14} className="ea-card__info-icon" />
                      <span>{a.area}</span>
                    </div>
                    <div className="ea-card__info-item">
                      <Tag size={14} className="ea-card__info-icon" />
                      <span className="ea-card__estimate">{a.estimate}</span>
                    </div>
                    <div className="ea-card__info-item">
                      <CalendarDays size={14} className="ea-card__info-icon" />
                      <span>Deadline: {a.deadline}</span>
                    </div>
                  </div>

                  {a.status === 'Active'
                    ? <button className="ea-card__cta" onClick={() => navigate(`/early-access/detail/${a.id}`)}>Register Interest</button>
                    : <button className="ea-card__cta ea-card__cta--closed" disabled>Closed</button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container page-cta__inner">
          <h2 className="page-cta__title">Join the Early Access Program</h2>
          <p className="page-cta__desc">Contact our team for qualification information and the registration process for this exclusive program.</p>
          <Link to="/contact" className="btn btn--white">Contact Our Team</Link>
        </div>
      </section>
    </div>
  )
}

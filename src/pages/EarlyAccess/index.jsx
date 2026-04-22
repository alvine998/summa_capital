import { Link } from 'react-router-dom'
import { Lock, Gem, BarChart3, Briefcase } from 'lucide-react'
import '../PageShared.css'
import './style.css'

const assets = [
  {
    id: 1,
    title: 'Residential Superblock East Bekasi',
    type: 'Residential Property',
    value: 'IDR 95,000,000,000',
    slots: 12,
    slotsLeft: 3,
    return: '14–18% p.a.',
    horizon: '36 Months',
    status: 'Almost Full',
  },
  {
    id: 2,
    title: 'Data Center West Jakarta',
    type: 'Technology Property',
    value: 'IDR 220,000,000,000',
    slots: 20,
    slotsLeft: 8,
    return: '16–22% p.a.',
    horizon: '48 Months',
    status: 'Available',
  },
  {
    id: 3,
    title: 'Mixed-Use Development Surabaya',
    type: 'Commercial Property',
    value: 'IDR 175,000,000,000',
    slots: 15,
    slotsLeft: 6,
    return: '12–16% p.a.',
    horizon: '30 Months',
    status: 'Available',
  },
  {
    id: 4,
    title: 'Eco Resort Lombok',
    type: 'Hospitality Property',
    value: 'IDR 68,000,000,000',
    slots: 10,
    slotsLeft: 1,
    return: '18–24% p.a.',
    horizon: '60 Months',
    status: 'Almost Full',
  },
]

const perks = [
  { icon: Lock, title: 'Pre-Market Access', desc: 'Get information on selected assets before they are opened to the general market.' },
  { icon: Gem, title: 'Exclusive Pricing', desc: 'Enjoy more competitive pricing and investment terms.' },
  { icon: BarChart3, title: 'In-Depth Reports', desc: 'Access comprehensive due diligence and valuation reports.' },
  { icon: Briefcase, title: 'Personal Consultation', desc: 'Direct access to our senior investment consultants.' },
]

export default function EarlyAccess() {
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

      {/* Perks */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Program Benefits</span>
            <h2 className="section-title">Why <span className="text-gold">Early Access?</span></h2>
          </div>
          <div className="perks-grid">
            {perks.map(p => (
              <div key={p.title} className="perk-card">
                <p.icon className="perk-card__icon" size={32} />
                <h4 className="perk-card__title">{p.title}</h4>
                <p className="perk-card__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assets */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Exclusive Assets</span>
            <h2 className="section-title">Assets <span className="text-gold">Available</span></h2>
            <p className="section-desc">Investment slots are limited. Register your interest now for more information.</p>
          </div>
          <div className="ea-grid">
            {assets.map(a => {
              const pct = Math.round(((a.slots - a.slotsLeft) / a.slots) * 100)
              return (
                <div key={a.id} className="ea-card">
                  <div className="ea-card__header">
                    <span className="ea-card__type">{a.type}</span>
                    <span className={`ea-card__status ea-card__status--${a.status === 'Almost Full' ? 'low' : 'ok'}`}>
                      {a.status}
                    </span>
                  </div>
                  <h3 className="ea-card__title">{a.title}</h3>
                  <div className="ea-card__meta">
                    <div className="ea-card__meta-item">
                      <span className="ea-card__meta-label">Asset Value</span>
                      <span className="ea-card__meta-value">{a.value}</span>
                    </div>
                    <div className="ea-card__meta-item">
                      <span className="ea-card__meta-label">Projected Return</span>
                      <span className="ea-card__meta-value ea-card__meta-value--gold">{a.return}</span>
                    </div>
                    <div className="ea-card__meta-item">
                      <span className="ea-card__meta-label">Investment Horizon</span>
                      <span className="ea-card__meta-value">{a.horizon}</span>
                    </div>
                  </div>
                  <div className="ea-card__slots">
                    <div className="ea-card__slots-info">
                      <span>Slots Remaining</span>
                      <span><strong>{a.slotsLeft}</strong> / {a.slots}</span>
                    </div>
                    <div className="ea-card__progress">
                      <div className="ea-card__progress-bar" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <button className="ea-card__cta">Register Interest</button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Register CTA */}
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

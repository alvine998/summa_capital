import { Link } from 'react-router-dom'
import { Target, Telescope, Scale } from 'lucide-react'
import '../PageShared.css'
import './style.css'

const leaders = [
  {
    name: 'Ikna Abdul Kholik',
    role: 'Chief Executive Officer',
    initials: 'IK',
    bio: [
      'Ikna Abdul Kholik is the founder and CEO of Summa Capital, with over 18 years of experience in asset management and Indonesia\'s capital markets.',
      'Before founding Summa Capital, he held senior positions at several leading financial institutions. Under his leadership, Summa Capital has successfully managed assets worth over IDR 2 Trillion.',
      'Ikna holds a degree in Economics from the University of Indonesia and an MBA from INSEAD, France.',
    ],
    socials: ['LinkedIn', 'Twitter'],
  },
  {
    name: 'John Doe',
    role: 'Stakeholder & Strategic Partner',
    initials: 'JD',
    bio: [
      'John Doe is the strategic partner and principal shareholder of Summa Capital, bringing a global perspective to the development of cross-asset investment portfolios.',
      'With an extensive track record in the Asia-Pacific capital markets, John plays a key role in expanding Summa Capital\'s institutional network at the international level.',
      'John holds a Finance degree from the London School of Economics and holds a CFA (Chartered Financial Analyst) designation.',
    ],
    socials: ['LinkedIn'],
  },
]

const milestones = [
  { year: '2008', event: 'Summa Capital founded in Jakarta' },
  { year: '2012', event: 'Obtained official OJK license as an Investment Manager' },
  { year: '2016', event: 'Assets Under Management surpassed IDR 500 Billion' },
  { year: '2019', event: 'Launched the digital Asset Auction platform' },
  { year: '2022', event: 'Expanded to 5 major cities across Indonesia' },
  { year: '2024', event: 'AUM reached over IDR 2 Trillion' },
]

export default function AboutUs() {
  return (
    <div className="page">
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">About Us</span>
          <h1 className="page-hero__title">Building Trust<br /><span className="text-gold">Since 2008</span></h1>
          <p className="page-hero__desc">
            Summa Capital is a leading asset management company dedicated to delivering the best investment solutions for institutional and individual clients.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section">
        <div className="container mv-grid">
          <div className="mv-card mv-card--gold">
            <Target className="mv-card__icon" size={32} />
            <h3 className="mv-card__title">Mission</h3>
            <p className="mv-card__text">
              To provide transparent, professional, and profitable asset management solutions that maximize client investment value with the highest integrity.
            </p>
          </div>
          <div className="mv-card">
            <Telescope className="mv-card__icon" size={32} />
            <h3 className="mv-card__title">Vision</h3>
            <p className="mv-card__text">
              To become the leading asset management company in Southeast Asia, recognized for excellence, innovation, and client trust.
            </p>
          </div>
          <div className="mv-card">
            <Scale className="mv-card__icon" size={32} />
            <h3 className="mv-card__title">Values</h3>
            <p className="mv-card__text">
              Integrity, Transparency, Innovation, and Sustainable Growth form the foundation of every decision and action we take.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="section bg-light">
        <div className="container story-grid">
          <div className="story__text">
            <span className="section-badge">Our Story</span>
            <h2 className="section-title">The Journey of <span className="text-gold">Summa Capital</span></h2>
            <p style={{ color: '#6A6A6A', lineHeight: 1.75, marginBottom: '1rem' }}>
              Starting from a simple vision to bring institutional-grade asset management to all investor segments, Summa Capital serves as the bridge between quality investment opportunities and client trust.
            </p>
            <p style={{ color: '#6A6A6A', lineHeight: 1.75 }}>
              With an experienced professional team and cutting-edge technology, we have successfully managed over IDR 2 Trillion in assets and served hundreds of clients from diverse backgrounds.
            </p>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={m.year} className="timeline__item">
                <div className="timeline__year">{m.year}</div>
                <div className="timeline__dot" />
                <div className="timeline__event">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Leadership</span>
            <h2 className="section-title">The <span className="text-gold">Leaders</span> of Summa Capital</h2>
            <p className="section-desc">Led by experienced individuals with a proven track record in the national and international financial industry.</p>
          </div>
          <div className="leaders-grid">
            {leaders.map((l) => (
              <div key={l.name} className="leader-card">
                <div className="leader-card__photo-col">
                  <div className="leader-avatar">{l.initials}</div>
                  <div className="leader-role-badge">{l.role}</div>
                </div>
                <div className="leader-card__info-col">
                  <h3 className="leader-name">{l.name}</h3>
                  <div className="leader-divider" />
                  {l.bio.map((p, i) => (
                    <p key={i} className="leader-bio">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-cta">
        <div className="container page-cta__inner">
          <h2 className="page-cta__title">Want to Collaborate?</h2>
          <p className="page-cta__desc">Contact our team for further discussion about your investment needs.</p>
          <Link to="/contact" className="btn btn--white">Contact Us</Link>
        </div>
      </section>
    </div>
  )
}

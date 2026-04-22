import { useState } from 'react'
import { Image as ImageIcon, ZoomIn } from 'lucide-react'
import '../PageShared.css'
import './style.css'

const categories = ['All', 'Property', 'Event', 'Team', 'Portfolio']

const items = [
  { id: 1, cat: 'Property', title: 'Commercial Building Jakarta', desc: 'Premium asset in the South Jakarta business district', size: 'large' },
  { id: 2, cat: 'Event', title: 'Investment Summit 2024', desc: 'Summa Capital annual investment forum' },
  { id: 3, cat: 'Property', title: 'Mixed-Use Development Surabaya', desc: 'Integrated township development project' },
  { id: 4, cat: 'Team', title: 'Annual Meeting 2025', desc: 'Summa Capital annual management team gathering', size: 'large' },
  { id: 5, cat: 'Event', title: 'Client Appreciation Night', desc: 'A night to celebrate our loyal Summa Capital clients' },
  { id: 6, cat: 'Portfolio', title: 'Eco Resort Lombok', desc: 'Premium hospitality property in Lombok' },
  { id: 7, cat: 'Property', title: 'Bekasi Industrial Estate', desc: 'Strategic industrial land on the east Jakarta corridor' },
  { id: 8, cat: 'Team', title: 'Office Culture', desc: 'Professional work culture of the Summa Capital team' },
  { id: 9, cat: 'Portfolio', title: 'Data Center West Jakarta', desc: 'Future-ready technology property investment' },
]

const colors = [
  ['#C9A84C', '#8B5E3C'],
  ['#2D2D2D', '#C9A84C'],
  ['#4A4A4A', '#E5C97E'],
  ['#1A1A1A', '#A8843D'],
  ['#6B6B6B', '#C9A84C'],
  ['#3D3D3D', '#E5C97E'],
  ['#C9A84C', '#1A1A1A'],
  ['#2D2D2D', '#E5C97E'],
  ['#4A4A4A', '#C9A84C'],
]

export default function Gallery() {
  const [filter, setFilter] = useState('Semua')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'Semua' ? items : items.filter(i => i.cat === filter)

  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Gallery</span>
          <h1 className="page-hero__title">Our Journey &amp; Milestones<br /><span className="text-gold">at Summa Capital</span></h1>
          <p className="page-hero__desc">A curated collection of moments, assets, and achievements by Summa Capital.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter${filter === cat ? ' gallery-filter--active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="gallery-grid">
            {filtered.map((item, idx) => {
              const [bg, accent] = colors[item.id - 1] || colors[0]
              return (
                <div
                  key={item.id}
                  className={`gallery-card${item.size === 'large' ? ' gallery-card--large' : ''}`}
                  onClick={() => setLightbox(item)}
                >
                  <div
                    className="gallery-card__img"
                    style={{ background: `linear-gradient(135deg, ${bg} 0%, ${accent} 100%)` }}
                  >
                    <div className="gallery-card__pattern" />
                    <span className="gallery-card__cat">{item.cat}</span>
                  </div>
                  <div className="gallery-card__info">
                    <h4 className="gallery-card__title">{item.title}</h4>
                    <p className="gallery-card__desc">{item.desc}</p>
                  </div>
                  <div className="gallery-card__overlay">
                    <ZoomIn size={24} />
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <ImageIcon className="empty-state__icon" size={48} />
              <p>No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox__card" onClick={e => e.stopPropagation()}>
            <button className="lightbox__close" onClick={() => setLightbox(null)}>✕</button>
            <div
              className="lightbox__img"
              style={{ background: `linear-gradient(135deg, ${colors[lightbox.id - 1][0]}, ${colors[lightbox.id - 1][1]})` }}
            >
              <div className="lightbox__img-pattern" />
              <span className="lightbox__cat">{lightbox.cat}</span>
            </div>
            <div className="lightbox__content">
              <h3 className="lightbox__title">{lightbox.title}</h3>
              <p className="lightbox__desc">{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

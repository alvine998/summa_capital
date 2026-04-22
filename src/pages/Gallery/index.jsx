import { useState } from 'react'
import '../PageShared.css'
import './style.css'

const categories = ['Semua', 'Properti', 'Event', 'Tim', 'Portofolio']

const items = [
  { id: 1, cat: 'Properti', title: 'Gedung Komersial Jakarta', desc: 'Aset premium di kawasan bisnis Jakarta Selatan', size: 'large' },
  { id: 2, cat: 'Event', title: 'Investment Summit 2024', desc: 'Forum investasi tahunan Summa Capital' },
  { id: 3, cat: 'Properti', title: 'Mixed-Use Development Surabaya', desc: 'Proyek pengembangan kawasan terpadu' },
  { id: 4, cat: 'Tim', title: 'Annual Meeting 2025', desc: 'Pertemuan tahunan tim manajemen Summa Capital', size: 'large' },
  { id: 5, cat: 'Event', title: 'Client Appreciation Night', desc: 'Malam apresiasi untuk klien setia Summa Capital' },
  { id: 6, cat: 'Portofolio', title: 'Eco Resort Lombok', desc: 'Properti hospitality premium di Lombok' },
  { id: 7, cat: 'Properti', title: 'Kawasan Industri Bekasi', desc: 'Lahan industri strategis di koridor timur Jakarta' },
  { id: 8, cat: 'Tim', title: 'Office Culture', desc: 'Budaya kerja profesional tim Summa Capital' },
  { id: 9, cat: 'Portofolio', title: 'Data Center Jakarta Barat', desc: 'Investasi properti teknologi masa depan' },
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
          <span className="section-badge">Galeri</span>
          <h1 className="page-hero__title">Jejak Langkah<br /><span className="text-gold">Summa Capital</span></h1>
          <p className="page-hero__desc">Kumpulan momen, aset, dan pencapaian Summa Capital dalam satu galeri eksklusif.</p>
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
                    <span className="gallery-card__zoom">⊕</span>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state__icon">🖼</div>
              <p>Tidak ada item dalam kategori ini.</p>
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

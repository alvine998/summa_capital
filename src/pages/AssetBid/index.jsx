import { useState } from 'react'
import '../PageShared.css'
import './style.css'

const bids = [
  { id: 1, title: 'Gedung Komersial Jakarta Selatan', type: 'Properti Komersial', opening: 'Rp 15.000.000.000', estimate: 'Rp 18.000.000.000', deadline: '30 Mei 2026', status: 'Aktif', badge: 'Populer', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=300&fit=crop' },
  { id: 2, title: 'Kawasan Industri Bekasi', type: 'Lahan Industri', opening: 'Rp 8.500.000.000', estimate: 'Rp 11.000.000.000', deadline: '15 Jun 2026', status: 'Aktif', badge: 'Baru', image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=500&h=300&fit=crop' },
  { id: 3, title: 'Ruko Premium BSD City', type: 'Properti Ritel', opening: 'Rp 3.200.000.000', estimate: 'Rp 4.000.000.000', deadline: '20 Jun 2026', status: 'Aktif', badge: '', image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=300&fit=crop' },
  { id: 4, title: 'Apartemen Mewah Sudirman', type: 'Properti Residensial', opening: 'Rp 5.700.000.000', estimate: 'Rp 6.500.000.000', deadline: '5 Jul 2026', status: 'Akan Datang', badge: '', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop' },
  { id: 5, title: 'Hotel Bintang 4 Bali', type: 'Properti Hospitality', opening: 'Rp 45.000.000.000', estimate: 'Rp 52.000.000.000', deadline: '25 Jul 2026', status: 'Akan Datang', badge: 'Premium', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop' },
  { id: 6, title: 'Gudang Logistik Tangerang', type: 'Properti Industri', opening: 'Rp 12.000.000.000', estimate: 'Rp 15.000.000.000', deadline: '10 Agt 2026', status: 'Akan Datang', badge: '', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=300&fit=crop' },
]

const categories = ['Semua', 'Properti Komersial', 'Lahan Industri', 'Properti Ritel', 'Properti Residensial', 'Properti Hospitality', 'Properti Industri']

export default function AssetBid() {
  const [filter, setFilter] = useState('Semua')
  const filtered = filter === 'Semua' ? bids : bids.filter(b => b.type === filter)

  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Lelang Aset</span>
          <h1 className="page-hero__title">Ikuti Penawaran<br /><span className="text-gold">Aset Berkualitas</span></h1>
          <p className="page-hero__desc">Temukan dan ikuti lelang aset premium pilihan Summa Capital dengan proses transparan dan terpercaya.</p>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bid-info-bar">
        <div className="container bid-info-bar__inner">
          <div className="bid-info-item">
            <span className="bid-info-item__value">6</span>
            <span className="bid-info-item__label">Aset Tersedia</span>
          </div>
          <div className="bid-divider" />
          <div className="bid-info-item">
            <span className="bid-info-item__value">3</span>
            <span className="bid-info-item__label">Lelang Aktif</span>
          </div>
          <div className="bid-divider" />
          <div className="bid-info-item">
            <span className="bid-info-item__value">Rp 89M+</span>
            <span className="bid-info-item__label">Total Estimasi Nilai</span>
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
                    <span className="bid-card__price-label">Harga Pembukaan</span>
                    <span className="bid-card__price-value">{item.opening}</span>
                  </div>
                  <div className="bid-card__price-row">
                    <span className="bid-card__price-label">Estimasi Nilai</span>
                    <span className="bid-card__price-value bid-card__price-value--gold">{item.estimate}</span>
                  </div>
                </div>
                <div className="bid-card__footer">
                  <div className="bid-card__deadline">
                    <span className="bid-card__deadline-icon">📅</span>
                    <span>Batas: {item.deadline}</span>
                  </div>
                  <span className={`bid-card__status bid-card__status--${item.status === 'Aktif' ? 'active' : 'upcoming'}`}>
                    {item.status}
                  </span>
                </div>
                <button className={`bid-card__cta${item.status === 'Aktif' ? '' : ' bid-card__cta--disabled'}`} disabled={item.status !== 'Aktif'}>
                  {item.status === 'Aktif' ? 'Ikuti Lelang' : 'Segera Hadir'}
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state__icon">🔍</div>
              <p>Tidak ada aset dalam kategori ini saat ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Proses Lelang</span>
            <h2 className="section-title">Cara <span className="text-gold">Mengikuti Lelang</span></h2>
          </div>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Registrasi', desc: 'Daftarkan diri Anda dan lengkapi proses verifikasi identitas.' },
              { num: '02', title: 'Pilih Aset', desc: 'Telusuri dan pilih aset yang sesuai kebutuhan investasi Anda.' },
              { num: '03', title: 'Ajukan Penawaran', desc: 'Masukkan nominal penawaran Anda sesuai ketentuan lelang.' },
              { num: '04', title: 'Selesaikan Transaksi', desc: 'Pemenang lelang akan dihubungi untuk proses penyelesaian.' },
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

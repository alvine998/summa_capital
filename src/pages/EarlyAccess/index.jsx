import { Link } from 'react-router-dom'
import '../PageShared.css'
import './style.css'

const assets = [
  {
    id: 1,
    title: 'Superblok Residensial Bekasi Timur',
    type: 'Properti Residensial',
    value: 'Rp 95.000.000.000',
    slots: 12,
    slotsLeft: 3,
    return: '14–18% p.a.',
    horizon: '36 Bulan',
    status: 'Tersisa Sedikit',
  },
  {
    id: 2,
    title: 'Data Center Jakarta Barat',
    type: 'Properti Teknologi',
    value: 'Rp 220.000.000.000',
    slots: 20,
    slotsLeft: 8,
    return: '16–22% p.a.',
    horizon: '48 Bulan',
    status: 'Tersedia',
  },
  {
    id: 3,
    title: 'Mixed-Use Development Surabaya',
    type: 'Properti Komersial',
    value: 'Rp 175.000.000.000',
    slots: 15,
    slotsLeft: 6,
    return: '12–16% p.a.',
    horizon: '30 Bulan',
    status: 'Tersedia',
  },
  {
    id: 4,
    title: 'Eco Resort Lombok',
    type: 'Properti Hospitality',
    value: 'Rp 68.000.000.000',
    slots: 10,
    slotsLeft: 1,
    return: '18–24% p.a.',
    horizon: '60 Bulan',
    status: 'Hampir Penuh',
  },
]

const perks = [
  { icon: '🔐', title: 'Akses Sebelum Publik', desc: 'Dapatkan informasi aset pilihan sebelum dibuka ke pasar umum.' },
  { icon: '💎', title: 'Harga Eksklusif', desc: 'Nikmati harga dan syarat investasi yang lebih kompetitif.' },
  { icon: '📊', title: 'Laporan Mendalam', desc: 'Akses due diligence dan laporan valuasi komprehensif.' },
  { icon: '🧑‍💼', title: 'Konsultasi Pribadi', desc: 'Akses langsung ke konsultan investasi senior kami.' },
]

export default function EarlyAccess() {
  return (
    <div className="page">
      <section className="page-hero page-hero--dark-gold">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Early Access</span>
          <h1 className="page-hero__title">Akses Eksklusif<br /><span className="text-gold">Sebelum Publik</span></h1>
          <p className="page-hero__desc">Program investasi eksklusif untuk klien terpilih dengan akses ke aset premium pilihan Summa Capital.</p>
        </div>
      </section>

      {/* Perks */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Keuntungan Program</span>
            <h2 className="section-title">Mengapa <span className="text-gold">Early Access?</span></h2>
          </div>
          <div className="perks-grid">
            {perks.map(p => (
              <div key={p.title} className="perk-card">
                <div className="perk-card__icon">{p.icon}</div>
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
            <span className="section-badge">Aset Eksklusif</span>
            <h2 className="section-title">Aset <span className="text-gold">Tersedia</span></h2>
            <p className="section-desc">Slot investasi terbatas. Daftarkan minat Anda sekarang untuk informasi lebih lanjut.</p>
          </div>
          <div className="ea-grid">
            {assets.map(a => {
              const pct = Math.round(((a.slots - a.slotsLeft) / a.slots) * 100)
              return (
                <div key={a.id} className="ea-card">
                  <div className="ea-card__header">
                    <span className="ea-card__type">{a.type}</span>
                    <span className={`ea-card__status ea-card__status--${a.status === 'Tersisa Sedikit' || a.status === 'Hampir Penuh' ? 'low' : 'ok'}`}>
                      {a.status}
                    </span>
                  </div>
                  <h3 className="ea-card__title">{a.title}</h3>
                  <div className="ea-card__meta">
                    <div className="ea-card__meta-item">
                      <span className="ea-card__meta-label">Nilai Aset</span>
                      <span className="ea-card__meta-value">{a.value}</span>
                    </div>
                    <div className="ea-card__meta-item">
                      <span className="ea-card__meta-label">Proyeksi Return</span>
                      <span className="ea-card__meta-value ea-card__meta-value--gold">{a.return}</span>
                    </div>
                    <div className="ea-card__meta-item">
                      <span className="ea-card__meta-label">Horizon Investasi</span>
                      <span className="ea-card__meta-value">{a.horizon}</span>
                    </div>
                  </div>
                  <div className="ea-card__slots">
                    <div className="ea-card__slots-info">
                      <span>Slot Tersisa</span>
                      <span><strong>{a.slotsLeft}</strong> / {a.slots}</span>
                    </div>
                    <div className="ea-card__progress">
                      <div className="ea-card__progress-bar" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <button className="ea-card__cta">Daftar Minat</button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section className="page-cta">
        <div className="container page-cta__inner">
          <h2 className="page-cta__title">Bergabung Dalam Program Early Access</h2>
          <p className="page-cta__desc">Hubungi tim kami untuk informasi kualifikasi dan proses pendaftaran program eksklusif ini.</p>
          <Link to="/contact" className="btn btn--white">Hubungi Tim Kami</Link>
        </div>
      </section>
    </div>
  )
}

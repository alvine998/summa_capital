import { Link } from 'react-router-dom'
import './style.css'

const stats = [
  { value: 'Rp 2T+', label: 'Aset Dikelola' },
  { value: '500+', label: 'Klien Terpercaya' },
  { value: '15+', label: 'Tahun Pengalaman' },
  { value: '98%', label: 'Tingkat Kepuasan' },
]

const services = [
  {
    icon: '⚖',
    title: 'Lelang Aset',
    desc: 'Platform lelang aset premium dengan proses transparan, aman, dan terpercaya untuk investor profesional.',
    link: '/asset/bid',
    cta: 'Lihat Lelang',
  },
  {
    icon: '✦',
    title: 'Early Access',
    desc: 'Dapatkan akses eksklusif ke aset pilihan sebelum dipublikasikan ke pasar umum.',
    link: '/asset/early-access',
    cta: 'Daftar Sekarang',
  },
  {
    icon: '◈',
    title: 'Manajemen Portofolio',
    desc: 'Pengelolaan portofolio terstruktur dengan strategi berbasis data dan riset mendalam.',
    link: '/about-us',
    cta: 'Pelajari Lebih',
  },
]

const why = [
  { icon: '🛡', title: 'Terpercaya & Teregulasi', desc: 'Terdaftar dan diawasi oleh OJK dengan standar compliance tertinggi.' },
  { icon: '📊', title: 'Berbasis Data', desc: 'Keputusan investasi didukung riset kuantitatif dan analisis pasar mendalam.' },
  { icon: '🤝', title: 'Mitra Jangka Panjang', desc: 'Kami tumbuh bersama klien. Keberhasilan Anda adalah keberhasilan kami.' },
  { icon: '🔐', title: 'Keamanan Aset', desc: 'Sistem keamanan berlapis memastikan aset dan data klien terlindungi.' },
]

export default function Home() {
  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__overlay" />
          <div className="hero__grid" />
        </div>
        <div className="container hero__content">
          <div className="hero__badge">Asset Management Terpercaya</div>
          <h1 className="hero__title">
            Kelola Aset Anda<br />
            <span className="text-gold">Dengan Presisi &amp; Kepercayaan</span>
          </h1>
          <p className="hero__desc">
            Summa Capital hadir sebagai mitra strategis pengelolaan aset Anda.
            Kami menghadirkan solusi investasi profesional, transparan, dan menguntungkan.
          </p>
          <div className="hero__actions">
            <Link to="/asset/bid" className="btn btn--gold">Lihat Aset Lelang</Link>
            <Link to="/about-us" className="btn btn--outline-white">Tentang Kami</Link>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats">
        <div className="container stats__grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Layanan Kami</span>
            <h2 className="section-title">Solusi Investasi <span className="text-gold">Lengkap</span></h2>
            <p className="section-desc">Kami menyediakan berbagai instrumen dan layanan pengelolaan aset untuk memenuhi kebutuhan investasi Anda.</p>
          </div>
          <div className="services__grid">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <Link to={s.link} className="service-card__link">{s.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="section why">
        <div className="container why__inner">
          <div className="why__left">
            <span className="section-badge">Mengapa Summa Capital</span>
            <h2 className="section-title">Pondasi Kuat<br /><span className="text-gold">Untuk Masa Depan</span></h2>
            <p className="section-desc">
              Selama lebih dari satu dekade, Summa Capital telah menjadi pilihan utama investor institusional dan individu dalam mengelola aset secara profesional.
            </p>
            <Link to="/about-us" className="btn btn--gold" style={{ marginTop: '1.5rem' }}>Kenali Kami</Link>
          </div>
          <div className="why__right">
            {why.map((w) => (
              <div key={w.title} className="why-item">
                <div className="why-item__icon">{w.icon}</div>
                <div>
                  <h4 className="why-item__title">{w.title}</h4>
                  <p className="why-item__desc">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">Siap Memulai Perjalanan Investasi Anda?</h2>
            <p className="cta-banner__desc">Konsultasikan kebutuhan investasi Anda dengan tim ahli kami hari ini.</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn btn--white">Hubungi Kami</Link>
            <Link to="/asset/bid" className="btn btn--outline-white">Lihat Aset</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

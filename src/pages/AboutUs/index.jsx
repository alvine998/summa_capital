import { Link } from 'react-router-dom'
import '../PageShared.css'
import './style.css'

const team = [
  { name: 'Ahmad Suryadi', role: 'Chief Executive Officer', initials: 'AS' },
  { name: 'Dewi Rahayu', role: 'Chief Investment Officer', initials: 'DR' },
  { name: 'Budi Santoso', role: 'Head of Portfolio Management', initials: 'BS' },
  { name: 'Siti Nurhaliza', role: 'Head of Risk Management', initials: 'SN' },
]

const milestones = [
  { year: '2008', event: 'Summa Capital didirikan di Jakarta' },
  { year: '2012', event: 'Mendapat lisensi resmi OJK sebagai Manajer Investasi' },
  { year: '2016', event: 'Aset Under Management melampaui Rp 500 Miliar' },
  { year: '2019', event: 'Peluncuran platform digital Lelang Aset' },
  { year: '2022', event: 'Ekspansi ke 5 kota besar di Indonesia' },
  { year: '2024', event: 'AUM mencapai lebih dari Rp 2 Triliun' },
]

export default function AboutUs() {
  return (
    <div className="page">
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Tentang Kami</span>
          <h1 className="page-hero__title">Membangun Kepercayaan<br /><span className="text-gold">Sejak 2008</span></h1>
          <p className="page-hero__desc">
            Summa Capital adalah perusahaan manajemen aset terkemuka yang berdedikasi menghadirkan solusi investasi terbaik bagi klien institusional dan individual.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section">
        <div className="container mv-grid">
          <div className="mv-card mv-card--gold">
            <div className="mv-card__icon">🎯</div>
            <h3 className="mv-card__title">Misi</h3>
            <p className="mv-card__text">
              Memberikan solusi manajemen aset yang transparan, profesional, dan menguntungkan untuk memaksimalkan nilai investasi klien dengan integritas tertinggi.
            </p>
          </div>
          <div className="mv-card">
            <div className="mv-card__icon">🔭</div>
            <h3 className="mv-card__title">Visi</h3>
            <p className="mv-card__text">
              Menjadi perusahaan manajemen aset terdepan di Asia Tenggara yang dikenal atas keunggulan, inovasi, dan kepercayaan klien.
            </p>
          </div>
          <div className="mv-card">
            <div className="mv-card__icon">⚖️</div>
            <h3 className="mv-card__title">Nilai</h3>
            <p className="mv-card__text">
              Integritas, Transparansi, Inovasi, dan Pertumbuhan Berkelanjutan menjadi fondasi setiap keputusan dan tindakan kami.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="section bg-light">
        <div className="container story-grid">
          <div className="story__text">
            <span className="section-badge">Cerita Kami</span>
            <h2 className="section-title">Perjalanan <span className="text-gold">Summa Capital</span></h2>
            <p style={{ color: '#6A6A6A', lineHeight: 1.75, marginBottom: '1rem' }}>
              Berawal dari visi sederhana untuk menghadirkan pengelolaan aset berkelas institusi bagi semua kalangan investor, Summa Capital hadir sebagai jembatan antara peluang investasi berkualitas dan kepercayaan klien.
            </p>
            <p style={{ color: '#6A6A6A', lineHeight: 1.75 }}>
              Dengan tim profesional berpengalaman dan teknologi terkini, kami telah berhasil mengelola lebih dari Rp 2 Triliun aset dan melayani ratusan klien dari berbagai latar belakang.
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

      {/* ── Team ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Tim Kami</span>
            <h2 className="section-title">Para <span className="text-gold">Profesional</span> di Balik Layar</h2>
            <p className="section-desc">Tim kami terdiri dari para ahli keuangan, investasi, dan manajemen risiko berpengalaman.</p>
          </div>
          <div className="team-grid">
            {team.map((t) => (
              <div key={t.name} className="team-card">
                <div className="team-card__avatar">{t.initials}</div>
                <h4 className="team-card__name">{t.name}</h4>
                <p className="team-card__role">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-cta">
        <div className="container page-cta__inner">
          <h2 className="page-cta__title">Ingin Berkolaborasi?</h2>
          <p className="page-cta__desc">Hubungi tim kami untuk diskusi lebih lanjut tentang kebutuhan investasi Anda.</p>
          <Link to="/contact" className="btn btn--white">Hubungi Kami</Link>
        </div>
      </section>
    </div>
  )
}

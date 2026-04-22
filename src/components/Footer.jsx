import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import './Footer.css'

const links = {
  Navigasi: [
    { label: 'Beranda', to: '/' },
    { label: 'Tentang Kami', to: '/about-us' },
    { label: 'Hubungi Kami', to: '/contact' },
    { label: 'Galeri', to: '/gallery' },
  ],
  Layanan: [
    { label: 'Lelang Aset', to: '/asset/bid' },
    { label: 'Early Access', to: '/asset/early-access' },
    { label: 'Manajemen Portofolio', to: '/about-us' },
    { label: 'Konsultasi Investasi', to: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">SC</span>
              <span className="footer__logo-text">Summa <strong>Capital</strong></span>
            </Link>
            <p className="footer__brand-desc">
              Perusahaan manajemen aset terkemuka yang berdedikasi menghadirkan solusi investasi profesional, transparan, dan menguntungkan.
            </p>
            <div className="footer__badge">
              <span>🏛</span> Terdaftar &amp; Diawasi OJK
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="footer__col">
              <h4 className="footer__col-title">{group}</h4>
              <ul className="footer__col-list">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} className="footer__link">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Kontak</h4>
            <ul className="footer__col-list footer__contact-list">
              <li><MapPin className="footer__contact-icon" size={18} /> Jl. Jenderal Sudirman No. 28, Jakarta Selatan</li>
              <li><Phone className="footer__contact-icon" size={18} /> +62 21 5790 0000</li>
              <li><Mail className="footer__contact-icon" size={18} /> info@summacapital.co.id</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">© {new Date().getFullYear()} Summa Capital. All rights reserved.</p>
          <div className="footer__legal">
            <span>Kebijakan Privasi</span>
            <span>·</span>
            <span>Syarat &amp; Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

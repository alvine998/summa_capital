import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import "./Footer.css";

const links = {
  Navigation: [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about-us" },
    { label: "Contact Us", to: "/contact" },
    { label: "Gallery", to: "/gallery" },
  ],
  Services: [
    { label: "Asset Auction", to: "/asset/bid" },
    { label: "Early Access", to: "/asset/early-access" },
    { label: "Portfolio Management", to: "/about-us" },
    { label: "Investment Consultation", to: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">
                <img
                  src="/images/logo.png"
                  alt="Summa Capital Logo"
                  className="footer__logo-icon-img"
                />
              </span>
              <span className="footer__logo-text">
                Summa <strong>Capital</strong>
              </span>
            </Link>
            <p className="footer__brand-desc">
              We specialize in acquiring, restructuring, and monetizing
              distressed assets through strategic capital and execution.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="footer__col">
              <h4 className="footer__col-title">{group}</h4>
              <ul className="footer__col-list">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="footer__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__col-list footer__contact-list">
              <li>
                <MapPin className="footer__contact-icon" size={18} /> Jl.
                Jenderal Sudirman No. 28, Jakarta Selatan
              </li>
              <li>
                <Phone className="footer__contact-icon" size={18} /> +62 21 5790
                0000
              </li>
              <li>
                <Mail className="footer__contact-icon" size={18} />{" "}
                info@summacapital.co.id
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Summa Capital. All rights reserved.
          </p>
          <div className="footer__legal">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

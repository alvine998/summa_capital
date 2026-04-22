import { Link } from "react-router-dom";
import {
  Scale,
  Sparkles,
  Briefcase,
  Shield,
  BarChart3,
  Handshake,
  Lock,
} from "lucide-react";
import "./style.css";

const stats = [
  { value: 'IDR 2T+', label: 'Assets Managed' },
  { value: '500+', label: 'Trusted Clients' },
  { value: '15+', label: 'Years of Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const services = [
  {
    icon: Scale,
    title: 'Asset Auction',
    desc: 'A premium asset auction platform with a transparent, secure, and trusted process for professional investors.',
    link: '/asset/bid',
    cta: 'View Auctions',
  },
  {
    icon: Sparkles,
    title: 'Early Access',
    desc: 'Get exclusive access to selected assets before they are released to the general market.',
    link: '/asset/early-access',
    cta: 'Register Now',
  },
  {
    icon: Briefcase,
    title: 'Portfolio Management',
    desc: 'Structured portfolio management with data-driven strategies and in-depth research.',
    link: '/about-us',
    cta: 'Learn More',
  },
];

const why = [
  {
    icon: Shield,
    title: 'Trusted & Regulated',
    desc: 'Registered and supervised by OJK with the highest compliance standards.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven',
    desc: 'Investment decisions supported by quantitative research and in-depth market analysis.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partner',
    desc: 'We grow together with our clients. Your success is our success.',
  },
  {
    icon: Lock,
    title: 'Asset Security',
    desc: 'Multi-layered security systems ensure client assets and data are fully protected.',
  },
];

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
          <div className="hero__badge">Distressed Asset & Capital Platform</div>
          <h1 className="hero__title">
            Indonesia Holds Trillions in Idle Assets
            <br />
            <span className="text-gold">
              We Turn Them into Profitable Investments
            </span>
          </h1>
          <p className="hero__desc">
            We specialize in acquiring, restructuring, and monetizing distressed
            assets through strategic capital and execution.
          </p>
          <div className="hero__actions">
            <Link to="/asset/bid" className="btn btn--gold">
              View Opportunities
            </Link>
            <Link to="/about-us" className="btn btn--outline-white">
              About Us
            </Link>
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
            <span className="section-badge">Our Services</span>
            <h2 className="section-title">
              Complete <span className="text-gold">Investment Solutions</span>
            </h2>
            <p className="section-desc">
              We provide a range of asset management instruments and services to meet your investment needs.
            </p>
          </div>
          <div className="services__grid">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <s.icon className="service-card__icon" size={32} />
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <Link to={s.link} className="service-card__link">
                  {s.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="section why">
        <div className="container why__inner">
          <div className="why__left">
            <span className="section-badge">Why Summa Capital</span>
            <h2 className="section-title">
              A Strong Foundation
              <br />
              <span className="text-gold">For the Future</span>
            </h2>
            <p className="section-desc">
              For over a decade, Summa Capital has been the preferred choice of institutional and individual investors for professional asset management.
            </p>
            <Link
              to="/about-us"
              className="btn btn--gold"
              style={{ marginTop: "1.5rem" }}
            >
              Get to Know Us
            </Link>
          </div>
          <div className="why__right">
            {why.map((w) => (
              <div key={w.title} className="why-item">
                <w.icon className="why-item__icon" size={28} />
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
            <h2 className="cta-banner__title">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="cta-banner__desc">
              Consult your investment needs with our expert team today.
            </p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn btn--white">
              Contact Us
            </Link>
            <Link to="/asset/bid" className="btn btn--outline-white">
              View Assets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

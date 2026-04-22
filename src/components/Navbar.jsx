import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [assetOpen, setAssetOpen] = useState(false)
  const closeTimeoutRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    setAssetOpen(false)
  }

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setAssetOpen(false)
    }, 100)
  }

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setAssetOpen(true)
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMobile}>
          <img src="/images/logo.png" alt="Summa Capital Logo" className="navbar__logo-icon" />
          <span className="navbar__logo-text">
            Summa <strong>Capital</strong>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/about-us" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
            About Us
          </NavLink>

          {/* Dropdown */}
          <div
            className="nav-dropdown"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button className={`nav-link nav-dropdown__trigger${assetOpen ? ' nav-link--active' : ''}`}>
              Asset <span className="nav-dropdown__caret">▾</span>
            </button>
            <div className={`nav-dropdown__menu${assetOpen ? ' nav-dropdown__menu--open' : ''}`}>
              <NavLink to="/asset/bid" className="nav-dropdown__item" onClick={() => setAssetOpen(false)}>
                <span className="nav-dropdown__item-icon">⚖</span>
                <span>
                  <strong>Auction</strong>
                  <small>Participate in asset bidding</small>
                </span>
              </NavLink>
              <NavLink to="/asset/early-access" className="nav-dropdown__item" onClick={() => setAssetOpen(false)}>
                <span className="nav-dropdown__item-icon">✦</span>
                <span>
                  <strong>Early Access</strong>
                  <small>Exclusive early access</small>
                </span>
              </NavLink>
              <NavLink to="/asset/sebaran" className="nav-dropdown__item" onClick={() => setAssetOpen(false)}>
                <span className="nav-dropdown__item-icon">◎</span>
                <span>
                  <strong>Asset Distribution</strong>
                  <small>Asset location map</small>
                </span>
              </NavLink>
            </div>
          </div>

          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
            Contact Us
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
            Gallery
          </NavLink>
        </nav>

        <Link to="/consultation" className="navbar__cta">Free Consultation</Link>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`}>
        <NavLink to="/" end className="mobile-link" onClick={closeMobile}>Home</NavLink>
        <NavLink to="/about-us" className="mobile-link" onClick={closeMobile}>About Us</NavLink>

        <button className="mobile-link mobile-link--group" onClick={() => setAssetOpen(v => !v)}>
          Asset <span className="nav-dropdown__caret">{assetOpen ? '▴' : '▾'}</span>
        </button>
        {assetOpen && (
          <div className="mobile-submenu">
            <NavLink to="/asset/bid" className="mobile-link mobile-link--sub" onClick={closeMobile}>Auction</NavLink>
            <NavLink to="/asset/early-access" className="mobile-link mobile-link--sub" onClick={closeMobile}>Early Access</NavLink>
            <NavLink to="/asset/sebaran" className="mobile-link mobile-link--sub" onClick={closeMobile}>Asset Distribution</NavLink>
          </div>
        )}

        <NavLink to="/contact" className="mobile-link" onClick={closeMobile}>Contact Us</NavLink>
        <NavLink to="/gallery" className="mobile-link" onClick={closeMobile}>Gallery</NavLink>
        <Link to="/consultation" className="mobile-cta" onClick={closeMobile}>Free Consultation</Link>
      </div>
    </header>
  )
}

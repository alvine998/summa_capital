import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Map, CheckCircle } from 'lucide-react'
import '../PageShared.css'
import './style.css'

const contacts = [
  { icon: MapPin, label: 'Alamat', value: 'Jl. Jenderal Sudirman No. 28, Karet Semanggi, Jakarta Selatan 12920' },
  { icon: Phone, label: 'Telepon', value: '+62 21 5790 0000' },
  { icon: Mail, label: 'Email', value: 'info@summacapital.co.id' },
  { icon: Clock, label: 'Jam Operasional', value: 'Senin – Jumat, 08:00 – 17:00 WIB' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Hubungi Kami</span>
          <h1 className="page-hero__title">Kami Siap<br /><span className="text-gold">Membantu Anda</span></h1>
          <p className="page-hero__desc">Konsultasikan kebutuhan investasi Anda bersama tim ahli Summa Capital. Kami akan memberikan respons dalam 1×24 jam.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2 className="contact-info__title">Informasi Kontak</h2>
            <p className="contact-info__desc">Hubungi kami melalui salah satu channel di bawah ini atau kirim pesan melalui formulir.</p>
            <div className="contact-items">
              {contacts.map(c => (
                <div key={c.label} className="contact-item">
                  <div className="contact-item__icon"><c.icon size={24} /></div>
                  <div>
                    <div className="contact-item__label">{c.label}</div>
                    <div className="contact-item__value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-socials">
              <p className="contact-socials__label">Ikuti Kami</p>
              <div className="contact-socials__links">
                {['LinkedIn', 'Instagram', 'Twitter/X'].map(s => (
                  <span key={s} className="social-chip">{s}</span>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="map-placeholder">
              <div className="map-placeholder__inner">
                <Map size={32} />
                <span>Jl. Jenderal Sudirman, Jakarta</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            <div className="contact-form-card">
              {submitted ? (
                <div className="form-success">
                  <CheckCircle className="form-success__icon" size={48} />
                  <h3 className="form-success__title">Pesan Terkirim!</h3>
                  <p className="form-success__desc">Terima kasih telah menghubungi kami. Tim kami akan merespons dalam 1×24 jam.</p>
                  <button className="btn btn--gold" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(false)}>
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3 className="contact-form__title">Kirim Pesan</h3>
                  <p className="contact-form__sub">Isi formulir di bawah dan tim kami akan segera menghubungi Anda.</p>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nama Lengkap *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Masukkan nama Anda"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">No. Telepon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+62 8xx xxxx xxxx"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subjek *</label>
                      <select name="subject" required value={form.subject} onChange={handleChange} className="form-input form-select">
                        <option value="">Pilih subjek</option>
                        <option>Konsultasi Investasi</option>
                        <option>Informasi Lelang</option>
                        <option>Early Access Program</option>
                        <option>Kerjasama</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pesan *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="form-input form-textarea"
                      placeholder="Ceritakan kebutuhan investasi Anda..."
                    />
                  </div>

                  <button type="submit" className="btn btn--gold form-submit">Kirim Pesan</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

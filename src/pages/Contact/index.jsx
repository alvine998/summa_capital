import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import "../PageShared.css";
import "./style.css";

const contacts = [
  {
    icon: MapPin,
    label: "Address",
    value:
      "Jl. Mega Kuningan Barat No.3 5, RT.5/RW.2, Kuningan, Kuningan Tim., Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12949",
  },
  { icon: Phone, label: "Phone", value: "+62 813 2298 6243" },
  { icon: Mail, label: "Email", value: "info@summacapital.id" },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday – Friday, 08:00 – 17:00 WIB",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Contact Us</span>
          <h1 className="page-hero__title">
            We Are Here
            <br />
            <span className="text-gold">To Help You</span>
          </h1>
          <p className="page-hero__desc">
            Consult your investment needs with the Summa Capital expert team. We
            respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2 className="contact-info__title">Contact Information</h2>
            <p className="contact-info__desc">
              Reach us through any of the channels below or send a message via
              the form.
            </p>
            <div className="contact-items">
              {contacts.map((c) => (
                <div key={c.label} className="contact-item">
                  <div className="contact-item__icon">
                    <c.icon size={24} />
                  </div>
                  <div>
                    <div className="contact-item__label">{c.label}</div>
                    <div className="contact-item__value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-socials">
              <p className="contact-socials__label">Follow Us</p>
              <div className="contact-socials__links">
                {["LinkedIn", "Instagram", "Twitter/X"].map((s) => (
                  <span key={s} className="social-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.274877825399!2d106.82164797499041!3d-6.227444193760667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4ac2fa421%3A0x2de3d495cc84d79d!2sThe%20Bellagio%20Boutique%20Mall!5e0!3m2!1sid!2sid!4v1776940375976!5m2!1sid!2sid"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            <div className="contact-form-card">
              {submitted ? (
                <div className="form-success">
                  <CheckCircle className="form-success__icon" size={48} />
                  <h3 className="form-success__title">Message Sent!</h3>
                  <p className="form-success__desc">
                    Thank you for reaching out. Our team will respond within 24
                    hours.
                  </p>
                  <button
                    className="btn btn--gold"
                    style={{ marginTop: "1.5rem" }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3 className="contact-form__title">Send a Message</h3>
                  <p className="contact-form__sub">
                    Fill in the form below and our team will get back to you
                    shortly.
                  </p>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your name"
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
                      <label className="form-label">Phone Number</label>
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
                      <label className="form-label">Subject *</label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="form-input form-select"
                      >
                        <option value="">Select a subject</option>
                        <option>Investment Consultation</option>
                        <option>Auction Information</option>
                        <option>Early Access Program</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="form-input form-textarea"
                      placeholder="Tell us about your investment needs..."
                    />
                  </div>

                  <button type="submit" className="btn btn--gold form-submit">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Image as ImageIcon, ZoomIn } from "lucide-react";
import "../PageShared.css";
import "./style.css";

const initialGalleryItems = [
  {
    id: 1,
    cat: "Property",
    title: "Commercial Building Jakarta",
    desc: "Premium asset in the South Jakarta business district",
    size: "large",
    images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"],
    totalSize: 2.5
  },
  {
    id: 2,
    cat: "Event",
    title: "Investment Summit 2024",
    desc: "Summa Capital annual investment forum",
    images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"],
    totalSize: 3.1
  },
  {
    id: 3,
    cat: "Property",
    title: "Mixed-Use Development Surabaya",
    desc: "Integrated township development project",
    images: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80"],
    totalSize: 2.8
  },
  {
    id: 4,
    cat: "Team",
    title: "Annual Meeting 2025",
    desc: "Summa Capital annual management team gathering",
    size: "large",
    images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"],
    totalSize: 2.9
  },
  {
    id: 5,
    cat: "Event",
    title: "Client Appreciation Night",
    desc: "A night to celebrate our loyal Summa Capital clients",
    images: ["https://images.unsplash.com/photo-1519671482677-1a2ca32e4a81?w=800&q=80"],
    totalSize: 3.2
  },
  {
    id: 6,
    cat: "Portfolio",
    title: "Eco Resort Lombok",
    desc: "Premium hospitality property in Lombok",
    images: ["https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=800&q=80"],
    totalSize: 2.7
  },
  {
    id: 7,
    cat: "Property",
    title: "Bekasi Industrial Estate",
    desc: "Strategic industrial land on the east Jakarta corridor",
    images: ["https://images.unsplash.com/photo-1494145904049-0dca7dc54c2e?w=800&q=80"],
    totalSize: 2.6
  },
  {
    id: 8,
    cat: "Team",
    title: "Office Culture",
    desc: "Professional work culture of the Summa Capital team",
    images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"],
    totalSize: 2.4
  },
  {
    id: 9,
    cat: "Portfolio",
    title: "Data Center West Jakarta",
    desc: "Future-ready technology property investment",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
    totalSize: 3.0
  },
];

const colors = [
  ["#C9A84C", "#8B5E3C"],
  ["#2D2D2D", "#C9A84C"],
  ["#4A4A4A", "#E5C97E"],
  ["#1A1A1A", "#A8843D"],
  ["#6B6B6B", "#C9A84C"],
  ["#3D3D3D", "#E5C97E"],
  ["#C9A84C", "#1A1A1A"],
  ["#2D2D2D", "#E5C97E"],
  ["#4A4A4A", "#C9A84C"],
];

export default function Gallery() {
  const [items] = useState(initialGalleryItems);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = ["All", ...new Set(items.map(i => i.cat))];
  const filtered = filter === "All" ? items : items.filter(i => i.cat === filter);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Gallery</span>
          <h1 className="page-hero__title">
            Our Journey &amp; Milestones
            <br />
            <span className="text-gold">at Summa Capital</span>
          </h1>
          <p className="page-hero__desc">
            A curated collection of moments, assets, and achievements by Summa
            Capital.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter${filter === cat ? " gallery-filter--active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="gallery-grid">
            {filtered.map((item) => {
              const [bg, accent] = colors[item.id - 1] || colors[0];
              return (
                <div
                  key={item.id}
                  className={`gallery-card${item.size === "large" ? " gallery-card--large" : ""}`}
                  onClick={() => setLightbox(item)}
                >
                  <div className="gallery-card__img">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="gallery-card__pattern" />
                  </div>
                  <div className="gallery-card__info">
                    <h4 className="gallery-card__title">{item.title}</h4>
                    <p className="gallery-card__desc">{item.desc}</p>
                  </div>
                  <div className="gallery-card__overlay">
                    <ZoomIn size={24} />
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <ImageIcon className="empty-state__icon" size={48} />
              <p>No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox__card" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox__close"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
            <div className="lightbox__gallery-images">
              {lightbox.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${lightbox.title} ${idx + 1}`}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              ))}
            </div>
            <div className="lightbox__content">
              <h3 className="lightbox__title">{lightbox.title}</h3>
              <p className="lightbox__desc">{lightbox.desc}</p>
              <span className="lightbox__meta">{lightbox.totalSize} MB • {lightbox.images.length} image{lightbox.images.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

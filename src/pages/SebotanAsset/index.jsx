import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { X, MapPin, TrendingUp, Calendar, Ruler, Tag, ChevronRight } from 'lucide-react'
import '../PageShared.css'
import './style.css'

// Fix default marker icons (Leaflet + Vite issue)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const statusColor = {
  Auction: '#C9A84C',
  'Early Access': '#A8843D',
  Sold: '#6B6B6B',
  Available: '#2E7D32',
}

const assets = [
  {
    id: 1,
    title: 'Gedung Komersial Sudirman',
    type: 'Properti Komersial',
    status: 'Auction',
    lat: -6.2088,
    lng: 106.8456,
    location: 'Jl. Jenderal Sudirman, South Jakarta',
    value: 'IDR 85,000,000,000',
    area: '2,400 m²',
    return: '12–16% p.a.',
    deadline: 'May 30, 2026',
    desc: '12-story office building on the Sudirman business corridor. 95% occupancy rate, multinational tenants.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Superblok Residensial Bekasi Timur',
    type: 'Properti Residensial',
    status: 'Early Access',
    lat: -6.2383,
    lng: 106.9756,
    location: 'East Bekasi, West Java',
    value: 'IDR 95,000,000,000',
    area: '5,600 m²',
    return: '14–18% p.a.',
    deadline: 'June 15, 2026',
    desc: 'Premium residential complex with complete facilities. Strategic location near toll road and commuter rail station.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Eco Resort Pantai Kuta',
    type: 'Properti Hospitality',
    status: 'Auction',
    lat: -8.7195,
    lng: 115.1686,
    location: 'Kuta, Bali',
    value: 'IDR 68,000,000,000',
    area: '3,200 m²',
    return: '18–24% p.a.',
    deadline: 'June 20, 2026',
    desc: 'Beachfront resort with 48 villas. Average occupancy 87%, certified by international eco-tourism standards.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Mixed-Use Development Surabaya',
    type: 'Properti Komersial',
    status: 'Early Access',
    lat: -7.2575,
    lng: 112.7521,
    location: 'Central Surabaya, East Java',
    value: 'IDR 175,000,000,000',
    area: '8,900 m²',
    return: '12–16% p.a.',
    deadline: 'July 10, 2026',
    desc: 'Integrated township (hotel, retail, apartments) in the heart of Surabaya. Projected rental income IDR 18B/year.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Data Center Jakarta Barat',
    type: 'Properti Teknologi',
    status: 'Early Access',
    lat: -6.1751,
    lng: 106.7914,
    location: 'Kebon Jeruk, West Jakarta',
    value: 'IDR 220,000,000,000',
    area: '4,100 m²',
    return: '16–22% p.a.',
    deadline: 'July 25, 2026',
    desc: 'Tier-3 data center facility with 800-rack capacity. Long-term contracts with global hyperscalers.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Kawasan Industri Karawang',
    type: 'Properti Industri',
    status: 'Auction',
    lat: -6.3213,
    lng: 107.3006,
    location: 'Karawang, West Java',
    value: 'IDR 142,000,000,000',
    area: '18,000 m²',
    return: '10–14% p.a.',
    deadline: 'August 5, 2026',
    desc: 'Ready-to-build industrial land in a strategic zone on the Jakarta–Bandung corridor. 20 MVA power supply available.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
  },
  {
    id: 7,
    title: 'Ruko Premium Dago',
    type: 'Properti Komersial',
    status: 'Available',
    lat: -6.8936,
    lng: 107.6100,
    location: 'Dago, Bandung, West Java',
    value: 'IDR 28,000,000,000',
    area: '720 m²',
    return: '9–12% p.a.',
    deadline: 'August 30, 2026',
    desc: 'Row of 3-story shophouses on the Dago culinary & fashion corridor. 100% occupancy, 3-year lease contracts.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
  },
  {
    id: 8,
    title: 'Hotel Boutique Malioboro',
    type: 'Properti Hospitality',
    status: 'Auction',
    lat: -7.7956,
    lng: 110.3695,
    location: 'Malioboro, Yogyakarta',
    value: 'IDR 52,000,000,000',
    area: '2,100 m²',
    return: '15–19% p.a.',
    deadline: 'September 12, 2026',
    desc: '60-room boutique hotel in the Malioboro tourist area. Average RevPAR IDR 480,000/night.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
  },
  {
    id: 9,
    title: 'Perkebunan Kelapa Sawit Medan',
    type: 'Properti Agribisnis',
    status: 'Available',
    lat: 3.5952,
    lng: 98.6722,
    location: 'Deli Serdang, North Sumatra',
    value: 'IDR 110,000,000,000',
    area: '450 ha',
    return: '11–15% p.a.',
    deadline: 'September 20, 2026',
    desc: 'Productive palm oil plantation with a CPO processing mill. Annual production of 18,000 tons of Fresh Fruit Bunches.',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop',
  },
  {
    id: 10,
    title: 'Apartemen Waterfront Makassar',
    type: 'Properti Residensial',
    status: 'Early Access',
    lat: -5.1477,
    lng: 119.4327,
    location: 'CPI Makassar, South Sulawesi',
    value: 'IDR 78,000,000,000',
    area: '3,800 m²',
    return: '13–17% p.a.',
    deadline: 'October 1, 2026',
    desc: 'Waterfront apartment with 270° ocean views. 180 units, resort-style facilities within the complex.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
  },
  {
    id: 11,
    title: 'Pusat Logistik Semarang',
    type: 'Properti Industri',
    status: 'Auction',
    lat: -6.9932,
    lng: 110.4203,
    location: 'Tanjung Emas, Semarang, Central Java',
    value: 'IDR 65,000,000,000',
    area: '9,500 m²',
    return: '10–13% p.a.',
    deadline: 'October 15, 2026',
    desc: 'Modern logistics warehouse near Tanjung Emas Port. Storage capacity of 45,000 pallets.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
  },
  {
    id: 12,
    title: 'Vila Cliff Uluwatu',
    type: 'Properti Hospitality',
    status: 'Sold',
    lat: -8.8291,
    lng: 115.0849,
    location: 'Uluwatu, Bali',
    value: 'IDR 42,000,000,000',
    area: '1,600 m²',
    return: '—',
    deadline: '—',
    desc: 'Premium cliffside villa in Uluwatu with an infinity pool overlooking the Indian Ocean. SOLD.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
  },
]

// Custom icon factory
function makeIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker" style="background:${color}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  })
}

function FlyToMarker({ selected }) {
  const map = useMap()
  useEffect(() => {
    if (selected) {
      map.flyTo([selected.lat, selected.lng], 13, { duration: 1.2 })
    }
  }, [selected, map])
  return null
}

export default function SebotanAsset() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  const handleMarkerClick = (asset) => {
    setSelected(asset)
    setPanelOpen(true)
  }

  const closePanel = () => {
    setPanelOpen(false)
    setTimeout(() => setSelected(null), 350)
  }

  return (
    <div className="sebaran-page">
      {/* Page Hero - compact */}
      <div className="sebaran-hero">
        <div className="sebaran-hero__content">
          <span className="section-badge">Asset Distribution</span>
          <h1 className="sebaran-hero__title">Asset Map <span className="text-gold">Summa Capital</span></h1>
          <p className="sebaran-hero__desc">
            {assets.length} assets spread across Indonesia — click a pin to view details.
          </p>
        </div>
        <div className="sebaran-legend">
          {Object.entries(statusColor).map(([label, color]) => (
            <div key={label} className="legend-item">
              <span className="legend-dot" style={{ background: color }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map + Panel wrapper */}
      <div className="sebaran-body">
        <MapContainer
          center={[-3.5, 117.5]}
          zoom={5}
          className="sebaran-map"
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {assets.map(asset => (
            <Marker
              key={asset.id}
              position={[asset.lat, asset.lng]}
              icon={makeIcon(statusColor[asset.status] || '#C9A84C')}
              eventHandlers={{ click: () => handleMarkerClick(asset) }}
            />
          ))}
          <FlyToMarker selected={selected} />
        </MapContainer>

        {/* Sliding Detail Panel */}
        <div className={`asset-panel${panelOpen ? ' asset-panel--open' : ''}`}>
          {selected && (
            <>
              <button className="asset-panel__close" onClick={closePanel} aria-label="Close">
                <X size={20} />
              </button>

              <div className="asset-panel__image-wrap">
                <img src={selected.image} alt={selected.title} className="asset-panel__image" />
                <span
                  className="asset-panel__status-badge"
                  style={{ background: statusColor[selected.status] }}
                >
                  {selected.status}
                </span>
              </div>

              <div className="asset-panel__body">
                <span className="asset-panel__type">{selected.type}</span>
                <h2 className="asset-panel__title">{selected.title}</h2>

                <div className="asset-panel__location">
                  <MapPin size={14} />
                  <span>{selected.location}</span>
                </div>

                <p className="asset-panel__desc">{selected.desc}</p>

                <div className="asset-panel__stats">
                  <div className="stat-row">
                    <Tag size={16} />
                    <div>
                      <span className="stat-label">Estimated Value</span>
                      <span className="stat-value gold">{selected.value}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <TrendingUp size={16} />
                    <div>
                      <span className="stat-label">Projected Return</span>
                      <span className="stat-value">{selected.return}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <Ruler size={16} />
                    <div>
                      <span className="stat-label">Area</span>
                      <span className="stat-value">{selected.area}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <Calendar size={16} />
                    <div>
                      <span className="stat-label">Deadline</span>
                      <span className="stat-value">{selected.deadline}</span>
                    </div>
                  </div>
                </div>

                {selected.status !== 'Sold' && (
                  <button 
                    className="asset-panel__cta"
                    onClick={() => {
                      if (selected.status === 'Auction') {
                        navigate(`/bid/detail/${selected.id}`)
                      } else if (selected.status === 'Early Access') {
                        navigate(`/early-access/detail/${selected.id}`)
                      }
                    }}
                  >
                    View Full Details <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

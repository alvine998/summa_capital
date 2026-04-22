import { useState, useEffect } from 'react'
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
  Lelang: '#C9A84C',
  'Early Access': '#A8843D',
  Terjual: '#6B6B6B',
  Tersedia: '#2E7D32',
}

const assets = [
  {
    id: 1,
    title: 'Gedung Komersial Sudirman',
    type: 'Properti Komersial',
    status: 'Lelang',
    lat: -6.2088,
    lng: 106.8456,
    location: 'Jl. Jenderal Sudirman, Jakarta Selatan',
    value: 'Rp 85.000.000.000',
    area: '2.400 m²',
    return: '12–16% p.a.',
    deadline: '30 Mei 2026',
    desc: 'Gedung perkantoran 12 lantai di koridor bisnis Sudirman. Tingkat hunian 95%, tenant multinasional.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Superblok Residensial Bekasi Timur',
    type: 'Properti Residensial',
    status: 'Early Access',
    lat: -6.2383,
    lng: 106.9756,
    location: 'Bekasi Timur, Jawa Barat',
    value: 'Rp 95.000.000.000',
    area: '5.600 m²',
    return: '14–18% p.a.',
    deadline: '15 Juni 2026',
    desc: 'Kompleks hunian premium dengan fasilitas lengkap. Lokasi strategis dekat tol dan stasiun KRL.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Eco Resort Pantai Kuta',
    type: 'Properti Hospitality',
    status: 'Lelang',
    lat: -8.7195,
    lng: 115.1686,
    location: 'Kuta, Bali',
    value: 'Rp 68.000.000.000',
    area: '3.200 m²',
    return: '18–24% p.a.',
    deadline: '20 Juni 2026',
    desc: 'Resort tepi pantai dengan 48 villa. Okupansi rata-rata 87%, sertifikat eco-tourism internasional.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Mixed-Use Development Surabaya',
    type: 'Properti Komersial',
    status: 'Early Access',
    lat: -7.2575,
    lng: 112.7521,
    location: 'Pusat Kota Surabaya, Jawa Timur',
    value: 'Rp 175.000.000.000',
    area: '8.900 m²',
    return: '12–16% p.a.',
    deadline: '10 Juli 2026',
    desc: 'Kawasan terpadu (hotel, retail, apartemen) di jantung Surabaya. Proyeksi pendapatan sewa Rp 18M/tahun.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Data Center Jakarta Barat',
    type: 'Properti Teknologi',
    status: 'Early Access',
    lat: -6.1751,
    lng: 106.7914,
    location: 'Kebon Jeruk, Jakarta Barat',
    value: 'Rp 220.000.000.000',
    area: '4.100 m²',
    return: '16–22% p.a.',
    deadline: '25 Juli 2026',
    desc: 'Fasilitas data center tier-3 dengan kapasitas 800 rack. Kontrak jangka panjang dengan hyperscaler global.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Kawasan Industri Karawang',
    type: 'Properti Industri',
    status: 'Lelang',
    lat: -6.3213,
    lng: 107.3006,
    location: 'Karawang, Jawa Barat',
    value: 'Rp 142.000.000.000',
    area: '18.000 m²',
    return: '10–14% p.a.',
    deadline: '5 Agustus 2026',
    desc: 'Lahan industri siap bangun di kawasan strategis koridor Jakarta–Bandung. Listrik 20 MVA tersedia.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
  },
  {
    id: 7,
    title: 'Ruko Premium Dago',
    type: 'Properti Komersial',
    status: 'Tersedia',
    lat: -6.8936,
    lng: 107.6100,
    location: 'Dago, Bandung, Jawa Barat',
    value: 'Rp 28.000.000.000',
    area: '720 m²',
    return: '9–12% p.a.',
    deadline: '30 Agustus 2026',
    desc: 'Deretan ruko 3 lantai di koridor kuliner & fashion Dago. Tingkat hunian 100%, kontrak 3 tahun.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
  },
  {
    id: 8,
    title: 'Hotel Boutique Malioboro',
    type: 'Properti Hospitality',
    status: 'Lelang',
    lat: -7.7956,
    lng: 110.3695,
    location: 'Malioboro, Yogyakarta',
    value: 'Rp 52.000.000.000',
    area: '2.100 m²',
    return: '15–19% p.a.',
    deadline: '12 September 2026',
    desc: 'Boutique hotel 60 kamar di kawasan wisata Malioboro. RevPAR rata-rata Rp 480.000/malam.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
  },
  {
    id: 9,
    title: 'Perkebunan Kelapa Sawit Medan',
    type: 'Properti Agribisnis',
    status: 'Tersedia',
    lat: 3.5952,
    lng: 98.6722,
    location: 'Deli Serdang, Sumatera Utara',
    value: 'Rp 110.000.000.000',
    area: '450 ha',
    return: '11–15% p.a.',
    deadline: '20 September 2026',
    desc: 'Perkebunan kelapa sawit produktif dengan pabrik pengolahan CPO. Produksi 18.000 ton TBS/tahun.',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop',
  },
  {
    id: 10,
    title: 'Apartemen Waterfront Makassar',
    type: 'Properti Residensial',
    status: 'Early Access',
    lat: -5.1477,
    lng: 119.4327,
    location: 'CPI Makassar, Sulawesi Selatan',
    value: 'Rp 78.000.000.000',
    area: '3.800 m²',
    return: '13–17% p.a.',
    deadline: '1 Oktober 2026',
    desc: 'Apartemen waterfront dengan pemandangan laut 270°. 180 unit, fasilitas resort dalam kompleks.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
  },
  {
    id: 11,
    title: 'Pusat Logistik Semarang',
    type: 'Properti Industri',
    status: 'Lelang',
    lat: -6.9932,
    lng: 110.4203,
    location: 'Tanjung Emas, Semarang, Jawa Tengah',
    value: 'Rp 65.000.000.000',
    area: '9.500 m²',
    return: '10–13% p.a.',
    deadline: '15 Oktober 2026',
    desc: 'Gudang logistik modern dekat Pelabuhan Tanjung Emas. Kapasitas penyimpanan 45.000 pallet.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
  },
  {
    id: 12,
    title: 'Vila Cliff Uluwatu',
    type: 'Properti Hospitality',
    status: 'Terjual',
    lat: -8.8291,
    lng: 115.0849,
    location: 'Uluwatu, Bali',
    value: 'Rp 42.000.000.000',
    area: '1.600 m²',
    return: '—',
    deadline: '—',
    desc: 'Vila premium tepi tebing di Uluwatu dengan infinity pool menghadap Samudera Hindia. SOLD.',
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
          <span className="section-badge">Sebaran Aset</span>
          <h1 className="sebaran-hero__title">Peta Aset <span className="text-gold">Summa Capital</span></h1>
          <p className="sebaran-hero__desc">
            {assets.length} aset tersebar di seluruh Indonesia — klik penanda untuk melihat detail.
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
              <button className="asset-panel__close" onClick={closePanel} aria-label="Tutup">
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
                      <span className="stat-label">Estimasi Nilai</span>
                      <span className="stat-value gold">{selected.value}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <TrendingUp size={16} />
                    <div>
                      <span className="stat-label">Proyeksi Return</span>
                      <span className="stat-value">{selected.return}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <Ruler size={16} />
                    <div>
                      <span className="stat-label">Luas Area</span>
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

                {selected.status !== 'Terjual' && (
                  <button className="asset-panel__cta">
                    Lihat Detail Lengkap <ChevronRight size={16} />
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

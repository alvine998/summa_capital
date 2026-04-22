import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gem } from 'lucide-react'
import './asset.css'

const assetData = {
  menunggu: [
    { id: 1, title: 'Tanah Premium di Senayan', estimate: 'Rp 5M', deadline: '15 Des 2024' },
    { id: 2, title: 'Apartemen Mewah Jakarta Selatan', estimate: 'Rp 3.2M', deadline: '20 Des 2024' }
  ],
  publish: [
    { id: 3, title: 'Ruko Komersial Bandung', estimate: 'Rp 2.5M', deadline: '10 Des 2024' },
    { id: 4, title: 'Vila Eksklusif Bali', estimate: 'Rp 8M', deadline: '25 Des 2024' },
    { id: 5, title: 'Properti Investasi Surabaya', estimate: 'Rp 1.8M', deadline: '5 Jan 2025' }
  ],
  ditolak: [
    { id: 6, title: 'Kios Kecil di Pasar', estimate: 'Rp 500J', deadline: '1 Des 2024' }
  ]
}

export default function Asset() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('menunggu')

  const tabConfig = [
    { id: 'menunggu', label: 'Menunggu', count: assetData.menunggu.length },
    { id: 'publish', label: 'Publish', count: assetData.publish.length },
    { id: 'ditolak', label: 'Ditolak', count: assetData.ditolak.length }
  ]

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Gem className="inline-icon" size={28} /> Asset Management</h1>
          <button className="add-btn" onClick={() => navigate('/office/asset/create')}>
            + Tambah Asset
          </button>
        </div>
      </div>

      <div className="office-content">
        <div className="tabs">
          {tabConfig.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-badge">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="asset-grid">
          {assetData[activeTab].map(item => (
            <div key={item.id} className="asset-card">
              <div className="asset-image">
                <img src={`https://images.unsplash.com/photo-${item.id}?w=400&h=300&fit=crop`} alt={item.title} />
              </div>
              <div className="asset-content">
                <h3 className="asset-title">{item.title}</h3>
                <div className="asset-info">
                  <div className="info-item">
                    <span className="info-label">Estimasi</span>
                    <span className="info-value">{item.estimate}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Deadline</span>
                    <span className="info-value">{item.deadline}</span>
                  </div>
                </div>
                <div className="asset-actions">
                  <button className="action-btn edit" onClick={() => navigate(`/office/asset/edit/${item.id}`)}>
                    Edit
                  </button>
                  <button className="action-btn delete">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

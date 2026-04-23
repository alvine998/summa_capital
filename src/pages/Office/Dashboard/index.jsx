import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Activity, Users, TrendingUp, Mail, Gem, User, Image, Settings, MessageCircle, FileText, Hand } from 'lucide-react'
import Chart from 'react-apexcharts'
import './style.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  // Asset Trends Data
  const assetTrendsOptions = {
    chart: {
      type: 'line',
      toolbar: { show: true },
      background: 'transparent'
    },
    stroke: { curve: 'smooth', width: 2 },
    colors: ['#C9A84C'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#666' } }
    },
    yaxis: {
      labels: { style: { colors: '#666' } }
    },
    grid: { borderColor: '#e0e0e0' },
    tooltip: { theme: 'light' }
  }

  const assetTrendsSeries = [
    {
      name: 'Active Assets',
      data: [3, 4, 5, 5, 6, 6]
    }
  ]

  // Asset Distribution Data
  const assetDistributionOptions = {
    chart: { type: 'donut' },
    labels: ['Available', 'Auction', 'Early Access', 'Sold'],
    colors: ['#2E7D32', '#C9A84C', '#A8843D', '#6B6B6B'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    },
    tooltip: { theme: 'light' }
  }

  const assetDistributionSeries = [45, 30, 15, 10]

  // User Growth Data
  const userGrowthOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
      background: 'transparent'
    },
    colors: ['#A8843D'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#666' } }
    },
    yaxis: {
      labels: { style: { colors: '#666' } }
    },
    grid: { borderColor: '#e0e0e0' },
    tooltip: { theme: 'light' }
  }

  const userGrowthSeries = [
    {
      name: 'New Users',
      data: [25, 35, 42, 50, 60, 75]
    }
  ]

  useEffect(() => {
    const token = localStorage.getItem('summacapital_token')
    const userData = localStorage.getItem('summacapital_user')

    if (!token || !userData) {
      navigate('/office/login')
      return
    }

    setUser(JSON.parse(userData))
  }, [navigate])

  if (!user) return <div className="dashboard-loading">Loading...</div>

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Activity className="inline-icon" size={28} /> Dashboard</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="dashboard-welcome">
          <h2>Welcome, {user.name}! <Hand className="wave-icon" size={24} /></h2>
          <p>Manage content and assets of Summa Capital from here.</p>
        </div>

        <div className="dashboard-grid">
          {/* Stats */}
          <div className="dashboard-stats">
            <div className="stat-box">
              <Activity className="stat-icon" size={24} />
              <h3>6</h3>
              <p>Active Assets</p>
            </div>
            <div className="stat-box">
              <Users className="stat-icon" size={24} />
              <h3>234</h3>
              <p>Registered Users</p>
            </div>
            <div className="stat-box">
              <TrendingUp className="stat-icon" size={24} />
              <h3>Rp 2T+</h3>
              <p>Total AUM</p>
            </div>
            <div className="stat-box">
              <Mail className="stat-icon" size={24} />
              <h3>12</h3>
              <p>New Messages</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="dashboard-charts">
            {/* Asset Trends */}
            <div className="chart-card">
              <h3>Asset Trends (6 Months)</h3>
              <Chart options={assetTrendsOptions} series={assetTrendsSeries} type="line" height={300} />
            </div>

            {/* Asset Distribution */}
            <div className="chart-card">
              <h3>Asset Distribution by Status</h3>
              <Chart options={assetDistributionOptions} series={assetDistributionSeries} type="donut" height={300} />
            </div>

            {/* User Growth */}
            <div className="chart-card">
              <h3>User Growth (6 Months)</h3>
              <Chart options={userGrowthOptions} series={userGrowthSeries} type="bar" height={300} />
            </div>
          </div>

          {/* Menu */}
          <div className="dashboard-menu">
            <h3>Management Menu</h3>
            <div className="menu-grid">
              <button onClick={() => navigate('/office/asset')} className="menu-item">
                <Gem size={24} />
                <span>Manage Assets</span>
              </button>
              <button onClick={() => navigate('/office/pengguna')} className="menu-item">
                <User size={24} />
                <span>Manage Users</span>
              </button>
              <button onClick={() => navigate('/office/galeri')} className="menu-item">
                <Image size={24} />
                <span>Manage Gallery</span>
              </button>
              <button onClick={() => navigate('/office/pengaturan')} className="menu-item">
                <Settings size={24} />
                <span>Settings</span>
              </button>
              <button className="menu-item" disabled>
                <MessageCircle size={24} />
                <span>Questions</span>
              </button>
              <button className="menu-item" disabled>
                <FileText size={24} />
                <span>Reports</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-time">2 hours ago</span>
                <span className="activity-text">New asset added: Commercial Building Jakarta</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">5 hours ago</span>
                <span className="activity-text">New user registered: user@example.com</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">1 day ago</span>
                <span className="activity-text">Auction closed: Bekasi Industrial Estate</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">2 days ago</span>
                <span className="activity-text">Gallery updated with 5 new photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

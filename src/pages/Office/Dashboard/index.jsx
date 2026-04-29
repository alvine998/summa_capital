import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Activity, Users, TrendingUp, Mail, Gem, User, Image, Settings, MessageCircle, FileText, Hand } from 'lucide-react'
import Chart from 'react-apexcharts'
import { dashboardService, activityLogService } from '../../../services/dashboardService'
import './style.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [assetTrends, setAssetTrends] = useState({ labels: [], data: [] })
  const [assetDistribution, setAssetDistribution] = useState({ labels: [], data: [] })
  const [userGrowth, setUserGrowth] = useState({ labels: [], data: [] })
  const [recentActivity, setRecentActivity] = useState([])

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
      categories: assetTrends.labels,
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
      data: assetTrends.data
    }
  ]

  // Asset Distribution Data
  const assetDistributionOptions = {
    chart: { type: 'donut' },
    labels: assetDistribution.labels,
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

  const assetDistributionSeries = assetDistribution.data

  // User Growth Data
  const userGrowthOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
      background: 'transparent'
    },
    colors: ['#A8843D'],
    xaxis: {
      categories: userGrowth.labels,
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
      data: userGrowth.data
    }
  ]

  useEffect(() => {
    const token = localStorage.getItem('summacapital_token')
    const userData = localStorage.getItem('summacapital_user')

    if (!token || !userData) {
      navigate('/office/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (err) {
      console.error('Failed to parse user data:', err)
      localStorage.removeItem('summacapital_token')
      localStorage.removeItem('summacapital_user')
      navigate('/office/login')
      return
    }
    
    // Fetch dashboard data from API
    const fetchDashboardData = async () => {
      try {
        const [statsData, trendsData, distData, growthData, activityData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getAssetTrends(),
          dashboardService.getAssetDistribution(),
          dashboardService.getUserGrowth(),
          activityLogService.list(1, 5)
        ])

        if (statsData) setStats(statsData || {})
        if (trendsData) setAssetTrends({
          labels: trendsData?.labels || [],
          data: trendsData?.data || []
        })
        if (distData) setAssetDistribution({
          labels: distData?.labels || [],
          data: distData?.data || []
        })
        if (growthData) setUserGrowth({
          labels: growthData?.labels || [],
          data: growthData?.data || []
        })
        setRecentActivity(Array.isArray(activityData) ? activityData : (activityData?.data || []))
      } catch (error) {
        console.warn('Failed to fetch dashboard data:', error.message)
        // Set default empty data structures to prevent chart errors
        setStats({})
        setAssetTrends({ labels: [], data: [] })
        setAssetDistribution({ labels: [], data: [] })
        setUserGrowth({ labels: [], data: [] })
        setRecentActivity([])
      }
    }

    fetchDashboardData()
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
              <h3>{stats?.activeAssets ?? '—'}</h3>
              <p>Active Assets</p>
            </div>
            <div className="stat-box">
              <Users className="stat-icon" size={24} />
              <h3>{stats?.registeredUsers ?? '—'}</h3>
              <p>Registered Users</p>
            </div>
            <div className="stat-box">
              <TrendingUp className="stat-icon" size={24} />
              <h3>{stats?.totalAUM ?? '—'}</h3>
              <p>Total AUM</p>
            </div>
            <div className="stat-box">
              <Mail className="stat-icon" size={24} />
              <h3>{stats?.newMessages ?? '—'}</h3>
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
              {recentActivity.length === 0 ? (
                <p className="no-activity">No recent activity</p>
              ) : (
                recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <span className="activity-time">{new Date(activity.timestamp || activity.createdAt).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    <span className="activity-text">{activity.label || activity.description || activity.action}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

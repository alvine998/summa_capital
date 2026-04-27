import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OfficeLayout from './components/Office/OfficeLayout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import AssetBid from './pages/AssetBid'
import BidDetail from './pages/AssetBid/BidDetail'
import EarlyAccess from './pages/EarlyAccess'
import EarlyAccessDetail from './pages/EarlyAccess/Detail'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Articles from './pages/Articles'
import ArticleDetail from './pages/Articles/Detail'
import SebotanAsset from './pages/SebotanAsset'
import Consultation from './pages/Consultation'
import Login from './pages/Office/Login'
import ForgotPassword from './pages/Office/ForgotPassword'
import ResetPassword from './pages/Office/ResetPassword'
import Dashboard from './pages/Office/Dashboard'
import Asset from './pages/Office/Asset'
import CreateAsset from './pages/Office/Asset/Create'
import EditAsset from './pages/Office/Asset/Edit'
import Galeri from './pages/Office/Galeri'
import Messages from './pages/Office/Messages'
import ActivityLog from './pages/Office/ActivityLog'
import Pengguna from './pages/Office/Pengguna'
import CreatePengguna from './pages/Office/Pengguna/Create'
import EditPengguna from './pages/Office/Pengguna/Edit'
import Pengaturan from './pages/Office/Pengaturan'
import EarlyAccessOffice from './pages/Office/EarlyAccess'
import CreateEarlyAccess from './pages/Office/EarlyAccess/Create'
import EditEarlyAccess from './pages/Office/EarlyAccess/Edit'
import OfficeArticles from './pages/Office/Articles'
import CreateArticle from './pages/Office/Articles/Create'
import EditArticle from './pages/Office/Articles/Edit'
import { logActivity, ACTIVITY_TYPES } from './services/activityLog'
import './App.css'

function AppContent() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  const isOfficeAuth = location.pathname.includes('/office') && 
                       !location.pathname.includes('/office/login') &&
                       !location.pathname.includes('/office/forgot-password') &&
                       !location.pathname.includes('/office/reset-password')
  const isOfficeNoAuth = location.pathname.includes('/office/login') ||
                         location.pathname.includes('/office/forgot-password') ||
                         location.pathname.includes('/office/reset-password') ||
                         location.pathname === '/consultation'

  return (
    <>
      {!isOfficeNoAuth && !isOfficeAuth && <Navbar />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/asset/bid" element={<AssetBid />} />
          <Route path="/bid/detail/:id" element={<BidDetail />} />
          <Route path="/asset/early-access" element={<EarlyAccess />} />
          <Route path="/early-access/detail/:id" element={<EarlyAccessDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/asset/sebaran" element={<SebotanAsset />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/consultation" element={<Consultation />} />

          {/* Office Auth Routes (No Sidebar) */}
          <Route path="/office/login" element={<Login />} />
          <Route path="/office/forgot-password" element={<ForgotPassword />} />
          <Route path="/office/reset-password" element={<ResetPassword />} />

          {/* Office Protected Routes (With Sidebar) */}
          <Route path="/office/dashboard" element={<OfficeLayout><Dashboard /></OfficeLayout>} />
          <Route path="/office/asset" element={<OfficeLayout><Asset /></OfficeLayout>} />
          <Route path="/office/asset/create" element={<OfficeLayout><CreateAsset /></OfficeLayout>} />
          <Route path="/office/asset/edit/:id" element={<OfficeLayout><EditAsset /></OfficeLayout>} />
          <Route path="/office/early-access" element={<OfficeLayout><EarlyAccessOffice /></OfficeLayout>} />
          <Route path="/office/early-access/create" element={<OfficeLayout><CreateEarlyAccess /></OfficeLayout>} />
          <Route path="/office/early-access/edit/:id" element={<OfficeLayout><EditEarlyAccess /></OfficeLayout>} />
          <Route path="/office/articles" element={<OfficeLayout><OfficeArticles /></OfficeLayout>} />
          <Route path="/office/articles/create" element={<OfficeLayout><CreateArticle /></OfficeLayout>} />
          <Route path="/office/articles/edit/:id" element={<OfficeLayout><EditArticle /></OfficeLayout>} />
          <Route path="/office/galeri" element={<OfficeLayout><Galeri /></OfficeLayout>} />
          <Route path="/office/messages" element={<OfficeLayout><Messages /></OfficeLayout>} />
          <Route path="/office/activity-log" element={<OfficeLayout><ActivityLog /></OfficeLayout>} />
          <Route path="/office/pengguna" element={<OfficeLayout><Pengguna /></OfficeLayout>} />
          <Route path="/office/pengguna/create" element={<OfficeLayout><CreatePengguna /></OfficeLayout>} />
          <Route path="/office/pengguna/edit/:id" element={<OfficeLayout><EditPengguna /></OfficeLayout>} />
          <Route path="/office/pengaturan" element={<OfficeLayout><Pengaturan /></OfficeLayout>} />
        </Routes>
      </main>
      {!isOfficeNoAuth && !isOfficeAuth && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

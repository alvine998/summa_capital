import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import AssetBid from './pages/AssetBid'
import EarlyAccess from './pages/EarlyAccess'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Login from './pages/Office/Login'
import Dashboard from './pages/Office/Dashboard'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isOffice = location.pathname.includes('/office')

  return (
    <>
      {!isOffice && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/asset/bid" element={<AssetBid />} />
          <Route path="/asset/early-access" element={<EarlyAccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/office/login" element={<Login />} />
          <Route path="/office/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isOffice && <Footer />}
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

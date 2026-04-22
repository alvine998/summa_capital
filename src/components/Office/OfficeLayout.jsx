import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import './OfficeLayout.css'

export default function OfficeLayout({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('summacapital_token')
    if (!token) {
      navigate('/office/login')
    }
  }, [navigate])

  return (
    <div className="office-layout">
      <Sidebar />
      <main className="office-main">
        {children}
      </main>
    </div>
  )
}

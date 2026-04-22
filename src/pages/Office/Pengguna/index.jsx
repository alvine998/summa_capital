import { useState } from 'react'
import { Users } from 'lucide-react'
import './style.css'

const userData = [
  { id: 1, name: 'Alvin Reyoga', email: 'alvin@summacapital.co.id', role: 'Admin', status: 'Aktif', joinDate: '15 Jan 2024' },
  { id: 2, name: 'Budi Santoso', email: 'budi@summacapital.co.id', role: 'Manager', status: 'Aktif', joinDate: '20 Feb 2024' },
  { id: 3, name: 'Citra Dewi', email: 'citra@summacapital.co.id', role: 'Staff', status: 'Aktif', joinDate: '10 Mar 2024' },
  { id: 4, name: 'Diah Kusuma', email: 'diah@summacapital.co.id', role: 'Staff', status: 'Nonaktif', joinDate: '5 Apr 2024' },
  { id: 5, name: 'Eka Putri', email: 'eka@summacapital.co.id', role: 'Manager', status: 'Aktif', joinDate: '12 May 2024' }
]

export default function Pengguna() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('Semua')

  const roles = ['Semua', 'Admin', 'Manager', 'Staff']
  
  const filteredUsers = userData.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchRole = filterRole === 'Semua' || user.role === filterRole
    return matchSearch && matchRole
  })

  return (
    <div className="office-page">
      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><Users className="inline-icon" size={28} /> Manajemen Pengguna</h1>
          <button className="add-btn">+ Tambah Pengguna</button>
        </div>
      </div>

      <div className="office-content">
        <div className="user-controls">
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="role-filters">
            {roles.map(role => (
              <button
                key={role}
                className={`role-btn ${filterRole === role ? 'active' : ''}`}
                onClick={() => setFilterRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Bergabung</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">{user.name.charAt(0)}</div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn-small edit">Edit</button>
                      <button className="action-btn-small delete">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">Tidak ada pengguna</h3>
            <p className="empty-text">Coba ubah filter pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  )
}

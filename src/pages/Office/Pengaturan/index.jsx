import { useState } from 'react'
import { Settings as SettingsIcon, User, Lock, Building2, Briefcase, HelpCircle, Gift, Plus, Trash2, X } from 'lucide-react'
import { useToast } from '../../../components/Toast/Toast'
import './style.css'

const initialProfile = {
  name: 'Summa Capital',
  slogan: 'Your Trusted Asset Partner',
  vision: '',
  mission: '',
  values: '',
  ourStory: 'Trusted asset management company with more than 15 years of experience',
  address: 'Jl. Sudirman No. 123, South Jakarta',
  phone: '(021) 5555-1234',
  email: 'info@summacapital.co.id',
  established: '2009',
  yearHistory: [
    { id: 1, year: '2009', description: 'Summa Capital was founded' }
  ]
}

const initialOrganization = [
  { id: 1, name: 'John Doe', position: 'CEO', description: 'Leading the company since 2009' },
  { id: 2, name: 'Jane Smith', position: 'CFO', description: 'Managing finances and investments' }
]

const initialServices = [
  { id: 1, title: 'Asset Management', description: 'Professional management of your valuable assets', icon: '💼' },
  { id: 2, title: 'Investment Consulting', description: 'Expert advice on investment opportunities', icon: '📈' }
]

const initialKnowUs = [
  { id: 1, title: 'Social Media', description: 'Follow us on Instagram, LinkedIn, and more', icon: '📱' },
  { id: 2, title: 'Referral', description: 'Referred by a trusted friend or colleague', icon: '🤝' }
]

const initialBenefits = [
  { id: 1, title: 'Pre-Market Access', module: 'Early Access', description: 'Get information on selected assets before they are opened to the general market.', icon: '🔐' },
  { id: 2, title: 'Exclusive Pricing', module: 'Early Access', description: 'Enjoy more competitive pricing and investment terms.', icon: '💎' },
]

const EMPTY_ORG = { name: '', position: '', description: '' }
const EMPTY_SERVICE = { title: '', description: '', icon: '' }
const EMPTY_KNOWUS = { title: '', description: '', icon: '' }
const EMPTY_BENEFIT = { title: '', module: 'Home', description: '', icon: '' }

const MODULES = ['Home', 'Auction', 'Early Access']

export default function Settings() {
  const { toasts, addToast, removeToast, Toast } = useToast()

  const [activeSection, setActiveSection] = useState('profile')

  // Company Profile
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(initialProfile)

  // Organization
  const [organization, setOrganization] = useState(initialOrganization)
  const [orgModal, setOrgModal] = useState({ show: false, mode: 'create', data: null })
  const [orgForm, setOrgForm] = useState(EMPTY_ORG)

  // Services
  const [services, setServices] = useState(initialServices)
  const [serviceModal, setServiceModal] = useState({ show: false, mode: 'create', data: null })
  const [serviceForm, setServiceForm] = useState(EMPTY_SERVICE)

  // Know Us
  const [knowUs, setKnowUs] = useState(initialKnowUs)
  const [knowUsModal, setKnowUsModal] = useState({ show: false, mode: 'create', data: null })
  const [knowUsForm, setKnowUsForm] = useState(EMPTY_KNOWUS)

  // Benefits
  const [benefits, setBenefits] = useState(initialBenefits)
  const [benefitModal, setBenefitModal] = useState({ show: false, mode: 'create', data: null })
  const [benefitForm, setBenefitForm] = useState(EMPTY_BENEFIT)

  // Shared delete modal
  const [deleteModal, setDeleteModal] = useState({ show: false, type: '', id: null, name: '' })

  // ── Company Profile handlers ──────────────────────────────────────────
  const handleProfileChange = (field, value) =>
    setEditedProfile(prev => ({ ...prev, [field]: value }))

  const handleAddYear = () =>
    setEditedProfile(prev => ({
      ...prev,
      yearHistory: [...prev.yearHistory, { id: Date.now(), year: '', description: '' }]
    }))

  const handleYearChange = (id, field, value) =>
    setEditedProfile(prev => ({
      ...prev,
      yearHistory: prev.yearHistory.map(h => h.id === id ? { ...h, [field]: value } : h)
    }))

  const handleRemoveYear = id =>
    setEditedProfile(prev => ({
      ...prev,
      yearHistory: prev.yearHistory.filter(h => h.id !== id)
    }))

  const handleSaveProfile = async () => {
    await new Promise(r => setTimeout(r, 800))
    setProfile(editedProfile)
    setIsEditing(false)
    addToast('Company profile updated successfully!', 'success')
  }

  // ── Organization handlers ─────────────────────────────────────────────
  const openOrgCreate = () => { setOrgForm(EMPTY_ORG); setOrgModal({ show: true, mode: 'create', data: null }) }
  const openOrgEdit = item => { setOrgForm({ name: item.name, position: item.position, description: item.description }); setOrgModal({ show: true, mode: 'edit', data: item }) }
  const closeOrgModal = () => setOrgModal({ show: false, mode: 'create', data: null })
  const handleOrgSave = () => {
    if (!orgForm.name || !orgForm.position) return
    if (orgModal.mode === 'create') {
      setOrganization(prev => [...prev, { id: Date.now(), ...orgForm }])
      addToast('Organization member added!', 'success')
    } else {
      setOrganization(prev => prev.map(o => o.id === orgModal.data.id ? { ...o, ...orgForm } : o))
      addToast('Organization member updated!', 'success')
    }
    closeOrgModal()
  }

  // ── Services handlers ─────────────────────────────────────────────────
  const openServiceCreate = () => { setServiceForm(EMPTY_SERVICE); setServiceModal({ show: true, mode: 'create', data: null }) }
  const openServiceEdit = item => { setServiceForm({ title: item.title, description: item.description, icon: item.icon || '' }); setServiceModal({ show: true, mode: 'edit', data: item }) }
  const closeServiceModal = () => setServiceModal({ show: false, mode: 'create', data: null })
  const handleServiceSave = () => {
    if (!serviceForm.title || !serviceForm.description) return
    if (serviceModal.mode === 'create') {
      setServices(prev => [...prev, { id: Date.now(), ...serviceForm }])
      addToast('Service added!', 'success')
    } else {
      setServices(prev => prev.map(s => s.id === serviceModal.data.id ? { ...s, ...serviceForm } : s))
      addToast('Service updated!', 'success')
    }
    closeServiceModal()
  }

  // ── Know Us handlers ──────────────────────────────────────────────────
  const openKnowUsCreate = () => { setKnowUsForm(EMPTY_KNOWUS); setKnowUsModal({ show: true, mode: 'create', data: null }) }
  const openKnowUsEdit = item => { setKnowUsForm({ title: item.title, description: item.description, icon: item.icon || '' }); setKnowUsModal({ show: true, mode: 'edit', data: item }) }
  const closeKnowUsModal = () => setKnowUsModal({ show: false, mode: 'create', data: null })
  const handleKnowUsSave = () => {
    if (!knowUsForm.title || !knowUsForm.description) return
    if (knowUsModal.mode === 'create') {
      setKnowUs(prev => [...prev, { id: Date.now(), ...knowUsForm }])
      addToast('Know Us item added!', 'success')
    } else {
      setKnowUs(prev => prev.map(k => k.id === knowUsModal.data.id ? { ...k, ...knowUsForm } : k))
      addToast('Know Us item updated!', 'success')
    }
    closeKnowUsModal()
  }

  // ── Benefits handlers ─────────────────────────────────────────────────
  const openBenefitCreate = () => { setBenefitForm(EMPTY_BENEFIT); setBenefitModal({ show: true, mode: 'create', data: null }) }
  const openBenefitEdit = item => { setBenefitForm({ title: item.title, module: item.module, description: item.description, icon: item.icon || '' }); setBenefitModal({ show: true, mode: 'edit', data: item }) }
  const closeBenefitModal = () => setBenefitModal({ show: false, mode: 'create', data: null })
  const handleBenefitSave = () => {
    if (!benefitForm.title || !benefitForm.description) return
    if (benefitModal.mode === 'create') {
      setBenefits(prev => [...prev, { id: Date.now(), ...benefitForm }])
      addToast('Benefit added!', 'success')
    } else {
      setBenefits(prev => prev.map(b => b.id === benefitModal.data.id ? { ...b, ...benefitForm } : b))
      addToast('Benefit updated!', 'success')
    }
    closeBenefitModal()
  }

  // ── Delete handlers ───────────────────────────────────────────────────
  const openDelete = (type, id, name) => setDeleteModal({ show: true, type, id, name })
  const closeDelete = () => setDeleteModal({ show: false, type: '', id: null, name: '' })
  const handleConfirmDelete = () => {
    const { type, id } = deleteModal
    if (type === 'organization') { setOrganization(prev => prev.filter(o => o.id !== id)); addToast('Organization member removed!', 'success') }
    else if (type === 'service') { setServices(prev => prev.filter(s => s.id !== id)); addToast('Service removed!', 'success') }
    else if (type === 'knowus') { setKnowUs(prev => prev.filter(k => k.id !== id)); addToast('Know Us item removed!', 'success') }
    else if (type === 'benefit') { setBenefits(prev => prev.filter(b => b.id !== id)); addToast('Benefit removed!', 'success') }
    closeDelete()
  }

  const menuItems = [
    { id: 'profile',      label: 'Company Profile', icon: <User size={18} /> },
    { id: 'organization', label: 'Organization',    icon: <Building2 size={18} /> },
    { id: 'services',     label: 'Services',        icon: <Briefcase size={18} /> },
    { id: 'knowus',       label: 'Know Us',         icon: <HelpCircle size={18} /> },
    { id: 'benefits',     label: 'Benefits',        icon: <Gift size={18} /> },
    { id: 'password',     label: 'Change Password', icon: <Lock size={18} /> },
  ]

  return (
    <div className="office-page">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title"><SettingsIcon className="inline-icon" size={28} /> Settings</h1>
        </div>
      </div>

      <div className="office-content">
        <div className="settings-container">

          {/* ── Sidebar Menu ── */}
          <div className="settings-menu">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`settings-menu-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => { setActiveSection(item.id); setIsEditing(false) }}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          {/* ── Content ── */}
          <div className="settings-content">

            {/* Company Profile */}
            {activeSection === 'profile' && (
              <div className="settings-section">
                <h2 className="section-title">Company Profile</h2>
                <p className="section-desc">Manage basic information of Summa Capital</p>

                <div className="profile-form">
                  {isEditing ? (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Company Name</label>
                          <input type="text" value={editedProfile.name} onChange={e => handleProfileChange('name', e.target.value)} className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Company Slogan</label>
                          <input type="text" value={editedProfile.slogan} onChange={e => handleProfileChange('slogan', e.target.value)} className="form-input" placeholder="e.g. Your Trusted Asset Partner" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Vision</label>
                        <textarea value={editedProfile.vision} onChange={e => handleProfileChange('vision', e.target.value)} className="form-input form-textarea" rows="3" placeholder="Company vision..." />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Mission</label>
                        <textarea value={editedProfile.mission} onChange={e => handleProfileChange('mission', e.target.value)} className="form-input form-textarea" rows="3" placeholder="Company mission..." />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Values</label>
                        <textarea value={editedProfile.values} onChange={e => handleProfileChange('values', e.target.value)} className="form-input form-textarea" rows="3" placeholder="Core company values..." />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Our Story</label>
                        <textarea value={editedProfile.ourStory} onChange={e => handleProfileChange('ourStory', e.target.value)} className="form-input form-textarea" rows="4" placeholder="The story behind Summa Capital..." />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <input type="text" value={editedProfile.address} onChange={e => handleProfileChange('address', e.target.value)} className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Year Established</label>
                          <input type="text" value={editedProfile.established} onChange={e => handleProfileChange('established', e.target.value)} className="form-input" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Phone</label>
                          <input type="text" value={editedProfile.phone} onChange={e => handleProfileChange('phone', e.target.value)} className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input type="email" value={editedProfile.email} onChange={e => handleProfileChange('email', e.target.value)} className="form-input" />
                        </div>
                      </div>

                      {/* Year History */}
                      <div className="form-group">
                        <div className="label-with-action">
                          <label className="form-label">Year History</label>
                          <button type="button" className="btn-add-small" onClick={handleAddYear}><Plus size={14} /> Add Year</button>
                        </div>
                        <div className="year-history-list">
                          {editedProfile.yearHistory.map(h => (
                            <div key={h.id} className="year-history-item">
                              <input
                                type="text"
                                value={h.year}
                                onChange={e => handleYearChange(h.id, 'year', e.target.value)}
                                className="form-input year-input"
                                placeholder="Year"
                              />
                              <input
                                type="text"
                                value={h.description}
                                onChange={e => handleYearChange(h.id, 'description', e.target.value)}
                                className="form-input"
                                placeholder="Milestone description"
                              />
                              <button type="button" className="btn-remove-year" onClick={() => handleRemoveYear(h.id)}>
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          {editedProfile.yearHistory.length === 0 && (
                            <p className="no-items-hint">No year history yet. Click "Add Year" to start.</p>
                          )}
                        </div>
                      </div>

                      <div className="form-actions">
                        <button className="btn btn-primary" onClick={handleSaveProfile}>Save Changes</button>
                        <button className="btn btn-secondary" onClick={() => { setEditedProfile(profile); setIsEditing(false) }}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="profile-display">
                        <div className="profile-item">
                          <span className="profile-label">Company Name</span>
                          <span className="profile-value">{profile.name}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Company Slogan</span>
                          <span className="profile-value">{profile.slogan || '—'}</span>
                        </div>
                        <div className="profile-item profile-item-full">
                          <span className="profile-label">Vision</span>
                          <span className="profile-value">{profile.vision || '—'}</span>
                        </div>
                        <div className="profile-item profile-item-full">
                          <span className="profile-label">Mission</span>
                          <span className="profile-value">{profile.mission || '—'}</span>
                        </div>
                        <div className="profile-item profile-item-full">
                          <span className="profile-label">Values</span>
                          <span className="profile-value">{profile.values || '—'}</span>
                        </div>
                        <div className="profile-item profile-item-full">
                          <span className="profile-label">Our Story</span>
                          <span className="profile-value">{profile.ourStory || '—'}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Address</span>
                          <span className="profile-value">{profile.address}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Year Established</span>
                          <span className="profile-value">{profile.established}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Phone</span>
                          <span className="profile-value">{profile.phone}</span>
                        </div>
                        <div className="profile-item">
                          <span className="profile-label">Email</span>
                          <span className="profile-value">{profile.email}</span>
                        </div>
                      </div>

                      {profile.yearHistory.length > 0 && (
                        <div className="profile-year-history">
                          <span className="profile-label">Year History</span>
                          <div className="year-history-display">
                            {profile.yearHistory.map(h => (
                              <div key={h.id} className="year-history-display-item">
                                <span className="year-badge">{h.year}</span>
                                <span>{h.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Organization */}
            {activeSection === 'organization' && (
              <div className="settings-section settings-section-full">
                <div className="section-header-row">
                  <div>
                    <h2 className="section-title">Organization</h2>
                    <p className="section-desc">Manage company organizational structure</p>
                  </div>
                  <button className="add-btn" onClick={openOrgCreate}><Plus size={16} /> Add Member</button>
                </div>
                <div className="crud-table-wrapper">
                  <table className="crud-table">
                    <thead>
                      <tr><th>Name</th><th>Position</th><th>Description</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {organization.length === 0
                        ? <tr><td colSpan="4" className="empty-row">No organization members yet</td></tr>
                        : organization.map(item => (
                          <tr key={item.id}>
                            <td className="td-bold">{item.name}</td>
                            <td>{item.position}</td>
                            <td className="td-desc">{item.description}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="action-btn-small edit" onClick={() => openOrgEdit(item)}>Edit</button>
                                <button className="action-btn-small delete" onClick={() => openDelete('organization', item.id, item.name)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Services */}
            {activeSection === 'services' && (
              <div className="settings-section settings-section-full">
                <div className="section-header-row">
                  <div>
                    <h2 className="section-title">Services</h2>
                    <p className="section-desc">Manage services offered by Summa Capital</p>
                  </div>
                  <button className="add-btn" onClick={openServiceCreate}><Plus size={16} /> Add Service</button>
                </div>
                <div className="crud-table-wrapper">
                  <table className="crud-table">
                    <thead>
                      <tr><th>Icon</th><th>Title</th><th>Description</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {services.length === 0
                        ? <tr><td colSpan="4" className="empty-row">No services yet</td></tr>
                        : services.map(item => (
                          <tr key={item.id}>
                            <td className="td-icon">{item.icon || '—'}</td>
                            <td className="td-bold">{item.title}</td>
                            <td className="td-desc">{item.description}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="action-btn-small edit" onClick={() => openServiceEdit(item)}>Edit</button>
                                <button className="action-btn-small delete" onClick={() => openDelete('service', item.id, item.title)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Know Us */}
            {activeSection === 'knowus' && (
              <div className="settings-section settings-section-full">
                <div className="section-header-row">
                  <div>
                    <h2 className="section-title">Know Us</h2>
                    <p className="section-desc">Manage how people discover Summa Capital</p>
                  </div>
                  <button className="add-btn" onClick={openKnowUsCreate}><Plus size={16} /> Add Item</button>
                </div>
                <div className="crud-table-wrapper">
                  <table className="crud-table">
                    <thead>
                      <tr><th>Icon</th><th>Title</th><th>Description</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {knowUs.length === 0
                        ? <tr><td colSpan="4" className="empty-row">No items yet</td></tr>
                        : knowUs.map(item => (
                          <tr key={item.id}>
                            <td className="td-icon">{item.icon || '—'}</td>
                            <td className="td-bold">{item.title}</td>
                            <td className="td-desc">{item.description}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="action-btn-small edit" onClick={() => openKnowUsEdit(item)}>Edit</button>
                                <button className="action-btn-small delete" onClick={() => openDelete('knowus', item.id, item.title)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Benefits */}
            {activeSection === 'benefits' && (
              <div className="settings-section settings-section-full">
                <div className="section-header-row">
                  <div>
                    <h2 className="section-title">Benefits</h2>
                    <p className="section-desc">Manage benefit items shown on each module page</p>
                  </div>
                  <button className="add-btn" onClick={openBenefitCreate}><Plus size={16} /> Add Benefit</button>
                </div>
                <div className="crud-table-wrapper">
                  <table className="crud-table">
                    <thead>
                      <tr><th>Icon</th><th>Title</th><th>Module</th><th>Description</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {benefits.length === 0
                        ? <tr><td colSpan="5" className="empty-row">No benefits yet</td></tr>
                        : benefits.map(item => (
                          <tr key={item.id}>
                            <td className="td-icon">{item.icon || '—'}</td>
                            <td className="td-bold">{item.title}</td>
                            <td><span className="module-badge module-badge--{item.module.toLowerCase().replace(' ', '-')}">{item.module}</span></td>
                            <td className="td-desc">{item.description}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="action-btn-small edit" onClick={() => openBenefitEdit(item)}>Edit</button>
                                <button className="action-btn-small delete" onClick={() => openDelete('benefit', item.id, item.title)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Change Password */}
            {activeSection === 'password' && (
              <div className="settings-section">
                <h2 className="section-title">Change Password</h2>
                <p className="section-desc">Update your account password with a new and more secure one</p>
                <div className="password-form">
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input type="password" placeholder="Enter current password" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input type="password" placeholder="Minimum 8 characters" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" placeholder="Repeat new password" className="form-input" />
                  </div>
                  <div className="password-note">
                    <strong>Security Tips:</strong>
                    <ul>
                      <li>Use a mix of uppercase, lowercase, numbers and symbols</li>
                      <li>Do not use easily guessable passwords</li>
                      <li>Do not share your password with anyone</li>
                    </ul>
                  </div>
                  <button className="btn btn-primary">Update Password</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Organization Modal ── */}
      {orgModal.show && (
        <div className="modal-overlay" onClick={closeOrgModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{orgModal.mode === 'create' ? 'Add Organization Member' : 'Edit Organization Member'}</h3>
              <button className="modal-close" onClick={closeOrgModal}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input type="text" value={orgForm.name} onChange={e => setOrgForm(p => ({ ...p, name: e.target.value }))} className="form-input" placeholder="Full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Position *</label>
                <input type="text" value={orgForm.position} onChange={e => setOrgForm(p => ({ ...p, position: e.target.value }))} className="form-input" placeholder="e.g. CEO, Manager" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea value={orgForm.description} onChange={e => setOrgForm(p => ({ ...p, description: e.target.value }))} className="form-input form-textarea" rows="3" placeholder="Brief description..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeOrgModal}>Cancel</button>
              <button className="btn-save" onClick={handleOrgSave}>{orgModal.mode === 'create' ? 'Add Member' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Services Modal ── */}
      {serviceModal.show && (
        <div className="modal-overlay" onClick={closeServiceModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{serviceModal.mode === 'create' ? 'Add Service' : 'Edit Service'}</h3>
              <button className="modal-close" onClick={closeServiceModal}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Icon (optional)</label>
                <input type="text" value={serviceForm.icon} onChange={e => setServiceForm(p => ({ ...p, icon: e.target.value }))} className="form-input" placeholder="Emoji, e.g. 💼" />
              </div>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input type="text" value={serviceForm.title} onChange={e => setServiceForm(p => ({ ...p, title: e.target.value }))} className="form-input" placeholder="Service title" />
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea value={serviceForm.description} onChange={e => setServiceForm(p => ({ ...p, description: e.target.value }))} className="form-input form-textarea" rows="3" placeholder="Service description..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeServiceModal}>Cancel</button>
              <button className="btn-save" onClick={handleServiceSave}>{serviceModal.mode === 'create' ? 'Add Service' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Know Us Modal ── */}
      {knowUsModal.show && (
        <div className="modal-overlay" onClick={closeKnowUsModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{knowUsModal.mode === 'create' ? 'Add Know Us Item' : 'Edit Know Us Item'}</h3>
              <button className="modal-close" onClick={closeKnowUsModal}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Icon (optional)</label>
                <input type="text" value={knowUsForm.icon} onChange={e => setKnowUsForm(p => ({ ...p, icon: e.target.value }))} className="form-input" placeholder="Emoji, e.g. 📱" />
              </div>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input type="text" value={knowUsForm.title} onChange={e => setKnowUsForm(p => ({ ...p, title: e.target.value }))} className="form-input" placeholder="e.g. Social Media" />
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea value={knowUsForm.description} onChange={e => setKnowUsForm(p => ({ ...p, description: e.target.value }))} className="form-input form-textarea" rows="3" placeholder="Description..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeKnowUsModal}>Cancel</button>
              <button className="btn-save" onClick={handleKnowUsSave}>{knowUsModal.mode === 'create' ? 'Add Item' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Benefits Modal ── */}
      {benefitModal.show && (
        <div className="modal-overlay" onClick={closeBenefitModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{benefitModal.mode === 'create' ? 'Add Benefit' : 'Edit Benefit'}</h3>
              <button className="modal-close" onClick={closeBenefitModal}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Icon (optional)</label>
                <input type="text" value={benefitForm.icon} onChange={e => setBenefitForm(p => ({ ...p, icon: e.target.value }))} className="form-input" placeholder="Emoji, e.g. 🔑" />
              </div>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input type="text" value={benefitForm.title} onChange={e => setBenefitForm(p => ({ ...p, title: e.target.value }))} className="form-input" placeholder="Benefit title" />
              </div>
              <div className="form-group">
                <label className="form-label">Module *</label>
                <select value={benefitForm.module} onChange={e => setBenefitForm(p => ({ ...p, module: e.target.value }))} className="form-input">
                  {MODULES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea value={benefitForm.description} onChange={e => setBenefitForm(p => ({ ...p, description: e.target.value }))} className="form-input form-textarea" rows="3" placeholder="Benefit description..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeBenefitModal}>Cancel</button>
              <button className="btn-save" onClick={handleBenefitSave}>{benefitModal.mode === 'create' ? 'Add Benefit' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={closeDelete}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Delete Item</h3>
              <button className="modal-close" onClick={closeDelete}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deleteModal.name}</strong>?</p>
              <p className="modal-warning">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeDelete}>Cancel</button>
              <button className="btn-delete" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

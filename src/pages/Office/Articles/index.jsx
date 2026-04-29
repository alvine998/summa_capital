import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Trash2, Edit2 } from 'lucide-react'
import { articleService } from '../../../services/articleService'
import { useToast } from '../../../components/Toast/Toast'
import './articles.css'

export default function Articles() {
  const navigate = useNavigate()
  const { toasts, addToast, removeToast, Toast } = useToast()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' })
  const [searchTerm, setSearchTerm] = useState('')

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const result = await articleService.listAdmin(1, 100)
      setArticles(Array.isArray(result) ? result : (result?.data || []))
    } catch (err) {
      addToast('Failed to load articles', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteClick = (id, title) => {
    setDeleteModal({ show: true, id, title })
  }

  const handleConfirmDelete = async () => {
    try {
      await articleService.delete(deleteModal.id)
      setArticles(prev => prev.filter(a => a.id !== deleteModal.id))
      addToast('Article deleted successfully', 'success')
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete article', 'error')
    } finally {
      setDeleteModal({ show: false, id: null, title: '' })
    }
  }

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, id: null, title: '' })
  }

  const handleStatusToggle = async (id) => {
    const article = articles.find(a => a.id === id)
    if (!article) return
    const newStatus = article.status === 'Draft' ? 'Published' : 'Draft'
    try {
      await articleService.toggleStatus(id, newStatus)
      setArticles(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update status', 'error')
    }
  }

  return (
    <div className="office-page">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title">
            <FileText className="inline-icon" size={28} /> Articles Management
          </h1>
          <button className="add-btn" onClick={() => navigate('/office/articles/create')}>
            + Add Article
          </button>
        </div>
      </div>

      <div className="office-content">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search articles by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>

        {loading ? (
          <div className="loading-state">Loading articles...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <h3>No articles found</h3>
            <p>{searchTerm ? 'Try adjusting your search' : 'Create your first article to get started'}</p>
          </div>
        ) : (
          <div className="articles-table-wrapper">
            <table className="articles-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Views</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map(article => (
                  <tr key={article.id}>
                    <td className="title-cell">{article.title}</td>
                    <td>
                      <span className="category-badge">{article.category}</span>
                    </td>
                    <td>{article.author}</td>
                    <td>
                      <button
                        className={`status-btn ${article.status?.toLowerCase()}`}
                        onClick={() => handleStatusToggle(article.id)}
                      >
                        {article.status}
                      </button>
                    </td>
                    <td>{article.createdAt ? new Date(article.createdAt).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="views-count">{article.views || 0}</td>
                    <td className="actions-cell">
                      <button
                        className="action-btn edit"
                        onClick={() => navigate(`/office/articles/edit/${article.id}`)}
                        title="Edit article"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteClick(article.id, article.title)}
                        title="Delete article"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Delete Article?</h2>
            <p>Are you sure you want to delete "<strong>{deleteModal.title}</strong>"?</p>
            <p className="warning">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="btn-delete" onClick={handleConfirmDelete}>
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

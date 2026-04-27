import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import QuillEditor from '../../../components/QuillEditor'
import { logActivity } from '../../../services/activityLog'
import './create.css'

export default function CreateArticle() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Investment',
    author: 'Summa Capital',
    status: 'Draft',
    tags: ''
  })

  const categories = ['Investment', 'Auction', 'Strategy', 'Market Analysis', 'Risk Management', 'Property Valuation']

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleContentChange = (content) => {
    setForm(prev => ({
      ...prev,
      content: content
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate form
      if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
        setError('Title, excerpt, and content are required')
        setLoading(false)
        return
      }

      if (form.title.length < 5) {
        setError('Title must be at least 5 characters')
        setLoading(false)
        return
      }

      if (form.excerpt.length < 20) {
        setError('Excerpt must be at least 20 characters')
        setLoading(false)
        return
      }

      if (form.content.length < 50) {
        setError('Content must be at least 50 characters')
        setLoading(false)
        return
      }

      // Log activity
      logActivity('CREATE_ARTICLE', {
        title: form.title,
        category: form.category,
        status: form.status
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Success - navigate back to list
      navigate('/office/articles')
    } catch (err) {
      setError('Failed to create article. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="office-page">
      <div className="office-header">
        <button className="back-btn" onClick={() => navigate('/office/articles')}>
          <ArrowLeft size={20} /> Back to Articles
        </button>
        <h1 className="office-header-title">Create New Article</h1>
      </div>

      <div className="office-content">
        <div className="form-card">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="create-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Article Title *</label>
              <input
                id="title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter article title"
                required
              />
              <small>{form.title.length} / 200 characters</small>
            </div>

            {/* Category & Author */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="author">Author *</label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  required
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="form-group">
              <label htmlFor="excerpt">Excerpt (Short Description) *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                placeholder="Brief summary of the article (appears in listings)"
                rows="3"
                required
              />
              <small>{form.excerpt.length} / 500 characters</small>
            </div>

            {/* Content */}
            <div className="form-group">
              <label>Article Content *</label>
              <div className="quill-editor-wrapper">
                <QuillEditor
                  defaultValue={form.content}
                  onChange={handleContentChange}
                  placeholder="Write your article content here..."
                />
              </div>
              <small>{form.content.replace(/<[^>]*>/g, '').length} characters (excluding HTML)</small>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                id="tags"
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g., investment, property, digital"
              />
            </div>

            {/* Status & Actions */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate('/office/articles')}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Article'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

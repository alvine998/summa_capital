import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import QuillEditor from '../../../components/QuillEditor'
import { logActivity } from '../../../services/activityLog'
import './create.css'

// Mock data for demo
const mockArticles = {
  1: {
    id: 1,
    title: 'Investment Strategy for Real Estate Assets in the Digital Era',
    excerpt: 'Learn the best strategies to invest in real estate using the latest digital technology.',
    content: '<h2>Why Real Estate Investment?</h2><p>Property is a tangible asset with value that tends to increase over time...</p>',
    category: 'Investment',
    author: 'Summa Capital',
    status: 'Published',
    tags: 'investment,property,strategy,digital'
  },
  2: {
    id: 2,
    title: 'Complete Guide to Online Asset Auctions',
    excerpt: 'A comprehensive guide on how to participate in asset auctions online safely and efficiently.',
    content: '<h2>What is Online Asset Auction?</h2><p>Online asset auction is the process of selling assets through a digital platform...</p>',
    category: 'Auction',
    author: 'Summa Capital',
    status: 'Published',
    tags: 'auction,asset,online,tips'
  },
  3: {
    id: 3,
    title: 'Investment Portfolio Diversification: Expert Tips',
    excerpt: 'Diversification is the key to long-term success. Learn how to diversify your investment portfolio.',
    content: '<h2>Why is Diversification Important?</h2><p>Don\'t put all your eggs in one basket - this is the basic principle of diversification...</p>',
    category: 'Strategy',
    author: 'Summa Capital',
    status: 'Draft',
    tags: 'diversification,portfolio,strategy,investment'
  }
}

export default function EditArticle() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState(null)

  const categories = ['Investment', 'Auction', 'Strategy', 'Market Analysis', 'Risk Management', 'Property Valuation']

  useEffect(() => {
    // Load article data
    const article = mockArticles[id]
    if (article) {
      setForm(article)
    } else {
      setError('Article not found')
    }
  }, [id])

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

      // Log activity
      logActivity('UPDATE_ARTICLE', {
        articleId: form.id,
        title: form.title,
        category: form.category,
        status: form.status
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Success - navigate back
      navigate('/office/articles')
    } catch (err) {
      setError('Failed to update article. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!form) {
    return (
      <div className="office-page">
        <div className="office-header">
          <button className="back-btn" onClick={() => navigate('/office/articles')}>
            <ArrowLeft size={20} /> Back to Articles
          </button>
        </div>
        <div className="office-content">
          <div className="error-message">{error || 'Loading...'}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="office-page">
      <div className="office-header">
        <button className="back-btn" onClick={() => navigate('/office/articles')}>
          <ArrowLeft size={20} /> Back to Articles
        </button>
        <h1 className="office-header-title">Edit Article</h1>
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
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

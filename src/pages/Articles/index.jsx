import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Calendar, User, Search } from 'lucide-react'
import '../PageShared.css'
import './style.css'

const articles = [
  {
    id: 1,
    title: 'Investment Strategy for Real Estate Assets in the Digital Era',
    excerpt: 'Learn the best strategies to invest in real estate using the latest digital technology.',
    content: 'Real estate investment strategies have evolved rapidly with digital platforms. We share tips and tricks to maximize your investment returns using the right technology.',
    author: 'Summa Capital',
    date: '2026-04-25',
    category: 'Investment',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Complete Guide to Online Asset Auctions',
    excerpt: 'A comprehensive guide on how to participate in asset auctions online safely and efficiently.',
    content: 'Online asset auctions provide broader opportunities for investors. In this article, we guide you through the entire auction process with practical tips.',
    author: 'Summa Capital',
    date: '2026-04-22',
    category: 'Auction',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Investment Portfolio Diversification: Expert Tips',
    excerpt: 'Diversification is the key to long-term success. Learn how to diversify your investment portfolio.',
    content: 'Portfolio diversification is not just about buying various assets, but also about strategy. Let\'s discuss various investment instruments and how to allocate funds optimally.',
    author: 'Summa Capital',
    date: '2026-04-20',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Real Estate Market Trends Indonesia 2026',
    excerpt: 'In-depth analysis of Indonesia\'s real estate market trends and investment opportunities for 2026.',
    content: 'Indonesia\'s real estate market continues to develop with attractive opportunities. We analyze current trends and provide insights on high-growth potential areas.',
    author: 'Summa Capital',
    date: '2026-04-18',
    category: 'Market Analysis',
    image: 'https://images.unsplash.com/photo-1448860010827-fc1301c3a3f0?w=600&h=400&fit=crop',
    readTime: '8 min read'
  },
  {
    id: 5,
    title: 'Risk and Mitigation in Asset Investment',
    excerpt: 'Understand the main risks in asset investment and mitigation strategies to protect your investment.',
    content: 'Every investment has risk. In this article, we discuss the main risks in asset investment and ways to minimize its impact on your portfolio.',
    author: 'Summa Capital',
    date: '2026-04-15',
    category: 'Risk Management',
    image: 'https://images.unsplash.com/photo-1460925895917-aaf4b7c3eb70?w=600&h=400&fit=crop',
    readTime: '7 min read'
  },
  {
    id: 6,
    title: 'Understanding Asset Value and Property Valuation',
    excerpt: 'Learn how to accurately value real estate properties and understand the factors affecting them.',
    content: 'Accurate property valuation is the foundation of good investment decisions. Learn valuation methodologies and factors that affect property value.',
    author: 'Summa Capital',
    date: '2026-04-12',
    category: 'Property Valuation',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    readTime: '6 min read'
  }
]

export default function Articles() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Investment', 'Auction', 'Strategy', 'Market Analysis', 'Risk Management', 'Property Valuation']

  const filteredArticles = articles.filter(article => {
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === 'All' || article.category === selectedCategory
    return matchSearch && matchCategory
  })

  const handleArticleClick = (id) => {
    navigate(`/articles/${id}`)
  }

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-badge">Insights & Education</span>
          <h1 className="page-hero__title">
            Blog & Articles
            <br />
            <span className="text-gold">Investment Insights</span>
          </h1>
          <p className="page-hero__desc">
            Learn the latest investment strategies, market analysis, and expert tips to optimize your portfolio.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="section">
        <div className="container articles-filters">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'filter-btn--active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section">
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} />
              <h3>No articles found</h3>
              <p>Try changing your filter or search</p>
            </div>
          ) : (
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <article key={article.id} className="article-card" onClick={() => handleArticleClick(article.id)}>
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                    <span className="article-category">{article.category}</span>
                  </div>
                  <div className="article-content">
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-meta">
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>{new Date(article.date).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="meta-item">
                        <FileText size={16} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <button className="read-more-btn">Read More →</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section--gold-bg">
        <div className="container">
          <div className="cta-block">
            <h2>Want a Free Consultation?</h2>
            <p>Contact our expert team to get a customized investment strategy for your needs.</p>
            <button className="btn btn--white" onClick={() => navigate('/consultation')}>
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

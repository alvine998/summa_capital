import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react'
import { useEffect } from 'react'
import '../PageShared.css'
import './detail.css'

const articlesData = [
  {
    id: 1,
    title: 'Investment Strategy for Real Estate Assets in the Digital Era',
    excerpt: 'Learn the best strategies to invest in real estate using the latest digital technology.',
    content: `
    <p>Real estate investment strategies have evolved rapidly with digital platforms. Property sector investment is not just about purchasing physical assets, but also about understanding market trends and leveraging technology to maximize returns.</p>
    
    <h2>Why Real Estate Investment?</h2>
    <p>Property is a tangible asset with value that tends to increase over time. Compared to other investment instruments, property offers stability and solid long-term growth potential.</p>
    
    <h2>Best Strategies for Beginners</h2>
    <p>As a beginner, it's important to:</p>
    <ul>
      <li>Conduct thorough market research</li>
      <li>Understand strategic locations and growth potential</li>
      <li>Have a solid financial plan</li>
      <li>Diversify investment portfolio</li>
    </ul>
    
    <h2>Leveraging Digital Platforms</h2>
    <p>Platforms like ours enable you to access various real estate investment opportunities easily. From asset auctions to early access to premium projects, everything is accessible through one integrated platform.</p>
    
    <h2>Conclusion</h2>
    <p>Real estate investment in the digital era offers broader opportunities and easier access. With the right strategy and good market understanding, you can build wealth through real estate investment.</p>
    `,
    author: 'Summa Capital',
    date: '2026-04-25',
    category: 'Investment',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&h=600&fit=crop',
    readTime: '5 min read',
    tags: ['investment', 'property', 'strategy', 'digital']
  },
  {
    id: 2,
    title: 'Complete Guide to Online Asset Auctions',
    excerpt: 'A comprehensive guide on how to participate in asset auctions online safely and efficiently.',
    content: `
    <p>Online asset auctions have become a popular and efficient way to sell and buy various types of assets. This guide will help you understand the online auction process from start to finish.</p>
    
    <h2>What is Online Asset Auction?</h2>
    <p>Online asset auction is the process of selling assets through a digital platform where buyers can place their bids in real-time. This system is transparent, efficient, and gives equal opportunities to all participants.</p>
    
    <h2>How to Participate in Auctions</h2>
    <ol>
      <li>Register and verify your account</li>
      <li>Browse the list of available assets</li>
      <li>Review asset details and auction terms</li>
      <li>Place your bid</li>
      <li>Monitor the auction until completion</li>
      <li>Complete the transaction if you win</li>
    </ol>
    
    <h2>Tips to Win at Auctions</h2>
    <p>To increase your chances of winning at asset auctions:</p>
    <ul>
      <li>Set a maximum price you're willing to pay before the auction starts</li>
      <li>Don't get carried away and avoid bidding beyond your budget</li>
      <li>Participate in several auctions to understand market price patterns</li>
      <li>Carefully review asset details and its condition</li>
    </ul>
    
    <h2>Transaction Security</h2>
    <p>Trusted online auction platforms guarantee transaction security through encrypted payment systems and strict verification processes.</p>
    `,
    author: 'Summa Capital',
    date: '2026-04-22',
    category: 'Auction',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
    readTime: '7 min read',
    tags: ['auction', 'asset', 'online', 'tips']
  },
  {
    id: 3,
    title: 'Investment Portfolio Diversification: Expert Tips',
    excerpt: 'Diversification is the key to long-term success. Learn how to diversify your investment portfolio.',
    content: `
    <p>Portfolio diversification is a crucial investment strategy to reduce risk and maximize long-term returns. Let's discuss effective diversification strategies.</p>
    
    <h2>Why is Diversification Important?</h2>
    <p>"Don't put all your eggs in one basket" - this is the basic principle of diversification. By spreading your investments across various assets, you can reduce the negative impact of a decline in any single asset.</p>
    
    <h2>Types of Assets for Diversification</h2>
    <ul>
      <li><strong>Real Estate:</strong> Real estate assets with stable value</li>
      <li><strong>Stocks:</strong> Ownership in companies</li>
      <li><strong>Bonds:</strong> Debt securities with more predictable returns</li>
      <li><strong>Money Market Instruments:</strong> Deposits, money market funds</li>
      <li><strong>Alternative Assets:</strong> Precious metals, cryptocurrency (for experienced investors)</li>
    </ul>
    
    <h2>Diversification Strategy by Risk Profile</h2>
    <p><strong>Conservative Investor (Low Risk):</strong><br>70% bonds, 20% real estate, 10% stocks</p>
    <p><strong>Moderate Investor (Medium Risk):</strong><br>40% stocks, 40% real estate, 20% bonds</p>
    <p><strong>Aggressive Investor (High Risk):</strong><br>60% stocks, 30% real estate, 10% other instruments</p>
    
    <h2>Regular Review and Rebalancing</h2>
    <p>Diversification is not set-and-forget. You need to conduct regular reviews and rebalancing to ensure your portfolio stays aligned with your investment goals.</p>
    `,
    author: 'Summa Capital',
    date: '2026-04-20',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    readTime: '6 min read',
    tags: ['diversification', 'portfolio', 'strategy', 'investment']
  },
  {
    id: 4,
    title: 'Real Estate Market Trends Indonesia 2026',
    excerpt: 'In-depth analysis of Indonesia\'s real estate market trends and investment opportunities for 2026.',
    content: `
    <p>Indonesia\'s real estate market continues to develop with attractive opportunities. Let\'s look at important trends to watch for investment in 2026.</p>
    
    <h2>Economic Growth and Its Impact</h2>
    <p>Indonesia\'s consistent economic growth creates high demand for property. Urbanization and growing middle-class purchasing power drive residential and commercial property investment.</p>
    
    <h2>Key Trends in 2026</h2>
    
    <h3>1. Mixed-Use Development</h3>
    <p>Properties with dual functions (residential + commercial) are increasingly popular in strategic locations.</p>
    
    <h3>2. Green Building and Sustainability</h3>
    <p>Environmentally friendly property development with green building certification is gaining interest.</p>
    
    <h3>3. Smart City Investments</h3>
    <p>Investment in areas developed as smart cities offers high growth potential.</p>
    
    <h3>4. Modern Commercial Property</h3>
    <p>Demand for modern, flexible office space continues to increase post-pandemic.</p>
    
    <h2>High-Potential Locations</h2>
    <ul>
      <li>Jakarta and surrounding areas (Greater Jakarta)</li>
      <li>Surabaya and Bandung</li>
      <li>Areas around the New Metro (New Capital)</li>
      <li>Bali (for tourism property)</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>2026 offers attractive real estate investment opportunities with stable and sustainable growth. Investors who conduct thorough research can find golden opportunities.</p>
    `,
    author: 'Summa Capital',
    date: '2026-04-18',
    category: 'Market Analysis',
    image: 'https://images.unsplash.com/photo-1448860010827-fc1301c3a3f0?w=1200&h=600&fit=crop',
    readTime: '8 min read',
    tags: ['market', 'property', 'trends', 'indonesia']
  },
  {
    id: 5,
    title: 'Risk and Mitigation in Asset Investment',
    excerpt: 'Understand the main risks in asset investment and mitigation strategies to protect your investment.',
    content: `
    <p>Every investment has risk. As a smart investor, you must understand these risks and have strategies to minimize them.</p>
    
    <h2>Types of Investment Risks</h2>
    
    <h3>1. Market Risk</h3>
    <p>Fluctuations in market value that can affect your investment value. Mitigation: Diversify and invest long-term.</p>
    
    <h3>2. Liquidity Risk</h3>
    <p>Difficulty in selling assets quickly at a good price. Mitigation: Choose assets with liquid markets.</p>
    
    <h3>3. Operational Risk</h3>
    <p>Risk from management errors or administrative issues. Mitigation: Choose trusted managers.</p>
    
    <h3>4. Inflation Risk</h3>
    <p>Your money\'s purchasing power decreases over time. Mitigation: Invest in assets that can beat inflation.</p>
    
    <h3>5. Regulatory Risk</h3>
    <p>Regulatory changes can affect your investment. Mitigation: Follow relevant regulatory developments.</p>
    
    <h2>Risk Mitigation Strategies</h2>
    <ul>
      <li>Diversify your portfolio</li>
      <li>Conduct thorough research before investing</li>
      <li>Determine asset allocation suitable for your risk profile</li>
      <li>Maintain emergency fund</li>
      <li>Monitor investments regularly</li>
      <li>Work with professional financial advisors</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>By understanding risks and applying appropriate mitigation strategies, you can manage your investments more safely and effectively.</p>
    `,
    author: 'Summa Capital',
    date: '2026-04-15',
    category: 'Risk Management',
    image: 'https://images.unsplash.com/photo-1460925895917-aaf4b7c3eb70?w=1200&h=600&fit=crop',
    readTime: '7 min read',
    tags: ['risk', 'mitigation', 'management', 'asset']
  },
  {
    id: 6,
    title: 'Understanding Asset Value and Property Valuation',
    excerpt: 'Learn how to accurately value real estate properties and understand the factors affecting them.',
    content: `
    <p>Accurate property valuation is the foundation of good investment decisions. Let\'s learn how to value properties and the factors that affect their value.</p>
    
    <h2>Property Valuation Methods</h2>
    
    <h3>1. Comparable Approach</h3>
    <p>Comparing a property with similar properties that have sold in the same area. This is the most commonly used method.</p>
    
    <h3>2. Cost Approach</h3>
    <p>Calculating construction cost plus land value. This method is suitable for new properties.</p>
    
    <h3>3. Income Approach</h3>
    <p>Calculating value based on the property\'s income potential (rental income). This method is suitable for investment properties.</p>
    
    <h2>Factors Affecting Property Value</h2>
    
    <h3>Location</h3>
    <ul>
      <li>Accessibility (close to business centers, public transportation)</li>
      <li>Surrounding environment</li>
      <li>Area development potential</li>
    </ul>
    
    <h3>Property Condition</h3>
    <ul>
      <li>Building age</li>
      <li>Physical condition</li>
      <li>Facilities and amenities</li>
    </ul>
    
    <h3>Market Factors</h3>
    <ul>
      <li>Supply and demand</li>
      <li>Price trends in the area</li>
      <li>General economic condition</li>
    </ul>
    
    <h2>Tips for Accurate Valuation</h2>
    <p>For accurate valuation, consult with a certified professional property appraiser with experience in the area.</p>
    `,
    author: 'Summa Capital',
    date: '2026-04-12',
    category: 'Property Valuation',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
    readTime: '6 min read',
    tags: ['valuation', 'property', 'assessment', 'investment']
  }
]

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = articlesData.find(a => a.id === parseInt(id))

  useEffect(() => {
    if (article) {
      // Update document title for SEO
      document.title = `${article.title} | Summa Capital Blog`
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', article.excerpt)
      }
    }
  }, [article])

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/articles/${article.id}`
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: shareUrl
    }

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err)
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl)
        alert('Article link copied to clipboard!')
      } catch (err) {
        console.error('Copy failed:', err)
        alert('Could not copy link')
      }
    }
  }

  if (!article) {
    return (
      <div className="page">
        <div className="article-detail-not-found">
          <h2>Article not found</h2>
          <button className="btn-back" onClick={() => navigate('/articles')}>
            ← Back to Articles
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <article className="article-detail">
        <header className="article-detail__header">
          {/* <button className="btn-back-in-header" onClick={() => navigate('/articles')}>
            <ArrowLeft size={20} /> Back to Articles
          </button> */}
          <span className="article-category-badge">{article.category}</span>
          <h1 className="article-detail__title">{article.title}</h1>
          <div className="article-detail__meta">
            <div className="meta-group">
              <Calendar size={18} />
              <span>{new Date(article.date).toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="meta-group">
              <User size={18} />
              <span>{article.author}</span>
            </div>
            <div className="meta-group">
              <span className="read-time">{article.readTime}</span>
            </div>
          </div>
        </header>

        <div className="article-detail__image">
          <img src={article.image} alt={article.title} />
        </div>

        <div className="article-detail__content">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <footer className="article-detail__footer">
          <div className="article-tags">
            <span className="tags-label">Tags:</span>
            {article.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>

          <div className="article-share">
            <button className="share-btn" title="Share this article" onClick={handleShare}>
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </footer>
      </article>

      {/* Related Articles */}
      <section className="related-articles">
        <div className="container">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {articlesData
              .filter(a => a.id !== article.id && a.category === article.category)
              .slice(0, 3)
              .map(relatedArticle => (
                <div
                  key={relatedArticle.id}
                  className="related-card"
                  onClick={() => navigate(`/articles/${relatedArticle.id}`)}
                >
                  <div className="related-card__image">
                    <img src={relatedArticle.image} alt={relatedArticle.title} />
                  </div>
                  <div className="related-card__content">
                    <h3>{relatedArticle.title}</h3>
                    <p>{relatedArticle.excerpt}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section--gold-bg">
        <div className="container">
          <div className="cta-block">
            <h2>Want a Free Consultation?</h2>
            <p>Contact our expert team to discuss a customized investment strategy for your needs.</p>
            <button className="btn btn--white" onClick={() => navigate('/consultation')}>
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

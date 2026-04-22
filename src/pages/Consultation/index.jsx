import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowLeft, Bot, User, Sparkles, RefreshCw } from "lucide-react";
import "./style.css";

const SUMMA_INFO = {
  name: "Summa Consultant",
  greeting:
    "Hello! I'm Summa Capital's AI consultant. I'm here to help you with questions about investing, asset auctions, early access, and our services. What would you like to know?",
};

const QUICK_QUESTIONS = [
  "How do I start investing?",
  "What is Summa Capital Early Access?",
  "What is the minimum investment?",
  "How does the asset auction process work?",
  "What types of assets are available?",
  "What is the projected investment return?",
];

// Keyword-based AI response engine
function generateResponse(text) {
  const q = text.toLowerCase();

  if (/(hello|hi|hey|good morning|good afternoon|good evening)/.test(q)) {
    return "Hello! Welcome to Summa Capital. I'm here to help you find the best investment opportunities. Are you interested in **asset auctions**, **early access**, or would you like to learn more about our services?";
  }

  if (/(start|how to|steps|register|sign up|join|get started)/.test(q)) {
    return "Getting started with Summa Capital is simple:\n\n1. **Create an account** — visit our registration page and complete your profile\n2. **Identity verification** — our secure KYC (Know Your Customer) process is fast, typically completed within 24 hours\n3. **Browse assets** — explore the full list of available assets in our Asset menu\n4. **Start investing** — place a bid or register for early access based on your risk profile\n\nOur consultants are also ready to guide you personally. Would you like me to connect you with our team?";
  }

  if (/(early access|exclusive|vip|pre-market)/.test(q)) {
    return "The **Early Access Program** is Summa Capital's exclusive service that provides:\n\n• 🔐 **Pre-market access** — receive information on selected assets before they open to the general public\n• 💎 **Exclusive pricing** — more competitive pricing and investment terms\n• 📊 **In-depth reports** — comprehensive due diligence and valuation reports\n• 👤 **Personal consultation** — direct access to our senior investment consultants\n\nThis program is ideal for investors who want to maximize returns with earlier information. Are you interested in signing up?";
  }

  if (/(minimum|minimum investment|starting capital|how much|initial capital)/.test(q)) {
    return "Minimum investment at Summa Capital varies by asset type:\n\n• **Asset Auction** — starting from IDR 500 million (depending on the asset being auctioned)\n• **Early Access** — starting from IDR 1 billion for selected clients\n• **Portfolio Management** — starting from IDR 2 billion for full portfolio management\n\nWe believe quality matters more than investor quantity. Every investment is managed to the highest institutional standards. Would you like to know more about any of these products?";
  }

  if (/(auction|bid|bidding)/.test(q)) {
    return "The **Asset Auction Process** at Summa Capital is transparent and structured:\n\n1. **Pre-Auction** — publication of asset details, valuation reports, and open house schedule\n2. **Due Diligence** — investors may independently inspect the asset\n3. **Bidding** — registered participants submit bids through our closed system\n4. **Winner Selection** — the highest qualifying bid is declared the winner\n5. **Handover** — the legalization and ownership transfer process is fully facilitated by Summa Capital\n\nAll processes are overseen by OJK and an independent notary. Is there a specific auction asset you're interested in?";
  }

  if (/(types of asset|asset types|what assets|categories|property|land|building)/.test(q)) {
    return "Summa Capital manages a wide range of premium assets:\n\n🏢 **Commercial Property** — office buildings, shophouses, shopping centers\n🏠 **Residential Property** — apartments, superblocks, luxury housing\n🏨 **Hospitality Property** — hotels, resorts, villas\n🏭 **Industrial Property** — industrial estates, logistics warehouses, factories\n💻 **Technology Property** — data centers, digital infrastructure\n🌿 **Agribusiness** — plantations, integrated farming\n\nEvery asset undergoes a rigorous selection and thorough due diligence process by our analyst team. Which category interests you most?";
  }

  if (/(return|yield|profit|roi|projected return|investment return)/.test(q)) {
    return "Projected returns at Summa Capital are competitive and research-based:\n\n| Asset Type | Projected Return |\n|---|---|\n| Commercial Property | 10–16% p.a. |\n| Residential Property | 13–18% p.a. |\n| Hospitality Property | 15–24% p.a. |\n| Industrial Property | 10–14% p.a. |\n| Data Center | 16–22% p.a. |\n\n⚠️ *Note: Returns are projections based on market research. Investing involves risk. Past performance does not guarantee future results.*\n\nWould you like us to help identify an asset that matches your risk profile?";
  }

  if (/(ojk|license|legal|regulation|safe|trusted|regulated)/.test(q)) {
    return "Summa Capital operates fully under the supervision of the **Financial Services Authority (OJK)** of Indonesia.\n\n✅ Registered as an official Investment Manager since 2012\n✅ Financial statements audited by a Big Four independent auditor\n✅ All transactions facilitated by certified notaries\n✅ Data security system compliant with ISO 27001\n✅ Client funds held in segregated accounts\n\nWe are committed to transparency and integrity in every transaction. Any specific questions about our legal standing?";
  }

  if (/(risk|risks|loss|how risky)/.test(q)) {
    return "Every investment carries risk, and we are always transparent about this:\n\n**Risks managed by Summa Capital:**\n• 📊 Market risk — mitigated through portfolio diversification\n• 🏗️ Construction risk — only existing assets with a proven track record are accepted\n• ⚖️ Legal risk — all assets are fully cleared and clean in terms of legality\n• 💧 Liquidity risk — a structured exit mechanism is available\n\n**Our mitigation steps:**\n• In-depth due diligence before every asset listing\n• Comprehensive asset insurance\n• Risk management team with 15+ years of experience\n\nWe recommend not investing more than 30% of your net worth in a single asset class. Would you like to discuss diversification strategies further?";
  }

  if (/(contact|reach|phone|email|address|office|team)/.test(q)) {
    return "You can reach the Summa Capital team at:\n\n📍 **Address:** Jl. Jenderal Sudirman No. 28, Karet Semanggi, South Jakarta 12920\n📞 **Phone:** +62 21 5790 0000\n✉️ **Email:** info@summacapital.co.id\n🕐 **Office Hours:** Monday–Friday, 08:00–17:00 WIB\n\nOr visit the **Contact Us** page on our website to send a message directly. Our team responds within 24 business hours.\n\nIs there anything else I can help you with?";
  }

  if (/(thank you|thanks|cheers|appreciate)/.test(q)) {
    return "Thank you for reaching out to Summa Capital! 🙏\n\nIf you have more questions at any time, don't hesitate to come back. Our consultants are also ready to help you in person at our office.\n\nWe hope your investment journey with Summa Capital brings outstanding results! 💎";
  }

  if (/(portfolio|portfolio management|manage)/.test(q)) {
    return "Summa Capital's **Portfolio Management** service is designed for investors seeking comprehensive and professional asset management:\n\n📈 **Personal Investment Strategy** — tailored to your financial goals and risk profile\n🔍 **In-Depth Research & Analysis** — our analyst team monitors the market around the clock\n📋 **Regular Reports** — transparent monthly and quarterly reports\n🤝 **Dedicated Relationship Manager** — one dedicated consultant just for you\n⚡ **Active Rebalancing** — portfolio adjusted to market conditions\n\nMinimum AUM for this service is IDR 2 billion. Would you like more details?";
  }

  // Default response
  const defaults = [
    "Great question! To provide the most relevant information, may I ask — have you invested in property before? This will help me give you a more tailored recommendation.",
    "Thank you for your question. Our Summa Capital specialists can give a more detailed answer to that. Would you like me to schedule a consultation session with one of our senior consultants?\n\nYou can also contact us directly:\n📞 +62 21 5790 0000\n✉️ info@summacapital.co.id",
    "I understand your interest. For more specific questions, I recommend a direct consultation session with our experienced analyst team. In the meantime, is there a general topic about investing or Summa Capital's services I can explain?",
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>")
    .replace(/• /g, '<span class="bullet">•</span> ');
}

export default function Consultation() {
  const [messages, setMessages] = useState([
    { id: 1, from: "ai", text: SUMMA_INFO.greeting, time: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      from: "user",
      text: trimmed,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate AI thinking delay
    const delay = 800 + Math.random() * 1200;
    await new Promise((r) => setTimeout(r, delay));

    const reply = generateResponse(trimmed);
    setTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, from: "ai", text: reply, time: new Date() },
    ]);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      { id: 1, from: "ai", text: SUMMA_INFO.greeting, time: new Date() },
    ]);
    setInput("");
    setTyping(false);
    inputRef.current?.focus();
  };

  const fmtTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="consult-root">
      {/* Sidebar */}
      <aside className="consult-sidebar">
        <div className="consult-sidebar__top">
          <Link to="/" className="consult-back">
            <ArrowLeft size={18} /> Back
          </Link>
          <div className="consult-brand">
            <div className="consult-brand__logo">
                <img src="/images/logo.png" className="consult-brand__image" alt="Summa Capital" />
            </div>
            <div>
              <div className="consult-brand__name">Summa Capital</div>
              <div className="consult-brand__sub">AI Consultation</div>
            </div>
          </div>
        </div>

        <div className="consult-sidebar__info">
          <div className="consult-ai-profile">
            <div className="consult-ai-avatar">
              <Bot size={28} />
            </div>
            <div>
              <div className="consult-ai-name">{SUMMA_INFO.name}</div>
              <div className="consult-ai-status">
                <span className="status-dot" /> Online
              </div>
            </div>
          </div>
          <p className="consult-ai-desc">
            Our AI consultant is ready to answer questions about investing, assets,
            returns, the auction process, and all Summa Capital services.
          </p>
        </div>

        <div className="consult-sidebar__topics">
          <div className="topics-label">Frequently Asked</div>
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              className="topic-chip"
              onClick={() => sendMessage(q)}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="consult-sidebar__footer">
          <p>Need further consultation?</p>
          <Link to="/contact" className="consult-contact-btn">
            Contact Our Team
          </Link>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="consult-chat">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header__info">
            <Link to="/" className="chat-back-mobile" aria-label="Back">
              <ArrowLeft size={20} />
            </Link>
            <div className="chat-header__avatar">
              <Bot size={20} />
            </div>
            <div>
              <div className="chat-header__name">{SUMMA_INFO.name}</div>
              <div className="chat-header__status">
                <span className="status-dot" /> Ready to help
              </div>
            </div>
          </div>
          <button
            className="chat-reset-btn"
            onClick={resetChat}
            title="Reset conversation"
          >
            <RefreshCw size={16} /> Reset
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`msg-row msg-row--${msg.from}`}>
              {msg.from === "ai" && (
                <div className="msg-avatar msg-avatar--ai">
                  <Bot size={16} />
                </div>
              )}
              <div className="msg-bubble-wrap">
                <div
                  className={`msg-bubble msg-bubble--${msg.from}`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
                <div className="msg-time">{fmtTime(msg.time)}</div>
              </div>
              {msg.from === "user" && (
                <div className="msg-avatar msg-avatar--user">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="msg-row msg-row--ai">
              <div className="msg-avatar msg-avatar--ai">
                <Bot size={16} />
              </div>
              <div className="msg-bubble msg-bubble--ai msg-bubble--typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-wrap">
          <div className="chat-quick-pills">
            {QUICK_QUESTIONS.slice(0, 3).map((q) => (
              <button
                key={q}
                className="quick-pill"
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Type your question about Summa Capital investments..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={typing}
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="chat-disclaimer">
            <Sparkles size={12} /> Responses are AI-generated. For investment decisions, always consult with our professional team.
          </div>
        </div>
      </main>
    </div>
  );
}

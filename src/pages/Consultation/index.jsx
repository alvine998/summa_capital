import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowLeft, Bot, User, Sparkles, RefreshCw } from "lucide-react";
import "./style.css";

const SUMMA_INFO = {
  name: "Konsultan Summa",
  greeting:
    "Halo! Saya adalah konsultan AI Summa Capital. Saya siap membantu Anda dengan pertanyaan seputar investasi, aset lelang, early access, dan layanan kami. Apa yang ingin Anda ketahui?",
};

const QUICK_QUESTIONS = [
  "Bagaimana cara mulai berinvestasi?",
  "Apa itu Early Access Summa Capital?",
  "Berapa minimum investasi?",
  "Bagaimana proses lelang aset?",
  "Apa saja jenis aset yang tersedia?",
  "Berapa proyeksi return investasi?",
];

// Keyword-based AI response engine
function generateResponse(text) {
  const q = text.toLowerCase();

  if (/(halo|hai|hi|hello|selamat|pagi|siang|malam)/.test(q)) {
    return `Halo! Selamat datang di Summa Capital. Saya di sini untuk membantu Anda menemukan peluang investasi terbaik. Apakah Anda tertarik dengan **lelang aset**, **early access**, atau ingin mengetahui lebih lanjut tentang layanan kami?`;
  }

  if (/(mulai|cara|langkah|daftar|registrasi|sign up|bergabung)/.test(q)) {
    return `Memulai investasi di Summa Capital sangat mudah:\n\n1. **Daftar akun** — kunjungi halaman registrasi dan lengkapi data diri Anda\n2. **Verifikasi identitas** — proses KYC (Know Your Customer) aman dan cepat, biasanya selesai dalam 1×24 jam\n3. **Pilih aset** — jelajahi daftar aset tersedia di menu Asset kami\n4. **Mulai investasi** — tempatkan penawaran atau daftar early access sesuai profil risiko Anda\n\nTim konsultan kami juga siap mendampingi Anda secara personal. Ingin saya hubungkan Anda dengan tim kami?`;
  }

  if (/(early access|eksklusif|akses awal|vip)/.test(q)) {
    return `**Program Early Access** adalah layanan eksklusif Summa Capital yang memberikan:\n\n• 🔐 **Akses sebelum publik** — dapatkan informasi aset pilihan sebelum dibuka ke pasar umum\n• 💎 **Harga lebih kompetitif** — syarat investasi yang lebih menguntungkan\n• 📊 **Laporan mendalam** — due diligence dan laporan valuasi komprehensif\n• 👤 **Konsultasi pribadi** — akses langsung ke konsultan investasi senior kami\n\nProgram ini cocok untuk investor yang ingin memaksimalkan keuntungan dengan informasi lebih awal. Apakah Anda tertarik mendaftar?`;
  }

  if (/(minimum|minimal|modal awal|berapa modal|berapa dana)/.test(q)) {
    return `Minimum investasi di Summa Capital bervariasi tergantung jenis aset:\n\n• **Lelang Aset** — mulai dari Rp 500 juta (tergantung aset yang dilelang)\n• **Early Access** — mulai dari Rp 1 miliar untuk klien terseleksi\n• **Manajemen Portofolio** — mulai dari Rp 2 miliar untuk pengelolaan portofolio penuh\n\nKami percaya kualitas lebih penting dari kuantitas investor. Setiap investasi dikelola dengan standar institusional tertinggi. Ingin tahu lebih lanjut tentang salah satu produk?`;
  }

  if (/(lelang|auction|bid|penawaran|ikut lelang)/.test(q)) {
    return `**Proses Lelang Aset** di Summa Capital berlangsung transparan dan terstruktur:\n\n1. **Pra-Lelang** — publikasi detail aset, laporan valuasi, dan jadwal open house\n2. **Due Diligence** — investor dapat melakukan pemeriksaan mandiri atas aset\n3. **Penawaran** — peserta terdaftar memasukkan penawaran dalam sistem tertutup\n4. **Penetapan Pemenang** — penawaran tertinggi yang memenuhi syarat ditetapkan sebagai pemenang\n5. **Serah Terima** — proses legalisasi dan transfer kepemilikan difasilitasi penuh oleh Summa Capital\n\nSemua proses diawasi oleh OJK dan notaris independen. Apakah ada aset lelang tertentu yang Anda minati?`;
  }

  if (
    /(jenis aset|tipe aset|apa saja aset|kategori|properti|tanah|gedung)/.test(
      q,
    )
  ) {
    return `Summa Capital mengelola berbagai jenis aset premium:\n\n🏢 **Properti Komersial** — gedung perkantoran, ruko, pusat perbelanjaan\n🏠 **Properti Residensial** — apartemen, superblok, perumahan mewah\n🏨 **Properti Hospitality** — hotel, resort, vila\n🏭 **Properti Industri** — kawasan industri, gudang logistik, pabrik\n💻 **Properti Teknologi** — data center, infrastruktur digital\n🌿 **Agribisnis** — perkebunan, pertanian terintegrasi\n\nSetiap aset telah melalui proses seleksi ketat dan due diligence menyeluruh oleh tim analis kami. Kategori mana yang paling Anda minati?`;
  }

  if (
    /(return|imbal hasil|keuntungan|profit|yield|roi|hasil investasi)/.test(q)
  ) {
    return `Proyeksi return investasi di Summa Capital kompetitif dan berbasis riset:\n\n| Jenis Aset | Proyeksi Return ||\n|---|---|---|\n| Properti Komersial | 10–16% p.a. |\n| Properti Residensial | 13–18% p.a. |\n| Properti Hospitality | 15–24% p.a. |\n| Properti Industri | 10–14% p.a. |\n| Data Center | 16–22% p.a. |\n\n⚠️ *Catatan: Return bersifat proyeksi berdasarkan riset pasar. Investasi mengandung risiko. Kinerja masa lalu tidak menjamin hasil masa depan.*\n\nIngin kami bantu identifikasi aset yang sesuai profil risiko Anda?`;
  }

  if (/(ojk|izin|legal|regulasi|aman|terpercaya|lisensi)/.test(q)) {
    return `Summa Capital beroperasi penuh di bawah pengawasan **Otoritas Jasa Keuangan (OJK)** Republik Indonesia.\n\n✅ Terdaftar sebagai Manajer Investasi resmi sejak 2012\n✅ Laporan keuangan diaudit oleh auditor independen Big Four\n✅ Seluruh transaksi difasilitasi notaris bersertifikat\n✅ Sistem keamanan data berstandar ISO 27001\n✅ Dana klien disimpan di rekening terpisah (segregated account)\n\nKami berkomitmen pada transparansi dan integritas dalam setiap transaksi. Ada pertanyaan spesifik tentang aspek legal kami?`;
  }

  if (/(risiko|risk|kerugian|aman|berapa risiko)/.test(q)) {
    return `Setiap investasi memiliki risiko, dan kami selalu transparan tentang hal ini:\n\n**Risiko yang dikelola oleh Summa Capital:**\n• 📊 Risiko pasar — dimitigasi dengan diversifikasi portofolio\n• 🏗️ Risiko konstruksi — hanya aset existing dengan track record yang diterima\n• ⚖️ Risiko hukum — seluruh aset clear & clean secara legalitas\n• 💧 Risiko likuiditas — ada mekanisme exit yang terstruktur\n\n**Langkah mitigasi kami:**\n• Due diligence mendalam sebelum setiap listing aset\n• Asuransi aset komprehensif\n• Tim risk management berpengalaman 15+ tahun\n\nKami sarankan untuk tidak menginvestasikan lebih dari 30% kekayaan bersih dalam satu kelas aset. Apakah Anda ingin diskusi lebih lanjut tentang strategi diversifikasi?`;
  }

  if (/(kontak|hubungi|telepon|email|alamat|kantor|tim)/.test(q)) {
    return `Anda dapat menghubungi tim Summa Capital melalui:\n\n📍 **Alamat:** Jl. Jenderal Sudirman No. 28, Karet Semanggi, Jakarta Selatan 12920\n📞 **Telepon:** +62 21 5790 0000\n✉️ **Email:** info@summacapital.co.id\n🕐 **Jam Operasional:** Senin–Jumat, 08:00–17:00 WIB\n\nAtau kunjungi halaman **Hubungi Kami** di website kami untuk mengirim pesan langsung. Tim kami merespons dalam 1×24 jam kerja.\n\nApakah ada hal lain yang bisa saya bantu?`;
  }

  if (/(terima kasih|makasih|thanks|thank you)/.test(q)) {
    return `Terima kasih telah menghubungi Summa Capital! 🙏\n\nJika sewaktu-waktu Anda memiliki pertanyaan lain, jangan ragu untuk kembali ke sini. Tim konsultan kami juga siap membantu Anda secara langsung di kantor kami.\n\nSemoga investasi Anda bersama Summa Capital membawa hasil terbaik! 💎`;
  }

  if (/(portofolio|manajemen portofolio|kelola)/.test(q)) {
    return `Layanan **Manajemen Portofolio** Summa Capital dirancang untuk investor yang ingin pengelolaan aset secara profesional dan menyeluruh:\n\n📈 **Strategi Investasi Personal** — disesuaikan dengan tujuan keuangan dan profil risiko Anda\n🔍 **Riset & Analisis Mendalam** — tim analis kami memantau pasar 24/7\n📋 **Laporan Berkala** — laporan bulanan dan kuartalan yang transparan\n🤝 **Dedicated Relationship Manager** — satu konsultan khusus untuk Anda\n⚡ **Rebalancing Aktif** — portofolio disesuaikan dengan kondisi pasar\n\nMinimum AUM untuk layanan ini adalah Rp 2 miliar. Apakah Anda tertarik mengetahui lebih detail?`;
  }

  // Default response
  const defaults = [
    `Pertanyaan yang menarik! Untuk memberikan informasi yang paling relevan, boleh saya tanyakan — apakah Anda sudah pernah berinvestasi di properti sebelumnya? Ini akan membantu saya memberikan rekomendasi yang lebih tepat untuk Anda.`,
    `Terima kasih atas pertanyaannya. Tim spesialis Summa Capital kami dapat memberikan jawaban yang lebih detail untuk pertanyaan tersebut. Apakah Anda ingin saya jadwalkan sesi konsultasi dengan salah satu konsultan senior kami?\n\nAtau, Anda juga bisa langsung menghubungi kami di:\n📞 +62 21 5790 0000\n✉️ info@summacapital.co.id`,
    `Saya mengerti ketertarikan Anda. Untuk pertanyaan yang lebih spesifik, saya merekomendasikan sesi konsultasi langsung dengan tim analis kami yang berpengalaman. Namun sementara itu, apakah ada topik umum tentang investasi atau layanan Summa Capital yang bisa saya jelaskan?`,
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
    d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="consult-root">
      {/* Sidebar */}
      <aside className="consult-sidebar">
        <div className="consult-sidebar__top">
          <Link to="/" className="consult-back">
            <ArrowLeft size={18} /> Kembali
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
            Konsultan AI kami siap menjawab pertanyaan seputar investasi, aset,
            return, proses lelang, dan semua layanan Summa Capital.
          </p>
        </div>

        <div className="consult-sidebar__topics">
          <div className="topics-label">Pertanyaan Umum</div>
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
          <p>Butuh konsultasi lebih lanjut?</p>
          <Link to="/contact" className="consult-contact-btn">
            Hubungi Tim Kami
          </Link>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="consult-chat">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header__info">
            <div className="chat-header__avatar">
              <Bot size={20} />
            </div>
            <div>
              <div className="chat-header__name">{SUMMA_INFO.name}</div>
              <div className="chat-header__status">
                <span className="status-dot" /> Siap membantu
              </div>
            </div>
          </div>
          <button
            className="chat-reset-btn"
            onClick={resetChat}
            title="Reset percakapan"
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
              placeholder="Tulis pertanyaan Anda tentang investasi Summa Capital..."
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
              aria-label="Kirim"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="chat-disclaimer">
            <Sparkles size={12} /> Respons dihasilkan oleh AI. Untuk keputusan
            investasi, selalu konsultasikan dengan tim profesional kami.
          </div>
        </div>
      </main>
    </div>
  );
}

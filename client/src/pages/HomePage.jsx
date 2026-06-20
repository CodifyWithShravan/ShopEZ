import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FaChartLine, FaShieldAlt, FaBriefcase, FaArrowUp, FaArrowDown, FaRocket, FaTrophy } from 'react-icons/fa';

const TICKER_STOCKS = [
  { symbol: 'AAPL', price: '190.32', change: '+1.25' },
  { symbol: 'GOOGL', price: '140.87', change: '-0.64' },
  { symbol: 'MSFT', price: '415.20', change: '+2.10' },
  { symbol: 'NVDA', price: '880.50', change: '+3.45' },
  { symbol: 'TSLA', price: '175.40', change: '-1.90' },
  { symbol: 'AMZN', price: '180.25', change: '+0.88' },
  { symbol: 'META', price: '480.60', change: '+1.32' },
  { symbol: 'JPM',  price: '195.80', change: '+0.40' },
  { symbol: 'V',    price: '280.15', change: '+0.65' },
  { symbol: 'LLY',  price: '780.90', change: '+2.15' },
];

function StatCounter({ end, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [loadingMovers, setLoadingMovers] = useState(true);

  useEffect(() => {
    const fetchMovers = async () => {
      try {
        const [gainersRes, losersRes] = await Promise.all([
          API.get('/stocks/top-gainers'),
          API.get('/stocks/top-losers'),
        ]);
        setTopGainers((gainersRes.data.data || gainersRes.data).slice(0, 5));
        setTopLosers((losersRes.data.data || losersRes.data).slice(0, 5));
      } catch {
        // Use static fallback if not logged in or API unavailable
      } finally {
        setLoadingMovers(false);
      }
    };
    fetchMovers();
  }, []);

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="container hero-content">
          <div className="hero-badge animate-fadeInUp">
            <FaRocket className="me-2" /> Live Stock Trading Platform
          </div>
          <h1 className="hero-title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Trade Smarter with <span className="gradient-text">ShopEZ</span>
          </h1>
          <p className="hero-subtitle animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Explore 50+ real-world stocks, execute virtual trades, track your portfolio's performance,
            and master the market — all in one powerful platform.
          </p>
          <div className="hero-cta animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            {true ? (
              <>
                <button onClick={() => navigate('/dashboard')} className="btn-primary-hero">
                  Go to Dashboard
                </button>
                <button onClick={() => navigate('/market')} className="btn-outline-hero">
                  Explore Market
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="btn-primary-hero">Get Started Free</Link>
                <Link to="/login" className="btn-outline-hero">Sign In</Link>
              </>
            )}
          </div>
          <div className="hero-stats animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="hero-stat">
              <span className="hero-stat-value">$100K</span>
              <span className="hero-stat-label">Virtual Balance</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">Stocks Available</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">Real-Time</span>
              <span className="hero-stat-label">Price Updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER TAPE */}
      <div className="ticker-wrapper">
        <div className="ticker-tape">
          {[...TICKER_STOCKS, ...TICKER_STOCKS].map((s, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-symbol">{s.symbol}</span>
              <span className="ticker-price">${s.price}</span>
              <span className={s.change.startsWith('+') ? 'ticker-up' : 'ticker-down'}>
                {s.change.startsWith('+') ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                {s.change}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="features-section container">
        <div className="section-header text-center">
          <h2 className="section-title">Everything You Need to Trade</h2>
          <p className="section-subtitle">A complete ecosystem for virtual stock trading and portfolio management</p>
        </div>
        <div className="features-grid">
          {[
            {
              icon: <FaChartLine size={32} />,
              title: 'Live Market Data',
              desc: 'Real-time simulated price updates across 50+ stocks spanning Technology, Healthcare, Finance, Energy, and Consumer sectors.',
              color: 'var(--secondary)',
            },
            {
              icon: <FaShieldAlt size={32} />,
              title: 'Secure Trading',
              desc: 'JWT-based authentication with bcrypt encryption, role-based access control, and fully protected API endpoints.',
              color: 'var(--accent)',
            },
            {
              icon: <FaBriefcase size={32} />,
              title: 'Portfolio Tracking',
              desc: 'Monitor your holdings in real-time, track P&L per stock, visualize allocation with interactive charts.',
              color: 'var(--success)',
            },
          ].map((f, i) => (
            <div key={i} className="feature-card glass-card animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon" style={{ color: f.color }}>{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP MOVERS */}
      {!loadingMovers && (topGainers.length > 0 || topLosers.length > 0) && (
        <section className="movers-section container">
          <div className="section-header text-center">
            <h2 className="section-title">Today's Top Movers</h2>
            <p className="section-subtitle">Stocks making the biggest moves right now</p>
          </div>
          <div className="movers-grid">
            <div className="movers-panel glass-card">
              <div className="movers-panel-header gainers">
                <FaArrowUp className="me-2" /> Top Gainers
              </div>
              {topGainers.map((s) => (
                <div key={s._id} className="mover-row" onClick={() => navigate(`/stock/${s._id}`)} style={{ cursor: 'pointer' }}>
                  <div>
                    <div className="mover-symbol">{s.symbol}</div>
                    <div className="mover-name">{s.name}</div>
                  </div>
                  <div className="text-end">
                    <div className="mover-price">${Number(s.currentPrice).toFixed(2)}</div>
                    <div className="price-up">+{Number(s.changePercent || 0).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="movers-panel glass-card">
              <div className="movers-panel-header losers">
                <FaArrowDown className="me-2" /> Top Losers
              </div>
              {topLosers.map((s) => (
                <div key={s._id} className="mover-row" onClick={() => navigate(`/stock/${s._id}`)} style={{ cursor: 'pointer' }}>
                  <div>
                    <div className="mover-symbol">{s.symbol}</div>
                    <div className="mover-name">{s.name}</div>
                  </div>
                  <div className="text-end">
                    <div className="mover-price">${Number(s.currentPrice).toFixed(2)}</div>
                    <div className="price-down">{Number(s.changePercent || 0).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container stats-grid">
          {[
            { icon: <FaChartLine size={28} />, end: 50, suffix: '+', label: 'Stocks Listed' },
            { icon: <FaTrophy size={28} />, end: 1000, suffix: '+', label: 'Virtual Trades' },
            { icon: <FaBriefcase size={28} />, end: 5, label: 'Market Sectors' },
            { icon: <FaShieldAlt size={28} />, end: 99, suffix: '%', label: 'Uptime' },
          ].map((s, i) => (
            <div key={i} className="stat-card glass-card text-center">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">
                <StatCounter end={s.end} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      {false && (
        <section className="cta-section container text-center">
          <div className="cta-card glass-card">
            <h2 className="cta-title">Ready to Start Trading?</h2>
            <p className="cta-subtitle">Join ShopEZ today and get $100,000 in virtual funds to practice trading with zero risk.</p>
            <Link to="/register" className="btn-primary-hero">Create Free Account</Link>
          </div>
        </section>
      )}
    </div>
  );
}

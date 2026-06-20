import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaChartLine, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/',            label: 'Home' },
    { to: '/market',      label: 'Market' },
    { to: '/dashboard',   label: 'Dashboard' },
    { to: '/portfolio',   label: 'Portfolio' },
    { to: '/transactions',label: 'Transactions' },
    { to: '/admin',       label: 'Admin' },
  ];

  return (
    <nav className="navbar-shopez navbar navbar-expand-md">
      <div className="container d-flex align-items-center justify-content-between">

        {/* Brand */}
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <FaChartLine className="brand-icon" />
          <span className="brand-text">ShopEZ</span>
        </Link>

        {/* Desktop nav */}
        <div className="d-none d-md-flex align-items-center gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="d-md-none btn-icon navbar-toggler border-0"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="d-md-none"
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--glass-border)',
            padding: '0.5rem 0',
          }}
        >
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-link d-block px-4 py-2 ${isActive ? 'active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

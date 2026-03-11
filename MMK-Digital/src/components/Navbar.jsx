import { useState } from 'react';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'CV Builder', page: 'cv' },
  { label: 'Certificates', page: 'certificate' },
  { label: 'Printing', page: 'printing' },
];

export default function Navbar({ currentPage, navigate, user, onLogin, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleNav = (page) => {
    navigate(page);
    setMobileOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,123,255,0.08)',
        height: 72,
        display: 'flex', alignItems: 'center',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

          {/* Logo */}
          <button onClick={() => handleNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <Logo size={36} />
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                style={{
                  background: currentPage === link.page ? 'rgba(0,123,255,0.08)' : 'none',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: currentPage === link.page ? 600 : 500,
                  fontSize: 15,
                  color: currentPage === link.page ? '#007BFF' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => { if (currentPage !== link.page) e.target.style.background = 'rgba(0,0,0,0.04)'; }}
                onMouseLeave={e => { if (currentPage !== link.page) e.target.style.background = 'none'; }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Auth area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(0,123,255,0.06)',
                    border: '1.5px solid rgba(0,123,255,0.15)',
                    borderRadius: 10, padding: '7px 14px',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14, fontWeight: 600, color: '#007BFF',
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: '#007BFF', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  {user.name.split(' ')[0]}
                  <ChevronDown size={14} />
                </button>

                {userMenuOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    background: 'white', borderRadius: 12,
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    minWidth: 180, overflow: 'hidden', zIndex: 100,
                    animation: 'fadeUp 0.2s ease',
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{user.email}</div>
                    </div>
                    {user.role === 'admin' ? (
                      <MenuItem icon={<Shield size={15} />} label="Admin Panel" onClick={() => handleNav('admin')} />
                    ) : (
                      <MenuItem icon={<LayoutDashboard size={15} />} label="My Dashboard" onClick={() => handleNav('dashboard')} />
                    )}
                    <MenuItem icon={<LogOut size={15} />} label="Logout" onClick={onLogout} danger />
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="btn btn-ghost" onClick={onLogin} style={{ padding: '9px 18px' }}>
                  <User size={16} /> Login
                </button>
                <button className="btn btn-primary" onClick={onLogin} style={{ padding: '9px 18px' }}>
                  Get Started
                </button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', padding: 6 }}
              className="mobile-menu-btn"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', zIndex: 999,
          animation: 'fadeIn 0.2s ease',
        }} onClick={() => setMobileOpen(false)}>
          <div style={{
            background: 'white', padding: '20px 24px',
            display: 'flex', flexDirection: 'column', gap: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }} onClick={e => e.stopPropagation()}>
            {NAV_LINKS.map(link => (
              <button key={link.page} onClick={() => handleNav(link.page)}
                style={{
                  background: currentPage === link.page ? 'rgba(0,123,255,0.08)' : 'none',
                  border: 'none', padding: '13px 16px', borderRadius: 10,
                  textAlign: 'left', fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 500, fontSize: 16,
                  color: currentPage === link.page ? '#007BFF' : '#374151',
                  cursor: 'pointer',
                }}>
                {link.label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 8, paddingTop: 12 }}>
              {user ? (
                <button onClick={onLogout} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  <LogOut size={16} /> Logout
                </button>
              ) : (
                <button onClick={() => { onLogin(); setMobileOpen(false); }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Login / Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function MenuItem({ icon, label, onClick, danger }) {
  return (
    <button onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '11px 16px', background: 'none', border: 'none',
        cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
        fontSize: 14, fontWeight: 500,
        color: danger ? '#dc3545' : '#374151',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = danger ? '#fff5f5' : '#f9f9f9'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}
    >
      {icon} {label}
    </button>
  );
}
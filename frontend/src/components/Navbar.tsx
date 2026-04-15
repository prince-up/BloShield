'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Zap, 
  PieChart,
  ShieldAlert,
  Bell,
  Settings,
  X,
  Menu,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  activeView?: string;
  setActiveView?: (view: string) => void;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export default function Navbar({ 
  activeView = '', 
  setActiveView = () => {},
  isDarkMode = true,
  toggleTheme = () => {}
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomepage = pathname === '/' && !isAuthenticated;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'logs', label: 'API Logs', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'insights', label: 'AI Insights', icon: Zap },
    { id: 'risk-profiles', label: 'Risk Profiles', icon: ShieldAlert },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <nav style={{
      background: 'var(--card-bg)',
      backdropFilter: 'blur(30px)',
      borderBottom: '1px solid var(--card-border)',
      padding: '0 clamp(1rem, 3vw, 2rem)',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
      transition: 'var(--theme-transition)'
    }}>
      {/* Logo */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'clamp(8px, 2vw, 14px)', 
          minWidth: 'clamp(150px, 20vw, 200px)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={() => router.push('/')}
        onMouseEnter={(e) => {
          const shield = (e.currentTarget.querySelector('div') as HTMLElement) || e.currentTarget.children[0] as HTMLElement;
          if (shield) {
            shield.style.boxShadow = '0 0 32px rgba(6, 182, 212, 0.5)';
            shield.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          const shield = (e.currentTarget.querySelector('div') as HTMLElement) || e.currentTarget.children[0] as HTMLElement;
          if (shield) {
            shield.style.boxShadow = '0 0 24px rgba(6, 182, 212, 0.4)';
            shield.style.transform = 'scale(1)';
          }
        }}
      >
        <div style={{ 
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
          padding: 'clamp(6px, 2vw, 10px)', 
          borderRadius: 'clamp(6px, 2vw, 10px)',
          boxShadow: '0 0 24px rgba(6, 182, 212, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          <ShieldAlert size={22} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 style={{ fontSize: 'clamp(1rem, 3vw, 1.35rem)', fontWeight: 800, letterSpacing: '-1px', margin: 0, color: 'var(--foreground)' }}>
            Blo<span style={{ background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shield</span>
          </h1>
        </div>
      </div>

      {/* Center Menu - Dashboard Only */}
      {!isHomepage && (
        <div className="navbar-center-menu" style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}>
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '10px',
                border: 'none',
                background: activeView === id ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                color: activeView === id ? '#06b6d4' : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                fontWeight: activeView === id ? 700 : 400,
                borderBottom: activeView === id ? '2px solid #06b6d4' : '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (activeView !== id) {
                  (e.target as HTMLElement).style.background = 'rgba(6, 182, 212, 0.08)';
                  (e.target as HTMLElement).style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeView !== id) {
                  (e.target as HTMLElement).style.background = 'transparent';
                  (e.target as HTMLElement).style.color = '#cbd5e1';
                }
              }}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isHomepage ? '1rem' : '1.5rem', minWidth: isHomepage ? 'auto' : '300px', justifyContent: 'flex-end' }}>
        {/* Homepage: Login/Signup Buttons */}
        {isHomepage && (
          <>
            <button
              onClick={() => router.push('/login')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                background: 'transparent',
                color: '#0ea5e9',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 700,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/signup')}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started
            </button>
          </>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            color: 'var(--foreground)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.transform = 'rotate(15deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--card-border)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          {isDarkMode ? <Sun size={20} fill="#f59e0b" color="#f59e0b" /> : <Moon size={20} fill="#0ea5e9" color="#0ea5e9" />}
        </button>

        {/* Dashboard: Notification & Settings */}
        {!isHomepage && (
          <>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  background: 'rgba(6, 182, 212, 0.08)',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                }}
              >
                <Bell size={20} strokeWidth={2} />
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  background: '#ef4444',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #ef4444',
                  border: '2px solid #060d1a'
                }} />
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  right: 0,
                  width: '320px',
                  background: 'rgba(6, 13, 26, 0.98)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(30px)',
                  padding: '1rem',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                  zIndex: 1001
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(6, 182, 212, 0.1)' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>Notifications</span>
                    <button onClick={() => setNotificationOpen(false)} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}>
                      <X size={18} />
                    </button>
                  </div>
                  {[
                    { type: 'Alert', msg: 'High-risk transaction detected', time: '2 min ago', color: '#ef4444' },
                    { type: 'Success', msg: 'Payment approved successfully', time: '5 min ago', color: '#10b981' },
                    { type: 'Warning', msg: 'Unusual login pattern found', time: '15 min ago', color: '#f59e0b' },
                  ].map((notif, i) => (
                    <div key={i} style={{
                      padding: '0.75rem',
                      background: `${notif.color}15`,
                      border: `1px solid ${notif.color}30`,
                      borderRadius: '8px',
                      marginBottom: i < 2 ? '0.75rem' : 0,
                      cursor: 'pointer'
                    }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: notif.color, marginBottom: '0.25rem' }}>{notif.type}</div>
                      <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{notif.msg}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>{notif.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0ea5e9, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => router.push('/profile')}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.4)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 12px rgba(6, 182, 212, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              PY
            </div>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              background: 'rgba(6, 182, 212, 0.08)',
              color: '#cbd5e1',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
            }}>
              <Settings size={20} strokeWidth={2} />
            </button>
          </>
        )}

        {/* Mobile menu button - shown on mobile devices */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#0ea5e9',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && !isHomepage && (
        <div style={{
          position: 'absolute',
          top: '72px',
          left: 0,
          right: 0,
          background: 'linear-gradient(90deg, rgba(6, 13, 26, 0.98), rgba(15, 23, 42, 0.98))',
          backdropFilter: 'blur(30px)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.1)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          zIndex: 999
        }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: activeView === item.id ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: activeView === item.id ? '#06b6d4' : '#cbd5e1',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                  e.currentTarget.style.color = '#06b6d4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = activeView === item.id ? 'rgba(6, 182, 212, 0.15)' : 'transparent';
                  e.currentTarget.style.color = activeView === item.id ? '#06b6d4' : '#cbd5e1';
                }}
              >
                <Icon size={20} strokeWidth={2} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}

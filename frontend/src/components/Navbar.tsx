'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Zap, 
  PieChart,
  ShieldAlert,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Navbar({ activeView, setActiveView }: NavbarProps) {
  const [buildNumber, setBuildNumber] = useState('1042');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setBuildNumber(Math.floor(Math.random() * 9000 + 1000).toString());
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'logs', label: 'API Logs', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'insights', label: 'AI Insights', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <>
      <nav style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95), rgba(26, 14, 63, 0.95))',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
        padding: '0 2rem',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary), #7c3aed)',
            padding: '8px', 
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
            animation: 'pulse-glow 2s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Blo<span style={{ background: 'linear-gradient(135deg, var(--primary), #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shield</span>
            </h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}>
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeView === id 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'transparent',
                color: activeView === id ? 'var(--primary)' : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                fontWeight: activeView === id ? 600 : 400,
                borderBottom: activeView === id ? '2px solid var(--primary)' : '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeView !== id) {
                  (e.target as HTMLElement).style.background = 'rgba(59, 130, 246, 0.1)';
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
              <Icon size={18} />
              <span style={{ display: { xs: 'none', sm: 'inline' } }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ff6b6b',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '0.85rem',
            fontWeight: 500
          }}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Version info */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        fontSize: '0.7rem',
        color: '#64748b',
        textAlign: 'right'
      }}>
        v1.0.0 • Build {buildNumber}
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Zap, 
  Settings, 
  PieChart,
  ShieldAlert,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const [buildNumber, setBuildNumber] = useState('1042');

  useEffect(() => {
    // Set build number on client side only to avoid hydration mismatch
    setBuildNumber(Math.floor(Math.random() * 9000 + 1000).toString());
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'logs', label: 'API Logs', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'insights', label: 'AI Insights', icon: Zap },
    { id: 'risk-profiles', label: 'Risk Profiles', icon: ShieldAlert },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), #7c3aed)',
          padding: '10px', 
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
          animation: 'pulse-glow 2s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ShieldAlert size={24} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Blo<span style={{ background: 'linear-gradient(135deg, var(--primary), #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shield</span>
          </h1>
          <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px', fontWeight: 500 }}>Fraud Detection</p>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map(({ id, label, icon: Icon }, idx) => (
          <div 
            key={id}
            className={`nav-item ${activeView === id ? 'active' : ''}`}
            onClick={() => setActiveView(id)}
            style={{ animation: `slideRight 0.5s ease-out ${0.1 * idx}s forwards`, opacity: 1 }}
          >
            <Icon size={20} />
            <span style={{ fontWeight: 500 }}>{label}</span>
          </div>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(59, 130, 246, 0.1)', paddingTop: '1.5rem', marginTop: 'auto' }}>
        <div className="nav-item" style={{ 
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          marginBottom: 0
        }}>
          <LogOut size={20} />
          <span style={{ fontWeight: 500 }}>Logout</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1rem', textAlign: 'center' }}>
          v1.0.0 • Build {buildNumber}
        </div>
      </div>
    </aside>
  );
}

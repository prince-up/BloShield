'use client';

import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Zap, 
  Settings, 
  PieChart,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'logs', label: 'API Logs', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'insights', label: 'AI Insights', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ 
          background: 'var(--primary)', 
          padding: '8px', 
          borderRadius: '8px',
          boxShadow: '0 0 15px var(--primary-glow)'
        }}>
          <ShieldAlert size={24} color="white" />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Blo<span style={{ color: 'var(--primary)' }}>Shield</span>
        </h1>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map(({ id, label, icon: Icon }) => (
          <div 
            key={id}
            className={`nav-item ${activeView === id ? 'active' : ''}`}
            onClick={() => setActiveView(id)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </div>
        ))}
      </nav>

      <div className="nav-item" style={{ marginTop: 'auto' }}>
        <Settings size={20} />
        <span>Settings</span>
      </div>
    </aside>
  );
}

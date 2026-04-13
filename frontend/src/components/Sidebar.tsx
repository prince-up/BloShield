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

export default function Sidebar() {
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
        <div className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </div>
        <div className="nav-item">
          <FileText size={20} />
          <span>API Logs</span>
        </div>
        <div className="nav-item">
          <AlertTriangle size={20} />
          <span>Alerts</span>
        </div>
        <div className="nav-item">
          <Zap size={20} />
          <span>AI Insights</span>
        </div>
        <div className="nav-item">
          <PieChart size={20} />
          <span>Analytics</span>
        </div>
      </nav>

      <div className="nav-item" style={{ marginTop: 'auto' }}>
        <Settings size={20} />
        <span>Settings</span>
      </div>
    </aside>
  );
}

'use client';

import { clsx } from 'clsx';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

export default function StatCard({ label, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="stat-card glass">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ 
          background: color || 'rgba(59, 130, 246, 0.1)', 
          padding: '10px', 
          borderRadius: '10px',
          color: color ? 'white' : 'var(--primary)'
        }}>
          {icon}
        </div>
        {trend && (
          <span style={{ 
            fontSize: '0.75rem', 
            color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)',
            background: trend.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            padding: '2px 8px',
            borderRadius: '12px'
          }}>
            {trend}
          </span>
        )}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
  subtitle?: string;
}

export default function StatCard({ label, value, icon, trend, color, subtitle }: StatCardProps) {
  const bgGradient = color === 'var(--danger)' 
    ? 'rgba(239, 68, 68, 0.08)' 
    : color === 'var(--success)'
    ? 'rgba(16, 185, 129, 0.08)'
    : 'rgba(59, 130, 246, 0.08)';
    
  const borderColor = color === 'var(--danger)' 
    ? 'rgba(239, 68, 68, 0.25)' 
    : color === 'var(--success)'
    ? 'rgba(16, 185, 129, 0.25)'
    : 'rgba(59, 130, 246, 0.25)';

  const iconBg = color === 'var(--danger)' 
    ? 'rgba(239, 68, 68, 0.12)' 
    : color === 'var(--success)'
    ? 'rgba(16, 185, 129, 0.12)'
    : 'rgba(59, 130, 246, 0.12)';

  return (
    <div className="stat-card glass" style={{
      background: bgGradient,
      borderColor: borderColor,
      borderWidth: '1.5px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ 
          background: iconBg,
          padding: '14px', 
          borderRadius: '14px',
          color: color || 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdrop: 'blur(10px)',
          border: `1px solid ${color === 'var(--danger)' ? 'rgba(239, 68, 68, 0.2)' : color === 'var(--success)' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`
        }}>
          {icon}
        </div>
        {trend && (
          <span style={{ 
            fontSize: '0.8rem', 
            color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)',
            background: trend.startsWith('+') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            padding: '5px 11px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 700,
            border: trend.startsWith('+') ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            {trend.startsWith('+') ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {trend}
          </span>
        )}
      </div>
      <div className="stat-value" style={{ fontSize: '2.6rem' }}>{value}</div>
      <div className="stat-label" style={{ opacity: 0.85 }}>{label}</div>
      {subtitle && (
        <div style={{ fontSize: '0.73rem', color: '#94a3b8', marginTop: '8px', opacity: 0.8, lineHeight: '1.3' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

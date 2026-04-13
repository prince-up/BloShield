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
    ? 'rgba(239, 68, 68, 0.15)' 
    : color === 'var(--success)'
    ? 'rgba(16, 185, 129, 0.15)'
    : 'rgba(59, 130, 246, 0.15)';
    
  const borderColor = color === 'var(--danger)' 
    ? 'rgba(239, 68, 68, 0.3)' 
    : color === 'var(--success)'
    ? 'rgba(16, 185, 129, 0.3)'
    : 'rgba(59, 130, 246, 0.3)';

  return (
    <div className="stat-card glass" style={{
      background: bgGradient,
      borderColor: borderColor,
      borderWidth: '2px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ 
          background: `linear-gradient(135deg, ${color || 'var(--primary)'}, rgba(59, 130, 246, 0.5))`, 
          padding: '12px', 
          borderRadius: '12px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 20px ${color || 'rgba(59, 130, 246, 0.4)'}`,
          animation: 'pulse-glow 2s ease-in-out infinite'
        }}>
          {icon}
        </div>
        {trend && (
          <span style={{ 
            fontSize: '0.8rem', 
            color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)',
            background: trend.startsWith('+') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            padding: '4px 10px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 600
          }}>
            {trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend}
          </span>
        )}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {subtitle && (
        <div style={{ fontSize: '0.75rem', color: '#s8bef8', marginTop: '6px', opacity: 0.8 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

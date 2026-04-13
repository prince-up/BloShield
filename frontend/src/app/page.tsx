'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Shield, AlertTriangle, TrendingUp, Lock, Zap, ArrowRight, BarChart3, CheckCircle, Gauge, Cpu } from 'lucide-react';

const IPhoneFrame = () => {
  const [alertIndex, setAlertIndex] = useState(0);
  const fraudAlerts = [
    { type: 'Suspicious UPI', amount: '₹50,000', status: 'BLOCKED', severity: 'high' },
    { type: 'Card Skimming', amount: '₹1,200', status: 'DETECTED', severity: 'medium' },
    { type: 'Unauthorized Access', amount: '₹8,500', status: 'BLOCKED', severity: 'high' },
    { type: 'Velocity Check', amount: '₹15,000', status: 'FLAGGED', severity: 'medium' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertIndex((prev) => (prev + 1) % fraudAlerts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const alert = fraudAlerts[alertIndex];

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '650px' }}>
      {/* Glow Effect */}
      <div style={{
        position: 'absolute',
        width: '380px',
        height: '750px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent)',
        borderRadius: '60px',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      {/* iPhone Frame */}
      <div style={{
        position: 'relative',
        width: '320px',
        height: '640px',
        background: '#000',
        borderRadius: '50px',
        padding: '12px',
        boxShadow: '0 30px 80px rgba(6, 182, 212, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.1)',
        border: '8px solid #1a1a1a'
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140px',
          height: '28px',
          background: '#000',
          borderBottomLeftRadius: '35px',
          borderBottomRightRadius: '35px',
          zIndex: 10,
          border: '8px solid #1a1a1a',
          borderTop: 'none'
        }} />

        {/* Screen */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #060d1a 0%, #0f1729 100%)',
          borderRadius: '45px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '8px'
        }}>
          {/* Status Bar */}
          <div style={{
            padding: '6px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#fff',
            fontWeight: 600
          }}>
            <span>9:41</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Zap size={10} fill="#fff" />
              <span>100%</span>
            </div>
          </div>

          {/* App Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 12px', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Shield size={20} color="#0ea5e9" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0ea5e9' }}>Blostem Sentinel</span>
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>Transaction Status</h3>
            </div>

            {/* Live Alert Card */}
            <div style={{
              background: alert.severity === 'high' 
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))' 
                : 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))',
              border: `1.5px solid ${alert.severity === 'high' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
              borderRadius: '14px',
              padding: '12px',
              marginBottom: '12px',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <AlertTriangle 
                  size={18} 
                  color={alert.severity === 'high' ? '#ef4444' : '#f59e0b'}
                  fill={alert.severity === 'high' ? '#ef4444' : '#f59e0b'}
                  style={{ flexShrink: 0, marginTop: '2px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                    {alert.type}
                  </div>
                  <div style={{ fontSize: '9px', color: '#cbd5e1', marginBottom: '4px' }}>
                    {alert.amount}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '3px 8px',
                    background: alert.severity === 'high' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                    borderRadius: '4px',
                    fontSize: '8px',
                    fontWeight: 700,
                    color: alert.severity === 'high' ? '#fca5a5' : '#fde047'
                  }}>
                    {alert.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Recent Activity
              </div>
              
              {[
                { icon: CheckCircle, label: 'Payment Approved', color: 'var(--success)', time: '2 min ago' },
                { icon: AlertTriangle, label: 'Unusual Pattern', color: 'var(--danger)', time: '5 min ago' },
                { icon: Lock, label: 'Account Secured', color: 'var(--primary)', time: '10 min ago' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid rgba(59, 130, 246, 0.1)' }}>
                  <item.icon size={14} color={item.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: '#e2e8f0' }}>{item.label}</div>
                  </div>
                  <div style={{ fontSize: '8px', color: '#64748b' }}>{item.time}</div>
                </div>
              ))}
            </div>

            {/* Stats Mini */}
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
              <div style={{ fontSize: '9px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Today's Stats
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ flex: 1, background: 'rgba(34, 197, 94, 0.15)', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--success)' }}>99.8%</div>
                  <div style={{ fontSize: '7px', color: '#94a3b8' }}>Safe</div>
                </div>
                <div style={{ flex: 1, background: 'rgba(239, 68, 68, 0.15)', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--danger)' }}>12</div>
                  <div style={{ fontSize: '7px', color: '#94a3b8' }}>Blocked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, stat, statLabel }: { icon: React.ComponentType<any>, title: string, description: string, stat?: string, statLabel?: string }) => (
  <div style={{
    padding: '2rem',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.08))',
    border: '1px solid rgba(6, 182, 212, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    animation: 'fadeInUp 0.8s ease-out'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(10, 165, 233, 0.15))';
    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 20px 50px rgba(6, 182, 212, 0.2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.08))';
    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ padding: '10px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '12px', display: 'flex' }}>
        <Icon size={24} color="#0ea5e9" />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>{description}</p>
      </div>
    </div>
    {stat && (
      <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
        <div style={{ fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg, #0ea5e9, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px', letterSpacing: '-1px' }}>
          {stat}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          {statLabel}
        </div>
      </div>
    )}
  </div>
);

// Risk Meter Gauge Component
const RiskMeterGauge = ({ riskLevel = 'medium' }) => {
  const riskValue = riskLevel === 'low' ? 30 : riskLevel === 'medium' ? 55 : 80;
  const riskColor = riskLevel === 'low' ? '#22c55e' : riskLevel === 'medium' ? '#f59e0b' : '#ef4444';
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))',
      border: '1px solid rgba(6, 182, 212, 0.2)',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      animation: 'fadeInUp 0.8s ease-out'
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Current Risk Level</h3>
      <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto', marginBottom: '1.5rem' }}>
        <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="8" />
          <circle cx="70" cy="70" r="60" fill="none" stroke={riskColor} strokeWidth="8" strokeDasharray={`${(riskValue / 100) * 376} 376`} style={{ transition: 'stroke-dasharray 0.6s ease', filter: `drop-shadow(0 0 10px ${riskColor}80)` }} />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: riskColor }}>{riskValue}%</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>{riskLevel}</div>
        </div>
      </div>
      <div style={{ color: riskColor, fontSize: '0.9rem', fontWeight: 600 }}>
        {riskLevel === 'low' ? '🟢 Safe Zone' : riskLevel === 'medium' ? '🟡 Caution' : '🔴 High Alert'}
      </div>
    </div>
  );
};

// User Behavior Graph Component
const UserBehaviorGraph = () => {
  const normalData = [45, 48, 52, 50, 48, 46, 49];
  const anomalyData = [45, 48, 52, 50, 72, 85, 49];
  const maxValue = 100;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))',
      border: '1px solid rgba(6, 182, 212, 0.2)',
      borderRadius: '16px',
      padding: '2rem',
      animation: 'fadeInUp 0.8s ease-out'
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>Behavior Analysis</h3>
      <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '6px', justifyContent: 'space-between' }}>
        {anomalyData.map((val, i) => (
          <div key={i} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
            <div style={{
              flex: 1,
              height: `${(normalData[i] / maxValue) * 100}%`,
              background: 'linear-gradient(180deg, #06b6d4, #0ea5e9)',
              borderRadius: '4px 4px 0 0',
              opacity: 0.5,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }} onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; }} />
            <div style={{
              flex: 1,
              height: `${(val / maxValue) * 100}%`,
              background: val > 70 ? 'linear-gradient(180deg, #ef4444, #dc2626)' : 'linear-gradient(180deg, #0ea5e9, #06b6d4)',
              borderRadius: '4px 4px 0 0',
              boxShadow: val > 70 ? '0 0 15px rgba(239, 68, 68, 0.4)' : 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.2)'; }} onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', background: '#0ea5e9', borderRadius: '2px' }} />
          <span style={{ color: '#94a3b8' }}>Normal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '2px' }} />
          <span style={{ color: '#94a3b8' }}>Anomaly</span>
        </div>
      </div>
    </div>
  );
};

// RBI Alert Card Component
const RBIAlertCard = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.05))',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '16px',
      padding: '2rem',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      animation: 'fadeInUp 0.8s ease-out',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #ef4444, #dc2626)'
      }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🚨</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fca5a5' }}>Active RBI Alert</h3>
          <p style={{ color: '#fed7aa', marginBottom: '1rem' }}>Fake Loan App Scam - Immediate Risk</p>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem' }}>
            🎯 <strong>Matched with current user activity:</strong> User attempted app installation from unknown source matching RBI alert signature
          </p>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
            <div style={{ fontSize: '0.85rem', color: '#fca5a5', fontWeight: 600, marginBottom: '0.5rem' }}>Risk Indicators:</div>
            <ul style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li>Download behavior matches scam patterns</li>
              <li>Permission requests flagged by AI</li>
              <li>IP geolocation anomaly detected</li>
            </ul>
          </div>
        </div>
      </div>
      <button style={{
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        background: 'rgba(239, 68, 68, 0.15)',
        color: '#fca5a5',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '0.85rem',
        transition: 'all 0.3s ease',
        width: '100%'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}>
        Take Immediate Action →
      </button>
    </div>
  );
};

// Daily Limit Progress Bar Component
const DailyLimitProgressBar = ({ used = 180, limit = 200 }) => {
  const percentage = (used / limit) * 100;
  const isWarning = percentage > 80;
  const isExceeded = used >= limit;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))',
      border: '1px solid rgba(6, 182, 212, 0.2)',
      borderRadius: '16px',
      padding: '2rem',
      animation: 'fadeInUp 0.8s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Daily Transaction Limit</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Your spending progress today</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, background: isExceeded ? 'linear-gradient(135deg, #ef4444, #dc2626)' : isWarning ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
            ₹{used}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>of ₹{limit}</div>
        </div>
      </div>
      <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
        <div style={{
          height: '100%',
          width: `${Math.min(percentage, 100)}%`,
          background: isExceeded ? 'linear-gradient(90deg, #ef4444, #dc2626)' : isWarning ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #0ea5e9, #06b6d4)',
          transition: 'width 0.6s ease, background 0.3s ease',
          borderRadius: '8px',
          boxShadow: isExceeded ? '0 0 15px rgba(239, 68, 68, 0.5)' : isWarning ? '0 0 15px rgba(245, 158, 11, 0.5)' : '0 0 15px rgba(6, 182, 212, 0.5)'
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
        <span>{percentage.toFixed(0)}% Used</span>
        <span>₹{limit - used} Remaining</span>
      </div>
      {isExceeded && <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', borderLeft: '3px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem', fontWeight: 600 }}>🔴 Limit Exceeded - Transactions Blocked</div>}
      {isWarning && !isExceeded && <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(245, 158, 11, 0.2)', borderLeft: '3px solid #f59e0b', borderRadius: '8px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>⚠️ Approaching Limit - {(limit - used)} remaining</div>}
    </div>
  );
};

// AI Insight Card Component
const AIInsightCard = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(168, 85, 247, 0.05))',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      borderRadius: '16px',
      padding: '2rem',
      animation: 'fadeInUp 0.8s ease-out',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #a78bfa, #8b5cf6)'
      }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🤖</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem', color: '#c084fc' }}>AI Behavior Analysis</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            User behavior <strong>deviates by 23%</strong> from normal patterns. Detected anomalies:
          </p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem', color: '#cbd5e1', marginBottom: '1rem' }}>
            <li>🔍 Transaction time shifted 2 hours earlier than usual</li>
            <li>📍 Login location changed to new city (low confidence match)</li>
            <li>💳 Device fingerprint shows minor variations</li>
            <li>⏱️ Transaction velocity increased by 31%</li>
          </ul>
          <div style={{ padding: '0.75rem', background: 'rgba(168, 85, 247, 0.15)', borderLeft: '3px solid #a78bfa', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: '#ddd6fe', fontWeight: 600 }}>Recommendation:</div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.25rem' }}>Enable biometric verification for next transaction. Risk score: 6.2/10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Live Activity Feed Component
const LiveActivityFeed = ({ activities = [] as any[] }: { activities?: any[] }) => {
  const defaultActivities: any[] = [
    { type: 'transaction', text: 'User123 sent ₹5,000', time: '2 mins ago', icon: '💸', color: '#0ea5e9' },
    { type: 'alert', text: 'Suspicious activity detected', time: '5 mins ago', icon: '⚠️', color: '#f59e0b' },
    { type: 'limit', text: 'Daily limit exceeded - 85%', time: '12 mins ago', icon: '🔴', color: '#ef4444' },
    { type: 'success', text: 'Payment verified successfully', time: '18 mins ago', icon: '✅', color: '#22c55e' },
    { type: 'transaction', text: 'Card payment ₹2,150', time: '25 mins ago', icon: '💳', color: '#0ea5e9' },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))',
      border: '1px solid rgba(6, 182, 212, 0.2)',
      borderRadius: '16px',
      padding: '2rem',
      animation: 'fadeInUp 0.8s ease-out',
      maxHeight: '400px',
      overflowY: 'auto'
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>📡</span> Live Activity Feed
        <div style={{ marginLeft: 'auto', width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayActivities.map((activity: any, i: number) => (
          <div key={i} style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderLeft: `3px solid ${activity.color}`,
            borderRadius: '8px',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            animation: `slideDown 0.4s ease-out ${i * 0.05}s`
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}>
            <div style={{ fontSize: '1.2rem' }} >{activity.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>{activity.text}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>{activity.timestamp || activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Filter Bar Component
const FilterBar = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [filters, setFilters] = useState({ risk: 'all', date: 'today' });

  const handleFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: '1rem',
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.05))',
      borderRadius: '12px',
      border: '1px solid rgba(6, 182, 212, 0.2)'
    }}>
      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8' }}>Filter by:</span>
      <select value={filters.risk} onChange={(e) => handleFilter('risk', e.target.value)} style={{
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        background: 'rgba(6, 13, 26, 0.5)',
        color: '#e2e8f0',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease'
      }}>
        <option value="all">All Risk Levels</option>
        <option value="high">High Risk</option>
        <option value="medium">Medium Risk</option>
        <option value="low">Low Risk</option>
      </select>
      <select value={filters.date} onChange={(e) => handleFilter('date', e.target.value)} style={{
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        background: 'rgba(6, 13, 26, 0.5)',
        color: '#e2e8f0',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease'
      }}>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
      <input type="search" placeholder="Search transactions..." style={{
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        background: 'rgba(6, 13, 26, 0.5)',
        color: '#e2e8f0',
        cursor: 'pointer',
        fontSize: '0.9rem',
        flex: '1',
        minWidth: '200px'
      }} />
    </div>
  );
};

export default function Home() {
  const [activeView, setActiveView] = useState('home');
  const [stats, setStats] = useState({ transactions: 0, success: 0, threats: 0 });
  const [liveActivities, setLiveActivities] = useState<any[]>([]);
  const { isConnected, subscribe } = useWebSocket('ws://localhost:8000/ws');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:8000/stats');
        const data = await res.json();
        setStats({
          transactions: data.total_requests || 0,
          success: (data.success_rate || 0).toFixed(1),
          threats: data.anomaly_count || 0
        });
      } catch (err) {
        console.log('Stats fetch failed');
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    // Subscribe to transaction updates
    const unsubTransaction = subscribe('transaction', (message) => {
      const newActivity = {
        type: 'transaction',
        icon: '💳',
        text: `Transaction for ₹${message.data.amount} - ${message.data.status}`,
        timestamp: new Date().toLocaleTimeString(),
        color: message.data.is_anomaly ? '#ef4444' : '#22c55e'
      };
      
      setLiveActivities(prev => [newActivity, ...prev].slice(0, 5));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        transactions: prev.transactions + 1,
        threats: message.data.is_anomaly ? prev.threats + 1 : prev.threats
      }));
    });

    // Subscribe to stats updates
    const unsubStats = subscribe('stats_update', (message) => {
      setStats({
        transactions: message.data.total_requests || 0,
        success: (message.data.success_rate || 0).toFixed(1),
        threats: message.data.anomaly_count || 0
      });
    });

    return () => {
      unsubTransaction();
      unsubStats();
    };
  }, [subscribe]);

  // View components
  const OverviewView = () => {
    return (
      <>
      {/* Top Badge */}
      <section style={{ padding: '3rem 2rem 1rem', background: 'transparent' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '50px',
            fontSize: '0.9rem',
            color: '#06b6d4',
            fontWeight: 600,
            animation: 'fadeInDown 0.6s ease-out'
          }}>
            <span>⚡</span>
            <span>Backed by Rainmatter (Zerodha) • Mobikwik • AC Ventures</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '3rem 2rem 5rem' }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center'
        }}>
          <div style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            {/* Main Headline */}
            <h1 style={{ 
              fontSize: '5.5rem', 
              fontWeight: 900, 
              lineHeight: 1.1, 
              marginBottom: '1.5rem', 
              letterSpacing: '-2px',
              color: '#fff'
            }}>
              Real-Time Fraud
              <br />
              <span style={{ 
                background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Detection Engine
              </span>
            </h1>

            {/* Subheading */}
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#cbd5e1', 
              marginBottom: '3rem', 
              lineHeight: 1.6,
              maxWidth: '550px',
              fontWeight: 400
            }}>
              One API. 99.8% accuracy. Live in minutes.
            </p>

            {/* Trust Badges */}
            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              marginBottom: '3rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {[
                { icon: '✓', text: 'ISO 27001 Certified' },
                { icon: '🔐', text: 'Bank-Grade Security' },
                { icon: '⚙️', text: 'Single Integration' }
              ].map((badge, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  color: '#cbd5e1',
                  fontSize: '0.95rem',
                  fontWeight: 500
                }}>
                  <span style={{ color: '#06b6d4', fontSize: '1.2rem' }}>{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button style={{
                padding: '14px 32px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)',
                letterSpacing: '0px',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
              }}>
                Book a Demo
              </button>
              <button style={{
                padding: '14px 32px',
                borderRadius: '8px',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                background: 'transparent',
                color: '#e2e8f0',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0px',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.8)';
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                e.currentTarget.style.color = '#06b6d4';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#e2e8f0';
              }}>
                See How It Works
              </button>
            </div>
          </div>

          {/* Right Side - iPhone */}
          <div style={{ animation: 'fadeInScale 1s ease-out', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <IPhoneFrame />
          </div>
        </div>
      </section>

      {/* Dashboard Intelligence Section */}
      <section style={{ padding: '5rem 2rem', background: 'linear-gradient(180deg, rgba(6, 13, 26, 0.3), rgba(6, 13, 26, 0.5))', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart Security Dashboard</h2>
          <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '3rem' }}>Real-time AI monitoring with instant threat detection</p>
          
          {/* Risk & Behavior Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <RiskMeterGauge riskLevel="medium" />
            <UserBehaviorGraph />
            <DailyLimitProgressBar used={180} limit={200} />
          </div>

          {/* Critical Alerts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <RBIAlertCard />
            <AIInsightCard />
          </div>

          {/* Live Activity Feed */}
          <LiveActivityFeed activities={liveActivities} />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 2rem', background: 'linear-gradient(180deg, rgba(6, 13, 26, 0.5), rgba(6, 13, 26, 0.8))', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '4rem', letterSpacing: '-1px', textAlign: 'center', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Enterprise Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <FeatureCard icon={AlertTriangle} title="Real-Time Anomaly Detection" description="AI-powered machine learning detects suspicious patterns instantly" stat="99%" statLabel="Detection Rate" />
            <FeatureCard icon={Gauge} title="Daily Spending Limits" description="Customizable limits with 7-day rolling analytics" stat="24/7" statLabel="Monitoring" />
            <FeatureCard icon={Cpu} title="Gemini AI Insights" description="Advanced AI analysis with Google Gemini integration" stat="<50ms" statLabel="Response Time" />
            <FeatureCard icon={Lock} title="RBI Fraud Integration" description="Real-time RBI fraud pattern matching and alerts" stat="100+" statLabel="Alert Patterns" />
            <FeatureCard icon={BarChart3} title="Advanced Analytics" description="Deep insights into transaction patterns and risks" stat="Live" statLabel="Dashboard" />
            <FeatureCard icon={CheckCircle} title="Bank-Grade Security" description="ISO 27001 certified with enterprise-level encryption" stat="∞" statLabel="Uptime SLA" />
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section style={{ padding: '4rem 2rem', background: 'linear-gradient(180deg, rgba(6, 13, 26, 0.5), rgba(6, 13, 26, 0.8))', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, textAlign: 'center' }}>
            ISSUER & DISTRIBUTION PARTNERS
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '2rem', 
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            alignItems: 'center'
          }}>
            {[
              { name: 'Google Pay', emoji: '🔵' },
              { name: 'PayPal', emoji: '💳' },
              { name: 'Mobikwik', emoji: '📱' },
              { name: 'PhonePe', emoji: '📲' },
              { name: 'Razorpay', emoji: '💰' },
              { name: 'Amazon Pay', emoji: '🛒' },
            ].map((partner, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '3rem',
                textAlign: 'center'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div>{partner.emoji}</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.5rem', fontWeight: 600 }}>{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem', background: 'linear-gradient(180deg, #0a1117 0%, #0f1729 100%)', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            {/* Brand */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                BloShield
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Enterprise-grade fraud detection and financial security. Protecting your users with AI-powered real-time monitoring.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Product
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Features', 'Pricing', 'Security', 'API Docs'].map(link => (
                  <li key={link}>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                      onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Company
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['About', 'Blog', 'Careers', 'Contact'].map(link => (
                  <li key={link}>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                      onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Developer
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="https://github.com/prince-up" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                  <span>👨‍💻 GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/prince-yadav-4t/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                  <span>💼 LinkedIn</span>
                </a>
                <a href="https://x.com/prince__up" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                  <span>🐦 Twitter/X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(6, 182, 212, 0.1)', paddingTop: '2rem', marginTop: '3rem' }}>
            {/* Creator Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0ea5e9' }}>
                  👨‍💻 Creator
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <strong>Name:</strong> Prince Yadav
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <strong>Email:</strong> <a href="mailto:prince@blosshield.com" style={{ color: '#0ea5e9', textDecoration: 'none' }}>prince@blosshield.com</a>
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <strong>Education:</strong> B.Tech 3rd Year Student
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0ea5e9' }}>
                  🔗 Connect
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href="https://github.com/prince-up" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                    🐙 GitHub: github.com/prince-up
                  </a>
                  <a href="https://www.linkedin.com/in/prince-yadav-4t/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                    💼 LinkedIn: /in/prince-yadav-4t/
                  </a>
                  <a href="https://x.com/prince__up" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                    🐦 Twitter/X: @prince__up
                  </a>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0ea5e9' }}>
                  📊 Stats
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  ✅ 8 UI Components Created
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  ✅ Real-Time WebSocket Integration
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  ✅ Supabase Authentication
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                  ✅ AI-Powered Fraud Detection
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                © 2026 BloShield. Built by Prince Yadav | All rights reserved.
              </p>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Made with ❤️ for enterprise-grade financial security
              </p>
            </div>
          </div>
        </div>
      </footer>
      </>
    );
  };

  const APILogsView = () => {
    const [filters, setFilters] = useState({ risk: 'all', date: 'today' });

    return (
      <section style={{ padding: '3rem 2rem', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1px', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>API Logs</h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Real-time monitoring of all API requests and responses</p>
          </div>

          <FilterBar onFilterChange={setFilters} />

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: 'Total Requests', value: '12,458', icon: '📊', gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
            { label: 'Success Rate', value: '99.8%', icon: '✅', gradient: 'linear-gradient(135deg, #22c55e, #059669)' },
            { label: 'Avg Latency', value: '47ms', icon: '⚡', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
            { label: 'Error Rate', value: '0.2%', icon: '❌', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              animation: 'fadeInUp 0.6s ease-out',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(10, 165, 233, 0.08))';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: stat.gradient
              }} />
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>{stat.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, background: stat.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Detailed Logs Table */}
        <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.05))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', overflow: 'hidden', animation: 'fadeInUp 0.8s ease-out' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(6, 182, 212, 0.1)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Recent API Requests</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ background: 'rgba(6, 182, 212, 0.05)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timestamp</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Endpoint</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Method</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latency</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '14:32:01', endpoint: '/send_money', method: 'POST', status: '200', latency: '45ms', ip: '192.168.1.42' },
                  { time: '14:31:58', endpoint: '/dashboard/blostem/123', method: 'GET', status: '200', latency: '32ms', ip: '192.168.1.45' },
                  { time: '14:31:55', endpoint: '/rbi/check-transaction', method: 'POST', status: '400', latency: '28ms', ip: '192.168.1.38' },
                  { time: '14:31:52', endpoint: '/ai/insights/123', method: 'GET', status: '200', latency: '156ms', ip: '192.168.1.50' },
                  { time: '14:31:50', endpoint: '/user/spending-limit', method: 'GET', status: '200', latency: '18ms', ip: '192.168.1.41' },
                  { time: '14:31:48', endpoint: '/anomalies', method: 'GET', status: '200', latency: '52ms', ip: '192.168.1.39' },
                ].map((log, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(6, 182, 212, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer' }} 
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)'} 
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>{log.time}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontFamily: 'monospace', color: '#0ea5e9' }}>{log.endpoint}</td>
                    <td style={{ padding: '1rem 1.5rem' }}><span style={{ background: 'rgba(34, 197, 94, 0.25)', color: '#86efac', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>{log.method}</span></td>
                    <td style={{ padding: '1rem 1.5rem' }}><span style={{ background: log.status === '200' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, color: log.status === '200' ? '#86efac' : '#fca5a5' }}>{log.status}</span></td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}><span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '2px 8px', borderRadius: '4px' }}>{log.latency}</span></td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'monospace' }}>{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    );
  };

  const AlertsView = () => {
    const [filters, setFilters] = useState({ risk: 'all', date: 'today' });

    return (
      <section style={{ padding: '3rem 2rem', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1px', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Active Security Alerts</h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Real-time threat intelligence and anomaly detection</p>
          </div>

          <FilterBar onFilterChange={setFilters} />

        {/* Alert Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: 'Critical', count: '3', color: '#ef4444', emoji: '🔴' },
            { label: 'High Risk', count: '12', color: '#f59e0b', emoji: '🟠' },
            { label: 'Medium', count: '28', color: '#fbbf24', emoji: '🟡' },
            { label: 'Low', count: '156', color: '#22c55e', emoji: '🟢' },
          ].map((alert, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${alert.color}15, ${alert.color}08)`,
              border: `1px solid ${alert.color}40`,
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              animation: `fadeInUp 0.6s ease-out ${i * 0.1}s`,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 0 30px ${alert.color}30`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{alert.emoji}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600 }}>{alert.label}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: alert.color }}>{alert.count}</div>
            </div>
          ))}
        </div>

        {/* Active Alerts */}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {[
            { type: 'Suspicious UPI Transfer', desc: 'Unusual amount ₹50,000 to new beneficiary', severity: 'high', time: '2 mins ago', icon: '⚠️', users: '1,234', impact: 'Critical' },
            { type: 'Card Skimming Attempt', desc: 'Multiple failed payment attempts from same card', severity: 'high', time: '15 mins ago', icon: '🔓', users: '847', impact: 'High' },
            { type: 'Velocity Check Failed', desc: 'High transaction frequency detected in 5 mins', severity: 'medium', time: '28 mins ago', icon: '⚡', users: '3,456', impact: 'Medium' },
            { type: 'Unusual Login Pattern', desc: 'Login from new device and IP address', severity: 'medium', time: '1 hour ago', icon: '🔑', users: '2,123', impact: 'Medium' },
            { type: 'Amount Threshold Exceeded', desc: 'Transaction above daily limit by 15%', severity: 'low', time: '2 hours ago', icon: '📊', users: '567', impact: 'Low' },
          ].map((alert, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${alert.severity === 'high' ? 'rgba(239, 68, 68, 0.12)' : alert.severity === 'medium' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(34, 197, 94, 0.12)'}, transparent)`,
              border: `1px solid ${alert.severity === 'high' ? 'rgba(239, 68, 68, 0.3)' : alert.severity === 'medium' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              animation: `fadeInUp 0.6s ease-out ${i * 0.1}s`
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${alert.severity === 'high' ? 'rgba(239, 68, 68, 0.18)' : alert.severity === 'medium' ? 'rgba(245, 158, 11, 0.18)' : 'rgba(34, 197, 94, 0.18)'}, transparent)`;
              e.currentTarget.style.transform = 'translateX(8px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${alert.severity === 'high' ? 'rgba(239, 68, 68, 0.12)' : alert.severity === 'medium' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(34, 197, 94, 0.12)'}, transparent)`;
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <div style={{ fontSize: '2rem' }}>{alert.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem', color: alert.severity === 'high' ? '#fca5a5' : alert.severity === 'medium' ? '#fed7aa' : '#86efac' }}>{alert.type}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem' }}>{alert.desc}</p>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>👥 Affected Users</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{alert.users}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>📈 Impact Level</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: alert.severity === 'high' ? '#ff6b6b' : alert.severity === 'medium' ? '#fbbf24' : '#22c55e' }}>{alert.impact}</span>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                    🕐 {alert.time}
                  </div>
                </div>
              </div>
              <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: alert.severity === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: '#06b6d4', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                Investigate
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
  };

  const InsightsView = () => {
    const [filters, setFilters] = useState({ risk: 'all', date: 'today' });

    return (
      <section style={{ padding: '3rem 2rem', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1px', background: 'linear-gradient(90deg, #ec4899, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI-Powered Insights</h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Machine learning analysis of transaction patterns and fraud risks</p>
          </div>

          <FilterBar onFilterChange={() => {}} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: '📉',
              title: 'Spending Pattern Alert', 
              score: '7.2/10',
              metric: 'Risk Score',
              content: 'Daily spending decreased 12% this month. Peak transactions occur between 2-4 PM on weekdays. Recommend monitoring for unusual deviations.',
              trend: '↓ -12%',
              color: '#0ea5e9'
            },
            { 
              icon: '🎯', 
              title: 'Risk Assessment', 
              score: '2.3/10',
              metric: 'Overall Risk',
              content: 'Your transaction patterns are within normal parameters. 99.8% of activities are legitimate based on historical analysis.',
              trend: '✅ Safe',
              color: '#22c55e'
            },
            { 
              icon: '📊', 
              title: 'Fraud Trend Analysis', 
              score: '5.8/10',
              metric: 'Trend Alert',
              content: 'UPI fraud attempts up by 8% week-over-week across the platform. Recommend enabling additional verification for amounts above ₹50,000.',
              trend: '↑ +8%',
              color: '#f59e0b'
            },
            { 
              icon: '💡', 
              title: 'Security Recommendation', 
              score: '9.5/10',
              metric: 'Priority: High',
              content: 'Enable 2FA for all transactions. This will reduce fraud risk by 94%. Update payment methods to use latest security protocols.',
              trend: '⭐ Critical',
              color: '#8b5cf6'
            },
            { 
              icon: '🔐', 
              title: 'Authentication Analysis', 
              score: '8.1/10',
              metric: 'Strength Score',
              content: 'Your authentication methods are strong. Consider adding biometric verification for mobile transactions to improve security by 28%.',
              trend: '✅ Good',
              color: '#06b6d4'
            },
            { 
              icon: '💰', 
              title: 'Budget Optimization', 
              score: '6.5/10',
              metric: 'Efficiency',
              content: 'You can optimize spending patterns by setting a daily limit of ₹30,000. This aligns with your transaction history and minimizes fraud exposure.',
              trend: '📈 +15%',
              color: '#ec4899'
            },
          ].map((insight, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${insight.color}15, ${insight.color}06)`,
              border: `1px solid ${insight.color}30`,
              borderRadius: '16px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'pointer',
              animation: `fadeInUp 0.6s ease-out ${i * 0.1}s`,
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${insight.color}25, ${insight.color}10)`;
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = `0 20px 60px ${insight.color}30`;
              e.currentTarget.style.borderColor = `${insight.color}50`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${insight.color}15, ${insight.color}06)`;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${insight.color}30`;
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>{insight.icon}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{insight.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem' }}>{insight.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ 
                      fontSize: '1.8rem', 
                      fontWeight: 900, 
                      background: `linear-gradient(135deg, ${insight.color}, ${insight.color}dd)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-1px'
                    }}>
                      {insight.score}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>{insight.metric}</div>
                  </div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{insight.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px solid ${insight.color}20` }}>
                <span style={{ fontSize: '0.85rem', color: insight.color, fontWeight: 600 }}>{insight.trend}</span>
                <button style={{ padding: '6px 14px', borderRadius: '6px', border: `1px solid ${insight.color}40`, background: `${insight.color}15`, color: insight.color, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', transition: 'all 0.3s ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${insight.color}25`;
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${insight.color}15`;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}>
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
  };

  const AnalyticsView = () => {
    const [filters, setFilters] = useState({ risk: 'all', date: 'today' });

    return (
      <section style={{ padding: '3rem 2rem', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1px', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Analytics Dashboard</h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Comprehensive performance metrics and data visualization</p>
          </div>

          <FilterBar onFilterChange={() => {}} />

        {/* Top KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: 'Total Transactions', value: '12,458', icon: '💳', change: '+18.3%', gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
            { label: 'Success Rate', value: '99.82%', icon: '✅', change: '+0.5%', gradient: 'linear-gradient(135deg, #22c55e, #059669)' },
            { label: 'Threats Blocked', value: '347', icon: '🛡️', change: '+24.1%', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
            { label: 'Avg Response Time', value: '42ms', icon: '⚡', change: '-8.2%', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
          ].map((metric, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '16px',
              padding: '2rem',
              animation: `fadeInUp 0.6s ease-out ${i * 0.1}s`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(10, 165, 233, 0.08))';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: metric.gradient
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{metric.icon}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: metric.change.startsWith('+') ? '#22c55e' : '#f59e0b', background: metric.change.startsWith('+') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)', padding: '4px 10px', borderRadius: '6px' }}>
                  {metric.change}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{metric.label}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, background: metric.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Data */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          {/* Transaction Trend */}
          <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.05))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', padding: '2rem', animation: 'fadeInUp 0.8s ease-out' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>Transaction Trend</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', justifyContent: 'space-around' }}>
              {[65, 78, 92, 85, 95, 88, 102].map((val, i) => (
                <div key={i} style={{
                  width: '100%',
                  height: `${(val / 102) * 100}%`,
                  background: 'linear-gradient(180deg, #0ea5e9, #06b6d4)',
                  borderRadius: '8px 8px 0 0',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  opacity: 0.7,
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.filter = 'brightness(1.2)';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(6, 182, 212, 0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '0.7';
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.3)';
                }}>
                  <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#0ea5e9', fontWeight: 700 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
            </div>
          </div>

          {/* Risk Distribution */}
          <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.05))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', padding: '2rem', animation: 'fadeInUp 0.8s ease-out' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', background: 'linear-gradient(90deg, #ec4899, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>Risk Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { label: 'Low Risk (Safe)', value: 85, color: '#22c55e' },
                { label: 'Medium Risk', value: 12, color: '#f59e0b' },
                { label: 'High Risk', value: 2.5, color: '#ef4444' },
              ].map((risk, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{risk.label}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: risk.color }}>{risk.value}%</span>
                  </div>
                  <div style={{ height: '12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${risk.color}, ${risk.color}dd)`,
                      width: `${risk.value}%`,
                      transition: 'width 0.6s ease-out',
                      borderRadius: '8px',
                      boxShadow: `0 0 12px ${risk.color}60`
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Statistics Table */}
        <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.05))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', overflow: 'hidden', animation: 'fadeInUp 1s ease-out' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(6, 182, 212, 0.1)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Detailed Performance Metrics</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ background: 'rgba(6, 182, 212, 0.05)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metric</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Yesterday</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>This Week</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Change</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'API Requests', today: '2,847', yesterday: '2,156', week: '18,245', change: '+32.1%' },
                  { metric: 'Fraud Detections', today: '47', yesterday: '38', week: '312', change: '+23.7%' },
                  { metric: 'Success Rate', today: '99.82%', yesterday: '99.65%', week: '99.71%', change: '+0.17%' },
                  { metric: 'Avg Latency', today: '42ms', yesterday: '48ms', week: '45ms', change: '-12.5%' },
                  { metric: 'Blocked Threats', today: '156', yesterday: '127', week: '1,024', change: '+22.8%' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(6, 182, 212, 0.1)', transition: 'background 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.95rem', fontWeight: 600 }}>{row.metric}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.95rem' }}><span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#86efac', padding: '4px 10px', borderRadius: '6px' }}>{row.today}</span></td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.95rem', color: '#94a3b8' }}>{row.yesterday}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.95rem', color: '#94a3b8' }}>{row.week}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.95rem' }}><span style={{ color: row.change.startsWith('+') ? '#22c55e' : '#f59e0b', fontWeight: 700 }}>{row.change}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    );
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #060d1a 0%, #0f1729 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      {activeView === 'home' || activeView === 'overview' ? <OverviewView /> : activeView === 'logs' ? <APILogsView /> : activeView === 'alerts' ? <AlertsView /> : activeView === 'insights' ? <InsightsView /> : <AnalyticsView />}
    </div>
  );
}


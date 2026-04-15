'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useAuth } from '@/context/AuthContext';
import { Shield, AlertTriangle, TrendingUp, Lock, Zap, ArrowRight, BarChart3, CheckCircle, Gauge, Cpu, ArrowLeft, Users, Search } from 'lucide-react';

// Mobile Carousel Component with Auto-Changing Screens
const MobileCarousel = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      title: 'Real-Time Detection',
      subtitle: 'Instant fraud alerts',
      icon: '⚡',
      color: '#06b6d4',
      features: ['AI-Powered', 'Millisecond response']
    },
    {
      title: 'Built-in Compliance',
      subtitle: 'RBI compliant',
      icon: '✓',
      color: '#10b981',
      features: ['ISO 27001', 'Bank-Grade']
    },
    {
      title: 'White-Label Ready',
      subtitle: 'Deploy in days',
      icon: '🎨',
      color: '#a855f7',
      features: ['Customizable UI', 'Fast integration']
    },
    {
      title: '10+ Banks Connected',
      subtitle: 'Seamless integration',
      icon: '🏦',
      color: '#3b82f6',
      features: ['Multi-bank', 'Single API']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const screen = screens[currentScreen];

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'clamp(450px, 70vh, 600px)',
      perspective: '1000px',
      width: '100%',
      maxWidth: '450px',
      margin: '0 auto'
    }}>
      {/* Left Arrows - Features pointing from phone - hidden on small tablets/mobile */}
      <div style={{ 
        position: 'absolute', 
        left: 'clamp(-140px, -12vw, -100px)', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2.5rem', 
        zIndex: 5,
        visibility: 'visible'
      }} className="carousel-labels-left">
        {[
          { label: 'Real-Time Detection', icon: '⚡', color: '#06b6d4' },
          { label: 'Single SDK', icon: '🔧', color: '#0ea5e9' },
          { label: 'Built-in Compliance', icon: '✓', color: '#10b981' },
        ].map((feature, i) => (
          <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1.5rem', animation: 'fadeInLeft 0.6s ease-out' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.25rem'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', whiteSpace: 'nowrap' }}>{feature.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Auto-detect • Instant</div>
            </div>
            {/* Arrow pointing to phone */}
            <svg width="40" height="30" viewBox="0 0 40 30" style={{ color: feature.color }}>
              <path d="M 0 15 L 30 15 M 25 10 L 30 15 L 25 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* Glow Effect */}
      <div style={{
        position: 'absolute',
        width: '380px',
        height: '750px',
        background: `radial-gradient(circle, rgba(${screen.color === '#06b6d4' ? '6, 182, 212' : screen.color === '#10b981' ? '16, 185, 129' : '168, 85, 247'}, 0.25), transparent)`,
        borderRadius: '60px',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        transition: 'all 1s ease'
      }} />

      {/* iPhone Frame */}
      <div style={{
        position: 'relative',
        width: 'clamp(280px, 80vw, 320px)',
        height: 'clamp(560px, 160vw, 640px)',
        background: '#000',
        borderRadius: 'clamp(40px, 12vw, 50px)',
        padding: 'clamp(8px, 2vw, 12px)',
        boxShadow: `0 30px 80px ${screen.color}40, 0 0 0 1px ${screen.color}20`,
        border: `clamp(6px, 2vw, 8px) solid #1a1a1a`,
        transition: 'all 0.6s ease'
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(120px, 40vw, 140px)',
          height: 'clamp(24px, 8vw, 28px)',
          background: '#000',
          borderBottomLeftRadius: 'clamp(30px, 10vw, 35px)',
          borderBottomRightRadius: 'clamp(30px, 10vw, 35px)',
          zIndex: 10,
          border: `clamp(6px, 2vw, 8px) solid #1a1a1a`,
          borderTop: 'none'
        }} />

        {/* Screen Content */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #060d1a 0%, #0f1729 100%)',
          borderRadius: '45px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 'clamp(6px, 2vw, 8px)',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 2vw, 1.5rem)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'fadeIn 0.6s ease-out' }}>{screen.icon}</div>
          <h2 style={{ 
            fontSize: 'clamp(1rem, 4vw, 1.5rem)', 
            fontWeight: 900, 
            color: '#fff',
            marginBottom: '0.5rem',
            animation: 'fadeIn 0.6s ease-out 0.1s backwards'
          }}>
            {screen.title}
          </h2>
          <p style={{ 
            fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', 
            color: '#94a3b8',
            marginBottom: '2rem',
            animation: 'fadeIn 0.6s ease-out 0.2s backwards'
          }}>
            {screen.subtitle}
          </p>

          <div style={{ 
            display: 'flex', 
            gap: 'clamp(1rem, 3vw, 1.5rem)',
            flexDirection: 'column',
            width: '100%',
            animation: 'fadeIn 0.6s ease-out 0.3s backwards'
          }}>
            {screen.features.map((feature, i) => (
              <div key={i} style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                background: `${screen.color}20`,
                border: `1px solid ${screen.color}40`,
                borderRadius: 'clamp(6px, 2vw, 10px)',
                color: '#e2e8f0',
                fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                fontWeight: 600
              }}>
                ✓ {feature}
              </div>
            ))}
          </div>

          {/* Progress Dots */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem',
            marginTop: '2rem',
            justifyContent: 'center'
          }}>
            {screens.map((_, i) => (
              <div key={i} style={{
                width: i === currentScreen ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentScreen ? screen.color : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentScreen(i)}
               />
            ))}
          </div>
        </div>
      </div>

      {/* Right Info Labels - hidden on small tablets/mobile */}
      <div style={{ 
        position: 'absolute', 
        right: 'clamp(-160px, -12vw, -120px)', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        zIndex: 5,
        visibility: 'visible'
      }} className="carousel-labels-right">
        {[
          { label: '10+ Banks Connected', value: '100%', icon: '🏦' },
          { label: 'White-Label Ready', value: 'Ready', icon: '🎨' },
          { label: 'Go Live in 7 Days', value: 'Fast', icon: '⚡' }
        ].map((info, i) => (
          <div key={i} style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            animation: 'fadeInRight 0.6s ease-out',
            paddingLeft: '1.5rem',
            borderLeft: '2px solid rgba(6, 182, 212, 0.3)',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0 12px 12px 0',
            padding: '0.5rem 1rem 0.5rem 1rem',
          }}>
            {/* Arrow from phone */}
            <svg width="40" height="30" viewBox="0 0 40 30" style={{ color: '#06b6d4' }}>
              <path d="M 40 15 L 10 15 M 15 10 L 10 15 L 15 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0' }}>{info.label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: '0.25rem' }}>{info.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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

// AI Auto Decision Engine Component (Enhanced)
const AutoDecisionEngine = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 13, 26, 0.8))',
      border: '1px solid rgba(6, 182, 212, 0.3)',
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
        background: 'linear-gradient(90deg, #0ea5e9, #a78bfa)'
      }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          background: 'rgba(6, 182, 212, 0.1)', 
          border: '2px solid rgba(6, 182, 212, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          animation: 'pulse 2s infinite'
        }}>
          🧠
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>AI Auto-Decision Engine</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Instant mitigation for detected threats</p>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>⛔</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fca5a5' }}>High Risk Response</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Immediate Block + Account Lockdown</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>🔐</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fed7aa' }}>Medium Risk Response</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Step-up MFA / Biometric Challenge</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>✅</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#86efac' }}>Low Risk Response</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Allow + Shadow Background Tracking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              {activity.decision && (
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: activity.color, 
                  background: `${activity.color}15`, 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  marginTop: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: `1px solid ${activity.color}30`
                }}>
                  <span style={{ fontSize: '1rem' }}>🤖</span>
                  <strong>AI Action:</strong> {activity.decision}
                </div>
              )}
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { isConnected, subscribe } = useWebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws');
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/stats`);
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
        decision: message.data.ai_decision,
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
      {/* Partner Banner - Pro Redesign */}
      <section style={{ 
        padding: '0.75rem 0', 
        background: 'rgba(255, 255, 255, 0.01)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.6rem 1.5rem',
            background: 'rgba(6, 182, 212, 0.05)',
            border: '1px solid rgba(6, 182, 212, 0.1)',
            borderRadius: '100px',
            fontSize: '0.85rem',
            color: '#94a3b8',
            fontWeight: 500,
            animation: 'fadeInDown 0.6s ease-out'
          }}>
            <span style={{ color: '#06b6d4', fontWeight: 800 }}>TRUSTED BY</span>
            <div style={{ height: '4px', width: '4px', borderRadius: '50%', background: '#334155' }} />
            <span>Leading Neo-Banks & Fintech Unicorns</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(1rem, 4vw, 3rem) 2rem',
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Glows for Hero */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15), transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
          gap: 'clamp(2rem, 6vw, 5rem)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ animation: 'fadeInUp 0.8s ease-out', maxWidth: '750px' }}>
            {/* Top Badge - Refined */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '100px',
              fontSize: '0.75rem',
              color: '#06b6d4',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '2rem'
            }}>
              <span style={{ fontSize: '1rem' }}>⚡</span>
              Next-Gen Fraud Detection
            </div>

            {/* Main Headline */}
            <h1 style={{ 
              fontSize: 'clamp(1.5rem, 5vw, 4.2rem)', 
              fontWeight: 950, 
              lineHeight: 1, 
              marginBottom: '1rem', 
              letterSpacing: '-0.04em',
              color: '#fff'
            }}>
              Protect Your 
              <span style={{ 
                background: 'linear-gradient(135deg, #0ea5e9, #a78bfa)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}>
                Assets In Real-Time
              </span>
            </h1>

            {/* Subheading */}
            <p style={{ 
              fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', 
              color: '#94a3b8', 
              marginBottom: '2.5rem', 
              lineHeight: 1.6,
              maxWidth: '540px',
              fontWeight: 400
            }}>
              Deploy our AI-powered gateway in minutes. Achieving <strong style={{ color: '#fff' }}>99.8% precision</strong> in detecting anomalies across millions of transactions.
            </p>

            {/* Trust Badges - Improved Design */}
            <div style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              {[
                { icon: '🛡️', text: 'ISO 27001' },
                { icon: '⛓️', text: 'End-to-End Encrypted' },
                { icon: '🏦', text: 'RBI Compliant' }
              ].map((badge, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem',
                  padding: '0.5rem 0.8rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  color: '#e2e8f0',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}>
                  <span>{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button style={{
                padding: '16px 36px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.4)',
                fontFamily: 'inherit'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.4)';
              }}>
                Book a Live Demo
              </button>
              <button style={{
                padding: '16px 36px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.03)',
                color: '#e2e8f0',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}>
                Interactive Explorer
              </button>
            </div>
          </div>

          {/* Right Side - iPhone Carousel */}
          <div style={{
            animation: 'fadeInScale 1s ease-out',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <MobileCarousel />
          </div>
        </div>
      </section>

      {/* Dashboard Intelligence Section */}
      <section style={{ 
        padding: '5rem 1rem', 
        background: 'var(--card-bg)', 
        borderTop: '1px solid var(--card-border)',
        transition: 'var(--theme-transition)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1rem', letterSpacing: '-2px', background: 'var(--gradient-cyan)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart Security Dashboard</h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '4rem', fontWeight: 500 }}>Real-time AI monitoring with instant threat detection and behavioral analysis.</p>
          
          {/* Risk & Behavior Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <RiskMeterGauge riskLevel="medium" />
            <UserBehaviorGraph />
            <DailyLimitProgressBar used={180} limit={200} />
          </div>

          {/* Critical Alerts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <RBIAlertCard />
            <AutoDecisionEngine />
          </div>

          {/* Live Activity Feed */}
          <LiveActivityFeed activities={liveActivities} />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '5rem 1rem', 
        background: 'var(--background)',
        borderTop: '1px solid var(--card-border)',
        transition: 'var(--theme-transition)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '5rem', letterSpacing: '-2px', textAlign: 'center', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
      <section style={{ padding: '3rem 1rem', background: 'linear-gradient(180deg, rgba(6, 13, 26, 0.5), rgba(6, 13, 26, 0.8))', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, textAlign: 'center' }}>
            ISSUER & DISTRIBUTION PARTNERS
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '2.5rem', 
            padding: '3rem',
            background: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.02)',
            borderRadius: '24px',
            border: '1px solid var(--card-border)',
            alignItems: 'center'
          }}>
            {[
              { name: 'Google Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg' },
              { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
              { name: 'PhonePe', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg' },
              { name: 'Razorpay', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg' },
              { name: 'Amazon Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg' },
              { name: 'MobiKwik', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/MobiKwik_Logo.svg' },
            ].map((partner, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2.5rem 1.5rem',
                background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'center',
                boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.05)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(6, 182, 212, 0.2)' : '0 15px 35px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.boxShadow = isDarkMode ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)';
              }}>
                <div style={{
                  height: '40px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <img src={partner.logo} alt={partner.name} style={{ 
                    maxHeight: '100%', 
                    maxWidth: '120px', 
                    objectFit: 'contain',
                    filter: isDarkMode ? 'brightness(1.2)' : 'none'
                  }} />
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--foreground)', opacity: 0.7, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ 
        padding: '8rem 2rem 4rem', 
        background: 'linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.03) 100%)', 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', 
            gap: '5rem', 
            marginBottom: '6rem'
          }}>
            {/* Brand Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}>
                  <Shield size={26} color="#fff" />
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, color: '#fff', letterSpacing: '-1px' }}>BloShield</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '300px' }}>
                Next-generation fraud prevention infrastructure for modern financial institutions.
              </p>
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                {['🐙', '🐦', '💼', '📸'].map((icon, i) => (
                  <div key={i} style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'; e.currentTarget.style.borderColor = '#06b6d4'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {['Intelligence', 'API Gateway', 'Compliance', 'Pricing'].map(link => (
                  <li key={link}><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {['Documentation', 'Developer API', 'System Status', 'Security'].map(link => (
                  <li key={link}><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Join Our Network</h4>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>Stay updated with the latest in AI-driven fraud security.</p>
              <div style={{ position: 'relative' }}>
                <input type="email" placeholder="Email Address" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px 20px', color: '#fff', outline: 'none' }} />
                <button style={{ position: 'absolute', right: '6px', top: '6px', bottom: '6px', padding: '0 20px', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Join</button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👨‍💻</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>Prince Yadav</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Creator & Lead Architect • BloShield Labs</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '2.5rem' }}>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>© 2026 BloShield Infrastructure. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {['Privacy', 'Terms', 'Cookie Policy'].map(item => (
                  <a key={item} href="#" style={{ color: '#475569', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>{item}</a>
                ))}
              </div>
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
      <section style={{ padding: '4.5rem 2rem', flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Intelligence Background layers */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '600px', background: 'radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          {/* Pro Header with Gov Badges */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', animation: 'fadeInDown 0.8s ease-out' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: '1.5px solid rgba(6, 182, 212, 0.3)' }}>
                  <Shield size={24} color="#06b6d4" />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.15em' }}>BloShield Sentinel Intelligence</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>National Cyber Security Protocol</div>
                </div>
              </div>
              <h1 style={{ fontSize: '4rem', fontWeight: 950, marginBottom: '0.5rem', letterSpacing: '-2.5px', color: '#fff', lineHeight: 1 }}>Active Security Alerts</h1>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: 500 }}>Real-time threat monitoring and behavioral mitigation active</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ padding: '1rem 1.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1.5px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>Alert Level</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 950, color: '#ef4444', animation: 'pulse 1.5s infinite' }}>CRITICAL</div>
              </div>
              <div style={{ padding: '1rem 1.5rem', background: 'rgba(6, 182, 212, 0.1)', border: '1.5px solid rgba(6, 182, 212, 0.3)', borderRadius: '16px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>System Trust</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 950, color: '#06b6d4' }}>99.9%</div>
              </div>
            </div>
          </div>

          {/* Alerts Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4.5rem' }}>
            {[
              { label: 'Critical', count: '14', color: '#ef4444', icon: '🔴' },
              { label: 'High Risk', count: '52', color: '#f59e0b', icon: '🟠' },
              { label: 'Moderate', count: '128', color: '#facc15', icon: '🟡' },
              { label: 'Safe Checks', count: '412K', color: '#22c55e', icon: '⚪' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                padding: '2rem',
                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s`,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = `${stat.color}40`;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>{stat.label}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 950, color: stat.color, letterSpacing: '-1.5px' }}>{stat.count}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
            
            {/* Live Threat Feed */}
            <div style={{ animation: 'fadeInRight 0.8s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff' }}>National Threat Intelligence Feed</h3>
                <FilterBar onFilterChange={() => {}} />
              </div>
              
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {[
                  { title: 'UPI Anomaly: High Velocity', desc: 'Attempted ₹45k transfer - blocked by behavior score 8.2.', severity: 'CRITICAL', color: '#ef4444', icon: '⚠️' },
                  { title: 'SIM-Swap Indicator Detected', desc: 'MFA re-routing detected on device fingerprint change.', severity: 'HIGH', color: '#f59e0b', icon: '🔓' },
                  { title: 'IVR Scam Wave Detected', desc: 'Sudden spike in AI-generated voice phishing originating from HK nodes.', severity: 'MODERATE', color: '#facc15', icon: '📞' },
                  { title: 'Card Skimming Prevention', desc: 'Multiple failed CVV attempts blocked on merchant terminal.', severity: 'MODERATE', color: '#facc15', icon: '🔒' },
                ].map((alert, i) => (
                  <div key={i} style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1.5px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '20px',
                    padding: '1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.75rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = `${alert.color}30`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: `${alert.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: `1.5px solid ${alert.color}30` }}>
                      {alert.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{alert.title}</h4>
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, color: alert.color, textTransform: 'uppercase' }}>{alert.severity}</span>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>{alert.desc}</p>
                    </div>
                    <button style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={e => (e.currentTarget.style.background = '#06b6d420')} onMouseLeave={e => (e.currentTarget.style.background = '#06b6d410')}>Investigate</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Awareness Sidebar */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(6, 13, 26, 0.9), rgba(6, 182, 212, 0.05))',
              borderRadius: '28px',
              padding: '2.5rem',
              border: '1.5px solid rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'fadeInLeft 1s ease-out',
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #06b6d4, #a78bfa)' }} />
              
              <h3 style={{ fontSize: '1.6rem', fontWeight: 950, marginBottom: '2rem', color: '#fff' }}>🛡️ Cyber Defense Awareness</h3>
              
              {/* Image Section */}
              <div style={{ width: '100%', height: '260px', borderRadius: '20px', marginBottom: '2.5rem', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <img src="/cyber_spam_awareness_banner_1776246884090.png" alt="Cyber Security Awareness" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #060d1a, transparent)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>Ongoing Spam Wave Detected: Region-7</div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ color: '#06b6d4', fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.25rem' }}>The Fraud Anatomy:</h4>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {[
                    { title: 'Digital Footprint Tracking', text: 'Social engineering bots gather your login habits and times.' },
                    { title: 'Call Phishing (vishing)', text: 'Calls posing as bank officials created with high-fidelity Deepvoice AI.' },
                    { title: 'Unauthorized API Hook', text: 'Accessing your UPI session to create unauthorized push requests.' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', border: '1.5px solid rgba(6, 182, 212, 0.4)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 950, flexShrink: 0 }}>{i+1}</div>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '2px' }}>{item.title}</div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '20px', padding: '1.75rem', position: 'relative' }}>
                <div style={{ fontSize: '1rem', fontWeight: 950, color: '#fca5a5', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                   🚨 National Cyber Crime Helpline
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>Report cyber crimes instantly to the government cell. Prevention is the first line of defense.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                  <button style={{ padding: '12px', background: '#ef4444', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 950, fontSize: '1.25rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)' }}>📞 1930</button>
                  <button style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.06)', color: '#fff', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Report Online</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  };

  const InsightsView = () => {
    const [filters, setFilters] = useState({ risk: 'all', date: 'today' });
    const [rbiAlerts, setRbiAlerts] = useState([]);
    const [trendingScams, setTrendingScams] = useState([]);
    const [liveFeed, setLiveFeed] = useState([]);
    const [selectedAlert, setSelectedAlert] = useState(null);

    useEffect(() => {
      const fetchRbiData = async () => {
        try {
          // Fetch active alerts
          const alertsResponse = await fetch('http://localhost:8000/rbi/active-alerts');
          const alertsData = await alertsResponse.json();
          setRbiAlerts(alertsData.alerts || []);

          // Fetch trending scams
          const trendingResponse = await fetch('http://localhost:8000/rbi/trending-scams');
          const trendingData = await trendingResponse.json();
          setTrendingScams(trendingData.trending_scams || []);

          // Fetch live feed
          const feedResponse = await fetch('http://localhost:8000/rbi/live-feed');
          const feedData = await feedResponse.json();
          setLiveFeed(feedData.live_feed || []);
        } catch (error) {
          console.error('Failed to fetch RBI data:', error);
        }
      };

      fetchRbiData();

      // Set up live updates every 30 seconds
      const interval = setInterval(fetchRbiData, 30000);
      return () => clearInterval(interval);
    }, []);

    return (
      <section style={{ padding: '3rem 2rem', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1px', background: 'linear-gradient(90deg, #ec4899, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI-Powered Insights</h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Machine learning analysis of transaction patterns and fraud risks</p>
          </div>

          <FilterBar onFilterChange={() => {}} />

          {/* RBI Live Intelligence Dashboard */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', color: '#f1f5f9' }}>
              🔴 RBI Live Fraud Intelligence
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              {/* Trending Scams */}
              <div style={{ background: 'linear-gradient(135deg, #dc262615, #dc262606)', border: '1px solid #dc262630', borderRadius: '16px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📈 Trending Scams
                </h3>
                <div style={{ spaceY: '1rem' }}>
                  {trendingScams.slice(0, 3).map((scam, i) => (
                    <div key={scam.alert_id} style={{ 
                      padding: '1rem', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      border: '1px solid rgba(220, 38, 38, 0.2)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.9rem' }}>{scam.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ 
                            fontSize: '0.8rem', 
                            color: scam.trend_direction === 'up' ? '#dc2626' : '#22c55e',
                            fontWeight: 600
                          }}>
                            {scam.trend_score}%
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                            {scam.trend_direction === 'up' ? '↗️' : '↘️'}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {scam.weekly_incidents} incidents • {scam.affected_users} affected
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Fraud Feed */}
              <div style={{ background: 'linear-gradient(135deg, #f59e0b15, #f59e0b06)', border: '1px solid #f59e0b30', borderRadius: '16px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🔔 Live Fraud Feed
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    background: '#f59e0b', 
                    borderRadius: '50%', 
                    animation: 'pulse 2s infinite' 
                  }} />
                </h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {liveFeed.slice(0, 5).map((item, i) => (
                    <div key={item.id} style={{ 
                      padding: '0.75rem', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      borderLeft: `3px solid ${item.severity === 'HIGH' ? '#dc2626' : item.severity === 'MEDIUM' ? '#f59e0b' : '#22c55e'}`
                    }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                        {item.description}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        {new Date(item.timestamp).toLocaleTimeString()} • {item.affected_count} affected
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Intelligence Summary */}
              <div style={{ background: 'linear-gradient(135deg, #22c55e15, #22c55e06)', border: '1px solid #22c55e30', borderRadius: '16px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🛡️ Risk Intelligence
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>{rbiAlerts.length}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Active Alerts</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>
                      {trendingScams.length > 0 ? Math.max(...trendingScams.map(s => s.trend_score)) : 0}%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Peak Trend</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>
                      {liveFeed.length > 0 ? liveFeed.filter(f => f.severity === 'HIGH').length : 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Critical Feeds</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#8b5cf6' }}>
                      {rbiAlerts.length > 0 ? Math.round(rbiAlerts.reduce((sum, a) => sum + a.severity_score, 0) / rbiAlerts.length) : 0}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Avg Severity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* RBI Compliance Guidelines */}
            {[
              { 
                icon: '⚖️', 
                title: 'RBI Compliance Guidelines', 
                score: 'RBI 2024',
                metric: 'Regulatory Framework',
                content: 'LEGAL: KYC-compliant transactions, verified merchant payments, RBI-regulated apps. ILLEGAL: Unverified P2P transfers >₹1L/day, fake investment schemes, unauthorized data sharing.',
                trend: '📋 RBI Guidelines',
                color: '#059669'
              },
              { 
                icon: '🚫', 
                title: 'Prohibited Activities', 
                score: 'High Risk',
                metric: 'Fraud Prevention',
                content: 'ILLEGAL: Money laundering, terrorist financing, fake loan apps, unauthorized ATM skimming, cryptocurrency scams without RBI approval. Report suspicious activities immediately.',
                trend: '🚨 Report Now',
                color: '#dc2626'
              },
              { 
                icon: '✅', 
                title: 'Permitted Transactions', 
                score: 'Safe',
                metric: 'Compliance Status',
                content: 'LEGAL: UPI payments up to ₹1L/day, NEFT/RTGS transfers, verified e-commerce purchases, RBI-licensed banking apps. Always verify merchant authenticity.',
                trend: '🛡️ Protected',
                color: '#16a34a'
              },
            ].map((insight, i) => (
              <div key={`compliance-${i}`} style={{
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

            {/* RBI Active Fraud Alerts with Enhanced Data */}
            {rbiAlerts.map((alert, i) => (
              <div key={`rbi-${alert.alert_id}`} style={{
                background: `linear-gradient(135deg, #dc262615, #dc262606)`,
                border: `1px solid #dc262630`,
                borderRadius: '16px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                animation: `fadeInUp 0.6s ease-out ${(i + 3) * 0.1}s`,
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => setSelectedAlert(alert)}
              onMouseEnter={e => {
                e.currentTarget.style.background = `linear-gradient(135deg, #dc262625, #dc262610)`;
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 60px #dc262630`;
                e.currentTarget.style.borderColor = `#dc262650`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `linear-gradient(135deg, #dc262615, #dc262606)`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `#dc262630`;
              }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>🚨</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '2.5rem' }}>🚨</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem' }}>{alert.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 900, 
                        background: `linear-gradient(135deg, #dc2626, #dc2626dd)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-1px'
                      }}>
                        {alert.alert_id}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>{alert.risk_level} RISK</div>
                    </div>
                  </div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{alert.description}</p>
                
                {/* Enhanced Alert Data */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>{alert.trend_score}%</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Trend Score</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#dc2626' }}>{alert.severity_score}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Severity</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px solid #dc262620` }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {alert.weekly_incidents} incidents • {alert.affected_users} affected
                  </span>
                  <button style={{ padding: '6px 14px', borderRadius: '6px', border: `1px solid #dc262640`, background: `#dc262615`, color: '#dc2626', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `#dc262625`;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `#dc262615`;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    View Details →
                  </button>
                </div>
              </div>
            ))}

            {/* Existing AI Insights */}
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
            <div key={`ai-${i}`} style={{
              background: `linear-gradient(135deg, ${insight.color}15, ${insight.color}06)`,
              border: `1px solid ${insight.color}30`,
              borderRadius: '16px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'pointer',
              animation: `fadeInUp 0.6s ease-out ${(i + rbiAlerts.length + 3) * 0.1}s`,
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

        {/* Selected Alert Details Modal */}
        {selectedAlert && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedAlert(null)}>
            <div style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              border: '1px solid #dc262630'
            }}
            onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f1f5f9' }}>
                  🚨 {selectedAlert.title}
                </h2>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)';
                    e.currentTarget.style.color = '#dc2626';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#94a3b8';
                  }}>
                  ✕
                </button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: selectedAlert.risk_level === 'HIGH' ? '#dc262615' : selectedAlert.risk_level === 'MEDIUM' ? '#f59e0b15' : '#22c55e15',
                    color: selectedAlert.risk_level === 'HIGH' ? '#dc2626' : selectedAlert.risk_level === 'MEDIUM' ? '#f59e0b' : '#22c55e',
                    border: `1px solid ${selectedAlert.risk_level === 'HIGH' ? '#dc262630' : selectedAlert.risk_level === 'MEDIUM' ? '#f59e0b30' : '#22c55e30'}`
                  }}>
                    {selectedAlert.risk_level} RISK
                  </span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#8b5cf6',
                    border: '1px solid rgba(139, 92, 246, 0.3)'
                  }}>
                    {selectedAlert.fraud_type}
                  </span>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {selectedAlert.description}
                </p>
              </div>

              {/* Alert Statistics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{selectedAlert.trend_score}%</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Trend Score</div>
                  <div style={{ fontSize: '0.7rem', color: selectedAlert.trend_direction === 'up' ? '#22c55e' : '#dc2626', marginTop: '0.25rem' }}>
                    {selectedAlert.trend_direction === 'up' ? '↗️ Rising' : '↘️ Falling'}
                  </div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(220, 38, 38, 0.1)', borderRadius: '12px', border: '1px solid rgba(220, 38, 38, 0.3)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>{selectedAlert.severity_score}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Severity Score</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>Out of 100</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#06b6d4' }}>{selectedAlert.weekly_incidents}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Weekly Incidents</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>This Week</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#a855f7' }}>{selectedAlert.affected_users.toLocaleString()}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Affected Users</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>Reported</div>
                </div>
              </div>

              {/* Keywords */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.75rem' }}>
                  🔍 Detection Keywords
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedAlert.keywords.map((keyword, i) => (
                    <span key={i} style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: '#06b6d4',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      border: '1px solid rgba(6, 182, 212, 0.3)'
                    }}>
                      "{keyword}"
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #dc262640',
                  background: '#dc262615',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#dc262625';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#dc262615';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  📞 Report Incident
                </button>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(220, 38, 38, 0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  🛡️ Learn Prevention
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    );
  };

  const RiskProfilesView = () => {
    const [userProfiles, setUserProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      const fetchUserProfiles = async () => {
        try {
          const sampleUsers = ['User123', 'User456', 'UserABC', 'UserXYZ', 'User789', 'User999', 'Admin_Sec', 'Finance_Head'];
          const profiles = await Promise.all(
            sampleUsers.map(async (userId) => {
              try {
                const response = await fetch(`http://localhost:8000/blostem-dashboard/${userId}`);
                const data = await response.json();
                
                let riskScore = Math.floor(Math.random() * 100);
                let riskLevel = 'Safe';
                let riskColor = '#22c55e';
                let riskIcon = '🛡️';
                
                if (riskScore >= 75) {
                  riskLevel = 'Critical';
                  riskColor = '#ef4444';
                  riskIcon = '🚨';
                } else if (riskScore >= 40) {
                  riskLevel = 'Suspicious';
                  riskColor = '#f59e0b';
                  riskIcon = '⚠️';
                }
                
                return {
                  userId,
                  riskScore,
                  riskLevel,
                  riskColor,
                  riskIcon,
                  stats: data,
                  lastActivity: new Date().toISOString(),
                  activityTrend: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
                };
              } catch (error) {
                const riskScore = Math.floor(Math.random() * 100);
                return {
                  userId,
                  riskScore,
                  riskLevel: riskScore > 75 ? 'Critical' : riskScore > 40 ? 'Suspicious' : 'Safe',
                  riskColor: riskScore > 75 ? '#ef4444' : riskScore > 40 ? '#f59e0b' : '#22c55e',
                  riskIcon: riskScore > 75 ? '🚨' : riskScore > 40 ? '⚠️' : '🛡️',
                  stats: null,
                  lastActivity: new Date().toISOString(),
                  activityTrend: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
                };
              }
            })
          );
          
          setUserProfiles(profiles);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      
      fetchUserProfiles();
    }, []);

    const filteredProfiles = userProfiles.filter(p => p.userId.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <section style={{ padding: '4.5rem 2rem', flex: 1, position: 'relative' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Intelligence Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4.5rem', animation: 'fadeInDown 0.8s ease-out' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: '1.5px solid rgba(168, 85, 247, 0.3)' }}>
                  <Users size={24} color="#a855f7" />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Behavioral Analytics Engine</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>Persona Risk Intelligence</div>
                </div>
              </div>
              <h1 style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '0.5rem', letterSpacing: '-3px', color: '#fff', lineHeight: 1 }}>User Risk Matrix</h1>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', fontWeight: 500 }}>AI-driven behavioral profiling and real-time threat detection</p>
            </div>
            
            <div style={{ width: '450px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</div>
              <input 
                type="text" 
                placeholder="Search Identity or Signature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1.5px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '1.4rem 1.4rem 1.4rem 4rem',
                  color: '#fff',
                  fontSize: '1.1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#a855f7'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
              />
            </div>
          </div>

          {/* Persona Intelligence Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(430px, 1fr))', gap: '3rem' }}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '12rem' }}>
                <div style={{ width: '60px', height: '60px', border: '4px solid rgba(168, 85, 247, 0.1)', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
                <p style={{ color: '#94a3b8', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.1em' }}>RECONSTRUCTING DATA NODES...</p>
              </div>
            ) : (
              filteredProfiles.map((profile, i) => (
                <div key={profile.userId} style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                  border: '1.5px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '40px',
                  padding: '3rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  animation: `fadeInScale 0.8s ease-out ${i * 0.1}s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.borderColor = `${profile.riskColor}60`;
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = `0 50px 100px rgba(0,0,0,0.5), 0 0 50px ${profile.riskColor}10`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  {/* Persona Indicator Side */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '6px', height: '100%', background: profile.riskColor }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                      <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '28px', 
                        background: 'rgba(255, 255, 255, 0.04)', 
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '3.5rem'
                      }}>
                        {profile.riskScore > 70 ? '🛑' : profile.riskScore > 40 ? '⚠️' : '🛡️'}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 950, color: '#fff', marginBottom: '6px', letterSpacing: '-0.5px' }}>{profile.userId}</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: '8px', fontWeight: 900, textTransform: 'uppercase' }}>Secure</span>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', padding: '4px 12px', borderRadius: '8px', fontWeight: 700 }}>Legacy User</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '3rem', fontWeight: 950, color: profile.riskColor, letterSpacing: '-3px', lineHeight: 0.9 }}>{profile.riskScore}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confidence</div>
                    </div>
                  </div>

                  {/* High-end mini behavioral monitor */}
                  <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <span>Behavioral Pulse (24h)</span>
                      <span style={{ color: profile.riskColor }}>{profile.riskLevel} Level</span>
                    </div>
                    <div style={{ height: '70px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                      {profile.activityTrend.map((v: number, idx: number) => (
                        <div key={idx} style={{ 
                          flex: 1, 
                          height: `${v}%`, 
                          background: `linear-gradient(to top, ${profile.riskColor}20, ${profile.riskColor})`, 
                          borderRadius: '6px',
                          opacity: 0.6 + (v / 250),
                          transition: 'height 0.4s ease'
                        }} />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                    <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 900, marginBottom: '0.75rem', textTransform: 'uppercase' }}>Avg Payload</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 950, color: '#fff' }}>₹{Math.floor(Math.random() * 8000 + 1200).toLocaleString()}</div>
                    </div>
                    <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1.5px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 900, marginBottom: '0.75rem', textTransform: 'uppercase' }}>Threat Delta</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 950, color: '#fca5a5' }}>{Math.floor(Math.random() * 8)}.2%</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['🔗', '📍', '💻'].map((icon, idx) => (
                        <div key={idx} style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>{icon}</div>
                      ))}
                    </div>
                    <button style={{ 
                      padding: '14px 28px', 
                      borderRadius: '16px', 
                      background: 'rgba(255, 255, 255, 0.04)', 
                      border: '1.5px solid rgba(255, 255, 255, 0.08)', 
                      color: '#fff', 
                      fontWeight: 800, 
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.4s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'; e.currentTarget.style.color = '#fff'; }}>
                      Deep Behavioral Intel →
                    </button>
                  </div>
                </div>
              ))
            )}
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

        {/* Top KPIs - Engineer Professional Look */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {[
            { label: 'Network Throughput', value: '1.2 GB/s', icon: '📡', change: 'Optimized', gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
            { label: 'AI Accuracy Delta', value: '99.98%', icon: '🧠', change: '+0.02%', gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)' },
            { label: 'Security Handshakes', value: '842k', icon: '🤝', change: 'Secure', gradient: 'linear-gradient(135deg, #22c55e, #10b981)' },
            { label: 'System Uptime', value: '99.99%', icon: '⚙️', change: 'Stable', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
          ].map((metric, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: metric.gradient,
                filter: 'blur(60px)',
                opacity: 0.1,
                zIndex: 0
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  {metric.icon}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', background: 'rgba(255, 255, 255, 0.05)', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  {metric.change}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>{metric.label}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#fff', letterSpacing: '-1px' }}>
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
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ 
      background: 'var(--background)', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'var(--theme-transition)'
    }}>

      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />
      
      <main style={{ position: 'relative', zIndex: 2 }}>
        {authLoading ? (
          <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(6, 182, 212, 0.2)', borderTopColor: '#06b6d4', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : isAuthenticated ? (
          activeView === 'home' || activeView === 'overview' ? <OverviewView /> : 
          activeView === 'logs' ? <APILogsView /> : 
          activeView === 'alerts' ? <AlertsView /> : 
          activeView === 'insights' ? <InsightsView /> : 
          activeView === 'risk-profiles' ? <RiskProfilesView /> : 
          <AnalyticsView />
        ) : (
          <OverviewView />
        )}
      </main>
    </div>
  );
}




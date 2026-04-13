'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
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
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)',
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
        boxShadow: '0 30px 80px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
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
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a0e3f 100%)',
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
                <Shield size={20} color="var(--primary)" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>Blostem Sentinel</span>
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

const FeatureCard = ({ icon: Icon, title, description, stat, statLabel }) => (
  <div style={{
    padding: '2rem',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(124, 58, 237, 0.08))',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    animation: 'fadeInUp 0.8s ease-out'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(124, 58, 237, 0.15))';
    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 20px 50px rgba(59, 130, 246, 0.2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(124, 58, 237, 0.08))';
    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '12px', display: 'flex' }}>
        <Icon size={24} color="var(--primary)" />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>{description}</p>
      </div>
    </div>
    {stat && (
      <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
        <div style={{ fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--primary), #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
          {stat}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {statLabel}
        </div>
      </div>
    )}
  </div>
);

export default function Home() {
  const [activeView, setActiveView] = useState('home');
  const [stats, setStats] = useState({ transactions: 0, success: 0, threats: 0 });

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

  // View components
  const OverviewView = () => (
    <>
      {/* Hero Section */}
      <section style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '3rem 2rem' }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center'
        }}>
          <div style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Real-Time Fraud
              <br />
              <span style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #7c3aed 50%, #ef4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
                Detection Engine
              </span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: 1.8, maxWidth: '550px', fontWeight: 400 }}>
              Protect your users with AI-powered anomaly detection, spending limits, and RBI fraud intelligence. Reduce fraud by 99% with millisecond response times.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '2rem' }}>
              <div style={{ animation: 'fadeInUp 0.8s ease-out 0.1s' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--primary), #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                  {stats.transactions.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>API Requests</div>
              </div>
              <div style={{ animation: 'fadeInUp 0.8s ease-out 0.2s' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--success), #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                  {stats.success}%
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success Rate</div>
              </div>
              <div style={{ animation: 'fadeInUp 0.8s ease-out 0.3s' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--danger), #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                  {stats.threats}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Threats Blocked</div>
              </div>
            </div>
          </div>
          <div style={{ animation: 'fadeInScale 1s ease-out', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <IPhoneFrame />
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(10, 14, 39, 0.5)', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '4rem', letterSpacing: '-0.02em', textAlign: 'center' }}>Enterprise Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <FeatureCard icon={AlertTriangle} title="Real-Time Anomaly Detection" description="AI-powered machine learning detects suspicious patterns instantly" stat="99%" statLabel="Detection Rate" />
            <FeatureCard icon={Gauge} title="Daily Spending Limits" description="Customizable limits with 7-day rolling analytics" stat="24/7" statLabel="Monitoring" />
            <FeatureCard icon={Cpu} title="Gemini AI Insights" description="Advanced AI analysis with Google Gemini integration" stat="<50ms" statLabel="Response Time" />
            <FeatureCard icon={Lock} title="RBI Fraud Integration" description="Real-time RBI fraud pattern matching and alerts" stat="100+" statLabel="Alert Patterns" />
            <FeatureCard icon={BarChart3} title="Advanced Analytics" description="Deep insights into transaction patterns and risks" stat="Live" statLabel="Dashboard" />
            <FeatureCard icon={CheckCircle} title="Bank-Grade Security" description="ISO 27001 certified with enterprise-level encryption" stat="∞" statLabel="Uptime SLA" />
          </div>
        </div>
      </section>
    </>
  );

  const APILogsView = () => (
    <section style={{ padding: '3rem 2rem', flex: 1 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>API Logs</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Real-time monitoring of all API requests and responses</p>
        </div>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: 'Total Requests', value: '12,458', icon: '📊', color: '#3b82f6' },
            { label: 'Success Rate', value: '99.8%', icon: '✅', color: '#22c55e' },
            { label: 'Avg Latency', value: '47ms', icon: '⚡', color: '#f59e0b' },
            { label: 'Error Rate', value: '0.2%', icon: '❌', color: '#ef4444' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, rgba(${stat.color === '#3b82f6' ? '59, 130, 246' : stat.color === '#22c55e' ? '34, 197, 94' : stat.color === '#f59e0b' ? '245, 158, 11' : '239, 68, 68'}, 0.1), rgba(${stat.color === '#3b82f6' ? '59, 130, 246' : stat.color === '#22c55e' ? '34, 197, 94' : stat.color === '#f59e0b' ? '245, 158, 11' : '239, 68, 68'}, 0.05))`,
              border: `2px solid ${stat.color}20`,
              borderRadius: '16px',
              padding: '1.5rem',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{stat.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Detailed Logs Table */}
        <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '2px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px', overflow: 'hidden', animation: 'fadeInUp 0.8s ease-out' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(59, 130, 246, 0.1)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Recent API Requests</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ background: 'rgba(59, 130, 246, 0.05)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timestamp</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Endpoint</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Method</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latency</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IP Address</th>
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
                  <tr key={i} style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>{log.time}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontFamily: 'monospace', color: 'var(--primary)' }}>{log.endpoint}</td>
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

  const AlertsView = () => (
    <section style={{ padding: '3rem 2rem', flex: 1 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Active Security Alerts</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Real-time threat intelligence and anomaly detection</p>
        </div>

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
              border: `2px solid ${alert.color}40`,
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              animation: `fadeInUp 0.6s ease-out ${i * 0.1}s`
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{alert.emoji}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{alert.label}</div>
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
              border: `2px solid ${alert.severity === 'high' ? 'rgba(239, 68, 68, 0.3)' : alert.severity === 'medium' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
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
              <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: alert.severity === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                Investigate
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const InsightsView = () => (
    <section style={{ padding: '3rem 2rem', flex: 1 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>AI-Powered Insights</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Machine learning analysis of transaction patterns and fraud risks</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { 
              icon: '📉', 
              title: 'Spending Pattern Alert', 
              score: '7.2/10',
              metric: 'Risk Score',
              content: 'Daily spending decreased 12% this month. Peak transactions occur between 2-4 PM on weekdays. Recommend monitoring for unusual deviations.',
              trend: '↓ -12%',
              color: '#3b82f6'
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
              border: `2px solid ${insight.color}30`,
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
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${insight.color}15, ${insight.color}06)`;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {insight.score}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>{insight.metric}</div>
                  </div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{insight.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px solid ${insight.color}20` }}>
                <span style={{ fontSize: '0.85rem', color: insight.color, fontWeight: 600 }}>{insight.trend}</span>
                <button style={{ padding: '6px 14px', borderRadius: '6px', border: `1px solid ${insight.color}40`, background: `${insight.color}15`, color: insight.color, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const AnalyticsView = () => (
    <section style={{ padding: '3rem 2rem', flex: 1 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Analytics Dashboard</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Comprehensive performance metrics and data visualization</p>
        </div>

        {/* Top KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: 'Total Transactions', value: '12,458', icon: '💳', change: '+18.3%', color: '#3b82f6' },
            { label: 'Success Rate', value: '99.82%', icon: '✅', change: '+0.5%', color: '#22c55e' },
            { label: 'Threats Blocked', value: '347', icon: '🛡️', change: '+24.1%', color: '#ef4444' },
            { label: 'Avg Response Time', value: '42ms', icon: '⚡', change: '-8.2%', color: '#f59e0b' },
          ].map((metric, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${metric.color}15, ${metric.color}06)`,
              border: `2px solid ${metric.color}30`,
              borderRadius: '16px',
              padding: '2rem',
              animation: `fadeInUp 0.6s ease-out ${i * 0.1}s`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{metric.icon}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: metric.change.startsWith('+') ? '#22c55e' : '#f59e0b', background: metric.change.startsWith('+') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)', padding: '4px 10px', borderRadius: '6px' }}>
                  {metric.change}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{metric.label}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, background: `linear-gradient(135deg, ${metric.color}, ${metric.color}dd)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Data */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          {/* Transaction Trend */}
          <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1))', border: '2px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px', padding: '2rem', animation: 'fadeInUp 0.8s ease-out' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Transaction Trend</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', justifyContent: 'space-around' }}>
              {[65, 78, 92, 85, 95, 88, 102].map((val, i) => (
                <div key={i} style={{
                  width: '100%',
                  height: `${(val / 102) * 100}%`,
                  background: `linear-gradient(180deg, #3b82f6, #7c3aed)`,
                  borderRadius: '8px 8px 0 0',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  opacity: 0.7
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.filter = 'brightness(1.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '0.7';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}>
                  <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
            </div>
          </div>

          {/* Risk Distribution */}
          <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1))', border: '2px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px', padding: '2rem', animation: 'fadeInUp 0.8s ease-out' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Risk Distribution</h3>
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
        <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(124, 58, 237, 0.08))', border: '2px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px', overflow: 'hidden', animation: 'fadeInUp 1s ease-out' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(59, 130, 246, 0.1)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Detailed Performance Metrics</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ background: 'rgba(59, 130, 246, 0.05)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metric</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Yesterday</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>This Week</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Change</th>
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
                  <tr key={i} style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.1)', transition: 'background 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)'}
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

  return (
    <div style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a0e3f 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      {activeView === 'home' || activeView === 'overview' ? <OverviewView /> : activeView === 'logs' ? <APILogsView /> : activeView === 'alerts' ? <AlertsView /> : activeView === 'insights' ? <InsightsView /> : <AnalyticsView />}
    </div>
  );
}


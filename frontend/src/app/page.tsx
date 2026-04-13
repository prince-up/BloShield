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
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--primary), #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                  {stats.transactions.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>API Requests</div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--success), #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                  {stats.success}%
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success Rate</div>
              </div>
              <div>
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

      {/* Features Section */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(10, 14, 39, 0.5)', borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '4rem', letterSpacing: '-0.02em', textAlign: 'center' }}>Powerful Features</h2>
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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>API Logs</h1>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>Timestamp</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>Endpoint</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>Method</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>Response Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: '2026-04-14 14:32:01', endpoint: '/send_money', method: 'POST', status: '200', latency: '45ms' },
                { time: '2026-04-14 14:31:58', endpoint: '/dashboard/blostem/123', method: 'GET', status: '200', latency: '32ms' },
                { time: '2026-04-14 14:31:55', endpoint: '/rbi/check-transaction', method: 'POST', status: '400', latency: '28ms' },
                { time: '2026-04-14 14:31:52', endpoint: '/ai/insights/123', method: 'GET', status: '200', latency: '156ms' },
                { time: '2026-04-14 14:31:50', endpoint: '/user/spending-limit', method: 'GET', status: '200', latency: '18ms' },
              ].map((log, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.1)' }}>
                  <td style={{ padding: '1rem' }}>{log.time}</td>
                  <td style={{ padding: '1rem' }}>{log.endpoint}</td>
                  <td style={{ padding: '1rem' }}><span style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{log.method}</span></td>
                  <td style={{ padding: '1rem' }}><span style={{ background: log.status === '200' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', color: log.status === '200' ? '#86efac' : '#fca5a5' }}>{log.status}</span></td>
                  <td style={{ padding: '1rem' }}>{log.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const AlertsView = () => (
    <section style={{ padding: '3rem 2rem', flex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Active Alerts</h1>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {[
            { type: 'Suspicious UPI', desc: 'Unusual transaction amount detected', severity: 'high', time: '2 mins ago' },
            { type: 'Card Skimming', desc: 'Multiple failed payment attempts', severity: 'high', time: '15 mins ago' },
            { type: 'Velocity Check', desc: 'High transaction frequency detected', severity: 'medium', time: '28 mins ago' },
            { type: 'Unauthorized Access', desc: 'Login from new device', severity: 'medium', time: '1 hour ago' },
          ].map((alert, i) => (
            <div key={i} style={{ background: 'rgba(59, 130, 246, 0.1)', border: `1px solid ${alert.severity === 'high' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`, borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: alert.severity === 'high' ? '#fca5a5' : '#fde047' }}>{alert.type}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{alert.desc}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: alert.severity === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, color: alert.severity === 'high' ? '#fca5a5' : '#fde047', textTransform: 'uppercase' }}>{alert.severity}</span>
                <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const InsightsView = () => (
    <section style={{ padding: '3rem 2rem', flex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>AI Insights</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Spending Pattern', content: 'Daily average spending has decreased by 12% this month. Consider increasing spending limits during peak shopping hours.' },
            { title: 'Risk Assessment', content: 'Current risk score: 2.3/10. Transaction patterns are within normal parameters with minimal anomalies detected.' },
            { title: 'Fraud Trend', content: 'UPI fraud attempts up by 8% week-over-week. Recommend enabling additional verification for high-value transactions.' },
            { title: 'Recommendation', content: 'Enable 2FA for transactions above ₹50,000. This will reduce fraud risk by approximately 94% based on historical data.' },
          ].map((insight, i) => (
            <div key={i} style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>{insight.title}</h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{insight.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const AnalyticsView = () => (
    <section style={{ padding: '3rem 2rem', flex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Analytics Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Transactions', value: stats.transactions.toLocaleString(), color: 'var(--primary)' },
            { label: 'Success Rate', value: `${stats.success}%`, color: 'var(--success)' },
            { label: 'Threats Blocked', value: stats.threats.toString(), color: 'var(--danger)' },
            { label: 'Avg Response Time', value: '42ms', color: '#f59e0b' },
          ].map((metric, i) => (
            <div key={i} style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, background: `linear-gradient(135deg, ${metric.color}, ${metric.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', marginBottom: '0.5rem' }}>{metric.value}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{metric.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#94a3b8' }}>
            <BarChart3 size={48} style={{ margin: '0 auto 1rem' }} />
            <p>Analytics chart will be displayed here with real-time data visualization</p>
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


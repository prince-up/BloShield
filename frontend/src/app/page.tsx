'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import { 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  TrendingUp,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

const dummyChartData = [
  { time: '00:00', requests: 400, anomalies: 2 },
  { time: '04:00', requests: 300, anomalies: 1 },
  { time: '08:00', requests: 900, anomalies: 8 },
  { time: '12:00', requests: 1200, anomalies: 12 },
  { time: '16:00', requests: 800, anomalies: 3 },
  { time: '20:00', requests: 600, anomalies: 4 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_requests: 0,
    success_rate: 0,
    anomaly_count: 0,
    recent_logs: []
  });
  const [anomalies, setAnomalies] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await fetch('http://localhost:8000/stats');
        const statsData = await statsRes.json();
        setStats(statsData);

        const anomalyRes = await fetch('http://localhost:8000/anomalies');
        const anomalyData = await anomalyRes.json();
        setAnomalies(anomalyData.slice(0, 5));

        const insightsRes = await fetch('http://localhost:8000/insights');
        const insightsData = await insightsRes.json();
        setInsights(insightsData);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk_score: number) => {
    if (risk_score > 0.7) return 'var(--danger)';
    if (risk_score > 0.4) return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div className="dashboard-container" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a0e3f 100%)' }}>
      <Sidebar activeView="overview" setActiveView={() => {}} />
      <main className="main-content">
        <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeInUp 0.6s ease-out' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>System Overview</h2>
            <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '0.95rem' }}>Real-time monitoring and AI threat detection</p>
          </div>
          <div className="glass" style={{ 
            padding: '10px 18px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            borderWidth: '1px',
            animation: 'pulse-glow 2s ease-in-out infinite',
            borderColor: 'var(--success)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)', animation: 'pulse 2s ease-in-out infinite' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--success)' }}>System Live</span>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard 
            label="Total API Requests" 
            value={stats.total_requests.toLocaleString()} 
            icon={<Activity size={24} />}
            trend={stats.total_requests > 0 ? '+12%' : ''}
          />
          <StatCard 
            label="Success Rate" 
            value={`${stats.success_rate.toFixed(1)}%`} 
            icon={<CheckCircle size={24} />}
            color="var(--success)"
            trend={stats.success_rate > 95 ? '+2%' : '-1%'}
          />
          <StatCard 
            label="Anomalies Detected" 
            value={stats.anomaly_count} 
            icon={<AlertTriangle size={24} />} 
            color={stats.anomaly_count > 10 ? 'var(--danger)' : 'var(--warning)'}
            trend={stats.anomaly_count > 0 ? '+5' : ''}
          />
          <StatCard 
            label="Avg Response Time" 
            value="42ms" 
            icon={<Clock size={24} />}
            trend="+1ms"
          />
        </section>

        <section className="chart-section">
          <div className="chart-card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ marginBottom: '4px', fontWeight: 700, fontSize: '1.1rem' }}>Traffic Analysis</h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>API requests & detected anomalies over time</p>
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--primary)' }}>
                Last 24h
              </div>
            </div>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyChartData}>
                  <defs>
                    <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" vertical={false} />
                  <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(15, 15, 20, 0.95)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '10px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ stroke: 'rgba(59, 130, 246, 0.3)' }}
                  />
                  <Area type="monotone" dataKey="requests" stroke="var(--primary)" fillOpacity={1} fill="url(#colorReq)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: '2px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Active Alerts</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>View all <ArrowRight size={12} style={{ display: 'inline' }} /></span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              {anomalies.length > 0 ? anomalies.slice(0, 4).map((anomaly: any, i) => (
                <div key={i} style={{ 
                  padding: '13px', 
                  borderRadius: '12px', 
                  background: 'rgba(239, 68, 68, 0.06)', 
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  gap: '11px',
                  alignItems: 'flex-start',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  animation: `slideRight 0.6s ease-out ${i * 0.1}s`,
                  backdropFilter: 'blur(8px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    width: '3px', 
                    height: '100%', 
                    background: 'rgba(239, 68, 68, 0.6)' 
                  }}></div>
                  <div style={{ padding: '6px', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '8px', flexShrink: 0 }}>
                    <AlertCircle size={15} color="var(--danger)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, paddingLeft: '2px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '3px', color: '#fca5a5' }}>High Risk Transaction</div>
                    <div style={{ fontSize: '0.73rem', color: '#a1a1a6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>${anomaly.amount?.toFixed(2) || 'N/A'} - {anomaly.user_id}</div>
                  </div>
                  <div style={{ padding: '5px 9px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, color: '#ff6b6b', flexShrink: 0 }}>
                    {(anomaly.risk_score * 100).toFixed(0)}%
                  </div>
                </div>
              )) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem 0', fontSize: '0.9rem' }}>
                  <CheckCircle size={32} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
                  No active threats
                </div>
              )}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <div className="glass" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '8px', background: 'rgba(167, 139, 250, 0.2)', borderRadius: '8px' }}>
                <Zap size={20} color="#a78bfa" />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Smart Insights Engine</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {insights.length > 0 ? insights.map((insight: any, i) => (
                <div key={i} style={{ 
                  padding: '14px', 
                  borderRadius: '13px',
                  border: insight.severity === 'HIGH' ? '1px solid rgba(239, 68, 68, 0.3)' : insight.severity === 'MEDIUM' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                  background: insight.severity === 'HIGH' ? 'rgba(239, 68, 68, 0.06)' : insight.severity === 'MEDIUM' ? 'rgba(245, 158, 11, 0.06)' : 'rgba(16, 185, 129, 0.06)',
                  display: 'flex',
                  gap: '12px',
                  animation: `fadeInScale 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`,
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: insight.severity === 'HIGH' ? 'rgba(239, 68, 68, 0.2)' : insight.severity === 'MEDIUM' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'
                  }}></div>
                  <div style={{ padding: '7px', background: insight.severity === 'HIGH' ? 'rgba(239, 68, 68, 0.15)' : insight.severity === 'MEDIUM' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)', borderRadius: '8px', flexShrink: 0 }}>
                    <AlertTriangle size={16} color={insight.severity === 'HIGH' ? '#ff6b6b' : insight.severity === 'MEDIUM' ? '#fbbf24' : '#34d399'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '3px', color: insight.severity === 'HIGH' ? '#fca5a5' : insight.severity === 'MEDIUM' ? '#fed7aa' : '#86efac' }}>{insight.type}</div>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4' }}>{insight.message}</div>
                  </div>
                </div>
              )) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem', fontSize: '0.9rem', gridColumn: '1 / -1' }}>
                  No critical insights at the moment
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

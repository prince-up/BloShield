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
  ArrowRight
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
  Area
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
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>System Overview</h2>
            <p style={{ color: '#94a3b8', marginTop: '4px' }}>Real-time monitoring and AI assessment</p>
          </div>
          <div className="glass" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)' }}></div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>System Live</span>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard 
            label="Total API Requests" 
            value={stats.total_requests.toLocaleString()} 
            icon={<Activity size={24} />} 
          />
          <StatCard 
            label="Success Rate" 
            value={`${stats.success_rate.toFixed(1)}%`} 
            icon={<CheckCircle size={24} />} 
          />
          <StatCard 
            label="Anomalies Detected" 
            value={stats.anomaly_count} 
            icon={<ShieldCheck size={24} />} 
            color="var(--danger)"
          />
          <StatCard 
            label="Avg Response Time" 
            value="42ms" 
            icon={<Clock size={24} />} 
          />
        </section>

        <section className="chart-section">
          <div className="chart-card glass">
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Traffic Analysis</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyChartData}>
                  <defs>
                    <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a30" vertical={false} />
                  <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="requests" stroke="var(--primary)" fillOpacity={1} fill="url(#colorReq)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 600 }}>Active Alerts</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer' }}>View all</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {anomalies.length > 0 ? anomalies.map((anomaly: any, i) => (
                <div key={i} style={{ 
                  padding: '12px', 
                  borderRadius: '10px', 
                  background: 'rgba(239, 68, 68, 0.05)', 
                  border: '1px solid rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  gap: '12px'
                }}>
                  <AlertCircle size={20} color="var(--danger)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>High Risk Pattern</div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                      Large transaction of ${Number(anomaly.amount).toFixed(2)} from {anomaly.user_id}
                    </p>
                  </div>
                </div>
              )) : (
                <div style={{ textAlign: 'center', color: '#52525b', marginTop: '2rem' }}>
                  No active threats detected
                </div>
              )}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} color="var(--primary)" /> Smart Insights Engine
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {insights.map((insight: any, i) => (
              <div key={i} className="glass" style={{ padding: '1.25rem', borderLeft: `4px solid var(--${insight.severity.toLowerCase()})` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8 }}>{insight.type}</span>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    background: `rgba(var(--${insight.severity.toLowerCase()}-rgb), 0.1)`,
                    color: `var(--${insight.severity.toLowerCase()})`
                  }}>{insight.severity}</span>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{insight.message}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600 }}>Recent Transactions</h3>
            <button style={{ 
              background: 'transparent', 
              border: '1px solid #27272a', 
              color: '#fff', 
              padding: '6px 12px', 
              borderRadius: '6px',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}>
              Export Data <ArrowRight size={14} />
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e24', color: '#94a3b8', fontSize: '0.875rem' }}>
                <th style={{ padding: '12px' }}>User ID</th>
                <th style={{ padding: '12px' }}>Endpoint</th>
                <th style={{ padding: '12px' }}>Amount</th>
                <th style={{ padding: '12px' }}>Risk Score</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_logs.map((log: any, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #131318', fontSize: '0.875rem' }}>
                  <td style={{ padding: '12px', fontWeight: 500 }}>{log.user_id}</td>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>{log.endpoint}</td>
                  <td style={{ padding: '12px' }}>${Number(log.amount).toFixed(2)}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '4px', 
                        background: '#1e1e24', 
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: `${(log.risk_score || 0) * 100}%`, 
                          height: '100%', 
                          background: (log.risk_score || 0) > 0.7 ? 'var(--danger)' : (log.risk_score || 0) > 0.3 ? 'var(--warning)' : 'var(--success)'
                        }}></div>
                      </div>
                      <span>{((log.risk_score || 0) * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      background: log.status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: log.status === 'success' ? 'var(--success)' : 'var(--danger)'
                    }}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

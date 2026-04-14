import { Shield } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #060d1a 0%, #0f1729 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        {/* Logo */}
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
          padding: '20px',
          borderRadius: '20px',
          boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)',
          animation: 'glow-pulse 2s infinite'
        }}>
          <Shield size={40} color="white" strokeWidth={2.5} />
        </div>

        {/* Brand */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            letterSpacing: '-1px',
            margin: 0,
            color: '#ffffff',
            marginBottom: '0.5rem'
          }}>
            Blo<span style={{
              background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Shield</span>
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.9rem',
            margin: 0
          }}>
            Initializing secure connection...
          </p>
        </div>

        {/* Loading Animation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                animation: `pulse 1.5s infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
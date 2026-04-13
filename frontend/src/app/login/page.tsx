'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message || 'Login failed');
      setLoading(false);
      return;
    }

    if (data) {
      router.push('/profile');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #060d1a 0%, #0f1729 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow Background */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <button onClick={() => router.push('/')} style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'transparent',
        border: 'none',
        color: '#0ea5e9',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        zIndex: 10
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#06b6d4';
        e.currentTarget.style.transform = 'translateX(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#0ea5e9';
        e.currentTarget.style.transform = 'translateX(0)';
      }}>
        <ArrowLeft size={20} />
        Back Home
      </button>
      
      <div style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.04))',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        borderRadius: '20px',
        padding: '3.5rem',
        maxWidth: '450px',
        width: '100%',
        backdropFilter: 'blur(20px)',
        animation: 'fadeInUp 0.6s ease-out',
        position: 'relative',
        zIndex: 5,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 1px rgba(6, 182, 212, 0.1)'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            marginBottom: '0.75rem',
            color: '#fff',
            letterSpacing: '-1px'
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}>
            Sign in to access your fraud detection dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e2e8f0',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                background: 'rgba(6, 13, 26, 0.5)',
                color: '#e2e8f0',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                e.currentTarget.style.background = 'rgba(6, 13, 26, 0.7)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                e.currentTarget.style.background = 'rgba(6, 13, 26, 0.5)';
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e2e8f0',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                background: 'rgba(6, 13, 26, 0.5)',
                color: '#e2e8f0',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                e.currentTarget.style.background = 'rgba(6, 13, 26, 0.7)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                e.currentTarget.style.background = 'rgba(6, 13, 26, 0.5)';
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: loading ? 'rgba(6, 182, 212, 0.5)' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(6, 182, 212, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)';
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
            Don't have an account? <a href="/signup" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: 600, transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

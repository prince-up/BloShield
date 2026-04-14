'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Profile() {
  const { user, updateProfile, signOut } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const result = await updateProfile({ fullName: formData.fullName });
    if (!result.error) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #060d1a 0%, #0f1729 100%)', minHeight: '100vh' }}>
      <Navbar activeView="profile" setActiveView={() => {}} />
      
      <section style={{ padding: '2rem 1rem', flex: 1 }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
          {/* Profile Header */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              marginBottom: '1.5rem',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)'
            }}>
              👤
            </div>

            <h1 style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '1rem',
              background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px'
            }}>
              {user.fullName || 'User'}
            </h1>

            <p style={{
              color: '#cbd5e1',
              fontSize: '0.95rem',
              marginBottom: '2rem'
            }}>
              {user.email}
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  background: isEditing ? 'rgba(239, 68, 68, 0.1)' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  color: isEditing ? '#fca5a5' : '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: isEditing ? '1px solid rgba(239, 68, 68, 0.3)' : 'none'
                }}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>

              <button
                onClick={handleLogout}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#fca5a5',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(10, 165, 233, 0.05))',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem',
              backdropFilter: 'blur(20px)'
            }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', color: '#e2e8f0' }}>
                Edit Profile
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#94a3b8',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
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
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#94a3b8',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}>
                    Email (Read-only)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      background: 'rgba(6, 13, 26, 0.5)',
                      color: '#64748b',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                      cursor: 'not-allowed',
                      opacity: 0.6
                    }}
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: loading ? 'rgba(6, 182, 212, 0.5)' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Account Info */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(10, 165, 233, 0.05))',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#e2e8f0' }}>
              Account Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(6, 182, 212, 0.1)' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>User ID</p>
                <p style={{ color: '#e2e8f0', fontSize: '0.95rem', fontFamily: 'monospace' }}>{user.id}</p>
              </div>

              <div style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(6, 182, 212, 0.1)' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Email</p>
                <p style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{user.email}</p>
              </div>

              <div style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(6, 182, 212, 0.1)' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Member Since</p>
                <p style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>

              <div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Account Status</p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }} />
                  <span style={{ color: '#86efac', fontSize: '0.9rem', fontWeight: 600 }}>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (res.ok) {
        navigate('/login');
      } else {
        const data = await res.json();
        setError(data.detail || 'Registration failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: "url('https://agriguru.in/wp-content/uploads/2025/02/Zaid-Crops-1.webp') no-repeat center center fixed",
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        padding: 40,
        width: '100%',
        maxWidth: 400
      }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: 30, fontSize: '2.5em', fontWeight: 300 }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="name" style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: 8, fontSize: '0.9em' }}>Username</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your username"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1em',
                marginBottom: 0,
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="email" style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: 8, fontSize: '0.9em' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1em',
                marginBottom: 0,
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: 8, fontSize: '0.9em' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1em',
                marginBottom: 0,
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              fontSize: '1.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: 10
            }}
          >
            Register
          </button>
          {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        </form>
        <div style={{ textAlign: 'center', marginTop: 20, color: 'rgba(255,255,255,0.8)', fontSize: '0.9em' }}>
          Already have an account? <a href="/login" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: 500 }}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;

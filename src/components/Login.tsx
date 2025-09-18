import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        navigate('/predictor');
      } else {
        const data = await res.json();
        setError(data.detail || 'Login failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[url('https://agriguru.in/wp-content/uploads/2025/02/Zaid-Crops-1.webp')] bg-no-repeat bg-center bg-cover">
      <header className="w-full max-w-[440px] flex flex-col items-center justify-center px-16 py-4 mb-[-40px] z-10">
        <img src="https://www.gvpcdpgc.edu.in/gvplogo.jpg" alt="College Logo" className="h-20 w-20 mb-2 bg-transparent rounded-full" style={{ background: 'none' }} />
        <h3 className="text-white text-xl font-light">Gayatri Vidya Parishad College for Degree and PG Courses</h3>
        <div className="flex flex-col items-center mt-2">
          <img src="/imgs/tecos.png" alt="GVP Technical Club" className="h-20 w-20 rounded-full mb-1" />
          <span className="text-white text-sm font-light">GVP Technical Club</span>
        </div>
      </header>
      <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[20px] rounded-[20px] border border-[rgba(255,255,255,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-10 w-full max-w-[400px] relative z-0">
        <h2 className="text-white text-center mb-8 text-4xl font-light">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm text-[rgba(255,255,255,0.8)]">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-[rgba(255,255,255,0.2)] rounded-[10px] bg-[rgba(255,255,255,0.1)] text-white text-base transition-all duration-300 placeholder-[rgba(255,255,255,0.6)] focus:outline-none focus:border-[rgba(255,255,255,0.4)] focus:bg-[rgba(255,255,255,0.15)] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm text-[rgba(255,255,255,0.8)]">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-[rgba(255,255,255,0.2)] rounded-[10px] bg-[rgba(255,255,255,0.1)] text-white text-base transition-all duration-300 placeholder-[rgba(255,255,255,0.6)] focus:outline-none focus:border-[rgba(255,255,255,0.4)] focus:bg-[rgba(255,255,255,0.15)] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none rounded-[10px] text-lg cursor-pointer transition-all duration-300 mt-2 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
          >
            Login
          </button>
          {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        </form>
        <div className="text-center mt-5 text-[rgba(255,255,255,0.8)] text-sm">
          Don't have an account? <a href="/register" className="text-[#a5b4fc] no-underline font-medium hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
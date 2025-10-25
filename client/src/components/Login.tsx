import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "./Login.css";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const { token, role, name } = await res.json();
      login(token, role, name);
      navigate(role === 'FARMER' ? '/dashboard' : '/buyer-dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🌿</span> FarmSmart
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Welcome Back </h2>
          <p className="subtitle">Sign in to manage your farm smarter</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-footer">
              <a href="#" className="forgot">
                Forgot Password?
              </a>
            </div>

            {error && <small className="error">{error}</small>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="redirect-text">
              Don’t have an account? <a href="/register">Create one</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
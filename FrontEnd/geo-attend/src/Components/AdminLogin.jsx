import React, { useState } from 'react';
import './AdminLogin.css';
import { FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/admin_login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          cmp_id: companyCode.trim(),
          password
        })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert('Login successful!');
        navigate('/register-company');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setLoading(false);
      setError('Server error. Try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2>🔒Admin Login</h2>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="text"
            placeholder="Admin Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaBuilding className="icon" />
          <input
            type="text"
            placeholder="Company Code (e.g., CMP0001)"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

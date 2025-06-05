import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',  // changed from email
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,  // fixed key
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Logged in successfully!');
        navigate('/dashboard');
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong during login.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form-box" onSubmit={handleSubmit}>
        <h2 className="login-heading">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="login-input"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="login-button" type="submit">Login</button>

        <p className="login-footer-text">
          By logging in, you agree to our{' '}
          <span className="link-text" onClick={() => navigate('/terms')} style={{ cursor: 'pointer', color: 'black', fontWeight: 'bold' }}>
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="link-text" onClick={() => navigate('/privacy')} style={{ cursor: 'pointer', color: 'black', fontWeight: 'bold' }}>
            Privacy Policy
          </span>.
        </p>
      </form>
    </div>
  );
};

export default Login;

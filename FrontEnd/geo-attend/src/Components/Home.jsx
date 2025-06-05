import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="home-hero">
        <h1 className="home-title">Simplify Attendance with Geo-Attend</h1>
        <p className="home-subtitle">Accurate, real-time attendance marking for your mobile workforce.</p>
        <div className="home-buttons">
          <Link to="/login" className="home-button login">Login</Link>
          <Link to="/signup" className="home-button signup">Sign Up</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="home-features">
        <div className="feature-box">
          <h3>GPS-Based Attendance</h3>
          <p>Ensure employees check-in from authorized locations.</p>
        </div>
        <div className="feature-box">
          <h3>Real-Time Tracking</h3>
          <p>Monitor attendance and location data instantly.</p>
        </div>
        <div className="feature-box">
          <h3>Secure Data Handling</h3>
          <p>Maintain privacy with encrypted data storage.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="home-how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Employee enters location code.</li>
          <li>System verifies code within designated radius.</li>
          <li>Attendance is marked as Present or Absent accordingly.</li>
        </ol>
      </section>

      {/* Testimonials */}
      <section className="home-testimonials">
        <h2>What Our Users Say</h2>
        <blockquote>
          "This system has streamlined our remote attendance process!" – HR Manager
        </blockquote>
        <blockquote>
          "Accurate and reliable attendance tracking for our field team." – Operations Lead
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
    <Link to="/contact">Contact</Link>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="footer-social">
          <span>🔗</span> <span>🐦</span> <span>📘</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;

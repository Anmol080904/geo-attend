import React from 'react';

export default function TermsOfService() {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Terms of Service</h1>
        <p>Last updated: June 1, 2025</p>

        <section style={sectionStyle}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using our Geo-Location-Based Attendance App, you agree to be bound by these Terms of Service. If you do not agree, please do not use the app.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>2. Use of the Service</h2>
          <p>
            The app is intended to track employee attendance based on geolocation. You may not misuse the app or attempt to manipulate location data.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>3. User Responsibilities</h2>
          <p>
            You are responsible for keeping your login credentials secure and for all activity under your account.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>4. Modification of Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Continued use of the app means you accept any changes.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>5. Contact</h2>
          <p>
            For any questions, please contact us at <a href="mailto:support@geoattend.com">support@geoattend.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
const pageStyle = {
  background: 'linear-gradient(to right, #141e30, #243b55)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  color: '#333',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: 12,
  maxWidth: 800,
  width: '100%',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
};

const titleStyle = {
  fontSize: 32,
  marginBottom: 20,
  color: '#2c3e50',
  textAlign: 'center',
};

const sectionStyle = {
  marginBottom: 30,
};

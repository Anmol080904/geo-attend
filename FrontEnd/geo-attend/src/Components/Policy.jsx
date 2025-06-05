import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Privacy Policy</h1>
        <p>Last updated: June 1, 2025</p>

        <section style={sectionStyle}>
          <h2>1. Information We Collect</h2>
          <p>
            We collect your location data to mark attendance accurately. We may also collect login information and device details to ensure secure access.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>2. How We Use Your Data</h2>
          <p>
            Location data is used solely to verify attendance within company-defined geofences. We do not sell or share your personal data with third parties.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>3. Data Storage and Security</h2>
          <p>
            Your data is stored securely and encrypted where applicable. We implement industry-standard safeguards to protect your information.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>4. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your data by contacting us. We will process such requests in accordance with applicable laws.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>5. Contact Us</h2>
          <p>
            If you have any questions, email us at <a href="mailto:privacy@geoattend.com">privacy@geoattend.com</a>.
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

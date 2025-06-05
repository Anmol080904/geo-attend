import React, { useState } from 'react';
import './CompanyRegister.css';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '10px',
  marginTop: '20px'
};

const center = {
  lat: 23.0225,
  lng: 72.5714
};

const RegisterCompany = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [radius, setRadius] = useState(100);
  const [location, setLocation] = useState(center);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleMapClick = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');


  try {
    // Basic validation
    if (!name.trim() || !email.trim()) {
      throw new Error('Company name and email are required');
    }

    if (radius < 10) {
      throw new Error('Radius must be at least 10 meters');
    }

    const response = await fetch('http://localhost:8000/register_company/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        lat: location.lat,
        lng: location.lng,
        radius: Number(radius),
      }),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(text || 'Invalid server response');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    setMessage(`Registered! Company Code: ${data.cmp_id}`);
    setTimeout(() => navigate('/admin-login'), 2000);
  } catch (err) {
    // Handle HTML error responses
    if (err.message.includes('<!doctype html>')) {
      setMessage('Server returned an error page. Please check the backend.');
    } else {
      setMessage(`${err.message || 'Registration failed'}`);
    }
    console.error('Registration error:', err);
  } 
};

  return (
    <div className="register-company-container">
      <form className="register-company-form" onSubmit={handleSubmit}>
        <h2>Register Your Company</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="number"
            placeholder="Radius (meters)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            min="10"
            required
          />
        </div>

        <div className="map-container">
          <LoadScript googleMapsApiKey="AIzaSyB_A8TdlCYo1Wub3tG5XE-D-OJSmOt3T_M">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={14}
              onClick={handleMapClick}
            >
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>
        </div>

        {message && (
          <p className={message.startsWith('✅') ? 'success-message' : 'error-message'}>
            {message}
          </p>
        )}

        <button type="submit" className="register-btn">
          Register Company
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;

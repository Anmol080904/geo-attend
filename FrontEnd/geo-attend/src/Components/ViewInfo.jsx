import React, { useEffect, useState } from 'react';
import './ViewInfo.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding, FaUser } from 'react-icons/fa';

const ViewInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/employee/', {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.employee);
        } else {
          console.error('Error:', data.error);
        }
      } catch (err) {
        console.error('Failed to fetch profile info', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-title">👨🏻‍💼Your Profile</h2>
      {user ? (
        <div className="profile-card">
          <p><FaUser /> <strong>ID:</strong> {user.id}</p>
          <p><FaUser /> <strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
          <p><FaPhone /> <strong>Phone:</strong> {user.phone}</p>

          <div className="company-info">
            <h3><FaBuilding /> Company Info</h3>
            <p><strong>Name:</strong> {user.company.name}</p>
            <p>
              <FaMapMarkerAlt /> <strong>Location:</strong>{' '}
              <a
                href={`https://www.google.com/maps?q=${user.company.latitude},${user.company.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="location-link"
              >
                {user.company.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <p className="loading">Loading user info...</p>
      )}
    </div>
  );
};

export default ViewInfo;

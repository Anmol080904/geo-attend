import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaMapMarkerAlt, FaChartBar, FaFileAlt, FaClipboardList, FaUserEdit, FaBuilding, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');

  const [location, setLocation] = useState({ name: '', lat: null, lng: null });

useEffect(() => {
  fetch('http://localhost:8000/employee/', {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const company = data.employee.company;
        setLocation({
          name: company.name,
          lat: company.latitude,
          lng: company.longitude
        });
      }
    })
    .catch(err => console.error('Error fetching location:', err));
}, []);


  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/logout/', { method: 'POST', credentials: 'include' });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out.');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-sidebar">
        <h2>GEO-ATTEND</h2>
       <p className="location">
  <FaMapMarkerAlt /> Allocated Location:{' '}
  {location.name ? (
    <a
      href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'lightblue', textDecoration: 'underline' }}
    >
      {location.name}
    </a>
  ) : (
    'Loading...'
  )}
</p>


        <button className="sidebar-btn" onClick={() => navigate('/admin-login')}>
          <FaBuilding className="icon" /> Register Company/Location
        </button>

        <button className="sidebar-btn" onClick={() => navigate('/update-info')}>
          <FaUserEdit className="icon" /> Edit your Profile
        </button>

        <button className="sidebar-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Logout
        </button>

        <button className='account-icon' onClick={() => navigate('/view-info')}>
          <FaUserCircle className="icon" /> My Account
        </button>
      </div>

      <div className="dashboard-main">
        <h2>DASHBOARD</h2>
        <div className="card-grid">
          <div className="card" onClick={() => navigate('/attendance')} style={{ cursor: 'pointer' }}>
            <FaMapMarkerAlt className="card-icon" />
            <h3>Attendance Recorder</h3>
            <p>Mark your In and Out Time</p>
          </div>

          <div className="card" onClick={() => navigate('/records')} style={{ cursor: 'pointer' }}>
            <FaChartBar className="card-icon" />
            <h3>Attendance Summary</h3>
            <p>Check your previous record</p>
          </div>

          <div className="card">
            <FaFileAlt className="card-icon" />
            <h3>Leaves Application</h3>
            <p>Apply for leave</p>
          </div>

          <div className="card">
            <FaClipboardList className="card-icon" />
            <h3>Leaves Status</h3>
            <p>Check pending & approved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

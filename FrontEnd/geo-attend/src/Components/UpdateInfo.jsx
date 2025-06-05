import React, { useState, useEffect } from 'react';
import './UpdateInfo.css';

const UpdateInfo = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: ''
  });

  const employeeId = localStorage.getItem('employee_id'); // or fetch from props/auth
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Prefill form with existing data (optional, based on your API)
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/get-employee/${employeeId}/`);
        const data = await res.json();
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: '',
          phone: data.phone
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/update-employee/${employeeId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.status === 'success') {
        setStatus('Info updated successfully!');
      } else {
        setStatus('Failed to update info.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error updating info.');
    }
  };

  return (
    <div className="update-container">
      <h2>✎ᝰ.Update Your Info</h2>
      {status && <p className="status-message">{status}</p>}
      <form onSubmit={handleSubmit} className="update-form">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password (optional)"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};

export default UpdateInfo;

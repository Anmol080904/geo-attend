import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    company: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/create-employee/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      alert("Signup successful!");
      navigate('/login'); 
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
   <div className="signup-container">
      <form className="signup-form-box" onSubmit={handleSignup}>
        <h2 className="signup-heading">Sign Up</h2>

        <input type="text" name="username" placeholder="Username" className="signup-input" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="signup-input" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="signup-input" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" className="signup-input" onChange={handleChange} required />

        <input type="text" name="first_name" placeholder="First Name" className="signup-input" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" className="signup-input" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" className="signup-input" onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" className="signup-input" onChange={handleChange} required />

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

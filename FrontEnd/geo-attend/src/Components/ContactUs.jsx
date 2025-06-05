import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            rows="5"
          ></textarea>
          <div className="text-center">
            <button type="submit" className="contact-button">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
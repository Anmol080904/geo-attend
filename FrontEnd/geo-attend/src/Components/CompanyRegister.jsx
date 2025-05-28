import React, { useState } from "react";

const CompanyRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    latitude: "",
    longitude: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Registering company...");

    const response = await fetch("http://localhost:8000/api/register_company/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setMessage(data.message || "Company registered.");
  };

  return (
    <div>
      <h2>Company Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Company Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Company Email" onChange={handleChange} required />
        <input name="latitude" placeholder="Latitude" onChange={handleChange} required />
        <input name="longitude" placeholder="Longitude" onChange={handleChange} required />
        <button type="submit">Register Company</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CompanyRegister;

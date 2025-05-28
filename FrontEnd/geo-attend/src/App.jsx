import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from "./Components/UserRegister";
import UserLogin from "./Components/UserLogin";
import CompanyRegister from "./Components/CompanyRegister";
import React from "react";
import Checkin from "./Components/Checkin"; 
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/register-user" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register-company" element={<CompanyRegister />} />
        <Route path="/mark" element={<Checkin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// src/App.jsx
import React from 'react';
import Home from './home/Home';
import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import Dashboard from './dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import MITLicense from './mitlicense/MITLicense';
import TermsOfService from './termsofservice/TermsOfService';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './forgotpassword/ForgotPassword';
import Restaurants from './restaurants/Restaurants';
import Profile from './profile/Profile';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/license" element={<MITLicense />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> 
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      <Route path="/restaurants" element={<Restaurants />} />
      
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default App;

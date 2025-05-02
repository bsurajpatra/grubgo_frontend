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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/license" element={<MITLicense />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Now protect dashboard */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default App;

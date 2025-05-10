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
import OrderHistory from './orderhistory/OrderHistory';
import Checkout from './checkout/Checkout';
import OrderConfirmation from './orderconfirmation/OrderConfirmation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
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

        <Route path="/restaurants" element={
          <PrivateRoute>
            <Restaurants />
          </PrivateRoute>
        } />
        
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        <Route path="/order-history" element={
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        } />
        
        <Route path="/checkout" element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } />
        
        <Route path="/order-confirmation" element={
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
};

export default App;

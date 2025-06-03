import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProviderWrapper } from './Layout/ThemeContext';
import Dashboard from './pages/Dashboard';
import LoginPage from './Login/LoginPage';
import SignUpPage from './Login/SignUpPage';
import Layout from './pages/Layout';
import AllGarages from './pages/AllGarages';
import PendingRequests from './pages/PendingRequests';
import GarageRecords from './pages/GarageRecords';
import PaymentHistory from './pages/PaymentHistory';
import SubscriptionPlans from './pages/UpdatePlan';
import GarageExpiryTracker from './pages/GarageExpiryTracker';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected routes with layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<PendingRequests />} />
            <Route path="all-garages" element={<AllGarages />} />
            <Route path="pending-requests" element={<PendingRequests />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="garage-records" element={<GarageRecords />} />
            <Route path="update-plan" element={<SubscriptionPlans />} />
            <Route path="Garage-Expiry-Tracker" element={<GarageExpiryTracker />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;

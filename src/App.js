import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProviderWrapper } from './Layout/ThemeContext';
import Dashboard from './pages/Dashboard';
import AppLayout from './pages/AppLayout';
import LoginPage from './Login/LoginPage';
import SignUpPage from './Login/SignUpPage';
import Customers from './pages/Customers';
import Invoices from './pages/Invoices';
import Products from './pages/product';
import Settings from './pages/Setting';
import Report from './pages/Report';
import AWAIRDashboard from './pages/AWAIRDashboard';

// ProtectedRoute component to check if user is authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated, but save the intended destination
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

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <AWAIRDashboard />
            </ProtectedRoute>
          }>
            {/* Nested routes within AppLayout */}
            <Route index element={<AWAIRDashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="products" element={<Products />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Report />} />
          </Route>

          {/* Redirect all other routes to the index */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProviderWrapper> 
  );
}

export default App;
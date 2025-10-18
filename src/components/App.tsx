import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../../context/AuthContext';

import Login from './Login';
import Register from './Register';
import FarmerDashboard from './FarmerDashboard';
import AddCrop from '../AddCrop';
import AddLivestock from './AddLivestock';
import BuyerDashboard from '../BuyerDashboard';
import CartPage from '../CartPage';
import InventoryDashboard from './InventoryDashboard';
import OrdersPage from './OrdersPage';
import Notifications from './Notifications';
import LandingPage from '../LandingPage';

const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: 'FARMER' | 'BUYER' }) => {
  const { token, role } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" />;
  if (role !== allowedRole) return <Navigate to={role === 'FARMER' ? '/dashboard' : '/buyer-dashboard'} />;
  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRole="FARMER"><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/add-crops" element={<ProtectedRoute allowedRole="FARMER"><AddCrop /></ProtectedRoute>} />
          <Route path="/add-livestock" element={<ProtectedRoute allowedRole="FARMER"><AddLivestock /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute allowedRole="FARMER"><InventoryDashboard /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute allowedRole="FARMER"><Notifications /></ProtectedRoute>} />
          <Route path="/buyer-dashboard" element={<ProtectedRoute allowedRole="BUYER"><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute allowedRole="BUYER"><CartPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute allowedRole="BUYER"><OrdersPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/Landing" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
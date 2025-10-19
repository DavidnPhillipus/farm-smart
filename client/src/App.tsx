import { useContext, type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Login from './components/Login';
import Register from './components/Register';
import FarmerDashboard from './components/FarmerDashboard';
import AddCrop from './components/AddCrop';
import AddLivestock from './components/AddLivestock';
import BuyerDashboard from './components/BuyerDashboard';
import CartPage from './components/CartPage';
import InventoryDashboard from './components/InventoryDashboard';
import OrdersPage from './components/OrdersPage';
import Notifications from './components/Notifications';
import LandingPage from './components/LandingPage';

const ProtectedRoute = ({ children, allowedRole }: { children: ReactNode, allowedRole: 'FARMER' | 'BUYER' }) => {
  const { token, role } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" />;
  if (role !== allowedRole) return <Navigate to={role === 'FARMER' ? '/dashboard' : '/buyer-dashboard'} />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
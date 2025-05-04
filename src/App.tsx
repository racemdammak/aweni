import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Categories from './pages/Categories';
import MyRequests from './pages/MyRequests';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<><Navbar /><Home /></>} />
            <Route path="/auth" element={<><Navbar /><Auth /></>} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <><Navbar /><Dashboard /></>
              </ProtectedRoute>
            } />
            <Route path="/categories" element={
              <ProtectedRoute>
                <><Navbar /><Categories /></>
              </ProtectedRoute>
            } />
            <Route path="/my-requests" element={
              <ProtectedRoute>
                <><Navbar /><MyRequests /></>
              </ProtectedRoute>
            } />
            <Route path="/my-profile" element={
              <ProtectedRoute>
                <><Navbar /><MyProfile /></>
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <><Navbar /><Favorites /></>
              </ProtectedRoute>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<><Navbar /><NotFound /></>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

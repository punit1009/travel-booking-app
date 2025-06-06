import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PackageProvider } from './contexts/PackageContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import PackagesPage from './pages/PackagesPage';
import SearchPage from './pages/SearchPage';
import UserProfile from './pages/UserProfile';
import PackageManager from './components/packages/PackageManager';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  return (
    <AuthProvider>
      <PackageProvider>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route 
                path="/manage-packages" 
                element={
                  <ProtectedRoute>
                    <PackageManager />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </PackageProvider>
    </AuthProvider>
  );
}

export default App;
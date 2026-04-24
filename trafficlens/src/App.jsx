import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import Landing from './pages/Landing';
import CitizenDashboard from './pages/citizen/Dashboard';
import Vehicles from './pages/citizen/Vehicles';
import License from './pages/citizen/License';
import Profile from './pages/citizen/Profile';
import Documents from './pages/citizen/Documents';
import Settings from './pages/citizen/Settings';

function App() {
  const { isAuthenticated, userType, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={
          isAuthenticated ? (
            <Navigate to={userType === 'admin' ? '/admin/map' : '/dashboard'} replace />
          ) : (
            <Landing />
          )
        } />
        
        {/* Citizen routes */}
        <Route path="/dashboard" element={
          isAuthenticated && userType === 'citizen' ? <CitizenDashboard /> : <Navigate to="/" replace />
        } />
        <Route path="/vehicles" element={
          isAuthenticated && userType === 'citizen' ? <Vehicles /> : <Navigate to="/" replace />
        } />
        <Route path="/license" element={
          isAuthenticated && userType === 'citizen' ? <License /> : <Navigate to="/" replace />
        } />
        <Route path="/profile" element={
          isAuthenticated && userType === 'citizen' ? <Profile /> : <Navigate to="/" replace />
        } />
        <Route path="/documents" element={
          isAuthenticated && userType === 'citizen' ? <Documents /> : <Navigate to="/" replace />
        } />
        <Route path="/settings" element={
          isAuthenticated && userType === 'citizen' ? <Settings /> : <Navigate to="/" replace />
        } />
        
        {/* Admin routes placeholder */}
        <Route path="/admin/map" element={
          isAuthenticated && userType === 'admin' ? (
            <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin Dashboard</h1>
                <p className="text-slate-400">Coming soon</p>
              </div>
            </div>
          ) : <Navigate to="/" replace />
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
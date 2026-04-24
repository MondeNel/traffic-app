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

// Admin placeholder pages (we'll build these next)
import AdminLayout from './components/layout/AdminLayout';

const AdminPlaceholder = ({ title }) => (
  <AdminLayout>
    <div className="flex items-center justify-center h-full text-slate-500">
      <div className="text-center">
        <h2 className="text-lg font-bold text-slate-400 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
        <p className="text-sm">Coming soon</p>
      </div>
    </div>
  </AdminLayout>
);

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
        
        {/* Admin routes */}
        <Route path="/admin/map" element={
          isAuthenticated && userType === 'admin' ? <AdminPlaceholder title="Live Map" /> : <Navigate to="/" replace />
        } />
        <Route path="/admin/verify" element={
          isAuthenticated && userType === 'admin' ? <AdminPlaceholder title="Verification" /> : <Navigate to="/" replace />
        } />
        <Route path="/admin/offenders" element={
          isAuthenticated && userType === 'admin' ? <AdminPlaceholder title="Offenders" /> : <Navigate to="/" replace />
        } />
        <Route path="/admin/roadblocks" element={
          isAuthenticated && userType === 'admin' ? <AdminPlaceholder title="Roadblocks" /> : <Navigate to="/" replace />
        } />
        <Route path="/admin/reports" element={
          isAuthenticated && userType === 'admin' ? <AdminPlaceholder title="Reports" /> : <Navigate to="/" replace />
        } />
        <Route path="/admin/activity" element={
          isAuthenticated && userType === 'admin' ? <AdminPlaceholder title="Activity Log" /> : <Navigate to="/" replace />
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
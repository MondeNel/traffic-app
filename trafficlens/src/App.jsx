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
import AdminLayout from './components/layout/AdminLayout';
import LiveMap from './pages/admin/LiveMap';
import Verify from './pages/admin/Verify';
import Roadblocks from './pages/admin/Roadblocks';
import Reports from './pages/admin/Reports';
import ActivityLog from './pages/admin/ActivityLog';

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

const ProtectedRoute = ({ children, allowedType }) => {
  const { isAuthenticated, userType } = useAuthStore();
  
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (allowedType && userType !== allowedType) return <Navigate to="/" replace />;
  
  return children;
};

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Citizen routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedType="citizen"><CitizenDashboard /></ProtectedRoute>
        } />
        <Route path="/vehicles" element={
          <ProtectedRoute allowedType="citizen"><Vehicles /></ProtectedRoute>
        } />
        <Route path="/license" element={
          <ProtectedRoute allowedType="citizen"><License /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedType="citizen"><Profile /></ProtectedRoute>
        } />
        <Route path="/documents" element={
          <ProtectedRoute allowedType="citizen"><Documents /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute allowedType="citizen"><Settings /></ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin/map" element={
          <ProtectedRoute allowedType="admin"><LiveMap /></ProtectedRoute>
        } />
        <Route path="/admin/verify" element={
  <ProtectedRoute allowedType="admin"><Verify /></ProtectedRoute>
} />
        <Route path="/admin/offenders" element={
          <ProtectedRoute allowedType="admin"><AdminPlaceholder title="Offenders" /></ProtectedRoute>
        } />
<Route path="/admin/roadblocks" element={
  <ProtectedRoute allowedType="admin"><Roadblocks /></ProtectedRoute>
} />
       <Route path="/admin/reports" element={
  <ProtectedRoute allowedType="admin"><Reports /></ProtectedRoute>
} />
        <Route path="/admin/activity" element={
  <ProtectedRoute allowedType="admin"><ActivityLog /></ProtectedRoute>
} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
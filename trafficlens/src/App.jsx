import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CitizenDashboard from './pages/citizen/Dashboard';
import Vehicles from './pages/citizen/Vehicles';
import License from './pages/citizen/License';
import Profile from './pages/citizen/Profile';
import Documents from './pages/citizen/Documents';
import Settings from './pages/citizen/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<CitizenDashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/license" element={<License />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
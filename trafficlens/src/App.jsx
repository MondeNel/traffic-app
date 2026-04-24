import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CitizenDashboard from './pages/citizen/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<CitizenDashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
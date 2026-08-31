import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudyRoom from './pages/StudyRoom';
import PracticeLab from './pages/PracticeLab';
import CodeChallenges from './pages/CodeChallenges';
import Setup from './pages/Setup';
import ExamMode from './pages/ExamMode';
import Results from './pages/Results';
import Login from './pages/Login';
import Forge from './pages/Forge';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--accent-primary)' }}>Loading Auth...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="study" element={<StudyRoom />} />
        <Route path="practice" element={<PracticeLab />} />
        <Route path="challenges" element={<CodeChallenges />} />
        <Route path="setup" element={<Setup />} />
        <Route path="exam" element={<ExamMode />} />
        <Route path="results" element={<Results />} />
        <Route path="forge" element={<Forge />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

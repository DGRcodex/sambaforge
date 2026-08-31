import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudyRoom from './pages/StudyRoom';
import Glossary from './pages/Glossary';
import PracticeLab from './pages/PracticeLab';
import CodeChallenges from './pages/CodeChallenges';
import Setup from './pages/Setup';
import MasterClass from './pages/MasterClass';
import ExamMode from './pages/ExamMode';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="study" element={<StudyRoom />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="practice" element={<PracticeLab />} />
        <Route path="challenges" element={<CodeChallenges />} />
        <Route path="setup" element={<Setup />} />
        <Route path="masterclass" element={<MasterClass />} />
        <Route path="exam" element={<ExamMode />} />
      </Route>
    </Routes>
  );
}

export default App;

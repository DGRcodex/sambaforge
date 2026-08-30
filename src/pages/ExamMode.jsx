import { useState, useEffect } from 'react';
import { questionsData } from '../data/questionsData';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Trophy, RotateCcw } from 'lucide-react';

export default function ExamMode() {
  const { lang } = useLanguage();
  const questions = questionsData[lang] || questionsData['es'];

  const [examStarted, setExamStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examFinished, setExamFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('preptrack_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleStart = () => {
    setExamStarted(true);
    setExamFinished(false);
    setCurrentIdx(0);
    setAnswers({});
  };

  const handleSelect = (idx) => {
    setAnswers({ ...answers, [currentIdx]: idx });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(curr => curr + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    let pts = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) pts++;
    });
    setScore(pts);
    setExamFinished(true);

    const newResult = {
      date: new Date().toISOString(),
      score: pts,
      total: questions.length
    };
    
    const newHistory = [newResult, ...history].slice(0, 5); // Keep last 5
    setHistory(newHistory);
    localStorage.setItem('preptrack_history', JSON.stringify(newHistory));
  };

  const texts = {
    es: {
      introTitle: 'Evaluación HackerRank (Simulacro)',
      introDesc: `Este módulo simula la evaluación real. Deberás responder ${questions.length} preguntas sin recibir feedback inmediato. Tu puntaje se calculará al final y se guardará en tu historial local.`,
      startBtn: 'Comenzar Prueba Seria',
      recent: 'Últimos Resultados',
      pts: 'pts',
      pass: '¡Excelente Trabajo!',
      fail: 'Buen intento, sigue repasando',
      finalScore: 'Puntaje final:',
      backHome: 'Volver al Inicio',
      inProgress: 'Prueba en Progreso',
      of: 'de',
      next: 'Siguiente',
      finish: 'Finalizar Prueba'
    },
    en: {
      introTitle: 'HackerRank Assessment (Mock)',
      introDesc: `This module simulates the real assessment. You must answer ${questions.length} questions without immediate feedback. Your score will be calculated at the end and saved locally.`,
      startBtn: 'Start Serious Exam',
      recent: 'Recent Results',
      pts: 'pts',
      pass: 'Excellent Work!',
      fail: 'Good try, keep studying',
      finalScore: 'Final score:',
      backHome: 'Back to Home',
      inProgress: 'Exam in Progress',
      of: 'of',
      next: 'Next',
      finish: 'Finish Exam'
    }
  };
  const t = texts[lang];

  if (!examStarted) {
    return (
      <div className="fade-in glass-panel" style={{ maxWidth: '600px', margin: '2rem auto', padding: '3rem', textAlign: 'center' }}>
        <Activity size={48} color="var(--accent-warning)" style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>{t.introTitle}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.5 }}>
          {t.introDesc}
        </p>
        <button className="btn btn-primary" onClick={handleStart} style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          {t.startBtn}
        </button>
        
        {history.length > 0 && (
          <div style={{ marginTop: '3rem', textAlign: 'left', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={20} color="var(--accent-warning)"/> {t.recent}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {history.map((h, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: i !== history.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{new Date(h.date).toLocaleDateString()} {new Date(h.date).toLocaleTimeString()}</span>
                  <strong style={{ color: h.score >= h.total * 0.8 ? 'var(--accent-primary)' : 'var(--accent-warning)' }}>
                    {h.score} / {h.total} {t.pts}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (examFinished) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 80;
    
    return (
      <div className="fade-in glass-panel" style={{ maxWidth: '600px', margin: '2rem auto', padding: '3rem', textAlign: 'center' }}>
        <Trophy size={64} color={passed ? 'var(--accent-primary)' : 'var(--accent-warning)'} style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>{passed ? t.pass : t.fail}</h1>
        
        <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'Outfit', color: passed ? 'var(--accent-primary)' : 'var(--text-primary)', marginBottom: '1rem' }}>
          {score} <span style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>/ {questions.length}</span>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          {t.finalScore} {percentage}%
        </p>

        <button className="btn btn-outline" onClick={() => setExamStarted(false)}>
          <RotateCcw size={18} /> {t.backHome}
        </button>
      </div>
    );
  }

  const q = questions[currentIdx] || questions[0];

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>{t.inProgress}</h1>
        <div style={{ background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-lg)', color: 'var(--accent-warning)' }}>
          {currentIdx + 1} {t.of} {questions.length}
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '2rem', lineHeight: 1.5 }}>
          {q.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className="quiz-option"
              style={{
                borderColor: answers[currentIdx] === idx ? 'var(--accent-warning)' : 'var(--glass-border)',
                background: answers[currentIdx] === idx ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-secondary)',
              }}
              onClick={() => handleSelect(idx)}
            >
              {opt}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className={`btn btn-primary ${answers[currentIdx] === undefined ? 'btn-disabled' : ''}`}
            onClick={handleNext}
          >
            {currentIdx < questions.length - 1 ? t.next : t.finish}
          </button>
        </div>
      </div>
    </div>
  );
}

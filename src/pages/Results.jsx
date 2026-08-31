import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { History, Trophy, Clock, Trash2 } from 'lucide-react';

export default function Results() {
  const { lang } = useLanguage();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('sambaforge_exam_results') || '[]');
    setResults(saved);
  }, []);

  const clearHistory = () => {
    if (window.confirm(lang === 'es' ? '¿Borrar todo el historial?' : 'Clear all history?')) {
      localStorage.removeItem('sambaforge_exam_results');
      setResults([]);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const t = {
    es: {
      title: 'Historial de Exámenes',
      desc: 'Aquí se guardan localmente los resultados de tus simulacros de 74 minutos. Revisa tu progreso antes de enfrentarte a la prueba real.',
      noResults: 'Aún no has completado ningún examen. Ve a "Prueba" e inicia un simulacro.',
      clear: 'Borrar Historial',
      date: 'Fecha',
      score: 'Puntaje Opción Múltiple',
      timeLeft: 'Tiempo Sobrante'
    },
    en: {
      title: 'Exam History',
      desc: 'Your 74-minute mock exam results are saved here locally. Track your progress before facing the real assessment.',
      noResults: 'You haven\'t completed any exams yet. Go to "Exam" and start a mock test.',
      clear: 'Clear History',
      date: 'Date',
      score: 'Multiple Choice Score',
      timeLeft: 'Time Remaining'
    }
  };
  const l = t[lang] || t['es'];

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <History color="var(--accent-primary)" /> {l.title}
        </h1>
        {results.length > 0 && (
          <button className="btn btn-outline" onClick={clearHistory} style={{ color: 'var(--accent-error)', borderColor: 'var(--accent-error)' }}>
            <Trash2 size={16} /> {l.clear}
          </button>
        )}
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
        {l.desc}
      </p>

      {results.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <Trophy size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p style={{ color: 'var(--text-secondary)' }}>{l.noResults}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {results.map((res, i) => (
            <div key={res.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                  Simulacro #{results.length - i}
                </h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {new Date(res.date).toLocaleString(lang === 'es' ? 'es-ES' : 'en-US')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{l.score}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: res.score >= 8 ? 'var(--accent-primary)' : (res.score >= 5 ? 'var(--accent-warning)' : 'var(--accent-error)') }}>
                    {res.score} / {res.total}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{l.timeLeft}</div>
                  <div style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-primary)' }}>
                    <Clock size={16} /> {formatTime(res.timeLeft)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

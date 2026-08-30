import { useState } from 'react';
import { challengesData } from '../data/challengesData';
import { useLanguage } from '../context/LanguageContext';
import { Code, CheckCircle, Lightbulb } from 'lucide-react';

export default function CodeChallenges() {
  const { lang } = useLanguage();
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const challenges = challengesData[lang] || challengesData['es'];
  const currentChallenge = challenges[activeChallengeIdx];

  // Config inicial del textarea
  useState(() => {
    setUserCode(currentChallenge.initialCode);
  }, [activeChallengeIdx]);

  const handleSelectChallenge = (idx) => {
    setActiveChallengeIdx(idx);
    setUserCode(challenges[idx].initialCode);
    setShowSolution(false);
  };

  const texts = {
    es: {
      title: 'Ejercicios de Código a Mano',
      submit: 'Evaluar mi Respuesta',
      solution: 'Solución Esperada y Rúbrica',
      explanation: 'Explicación del Arquitecto:',
      next: 'Siguiente Ejercicio'
    },
    en: {
      title: 'Short Answer & Code Challenges',
      submit: 'Evaluate my Answer',
      solution: 'Expected Solution & Rubric',
      explanation: 'Architect Explanation:',
      next: 'Next Challenge'
    }
  };

  const t = texts[lang];

  return (
    <div className="fade-in" style={{ display: 'flex', gap: '2rem' }}>
      
      {/* Sidebar de Retos */}
      <div style={{ width: '250px', flexShrink: 0 }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code size={20} /> {lang === 'es' ? 'Retos' : 'Challenges'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {challenges.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => handleSelectChallenge(idx)}
              style={{
                textAlign: 'left',
                padding: '0.75rem',
                background: activeChallengeIdx === idx ? 'var(--bg-glass-hover)' : 'transparent',
                border: '1px solid',
                borderColor: activeChallengeIdx === idx ? 'var(--accent-secondary)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                color: activeChallengeIdx === idx ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Reto {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Principal */}
      <div className="glass-panel" style={{ flex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
        <h1 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          {currentChallenge.title}
        </h1>
        
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
          {currentChallenge.description}
        </p>

        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          spellCheck="false"
          style={{
            width: '100%',
            height: '250px',
            background: '#050508',
            color: '#a0a0b0',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.5rem',
            fontFamily: 'monospace',
            fontSize: '1rem',
            lineHeight: 1.5,
            resize: 'vertical',
            outline: 'none',
            marginBottom: '1.5rem'
          }}
        />

        {!showSolution ? (
          <div style={{ alignSelf: 'flex-end' }}>
            <button className="btn btn-primary" onClick={() => setShowSolution(true)}>
              <CheckCircle size={18} /> {t.submit}
            </button>
          </div>
        ) : (
          <div className="fade-in" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lightbulb size={20} /> {t.solution}
            </h3>
            
            <pre style={{ background: '#050508', padding: '1rem', borderRadius: 'var(--radius-sm)', overflowX: 'auto', border: '1px solid var(--glass-border)', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
              <code>{currentChallenge.expectedSolution}</code>
            </pre>

            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t.explanation}</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              {currentChallenge.explanation}
            </p>

            {activeChallengeIdx < challenges.length - 1 && (
              <button className="btn btn-outline" onClick={() => handleSelectChallenge(activeChallengeIdx + 1)}>
                {t.next}
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

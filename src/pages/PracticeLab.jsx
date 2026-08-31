import { useState } from 'react';
import { examBank } from '../data/examBank';
import { useLanguage } from '../context/LanguageContext';
import { AlertCircle, CheckCircle, ArrowRight, Eye } from 'lucide-react';

export default function PracticeLab() {
  const { lang } = useLanguage();
  
  // Flatten all questions from the current language bank
  const currentBank = examBank[lang] || examBank['es'];
  const questions = [
    ...currentBank.extendScriptUxp.map(q => ({ ...q, category: 'ExtendScript & UXP' })),
    ...currentBank.idmlDataMerge.map(q => ({ ...q, category: 'IDML & Data Merge' })),
    ...currentBank.serverProduction.map(q => ({ ...q, category: 'InDesign Server' })),
    ...currentBank.debugScript.map(q => ({ ...q, category: 'Debug the Script' })),
    ...currentBank.backendBonus.map(q => ({ ...q, category: 'Backend Bonus' }))
  ];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [codeAnswer, setCodeAnswer] = useState('');

  const q = questions[currentIdx] || questions[0];

  const handleOptionClick = (idx) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
  };

  const handleShowAnswer = () => {
    setHasAnswered(true);
  };

  const t = {
    es: {
      title: 'Módulo de Ensayo (Feedback Inmediato)',
      question: 'Reactivo',
      of: 'de',
      correct: '¡Correcto!',
      incorrect: 'Incorrecto',
      next: 'Siguiente Pregunta',
      finish: 'Finalizar Ensayo',
      alert: '¡Laboratorio de Ensayo completado! Ahora estás listo para la Prueba Seria de 74 minutos.',
      showAns: 'Mostrar Respuesta Ideal',
      yourSol: 'Tu Solución/Respuesta:',
      idealAns: 'Respuesta Ideal / BLUF:',
      origCode: 'Código Original:',
      placeholder: 'Escribe tu ensayo de respuesta aquí...'
    },
    en: {
      title: 'Practice Lab (Instant Feedback)',
      question: 'Question',
      of: 'of',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      next: 'Next Question',
      finish: 'Finish Practice',
      alert: 'Practice Lab completed! You are now ready for the Serious 74-Minute Exam.',
      showAns: 'Show Ideal Answer',
      yourSol: 'Your Solution/Answer:',
      idealAns: 'Ideal Answer / BLUF:',
      origCode: 'Original Code:',
      placeholder: 'Write your practice answer here...'
    }
  };
  const l = t[lang] || t['es'];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(curr => curr + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setCodeAnswer('');
    } else {
      setCurrentIdx(0);
      setSelectedOption(null);
      setHasAnswered(false);
      setCodeAnswer('');
      alert(l.alert);
    }
  };

  const getOptionClass = (idx) => {
    if (!hasAnswered) return "quiz-option";
    if (idx === q.correctAnswer) return "quiz-option correct";
    if (idx === selectedOption) return "quiz-option incorrect";
    return "quiz-option";
  };

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      <div className="exam-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>{l.title}</h1>
        <div style={{ background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-lg)', color: 'var(--text-secondary)' }}>
          {l.question} {currentIdx + 1} {l.of} {questions.length}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {q.category}
        </div>
        
        <h2 style={{ fontSize: '1.4rem', marginBottom: '2rem', lineHeight: 1.5 }}>
          {q.question}
        </h2>

        {/* --- MULTIPLE CHOICE --- */}
        {q.type === 'multiple' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                className={getOptionClass(idx)}
                onClick={() => handleOptionClick(idx)}
                disabled={hasAnswered}
              >
                <span>{opt}</span>
                {hasAnswered && idx === q.correctAnswer && <CheckCircle size={20} color="var(--accent-primary)" />}
                {hasAnswered && idx === selectedOption && idx !== q.correctAnswer && <AlertCircle size={20} color="var(--accent-error)" />}
              </button>
            ))}
          </div>
        )}

        {/* --- SHORT ANSWER / CODE --- */}
        {(q.type === 'short' || q.type === 'code') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {q.initialCode && (
              <div style={{ background: '#0d1117', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>{l.origCode}</h4>
                <pre style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                  {q.initialCode}
                </pre>
              </div>
            )}
            
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{l.yourSol}</h4>
            <textarea
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              placeholder={l.placeholder}
              disabled={hasAnswered}
              style={{ 
                width: '100%', minHeight: q.type === 'code' ? '150px' : '100px', padding: '1rem', 
                background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', 
                borderRadius: 'var(--radius-sm)', color: q.type === 'code' ? '#a5d6ff' : 'var(--text-primary)', 
                fontSize: '0.95rem', resize: 'vertical', fontFamily: q.type === 'code' ? 'monospace' : 'inherit'
              }}
              spellCheck="false"
            />
            
            {!hasAnswered && (
              <button className="btn btn-outline" onClick={handleShowAnswer} style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                <Eye size={18} /> {l.showAns}
              </button>
            )}
          </div>
        )}

        {/* --- FEEDBACK BOX --- */}
        {hasAnswered && (
          <div className={`feedback-box ${q.type === 'multiple' ? (selectedOption === q.correctAnswer ? 'success' : 'error') : 'success'}`}>
            {q.type === 'multiple' && (
              <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {selectedOption === q.correctAnswer ? (
                  <><CheckCircle size={18} color="var(--accent-primary)"/> {l.correct}</>
                ) : (
                  <><AlertCircle size={18} color="var(--accent-error)"/> {l.incorrect}</>
                )}
              </h4>
            )}
            
            {(q.type === 'short' || q.type === 'code') && (
              <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
                <CheckCircle size={18} /> {l.idealAns}
              </h4>
            )}
            
            <pre style={{ 
              color: 'var(--text-primary)', lineHeight: 1.5, marginTop: '0.5rem', 
              whiteSpace: 'pre-wrap', fontFamily: (q.type === 'code') ? 'monospace' : 'inherit' 
            }}>
              {q.explanation || q.idealAnswer}
            </pre>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={handleNext}>
                {currentIdx < questions.length - 1 ? l.next : l.finish} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

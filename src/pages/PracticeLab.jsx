import { useState } from 'react';
import { questionsData } from '../data/questionsData';
import { useLanguage } from '../context/LanguageContext';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function PracticeLab() {
  const { lang } = useLanguage();
  const questions = questionsData[lang] || questionsData['es'];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Safely get question if idx is out of bounds after language switch logic
  const q = questions[currentIdx] || questions[0];

  const handleOptionClick = (idx) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
  };

  const texts = {
    es: {
      title: 'Módulo de Ensayo',
      question: 'Pregunta',
      of: 'de',
      correct: '¡Correcto!',
      incorrect: 'Incorrecto',
      next: 'Siguiente Pregunta',
      finish: 'Finalizar Ensayo',
      alert: '¡Laboratorio de Ensayo completado! Ahora estás listo para la Prueba Seria.'
    },
    en: {
      title: 'Practice Lab',
      question: 'Question',
      of: 'of',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      next: 'Next Question',
      finish: 'Finish Practice',
      alert: 'Practice Lab completed! You are now ready for the Serious Exam.'
    }
  };
  const t = texts[lang];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(curr => curr + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setCurrentIdx(0);
      setSelectedOption(null);
      setHasAnswered(false);
      alert(t.alert);
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
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>{t.title}</h1>
        <div style={{ background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-lg)', color: 'var(--text-secondary)' }}>
          {t.question} {currentIdx + 1} {t.of} {questions.length}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {q.category}
        </div>
        
        <h2 style={{ fontSize: '1.4rem', marginBottom: '2rem', lineHeight: 1.5 }}>
          {q.question}
        </h2>

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

        {hasAnswered && (
          <div className={`feedback-box ${selectedOption === q.correctAnswer ? 'success' : 'error'}`}>
            <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {selectedOption === q.correctAnswer ? (
                <><CheckCircle size={18} color="var(--accent-primary)"/> {t.correct}</>
              ) : (
                <><AlertCircle size={18} color="var(--accent-error)"/> {t.incorrect}</>
              )}
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {q.explanation}
            </p>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={handleNext}>
                {currentIdx < questions.length - 1 ? t.next : t.finish} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

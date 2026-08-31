import { useState, useEffect } from 'react';
import { examBank } from '../data/examBank';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Trophy, RotateCcw, Clock } from 'lucide-react';

const SECTIONS_ES = [
  { id: 'extendScriptUxp', title: '1. ExtendScript & UXP', count: 5 },
  { id: 'idmlDataMerge', title: '2. IDML & Data Merge', count: 5 },
  { id: 'serverProduction', title: '3. InDesign Server', count: 4 },
  { id: 'debugScript', title: '4. Debug the Script', count: 1 },
  { id: 'backendBonus', title: '5. Backend Bonus', count: 1 }
];

const SECTIONS_EN = [
  { id: 'extendScriptUxp', title: '1. ExtendScript & UXP', count: 5 },
  { id: 'idmlDataMerge', title: '2. IDML & Data Merge', count: 5 },
  { id: 'serverProduction', title: '3. InDesign Server', count: 4 },
  { id: 'debugScript', title: '4. Debug the Script', count: 1 },
  { id: 'backendBonus', title: '5. Backend Bonus', count: 1 }
];

function getRandomQuestions(array, n) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function ExamMode() {
  const { lang } = useLanguage();
  const SECTIONS = lang === 'en' ? SECTIONS_EN : SECTIONS_ES;
  
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(74 * 60);
  const [activeTest, setActiveTest] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer;
    if (examStarted && !examFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !examFinished && !isSubmitting) {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeLeft, isSubmitting]);

  const handleStart = () => {
    const currentBank = examBank[lang] || examBank['es'];
    const testInstance = {};
    SECTIONS.forEach(sec => {
      testInstance[sec.id] = getRandomQuestions(currentBank[sec.id], sec.count);
    });
    
    setActiveTest(testInstance);
    setAnswers({});
    setTimeLeft(74 * 60);
    setActiveTab(0);
    setExamFinished(false);
    setExamStarted(true);
  };

  const handleAnswerChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const finishExam = async () => {
    setIsSubmitting(true);
    let calculatedScore = 0;
    SECTIONS.forEach(sec => {
      activeTest[sec.id].forEach(q => {
        if (q.type === 'multiple' && answers[q.id] === q.correctAnswer) {
          calculatedScore += 1;
        }
      });
    });
    setScore(calculatedScore);

    try {
      const { error } = await supabase
        .from('exam_results')
        .insert([
          {
            score: calculatedScore,
            total: 10,
            time_left: timeLeft,
            lang: lang,
            answers: answers,
            test_snapshot: activeTest
          }
        ]);
      
      if (error) throw error;
    } catch (err) {
      console.error('Error saving to Supabase:', err);
      // Fallback local guardando si falla
      const pastResults = JSON.parse(localStorage.getItem('sambaforge_exam_results') || '[]');
      pastResults.unshift({ id: Date.now(), date: new Date().toISOString(), score: calculatedScore, total: 10, timeLeft: timeLeft, lang, answers, testSnapshot: activeTest });
      localStorage.setItem('sambaforge_exam_results', JSON.stringify(pastResults));
    } finally {
      setIsSubmitting(false);
      setExamFinished(true);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const t = {
    es: {
      title: 'HackerRank Assessment (Mock)',
      desc: 'Este simulador reproduce las condiciones exactas de la prueba técnica de The N2 Company. Tendrás 74 minutos para completar 5 secciones que incluyen preguntas de opción múltiple, análisis arquitectónico y refactorización de código en vivo.',
      struct: 'Estructura',
      struct1: 'Sección 1 y 2: Opción Múltiple (10 preg)',
      struct2: 'Sección 3: Respuestas Cortas (4 preg)',
      struct3: 'Sección 4: Debug the Script (1 lab)',
      struct4: 'Sección 5: Backend Bonus (1 lab)',
      rules: 'Reglas',
      rule1: 'El reloj de 74:00 no se detiene.',
      rule2: 'Puedes navegar entre las pestañas libremente.',
      rule3: 'Al finalizar, autoevaluarás tu código con la Rúbrica Oficial.',
      start: 'Iniciar Sesión de 74 Minutos',
      finished: 'Examen Finalizado',
      timeLeft: 'Tiempo restante al entregar',
      score: 'Puntaje Opción Múltiple',
      compare: 'Para las secciones de código y respuestas cortas, compara tus soluciones con la rúbrica oficial a continuación.',
      back: 'Volver al Inicio',
      rubric: 'Rúbrica de Autoevaluación',
      yourAns: 'Tu Respuesta:',
      idealAns: 'Respuesta Ideal / BLUF:',
      noAns: 'No respondida',
      submit: 'Entregar Examen',
      prevSec: 'Anterior Sección',
      nextSec: 'Siguiente Sección',
      finishEval: 'Finalizar y Evaluar',
      origCode: 'Código Original:',
      yourSol: 'Tu Solución:',
      placeholder: 'Escribe tu respuesta aquí utilizando el método BLUF...'
    },
    en: {
      title: 'HackerRank Assessment (Mock)',
      desc: 'This simulator reproduces the exact conditions of The N2 Company technical test. You will have 74 minutes to complete 5 sections including multiple choice, architectural analysis, and live code refactoring.',
      struct: 'Structure',
      struct1: 'Section 1 & 2: Multiple Choice (10 q)',
      struct2: 'Section 3: Short Answers (4 q)',
      struct3: 'Section 4: Debug the Script (1 lab)',
      struct4: 'Section 5: Backend Bonus (1 lab)',
      rules: 'Rules',
      rule1: 'The 74:00 clock does not stop.',
      rule2: 'You can navigate freely between tabs.',
      rule3: 'Upon finishing, you will self-evaluate your code with the Official Rubric.',
      start: 'Start 74-Minute Session',
      finished: 'Exam Finished',
      timeLeft: 'Time remaining upon submission',
      score: 'Multiple Choice Score',
      compare: 'For code and short answer sections, compare your solutions with the official rubric below.',
      back: 'Back to Home',
      rubric: 'Self-Evaluation Rubric',
      yourAns: 'Your Answer:',
      idealAns: 'Ideal Answer / BLUF:',
      noAns: 'Not answered',
      submit: 'Submit Exam',
      prevSec: 'Previous Section',
      nextSec: 'Next Section',
      finishEval: 'Finish and Evaluate',
      origCode: 'Original Code:',
      yourSol: 'Your Solution:',
      placeholder: 'Write your answer here using the BLUF method...'
    }
  };

  const l = t[lang] || t['es'];

  if (!examStarted) {
    return (
      <div className="fade-in glass-panel" style={{ maxWidth: '800px', margin: '2rem auto', padding: '3rem', textAlign: 'center' }}>
        <Activity size={56} color="var(--accent-warning)" style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>{l.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          {l.desc}
        </p>
        
        <div className="responsive-grid" style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{l.struct}</h3>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <li>{l.struct1}</li>
              <li>{l.struct2}</li>
              <li>{l.struct3}</li>
              <li>{l.struct4}</li>
            </ul>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-warning)', marginBottom: '0.5rem' }}>{l.rules}</h3>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <li>{l.rule1}</li>
              <li>{l.rule2}</li>
              <li>{l.rule3}</li>
            </ul>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleStart} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
          {l.start}
        </button>
      </div>
    );
  }

  if (examFinished) {
    const multipleChoiceTotal = 10;
    
    return (
      <div className="fade-in" style={{ maxWidth: '900px', margin: '2rem auto' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
          <Trophy size={64} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ marginBottom: '1rem' }}>{l.finished}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>{l.timeLeft}: {formatTime(timeLeft)}</p>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ color: 'var(--accent-primary)', fontSize: '2rem' }}>
              {l.score}: {score} / {multipleChoiceTotal}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {l.compare}
            </p>
          </div>
          
          <button className="btn btn-outline" onClick={() => setExamStarted(false)} style={{ marginTop: '2rem' }}>
            <RotateCcw size={18} /> {l.back}
          </button>
        </div>

        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>{l.rubric}</h2>
        
        {SECTIONS.slice(2).map(sec => (
          <div key={sec.id} style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--accent-warning)', marginBottom: '1rem' }}>{sec.title}</h3>
            {activeTest[sec.id]?.map((q, idx) => (
              <div key={q.id} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Q{idx + 1}: {q.question}</p>
                <div className="responsive-grid">
                  <div>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{l.yourAns}</h4>
                    <pre style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '4px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem', color: answers[q.id] ? 'var(--text-primary)' : 'var(--accent-danger)' }}>
                      {answers[q.id] || l.noAns}
                    </pre>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{l.idealAns}</h4>
                    <pre style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid var(--accent-primary)', padding: '1rem', borderRadius: '4px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {q.idealAnswer}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  const currentSection = SECTIONS[activeTab];
  const sectionQuestions = activeTest[currentSection.id] || [];

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '85vh' }}>
      
      <div className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>The N2 Company - Technical Assessment</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ID: {currentSection.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: timeLeft < 600 ? 'var(--accent-danger)' : 'var(--accent-warning)', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'monospace' }}>
            <Clock size={24} />
            {formatTime(timeLeft)}
          </div>
          <button className="btn btn-primary" onClick={finishExam} disabled={isSubmitting}>
            {isSubmitting ? '...' : l.submit}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {SECTIONS.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => setActiveTab(idx)}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === idx ? 'var(--accent-primary)' : 'var(--bg-glass)',
              color: activeTab === idx ? '#000' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontWeight: activeTab === idx ? 600 : 400,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {sec.title}
          </button>
        ))}
      </div>

      <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        
        {sectionQuestions.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: '3rem', paddingBottom: '3rem', borderBottom: idx !== sectionQuestions.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Q{idx + 1}.</span> 
              {q.question}
            </h3>

            {q.type === 'multiple' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {q.options.map((opt, oIdx) => (
                  <label 
                    key={oIdx} 
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', 
                      background: answers[q.id] === oIdx ? 'rgba(52, 211, 153, 0.1)' : 'var(--bg-secondary)', 
                      border: `1px solid ${answers[q.id] === oIdx ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                      borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <input 
                      type="radio" 
                      name={`question_${q.id}`} 
                      checked={answers[q.id] === oIdx}
                      onChange={() => handleAnswerChange(q.id, oIdx)}
                      style={{ accentColor: 'var(--accent-primary)', width: '1.2rem', height: '1.2rem' }}
                    />
                    <span style={{ fontSize: '1rem' }}>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'short' && (
              <div>
                <textarea 
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder={l.placeholder}
                  style={{ 
                    width: '100%', minHeight: '120px', padding: '1rem', 
                    background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', 
                    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', 
                    fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit'
                  }}
                />
              </div>
            )}

            {q.type === 'code' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {q.initialCode && (
                  <div style={{ background: '#0d1117', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>{l.origCode}</h4>
                    <pre style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                      {q.initialCode}
                    </pre>
                  </div>
                )}
                <div>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>{l.yourSol}</h4>
                  <textarea 
                    value={answers[q.id] !== undefined ? answers[q.id] : (q.initialCode || '')}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    style={{ 
                      width: '100%', minHeight: '200px', padding: '1rem', 
                      background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)', 
                      borderRadius: 'var(--radius-sm)', color: '#a5d6ff', 
                      fontSize: '0.9rem', resize: 'vertical', fontFamily: 'monospace', tabSize: 2
                    }}
                    spellCheck="false"
                  />
                </div>
              </div>
            )}
            
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
            disabled={activeTab === 0}
          >
            {l.prevSec}
          </button>
          
          {activeTab < SECTIONS.length - 1 ? (
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveTab(prev => prev + 1)}
            >
              {l.nextSec}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={finishExam} disabled={isSubmitting} style={{ background: 'var(--accent-warning)', color: '#000' }}>
              {isSubmitting ? '...' : l.finishEval}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

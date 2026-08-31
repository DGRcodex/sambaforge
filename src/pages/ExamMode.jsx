import { useState, useEffect, useRef } from 'react';
import { examBank } from '../data/examBank';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Trophy, RotateCcw, Clock, CheckCircle2, XCircle } from 'lucide-react';

const SECTIONS = [
  { id: 'extendScriptUxp', title: '1. ExtendScript & UXP', count: 5 },
  { id: 'idmlDataMerge', title: '2. IDML & Data Merge', count: 5 },
  { id: 'serverProduction', title: '3. InDesign Server', count: 4 },
  { id: 'debugScript', title: '4. Debug the Script', count: 1 },
  { id: 'backendBonus', title: '5. Backend Bonus', count: 1 }
];

// Helper to shuffle and pick N items
function getRandomQuestions(array, n) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function ExamMode() {
  const { lang } = useLanguage();
  
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(74 * 60); // 74 minutes
  
  // Exam Data State
  const [activeTest, setActiveTest] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  
  // User Answers (store by question ID)
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (examStarted && !examFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !examFinished) {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeLeft]);

  const handleStart = () => {
    // Generate the random test instance
    const testInstance = {};
    SECTIONS.forEach(sec => {
      testInstance[sec.id] = getRandomQuestions(examBank[sec.id], sec.count);
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

  const finishExam = () => {
    setExamFinished(true);
    // Calculate score for multiple choice
    let calculatedScore = 0;
    SECTIONS.forEach(sec => {
      activeTest[sec.id].forEach(q => {
        if (q.type === 'multiple' && answers[q.id] === q.correctAnswer) {
          calculatedScore += 1;
        }
      });
    });
    setScore(calculatedScore);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // --- Intro Screen ---
  if (!examStarted) {
    return (
      <div className="fade-in glass-panel" style={{ maxWidth: '800px', margin: '2rem auto', padding: '3rem', textAlign: 'center' }}>
        <Activity size={56} color="var(--accent-warning)" style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>HackerRank Assessment (Mock)</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Este simulador reproduce las condiciones exactas de la prueba técnica de <strong>The N2 Company</strong>. 
          Tendrás <strong>74 minutos</strong> para completar 5 secciones que incluyen preguntas de opción múltiple, 
          análisis arquitectónico y refactorización de código en vivo.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left', marginBottom: '3rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Estructura</h3>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <li>Sección 1 y 2: Opción Múltiple (10 preg)</li>
              <li>Sección 3: Respuestas Cortas (4 preg)</li>
              <li>Sección 4: Debug the Script (1 lab)</li>
              <li>Sección 5: Backend Bonus (1 lab)</li>
            </ul>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-warning)', marginBottom: '0.5rem' }}>Reglas</h3>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <li>El reloj de 74:00 no se detiene.</li>
              <li>Puedes navegar entre las pestañas libremente.</li>
              <li>Al finalizar, autoevaluarás tu código con la Rúbrica Oficial (Pronto evaluación con IA).</li>
            </ul>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleStart} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
          Iniciar Sesión de 74 Minutos
        </button>
      </div>
    );
  }

  // --- Results Screen ---
  if (examFinished) {
    const multipleChoiceTotal = 10; // 5 from sec1 + 5 from sec2
    
    return (
      <div className="fade-in" style={{ maxWidth: '900px', margin: '2rem auto' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
          <Trophy size={64} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ marginBottom: '1rem' }}>Examen Finalizado</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Tiempo restante al entregar: {formatTime(timeLeft)}</p>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ color: 'var(--accent-primary)', fontSize: '2rem' }}>
              Puntaje Opción Múltiple: {score} / {multipleChoiceTotal}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Para las secciones de código y respuestas cortas, compara tus soluciones con la rúbrica oficial a continuación.
            </p>
          </div>
          
          <button className="btn btn-outline" onClick={() => setExamStarted(false)} style={{ marginTop: '2rem' }}>
            <RotateCcw size={18} /> Volver al Inicio
          </button>
        </div>

        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Rúbrica de Autoevaluación</h2>
        
        {SECTIONS.slice(2).map(sec => (
          <div key={sec.id} style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--accent-warning)', marginBottom: '1rem' }}>{sec.title}</h3>
            {activeTest[sec.id]?.map((q, idx) => (
              <div key={q.id} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Q{idx + 1}: {q.question}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tu Respuesta:</h4>
                    <pre style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '4px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem', color: answers[q.id] ? 'var(--text-primary)' : 'var(--accent-danger)' }}>
                      {answers[q.id] || "No respondida"}
                    </pre>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Respuesta Ideal / BLUF:</h4>
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

  // --- Active Exam Screen ---
  const currentSection = SECTIONS[activeTab];
  const sectionQuestions = activeTest[currentSection.id];

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '85vh' }}>
      
      {/* Header / Timer */}
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
          <button className="btn btn-primary" onClick={finishExam}>
            Entregar Examen
          </button>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Question List for Current Tab */}
      <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        
        {sectionQuestions.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: '3rem', paddingBottom: '3rem', borderBottom: idx !== sectionQuestions.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Q{idx + 1}.</span> 
              {q.question}
            </h3>

            {/* Multiple Choice Render */}
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

            {/* Short Answer Render */}
            {q.type === 'short' && (
              <div>
                <textarea 
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="Escribe tu respuesta aquí utilizando el método BLUF..."
                  style={{ 
                    width: '100%', minHeight: '120px', padding: '1rem', 
                    background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', 
                    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', 
                    fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit'
                  }}
                />
              </div>
            )}

            {/* Code / Debug Render */}
            {q.type === 'code' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {q.initialCode && (
                  <div style={{ background: '#0d1117', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Código Original:</h4>
                    <pre style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                      {q.initialCode}
                    </pre>
                  </div>
                )}
                <div>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Tu Solución:</h4>
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
            Anterior Sección
          </button>
          
          {activeTab < SECTIONS.length - 1 ? (
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveTab(prev => prev + 1)}
            >
              Siguiente Sección
            </button>
          ) : (
            <button className="btn btn-primary" onClick={finishExam} style={{ background: 'var(--accent-warning)', color: '#000' }}>
              Finalizar y Evaluar
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

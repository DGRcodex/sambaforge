import { useLanguage } from '../context/LanguageContext';
import { Terminal, Hammer, Plus, BookOpen, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { lang } = useLanguage();

  const t = {
    es: {
      subtitle: 'Prepárate para la prueba técnica de HackerRank. Domina el entorno Headless, ExtendScript, manipulación de IDML y la automatización de pre-prensa.',
      studyTitle: 'Módulo de Lectura',
      studyDesc: 'Repasa la guía de estudio maestra. Historia de ExtendScript y reglas de oro.',
      studyBtn: 'Comenzar Lectura',
      practiceTitle: 'Laboratorio de Ensayo',
      practiceDesc: 'Banco extendido de 20 preguntas con feedback instantáneo. Equivócate aquí para aprender.',
      practiceBtn: 'Iniciar Ensayo',
      examTitle: 'Prueba Seria',
      examDesc: 'Simula el entorno real de HackerRank. Sin feedback durante la prueba.',
      examBtn: 'Hacer Prueba',
      glossaryTitle: 'Glosario Técnico',
      glossaryDesc: 'Diccionario interactivo con todos los términos técnicos de la evaluación.',
      glossaryBtn: 'Ver Glosario',
      codeTitle: 'Retos de Código',
      codeDesc: 'Ejercicios de código abierto para evaluar tu razonamiento backend y ExtendScript.',
      codeBtn: 'Resolver Retos'
    },
    en: {
      title: 'Master InDesign Server',
      subtitle: 'Prepare for the HackerRank technical test. Master the Headless environment, ExtendScript, IDML manipulation, and prepress automation.',
      studyTitle: 'Study Room',
      studyDesc: 'Review the master study guide. ExtendScript history and golden rules.',
      studyBtn: 'Start Reading',
      practiceTitle: 'Practice Lab',
      practiceDesc: 'Extended bank of 20 questions with instant feedback. Make mistakes here to learn.',
      practiceBtn: 'Start Practice',
      examTitle: 'Serious Exam',
      examDesc: 'Simulate the real HackerRank environment. No feedback during the test.',
      examBtn: 'Take Exam',
      glossaryTitle: 'Technical Glossary',
      glossaryDesc: 'Interactive dictionary with all technical terms for the assessment.',
      glossaryBtn: 'View Glossary',
      codeTitle: 'Code Challenges',
      codeDesc: 'Open-ended coding exercises to evaluate your backend and ExtendScript reasoning.',
      codeBtn: 'Solve Challenges'
    }
  };

  const t = texts[lang];

  return (
    <div className="fade-in" style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }} className="text-gradient">
        {t.title}
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 3rem auto', lineHeight: 1.5 }}>
        {t.subtitle}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Study */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>
            <BookOpen size={32} />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>{t.studyTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>{t.studyDesc}</p>
          <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => navigate('/study')}>
            {t.studyBtn}
          </button>
        </div>

        {/* Glossary */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: '#a855f7' }}>
            <Book size={32} />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>{t.glossaryTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>{t.glossaryDesc}</p>
          <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => navigate('/glossary')}>
            {t.glossaryBtn}
          </button>
        </div>
        
        {/* Code Challenges */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: '#eab308' }}>
            <Code size={32} />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>{t.codeTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>{t.codeDesc}</p>
          <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => navigate('/challenges')}>
            {t.codeBtn}
          </button>
        </div>

        {/* Practice */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
            <Beaker size={32} />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>{t.practiceTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>{t.practiceDesc}</p>
          <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => navigate('/practice')}>
            {t.practiceBtn}
          </button>
        </div>

        {/* Exam */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-error)' }}>
            <Terminal size={32} />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>{t.examTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>{t.examDesc}</p>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/exam')}>
            {t.examBtn}
          </button>
        </div>

      </div>
    </div>
  );
}

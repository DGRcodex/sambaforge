import { useLanguage } from '../context/LanguageContext';
import { Terminal, Hammer, Plus, BookOpen, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { lang } = useLanguage();

  const t = {
    es: {
      title: 'SambaForge Dashboard',
      subtitle: 'Selecciona una forja de entrenamiento o crea una nueva usando Inteligencia Artificial.',
      n2Title: 'InDesign Serverless & ExtendScript',
      n2Desc: 'Simulador técnico basado en los requerimientos de The N2 Company.',
      n2Meta: '10 Preguntas • 74 Minutos • Dificultad: Senior',
      forgeTitle: 'Forjar Nuevo Examen',
      forgeDesc: 'Sube un PDF de requerimientos y la IA creará un test a medida.',
      forgeMeta: 'Generación por Gemini 1.5 Pro',
      studyRoom: 'Ir al Temario',
      takeExam: 'Iniciar Examen'
    },
    en: {
      title: 'SambaForge Dashboard',
      subtitle: 'Select a training forge or create a new one using Artificial Intelligence.',
      n2Title: 'InDesign Serverless & ExtendScript',
      n2Desc: 'Technical simulator based on The N2 Company requirements.',
      n2Meta: '10 Questions • 74 Minutes • Difficulty: Senior',
      forgeTitle: 'Forge New Exam',
      forgeDesc: 'Upload a requirements PDF and AI will create a custom test.',
      forgeMeta: 'Powered by Gemini 1.5 Pro',
      studyRoom: 'Study Room',
      takeExam: 'Take Exam'
    }
  };
  const l = t[lang] || t['es'];

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-warning))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {l.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          {l.subtitle}
        </p>
      </div>

      <div className="responsive-grid">
        
        {/* N2 Company Forge */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(52, 211, 153, 0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <Terminal size={32} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '1.3rem', lineHeight: 1.3 }}>{l.n2Title}</h2>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>{l.n2Desc}</p>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={14} /> {l.n2Meta}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/study" className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>
              <BookOpen size={16} /> {l.studyRoom}
            </Link>
            <Link to="/exam" className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>
              {l.takeExam}
            </Link>
          </div>
        </div>

        {/* Create New Forge (AI) */}
        <Link to="/forge" className="glass-panel hover-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--accent-secondary)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <Hammer size={32} color="var(--accent-secondary)" />
            </div>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{l.forgeTitle}</h2>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>{l.forgeDesc}</p>
          <div style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={14} /> {l.forgeMeta}
          </div>
        </Link>

      </div>
    </div>
  );
}

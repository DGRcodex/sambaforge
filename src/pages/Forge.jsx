import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Hammer, Upload, FileText, Loader2, Bot, AlertTriangle } from 'lucide-react';

export default function Forge() {
  const { lang } = useLanguage();
  const [reqText, setReqText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    // Aquí implementaremos la llamada a Gemini para generar el test
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(lang === 'es' ? 'Generación exitosa (Mock)' : 'Generation successful (Mock)');
    }, 2000);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Hammer size={32} color="var(--accent-secondary)" />
        <h1 style={{ fontSize: '2.2rem' }}>{lang === 'es' ? 'La Forja' : 'The Forge'}</h1>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.6 }}>
        {lang === 'es' 
          ? 'Utiliza IA para generar un nuevo simulacro de examen. Pega los requerimientos del puesto (Job Description) o documentación técnica, y el sistema creará un examen con preguntas de Opción Múltiple, Análisis y Código.'
          : 'Use AI to generate a new mock exam. Paste the Job Description or technical documentation, and the system will create an exam with Multiple Choice, Analysis, and Code questions.'}
      </p>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={20} color="var(--accent-primary)" />
          {lang === 'es' ? 'Requerimientos / Documentación' : 'Requirements / Documentation'}
        </h3>
        
        <textarea 
          value={reqText}
          onChange={(e) => setReqText(e.target.value)}
          placeholder={lang === 'es' ? 'Pega aquí la Job Description...' : 'Paste Job Description here...'}
          style={{ 
            width: '100%', minHeight: '250px', padding: '1rem', 
            background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', 
            borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', 
            fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit',
            marginBottom: '2rem'
          }}
        />

        <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid var(--accent-warning)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <AlertTriangle size={24} color="var(--accent-warning)" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ color: 'var(--accent-warning)', marginBottom: '0.25rem' }}>{lang === 'es' ? 'Acción Requerida en Supabase' : 'Required Action in Supabase'}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.4 }}>
              {lang === 'es' 
                ? 'Para guardar las pruebas generadas, necesitas ejecutar el script SQL para crear la tabla custom_tests en Supabase (ver documentación).'
                : 'To save generated tests, you must run the SQL script to create the custom_tests table in Supabase (see documentation).'}
            </p>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleGenerate}
          disabled={isGenerating || reqText.trim().length === 0}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}
        >
          {isGenerating ? <Loader2 size={20} className="spin" /> : <Bot size={20} />}
          {isGenerating 
            ? (lang === 'es' ? 'Forjando Examen...' : 'Forging Exam...') 
            : (lang === 'es' ? 'Generar Examen con IA' : 'Generate Exam with AI')}
        </button>
      </div>
    </div>
  );
}

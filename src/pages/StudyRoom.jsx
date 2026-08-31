import { useState, useEffect } from 'react';
import { studyGuide } from '../data/studyGuide';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import InteractiveCodeBlock from '../components/InteractiveCodeBlock';

export default function StudyRoom() {
  const { lang } = useLanguage();
  const currentGuide = studyGuide[lang] || studyGuide['es'];
  
  const [activeModule, setActiveModule] = useState(currentGuide[0]);

  // When language changes, update the active module to the translated equivalent
  useEffect(() => {
    const equivalentModule = currentGuide.find(m => m.id === activeModule.id) || currentGuide[0];
    setActiveModule(equivalentModule);
  }, [lang, currentGuide]);

  const texts = {
    es: { temario: 'Temario', hierarchy: 'Jerarquía DOM', concepts: 'Conceptos Clave' },
    en: { temario: 'Curriculum', hierarchy: 'DOM Hierarchy', concepts: 'Key Concepts' }
  };
  const t = texts[lang];

  return (
    <div className="fade-in study-layout">
      
      {/* Sidebar */}
      <div className="study-sidebar">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{t.temario}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {currentGuide.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod)}
              style={{
                textAlign: 'left',
                padding: '1rem',
                background: activeModule.id === mod.id ? 'var(--bg-glass-hover)' : 'transparent',
                border: '1px solid',
                borderColor: activeModule.id === mod.id ? 'var(--accent-primary)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                color: activeModule.id === mod.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: activeModule.id === mod.id ? 600 : 400 }}>
                {mod.title.split(':')[0]}
              </span>
              {activeModule.id === mod.id && <ChevronRight size={16} color="var(--accent-primary)" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="glass-panel" style={{ flex: 1, padding: '2.5rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          {activeModule.title}
        </h1>
        
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          {activeModule.content}
        </p>

        {activeModule.table && (
          <table className="data-table">
            <thead>
              <tr>
                {activeModule.table.headers.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {activeModule.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeModule.hierarchy && (
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--glass-border)' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-secondary)' }}>{t.hierarchy}</h4>
            <code style={{ color: 'var(--text-primary)', wordBreak: 'break-all' }}>
              {activeModule.hierarchy.split('->').map((item, i, arr) => (
                <span key={i}>
                  {item.trim()}
                  {i < arr.length - 1 && <span style={{ color: 'var(--text-secondary)', margin: '0 8px' }}>→</span>}
                </span>
              ))}
            </code>
          </div>
        )}

        {activeModule.rules && activeModule.rules.length > 0 && (
          <div>
            <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>{t.concepts}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {activeModule.rules.map((rule, idx) => {
                const [boldPart, ...rest] = rule.split(': ');
                return (
                  <li key={idx} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={20} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>{boldPart}: </strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{rest.join(': ')}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {activeModule.codeSnippet && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Ejemplo de Código / Lab</h3>
            <pre style={{ background: '#050508', padding: '1.5rem', borderRadius: 'var(--radius-sm)', overflowX: 'auto', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
              <code>{activeModule.codeSnippet}</code>
            </pre>
          </div>
        )}

        {activeModule.interactiveExample && (
          <InteractiveCodeBlock 
            code={activeModule.interactiveExample.code}
            desktopResult={activeModule.interactiveExample.desktopResult}
            serverResult={activeModule.interactiveExample.serverResult}
          />
        )}
      </div>

    </div>
  );
}

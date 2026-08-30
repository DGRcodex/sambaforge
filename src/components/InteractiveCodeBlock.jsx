import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Monitor, Server, AlertTriangle } from 'lucide-react';

export default function InteractiveCodeBlock({ code, desktopResult, serverResult }) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(null);

  const texts = {
    es: {
      title: 'Simulación Interactiva de Ejecución',
      runDesktop: 'Ejecutar en Desktop (GUI)',
      runServer: 'Ejecutar en Server (Headless)',
      reset: 'Reiniciar Simulación'
    },
    en: {
      title: 'Interactive Execution Simulation',
      runDesktop: 'Run on Desktop (GUI)',
      runServer: 'Run on Server (Headless)',
      reset: 'Reset Simulation'
    }
  };
  const t = texts[lang];

  return (
    <div style={{ marginTop: '2rem', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      
      {/* Code Editor Header */}
      <div style={{ background: '#0f0f13', padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
        <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} /> {t.title}
        </h4>
        <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.95rem' }}>
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1px', background: 'var(--glass-border)' }}>
        <button 
          onClick={() => setActiveTab('desktop')}
          style={{ flex: 1, padding: '1rem', background: activeTab === 'desktop' ? 'var(--bg-glass-hover)' : 'var(--bg-secondary)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
        >
          <Monitor size={18} color="var(--accent-secondary)" /> {t.runDesktop}
        </button>
        <button 
          onClick={() => setActiveTab('server')}
          style={{ flex: 1, padding: '1rem', background: activeTab === 'server' ? 'var(--bg-glass-hover)' : 'var(--bg-secondary)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
        >
          <Server size={18} color="var(--accent-error)" /> {t.runServer}
        </button>
      </div>

      {/* Simulation Result Area */}
      {activeTab && (
        <div className="fade-in" style={{ padding: '2rem', background: activeTab === 'server' ? '#1a0b0f' : 'var(--bg-glass)', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          
          {activeTab === 'desktop' ? (
            <div className="glass-card" style={{ background: '#fff', color: '#000', padding: '1.5rem', borderRadius: '4px', maxWidth: '300px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
              <h4 style={{ margin: '0 0 1rem 0', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Monitor size={16} /> Adobe InDesign
              </h4>
              <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>{desktopResult}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setActiveTab(null)} style={{ background: '#0054ff', color: '#fff', border: 'none', padding: '0.4rem 1.5rem', borderRadius: '16px', cursor: 'pointer' }}>
                  OK
                </button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--accent-error)' }}>
              <Server size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Fatal Error: Thread Lock</h3>
              <p style={{ maxWidth: '400px', margin: '0 auto 1.5rem auto', color: 'var(--text-secondary)' }}>
                {serverResult}
              </p>
              <button className="btn btn-outline" style={{ borderColor: 'var(--accent-error)', color: 'var(--accent-error)' }} onClick={() => setActiveTab(null)}>
                {t.reset}
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

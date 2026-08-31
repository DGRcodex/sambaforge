import { useLanguage } from '../context/LanguageContext';
import { Download, Terminal, ExternalLink, Settings, GitBranch, LayoutTemplate } from 'lucide-react';

export default function Setup() {
  const { lang } = useLanguage();

  const texts = {
    es: {
      title: 'Configuración de Desarrollo',
      subtitle: 'Guía paso a paso para instalar las herramientas necesarias en tu computadora y contribuir al desarrollo de La Forja.',
      step1Title: '1. Editor de Código (VS Code)',
      step1Desc: 'VS Code es el estándar moderno para escribir código React y Node.js. Es ligero y tiene un ecosistema gigante de extensiones.',
      step1Btn: 'Descargar VS Code',
      step2Title: '2. Control de Versiones (Git)',
      step2Desc: 'Git te permite clonar el repositorio de La Forja y colaborar con otros desarrolladores subiendo tus cambios (commits).',
      step2Btn: 'Descargar Git',
      step3Title: '3. Node.js (Entorno de Ejecución)',
      step3Desc: 'Necesario para correr el servidor de desarrollo Vite y descargar las dependencias del proyecto usando npm (Node Package Manager).',
      step3Btn: 'Descargar Node.js LTS',
      step4Title: '4. React Developer Tools',
      step4Desc: 'Extensión oficial para Chrome o Firefox que te permite inspeccionar el árbol de componentes de React y su estado en tiempo real.',
      step4Btn: 'Instalar Extensión',
      verificationTitle: 'Verificación y Despliegue Local',
      verificationDesc: 'Una vez instalado todo, sigue estos pasos en tu terminal:',
      verifyStep1: 'git clone https://github.com/DGRcodex/sambagorge.git',
      verifyStep2: 'cd sambagorge',
      verifyStep3: 'npm install',
      verifyStep4: 'npm run dev'
    },
    en: {
      title: 'Development Setup',
      subtitle: 'Step-by-step guide to install the required tools on your computer to contribute to La Forja development.',
      step1Title: '1. Code Editor (VS Code)',
      step1Desc: 'VS Code is the modern standard for writing React and Node.js code. It is lightweight with a massive extension ecosystem.',
      step1Btn: 'Download VS Code',
      step2Title: '2. Version Control (Git)',
      step2Desc: 'Git allows you to clone the La Forja repository and collaborate with other developers by pushing your changes.',
      step2Btn: 'Download Git',
      step3Title: '3. Node.js (Runtime Environment)',
      step3Desc: 'Required to run the Vite development server and download project dependencies using npm (Node Package Manager).',
      step3Btn: 'Download Node.js LTS',
      step4Title: '4. React Developer Tools',
      step4Desc: 'Official extension for Chrome or Firefox that allows you to inspect the React component tree and state in real-time.',
      step4Btn: 'Install Extension',
      verificationTitle: 'Verification and Local Deployment',
      verificationDesc: 'Once everything is installed, follow these steps in your terminal:',
      verifyStep1: 'git clone https://github.com/DGRcodex/sambagorge.git',
      verifyStep2: 'cd sambagorge',
      verifyStep3: 'npm install',
      verifyStep4: 'npm run dev'
    }
  }[lang];

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Settings size={32} color="var(--accent-secondary)" />
        <h1 style={{ fontSize: '2.2rem' }}>{texts.title}</h1>
      </div>
      
      <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6 }}>
        {texts.subtitle}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Step 1 */}
        <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--accent-secondary)' }}>
            <Terminal size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{texts.step1Title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{texts.step1Desc}</p>
            <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              {texts.step1Btn} <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: '#a855f7' }}>
            <GitBranch size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{texts.step2Title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{texts.step2Desc}</p>
            <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              {texts.step2Btn} <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--accent-primary)' }}>
            <Download size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{texts.step3Title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{texts.step3Desc}</p>
            <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              {texts.step3Btn} <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Step 4 */}
        <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: '#eab308' }}>
            <LayoutTemplate size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{texts.step4Title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{texts.step4Desc}</p>
            <a href="https://react.dev/learn/react-developer-tools" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              {texts.step4Btn} <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Verification Section */}
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '1rem', border: '1px solid rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.02)' }}>
          <h3 style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }}>{texts.verificationTitle}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{texts.verificationDesc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <code style={{ background: '#050508', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}>
              {texts.verifyStep1}
            </code>
            <code style={{ background: '#050508', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}>
              {texts.verifyStep2}
            </code>
            <code style={{ background: '#050508', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}>
              {texts.verifyStep3}
            </code>
            <code style={{ background: '#050508', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--accent-primary)', border: '1px solid var(--glass-border)' }}>
              {texts.verifyStep4}
            </code>
          </div>
        </div>

      </div>

    </div>
  );
}

import { useLanguage } from '../context/LanguageContext';
import { Download, Cpu, Terminal, ExternalLink, Settings } from 'lucide-react';

export default function Setup() {
  const { lang } = useLanguage();

  const texts = {
    es: {
      title: 'Configuración del Entorno Local',
      subtitle: 'Guía paso a paso para instalar las herramientas necesarias en tu computadora para desarrollar automatizaciones en InDesign Server y ExtendScript.',
      step1Title: '1. Editor de Código (VS Code)',
      step1Desc: 'VS Code es el estándar moderno para escribir scripts de automatización. Reemplaza al antiguo ExtendScript Toolkit (ESTK).',
      step1Btn: 'Descargar VS Code',
      step2Title: '2. Extensión de Depuración (ExtendScript Debugger)',
      step2Desc: 'Esta extensión oficial de Adobe permite conectar tu VS Code a InDesign (Desktop o Server) para poner puntos de interrupción (breakpoints) y depurar el código.',
      step2Inst: 'Instalación: Abre VS Code, presiona Cmd+P (Mac) o Ctrl+P (Win), escribe "ext install adobe.extendscript-debugger" y presiona Enter.',
      step3Title: '3. Adobe InDesign Desktop (Entorno de Pruebas)',
      step3Desc: 'Regla de oro: Nunca desarrolles directamente en el servidor. Desarrolla y depura tus scripts en la versión de escritorio de InDesign, ya que el DOM es 99% idéntico.',
      step3Inst: 'Instalación: Abre tu panel de Adobe Creative Cloud e instala InDesign Desktop (versión CC).',
      step4Title: '4. Node.js (Orquestador Backend)',
      step4Desc: 'Para escribir el backend que automatizará InDesign Server (llamadas CLI o SOAP), necesitas Node.js instalado localmente.',
      step4Btn: 'Descargar Node.js LTS',
      verificationTitle: 'Verificación de Conexión (VS Code -> InDesign)',
      verificationDesc: 'Una vez instalado todo:',
      verifyStep1: 'Abre InDesign Desktop.',
      verifyStep2: 'Abre tu script .jsx en VS Code.',
      verifyStep3: 'En la esquina inferior izquierda de VS Code, haz clic en "Select Target" y selecciona tu versión activa de InDesign.',
      verifyStep4: 'Presiona F5 para ejecutar y depurar tu script paso a paso.'
    },
    en: {
      title: 'Local Environment Setup',
      subtitle: 'Step-by-step guide to install the required tools on your computer to develop InDesign Server and ExtendScript automations.',
      step1Title: '1. Code Editor (VS Code)',
      step1Desc: 'VS Code is the modern standard for writing automation scripts. It replaces the legacy ExtendScript Toolkit (ESTK).',
      step1Btn: 'Download VS Code',
      step2Title: '2. Debugging Extension (ExtendScript Debugger)',
      step2Desc: 'This official Adobe extension connects VS Code to InDesign (Desktop or Server) to set breakpoints and debug code.',
      step2Inst: 'Installation: Open VS Code, press Cmd+P (Mac) or Ctrl+P (Win), type "ext install adobe.extendscript-debugger" and press Enter.',
      step3Title: '3. Adobe InDesign Desktop (Test Environment)',
      step3Desc: 'Golden Rule: Never develop directly on the server. Write and debug your scripts in InDesign Desktop first; the DOM is 99% identical.',
      step3Inst: 'Installation: Open your Adobe Creative Cloud app and install InDesign Desktop.',
      step4Title: '4. Node.js (Backend Orchestrator)',
      step4Desc: 'To write the backend that orchestrates InDesign Server (using CLI or SOAP calls), you need Node.js installed locally.',
      step4Btn: 'Download Node.js LTS',
      verificationTitle: 'Connection Verification (VS Code -> InDesign)',
      verificationDesc: 'Once everything is installed:',
      verifyStep1: 'Open InDesign Desktop.',
      verifyStep2: 'Open your .jsx script in VS Code.',
      verifyStep3: 'In the bottom-left corner of VS Code, click "Select Target" and choose your active InDesign version.',
      verifyStep4: 'Press F5 to execute and debug your script step-by-step.'
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
            <Download size={24} />
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
            <Terminal size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{texts.step2Title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{texts.step2Desc}</p>
            <code style={{ background: '#050508', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', display: 'block', border: '1px solid var(--glass-border)', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
              {texts.step2Inst}
            </code>
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: '#eab308' }}>
            <Cpu size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{texts.step3Title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{texts.step3Desc}</p>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              {texts.step3Inst}
            </span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--accent-primary)' }}>
            <Download size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{texts.step4Title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{texts.step4Desc}</p>
            <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              {texts.step4Btn} <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Verification Section */}
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '1rem', border: '1px solid rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.02)' }}>
          <h3 style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }}>{texts.verificationTitle}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{texts.verificationDesc}</p>
          <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: 1.5 }}>
            <li>{texts.verifyStep1}</li>
            <li>{texts.verifyStep2}</li>
            <li>{texts.verifyStep3}</li>
            <li>{texts.verifyStep4}</li>
          </ol>
        </div>

      </div>

    </div>
  );
}

import { useLanguage } from '../context/LanguageContext';

export default function SiteFooter() {
  const { lang } = useLanguage();

  const t = {
    es: {
      tagline: 'Plataforma avanzada de simulacros para pruebas técnicas de ingeniería de software.',
      hours: 'Disponible 24/7',
      address: 'Santiago, Chile',
      contact: 'contacto@sambalab.pro',
      rights: 'Todos los derechos reservados.'
    },
    en: {
      tagline: 'Advanced mock interview platform for software engineering technical assessments.',
      hours: 'Available 24/7',
      address: 'Santiago, Chile',
      contact: 'hello@sambalab.pro',
      rights: 'All rights reserved.'
    }
  }[lang];

  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(5, 5, 8, 0.7)',
      backdropFilter: 'blur(12px)',
      padding: '4rem 0 2rem 0',
      marginTop: '6rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
      }}>
        
        {/* Top Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem' }}>
          
          <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="logo text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit' }}>
              Sambalab TechPrep
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {t.tagline}
            </p>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', opacity: 0.7 }}>
              {t.hours}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.24em', color: 'var(--text-secondary)' }}>Studio</p>
              <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.address}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.24em', color: 'var(--text-secondary)' }}>Contact</p>
              <a href={`mailto:${t.contact}`} style={{ marginTop: '0.25rem', display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                {t.contact}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits Section */}
        <div style={{
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)'
        }}>
          <span>
            © {new Date().getFullYear()} Sambalab TechPrep. {t.rights}
          </span>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
            
            {/* Sambalab */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Creative Direction by Sambalab</span>
              <div style={{ display: 'flex', gap: '0.5rem', opacity: 0.6 }}>
                <a href="https://sambalab.pro" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                  <svg style={{ height: '14px', width: '14px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </a>
                <a href="https://linkedin.com/company/sambalab" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                  <svg style={{ height: '14px', width: '14px' }} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            {/* DGRcodex */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Engineered by DGRcodex</span>
              <div style={{ display: 'flex', gap: '0.5rem', opacity: 0.6 }}>
                <a href="https://dgrcodex.me" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                  <svg style={{ height: '14px', width: '14px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <a href="https://github.com/DGRcodex" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                  <svg style={{ height: '14px', width: '14px' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a href="https://linkedin.com/in/dgrcodex" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                  <svg style={{ height: '14px', width: '14px' }} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}

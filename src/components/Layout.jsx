import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, Beaker, Terminal, Home, Book, Code, Globe, Hammer, LogOut, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { lang, toggleLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isExamContext = ['/study', '/glossary', '/practice', '/challenges', '/exam'].includes(location.pathname);

  return (
    <div className="app-container">
      {/* GLOBAL NAVBAR */}
      <header className="nav-header" style={{ flexWrap: 'wrap', gap: '1rem', borderBottom: isExamContext ? 'none' : '1px solid var(--glass-border)' }}>
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <Terminal className="text-accent-primary" size={24} />
          SambaForge
        </Link>
        
        <nav className="nav-links" style={{ flexWrap: 'wrap', flex: 1, justifyContent: 'center' }}>
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Home size={18} /> {lang === 'es' ? 'Dashboard' : 'Dashboard'}
          </NavLink>
          <NavLink to="/forge" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} style={{ color: 'var(--accent-secondary)' }}>
            <Hammer size={18} /> {lang === 'es' ? 'La Forja (IA)' : 'The Forge (AI)'}
          </NavLink>
          <NavLink to="/results" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Activity size={18} /> {lang === 'es' ? 'Resultados' : 'Results'}
          </NavLink>
          <NavLink to="/setup" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Globe size={18} /> {lang === 'es' ? 'Instalación' : 'Setup'}
          </NavLink>
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid var(--glass-border)', paddingRight: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{user.email || 'User'}</span>
              <button 
                onClick={signOut}
                className="btn btn-outline"
                style={{ padding: '0.5rem', borderColor: 'var(--glass-border)', color: 'var(--text-secondary)' }}
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

          <button 
            onClick={toggleLanguage} 
            className="btn btn-outline" 
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe size={16} /> {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </header>

      {/* CONTEXTUAL EXAM NAVBAR */}
      {isExamContext && (
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--glass-border)', padding: '0.5rem 2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <NavLink to="/study" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <BookOpen size={16} /> {lang === 'es' ? 'Temario' : 'Study Guide'}
          </NavLink>
          <NavLink to="/glossary" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Book size={16} /> {lang === 'es' ? 'Glosario' : 'Glossary'}
          </NavLink>
          <NavLink to="/practice" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Beaker size={16} /> {lang === 'es' ? 'Ensayo Libre' : 'Practice Lab'}
          </NavLink>
          <NavLink to="/challenges" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Code size={16} /> {lang === 'es' ? 'Ejercicios' : 'Challenges'}
          </NavLink>
          <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
          <NavLink to="/exam" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} style={{ color: 'var(--accent-error)' }}>
            <Terminal size={16} /> {lang === 'es' ? 'Iniciar Prueba' : 'Take Exam'}
          </NavLink>
        </div>
      )}
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <SiteFooter />
    </div>
  );
}

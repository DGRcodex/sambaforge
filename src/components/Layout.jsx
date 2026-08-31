import { NavLink, Link, Outlet } from 'react-router-dom';
import { BookOpen, Beaker, Terminal, Home, Book, Code, Globe, Hammer, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { lang, toggleLanguage } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <div className="app-container">
      <header className="nav-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <Terminal className="text-accent-primary" size={24} />
          La Forja
        </Link>
        <nav className="nav-links" style={{ flexWrap: 'wrap' }}>
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Home size={18} /> {lang === 'es' ? 'Inicio' : 'Home'}
          </NavLink>
          <NavLink to="/study" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <BookOpen size={18} /> {lang === 'es' ? 'Lectura' : 'Study'}
          </NavLink>
          <NavLink to="/glossary" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Book size={18} /> {lang === 'es' ? 'Glosario' : 'Glossary'}
          </NavLink>
          <NavLink to="/practice" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Beaker size={18} /> {lang === 'es' ? 'Ensayo' : 'Practice'}
          </NavLink>
          <NavLink to="/challenges" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Code size={18} /> {lang === 'es' ? 'Ejercicios' : 'Challenges'}
          </NavLink>
          <NavLink to="/setup" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Globe size={18} /> {lang === 'es' ? 'Instalación' : 'Setup'}
          </NavLink>
          <NavLink to="/exam" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Terminal size={18} /> {lang === 'es' ? 'Prueba' : 'Exam'}
          </NavLink>
          <NavLink to="/results" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <BookOpen size={18} /> {lang === 'es' ? 'Resultados' : 'Results'}
          </NavLink>
          <NavLink to="/forge" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} style={{ marginLeft: '1rem', color: 'var(--accent-secondary)' }}>
            <Hammer size={18} /> {lang === 'es' ? 'La Forja (IA)' : 'The Forge (AI)'}
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
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <SiteFooter />
    </div>
  );
}

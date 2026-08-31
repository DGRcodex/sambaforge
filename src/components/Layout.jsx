import { NavLink, Link, Outlet } from 'react-router-dom';
import { BookOpen, Beaker, Terminal, Home, Book, Code, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { lang, toggleLanguage } = useLanguage();

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
          <NavLink to="/masterclass" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <BookOpen size={18} /> {lang === 'es' ? 'Master Class' : 'Master Class'}
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
        </nav>
        
        <button 
          onClick={toggleLanguage} 
          className="btn btn-outline" 
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
          <Globe size={16} /> {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <SiteFooter />
    </div>
  );
}

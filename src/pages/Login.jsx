import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Lock, AlertCircle, Code, Briefcase } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { user, signInWithOAuth } = useAuth();
  const { lang } = useLanguage();
  const [error, setError] = useState(null);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (provider) => {
    try {
      setError(null);
      await signInWithOAuth(provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <div style={{ background: 'rgba(255, 106, 61, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Lock size={32} color="var(--accent-primary)" />
        </div>
        
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>SambaForge</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          {lang === 'es' ? 'Inicia sesión para acceder a las forjas de entrenamiento.' : 'Log in to access the training forges.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => handleLogin('github')}
            style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', padding: '0.85rem' }}
          >
            <Code size={20} /> {lang === 'es' ? 'Continuar con GitHub' : 'Continue with GitHub'}
          </button>
          
          <button 
            className="btn btn-outline" 
            onClick={() => handleLogin('google')}
            style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', padding: '0.85rem' }}
          >
            <Mail size={20} /> {lang === 'es' ? 'Continuar con Google' : 'Continue with Google'}
          </button>

          <button 
            className="btn btn-outline" 
            onClick={() => handleLogin('linkedin_oidc')}
            style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', padding: '0.85rem' }}
          >
            <Briefcase size={20} /> {lang === 'es' ? 'Continuar con LinkedIn' : 'Continue with LinkedIn'}
          </button>
        </div>

        {error && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--accent-error)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-error)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', textAlign: 'left' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {lang === 'es' ? 'Nota: Requiere configuración de Providers en Supabase.' : 'Note: Requires Providers configuration in Supabase.'}
        </div>
      </div>
    </div>
  );
}

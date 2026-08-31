import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Lock, AlertCircle, CheckCircle2, Loader2, Code, Briefcase, Zap } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { user, signInWithOtp, signInWithOAuth, signInAsGuest } = useAuth();
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleOAuth = async (provider) => {
    try {
      setError(null);
      await signInWithOAuth(provider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      setError(null);
      setLoading(true);
      await signInWithOtp(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          {lang === 'es' ? 'Ingresa tu correo para recibir un enlace de acceso mágico.' : 'Enter your email to receive a magic login link.'}
        </p>

        {success ? (
          <div style={{ padding: '1.5rem', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid var(--accent-success)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-success)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <CheckCircle2 size={32} />
            <p style={{ fontWeight: 500 }}>
              {lang === 'es' ? '¡Enlace enviado! Revisa tu bandeja de entrada.' : 'Link sent! Check your inbox.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }}>
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                style={{ 
                  width: '100%', padding: '0.85rem 1rem 0.85rem 3rem', 
                  background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', 
                  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem'
                }}
              />
            </div>
            
            <button 
              type="submit"
              className="btn btn-primary" 
              disabled={loading || !email}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '0.85rem' }}
            >
              {loading ? <Loader2 size={20} className="spin" /> : null}
              {lang === 'es' ? 'Enviar Enlace Mágico' : 'Send Magic Link'}
            </button>
          </form>
        )}

        <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>O usa tus redes</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => handleOAuth('github')} style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <Code size={20} /> GitHub
          </button>
          
          <button className="btn btn-outline" onClick={() => handleOAuth('google')} style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <Mail size={20} /> Google
          </button>

          <button className="btn btn-outline" onClick={() => handleOAuth('linkedin_oidc')} style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <Briefcase size={20} /> LinkedIn
          </button>
        </div>

        <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>Acceso Rápido</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
        </div>

        <button 
          onClick={signInAsGuest} 
          style={{ 
            width: '100%', padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', 
            border: '1px dashed #eab308', borderRadius: 'var(--radius-sm)', 
            color: '#eab308', display: 'flex', justifyContent: 'center', 
            alignItems: 'center', gap: '0.75rem', fontWeight: 'bold',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(234, 179, 8, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(234, 179, 8, 0.1)'}
        >
          <Zap size={20} /> Entrar como Invitado (Sin Login)
        </button>

        {error && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--accent-error)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-error)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', textAlign: 'left' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} /> 
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {lang === 'es' ? 'Recibirás un correo sin necesidad de contraseñas.' : 'You will receive an email. No passwords required.'}
        </div>
      </div>
    </div>
  );
}

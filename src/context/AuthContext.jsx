import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    
    getSession();

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithOAuth = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  const signInWithOtp = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (user && user.id === 'guest_user') {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  const signInAsGuest = () => {
    setUser({
      id: 'guest_user',
      email: 'invitado@sambaforge.com',
      user_metadata: { name: 'Invitado' }
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithOAuth, signInWithOtp, signOut, signInAsGuest }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

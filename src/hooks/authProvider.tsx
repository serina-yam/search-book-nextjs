// AuthContext.tsx
import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState, startTransition, ReactNode } from 'react';
import supabase from '@/lib/supabase';

type AuthContextType = {
  session: Session | null;
  error: string;
  profileFromGithub: {
    id: number;
    fullName: string;
    userName: string;
    avatarUrl: string;
  };
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = () => {
      const { data: authData } = supabase.auth.onAuthStateChange((_event, session) => {
        startTransition(() => {
          setSession(session);
        });
      });
  
      return () => authData.subscription.unsubscribe();
    };
  
    fetchData();
  }, []);  

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      console.error('GitHubとの連携に失敗しました。', error);
    }
  };

  const profileFromGithub = session
    ? {
        id: session?.user?.user_metadata.provider_id || 0,
        fullName: session?.user?.user_metadata.full_name || '',
        userName: session?.user?.user_metadata.user_name || '',
        avatarUrl: session?.user?.user_metadata.avatar_url || '',
      }
    : {
        id: 0,
        fullName: '',
        userName: '',
        avatarUrl: '',
      };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const contextValue: AuthContextType = {
    session,
    error,
    profileFromGithub,
    signInWithGithub,
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
import { useState, useEffect } from 'react';
import { authClient } from '../lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const checkSession = async () => {
    try {
      const sessionData = await authClient.getSession();
      console.log('Session data:', sessionData); // Debug log
      
      // Better Auth client returns session data directly, not wrapped in .data
      if (sessionData?.user) {
        setSession(sessionData);
        setUser(sessionData.user);
      } else {
        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();

    // Remove the auth state change listener for now since it's causing issues
    // We'll rely on manual session checking after auth actions
  }, []);

  const signOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return { 
    user, 
    loading, 
    signOut,
    session,
    refreshSession: checkSession
  };
};
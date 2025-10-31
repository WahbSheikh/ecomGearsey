import { useEffect, useState } from "react";
import { authClient } from "../lib/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    console.log(" useAuth - Fetching session...");

    // Get current session
    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        console.log("Session data:", session);

        if (session?.data?.user) {
          console.log(" useAuth - User found:", session.data.user);
          setUser(session.data.user);
        } else {
          console.log(" useAuth - No user in session");
          setUser(null);
        }
      } catch (error) {
        console.error(" useAuth - Error fetching session:", error);
        setUser(null);
      } finally {
        console.log(" Setting isPending to false");
        setIsPending(false);
      }
    };

    getSession();

    // DON'T subscribe to auth state changes since it's causing errors
    // The session will be re-fetched on component mount anyway
  }, []); // Empty dependency array - only run once on mount

  const refreshSession = async () => {
    console.log(" Refreshing session...");
    setIsPending(true);
    try {
      const session = await authClient.getSession();
      console.log("Refreshed session:", session);

      if (session?.data?.user) {
        console.log(" Session refreshed with user:", session.data.user);
        setUser(session.data.user);
      } else {
        console.log(" No user after refresh");
        setUser(null);
      }
      return session;
    } catch (error) {
      console.error(". Error refreshing session:", error);
      setUser(null);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const signOut = async () => {
    console.log(" Signing out...");
    try {
      await authClient.signOut();
      setUser(null);
      console.log("✅ Signed out successfully");
    } catch (error) {
      console.error(". Error signing out:", error);
      throw error;
    }
  };

  console.log(" useAuth returning:", {
    user: user ? { email: user.email, role: user.role } : null,
    isPending,
    loading: isPending,
  });

  return {
    user,
    isPending,
    loading: isPending,
    refreshSession,
    signOut,
  };
}

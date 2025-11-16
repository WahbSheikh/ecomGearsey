import { useEffect, useState } from "react";
import { authClient } from "../lib/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    console.log("🔄 useAuth - Fetching session...");

    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        console.log("📦 Session data:", session);

        if (session?.data?.user) {
          console.log("✅ useAuth - User found:", session.data.user);
          console.log("👤 User role:", session.data.user.role);
          console.log("👤 User ID:", session.data.user.id);
          setUser(session.data.user);
        } else {
          console.log("❌ useAuth - No user in session");
          setUser(null);
        }
      } catch (error) {
        console.error("❌ useAuth - Error fetching session:", error);
        setUser(null);
      } finally {
        console.log("✅ Setting isPending to false");
        setIsPending(false);
      }
    };

    getSession();
  }, []);

  const refreshSession = async () => {
    console.log("🔄 Refreshing session...");
    setIsPending(true);
    try {
      const session = await authClient.getSession();
      console.log("📦 Refreshed session:", session);

      if (session?.data?.user) {
        console.log("✅ Session refreshed with user:", session.data.user);
        console.log("👤 User role:", session.data.user.role);
        console.log("👤 User ID:", session.data.user.id);
        setUser(session.data.user);
      } else {
        console.log("❌ No user after refresh");
        setUser(null);
      }
      return session;
    } catch (error) {
      console.error("❌ Error refreshing session:", error);
      setUser(null);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const signOut = async () => {
    console.log("👋 Signing out...");
    setIsPending(true);
    try {
      await authClient.signOut();
      setUser(null);
      console.log("✅ Signed out successfully");
    } catch (error) {
      console.error("❌ Error signing out:", error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  // ✅ NEW: Helper to check if current user is admin
  const isAdmin = user?.role === "admin";
  const isSeller = user?.role === "seller";
  const isCustomer = user?.role === "customer";

  console.log("📊 useAuth returning:", {
    user: user
      ? {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        }
      : null,
    isPending,
    loading: isPending,
    isAdmin,
    isSeller,
    isCustomer,
  });

  return {
    user,
    isPending,
    loading: isPending,
    refreshSession,
    signOut,
    isAdmin,
    isSeller,
    isCustomer,
  };
}

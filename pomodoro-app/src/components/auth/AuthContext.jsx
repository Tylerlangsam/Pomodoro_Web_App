import React, { useEffect, useState, useContext } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create a context for authentication
const AuthContext = React.createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage authentication state
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error", error);
    }
  };

  // Value to be provided by the context
  const value = {
    authUser,
    userSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
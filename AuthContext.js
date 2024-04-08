// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (userID) => {
    // Simuler une authentification et stocker l'ID de l'utilisateur
    setUser({ id: userID });
  };

  const signOut = () => {
    // Gérer la déconnexion
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

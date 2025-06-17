import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'regional-admin' | 'municipality-admin' | 'school-admin' | 'orgadmin' | 'devadmin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, userData: Omit<User, 'role'>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole, userData: Omit<User, 'role'>) => {
    if (role) {
      setUser({
        ...userData,
        role,
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

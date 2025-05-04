import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  accountType: string;
}

interface ValidationErrors {
  [key: string]: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  validationErrors: ValidationErrors;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, accountType: string) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const clearErrors = () => {
    setError(null);
    setValidationErrors({});
  };

  const login = async (email: string, password: string) => {
    try {
      clearErrors();
      // Mock login
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: email,
        accountType: 'client',
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error: any) {
      setError('Login failed. Please try again.');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, accountType: string) => {
    try {
      clearErrors();
      // Mock registration
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        accountType: accountType,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error: any) {
      setError('Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    clearErrors();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        validationErrors,
        isAuthenticated: !!user,
        login, 
        register, 
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 
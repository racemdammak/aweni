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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    checkAuth();
  }, []);

  const clearErrors = () => {
    setError(null);
    setValidationErrors({});
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      clearErrors();
      const { token, user } = await authAPI.login({ email, password });
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      const response = error.response?.data;
      if (response?.errors) {
        setValidationErrors(response.errors);
      }
      setError(response?.message || 'Login failed. Please try again.');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, accountType: string) => {
    try {
      clearErrors();
      const { token, user } = await authAPI.register({ name, email, password, accountType });
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      const response = error.response?.data;
      if (response?.errors) {
        setValidationErrors(response.errors);
      }
      setError(response?.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
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
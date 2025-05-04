import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  accountType: string;
  photo?: string;
  favorites?: number[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  navigateToDashboard: () => void;
  logout: () => void;
  toggleFavorite: (professionalId: number) => void;
  isFavorite: (professionalId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const navigateToDashboard = () => {
    const newUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      accountType: 'client',
      favorites: [],
    };
    setUser(newUser);
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (professionalId: number) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return null;
      
      const favorites = prev.favorites || [];
      const newFavorites = favorites.includes(professionalId)
        ? favorites.filter(id => id !== professionalId)
        : [...favorites, professionalId];
      
      const updatedUser = {
        ...prev,
        favorites: newFavorites
      };
      
      return updatedUser;
    });
  };

  const isFavorite = (professionalId: number) => {
    return user?.favorites?.includes(professionalId) || false;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        navigateToDashboard,
        logout,
        toggleFavorite,
        isFavorite
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
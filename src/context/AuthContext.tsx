'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '@/request/apiRequest';
import useLocalStorage from '@/hooks/useLocalStorage';
import { AuthContextType, UserType } from '@/types/context/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const { storedValue: token, setValue: setToken } = useLocalStorage<string>('token', '');
  const navigate = useRouter();

  const login = async (token: string) => {
    setToken(token);
    try {
      const userData = await apiRequest<UserType>({
        method: 'GET',
        url: '/users/me',
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userData);
    } catch {
      logout();
    }
  };

  const logout = () => {
    setToken('');
    setUser(undefined);
    navigate.push('/');
  };

  useEffect(() => {
    if (token) {
      login(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

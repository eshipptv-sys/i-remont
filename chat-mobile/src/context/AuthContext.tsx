import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';
import { getToken, saveToken, clearToken } from '../utils/token';

type User = {
  id: string;
  phone: string;
  name: string;
  status?: string;
  avatarUrl?: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (phone: string) => Promise<void>;
  confirm: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const stored = await getToken();
      if (stored) {
        setToken(stored);
        api.setToken(stored);
        try {
          const me = await api.getMe();
          setUser(me);
        } catch (e) {
          clearToken();
        }
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (phone: string) => {
    await api.requestCode(phone);
  };

  const confirm = async (phone: string, code: string) => {
    const { token: newToken, user: newUser } = await api.confirmCode(phone, code);
    setToken(newToken);
    setUser(newUser);
    await saveToken(newToken);
    api.setToken(newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearToken();
  };

  const refreshProfile = async () => {
    if (!token) return;
    const me = await api.getMe();
    setUser(me);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, confirm, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { apiRequest } from '../services/api';
import { appEnv } from '../config/env';

interface AdminUser {
  id: string;
  email: string;
}

interface LoginResponse {
  token: string;
  admin: AdminUser;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TOKEN: 'admin_token',
  USER: 'admin_user',
  LEGACY_AUTH: 'admin_auth'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        try {
          setAdmin(JSON.parse(storedUser) as AdminUser);
        } catch {
          localStorage.removeItem(STORAGE_KEYS.USER);
        }
      }
    } else {
      localStorage.removeItem(STORAGE_KEYS.LEGACY_AUTH);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!appEnv.useApi) {
      return false;
    }

    const payload = await apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    localStorage.setItem(STORAGE_KEYS.TOKEN, payload.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(payload.admin));
    localStorage.removeItem(STORAGE_KEYS.LEGACY_AUTH);

    setAdmin(payload.admin);
    setIsAuthenticated(true);

    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_AUTH);
  };

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, admin, login, logout }),
    [admin, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

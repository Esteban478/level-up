import { createContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URI}/auth/verify-token`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

const login = async (usernameOrEmail: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URI}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usernameOrEmail, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login failed');
  }

  const data = await response.json();
  setUser(data.user);
  localStorage.setItem('token', data.token);
};

  const signup = async (username: string, email: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URI}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


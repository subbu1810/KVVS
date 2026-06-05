import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync session on component mounting
  useEffect(() => {
    const syncSession = async () => {
      const token = localStorage.getItem('quantum_token');
      if (token) {
        try {
          const response = await authAPI.getMe();
          setUser(response.data.user);
        } catch (error) {
          console.error('Session sync failed:', error);
          localStorage.removeItem('quantum_token');
          localStorage.removeItem('quantum_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    syncSession();
  }, []);

  // Standard user signup
  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await authAPI.signup(userData);
      const { token, user: newUser } = response.data;
      localStorage.setItem('quantum_token', token);
      localStorage.setItem('quantum_user', JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    } catch (error) {
      console.error('Signup Context Error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed.'
      };
    } finally {
      setLoading(false);
    }
  };

  // Standard user or Admin login
  const login = async (email, password, isAdmin = false) => {
    setLoading(true);
    try {
      let response;
      if (isAdmin) {
        response = await authAPI.adminLogin({ email, password });
      } else {
        response = await authAPI.login({ email, password });
      }

      const { token, user: loggedUser } = response.data;
      localStorage.setItem('quantum_token', token);
      localStorage.setItem('quantum_user', JSON.stringify(loggedUser));
      setUser(loggedUser);
      return { success: true };
    } catch (error) {
      console.error('Login Context Error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Authentication failed.'
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout clean routine
  const logout = () => {
    localStorage.removeItem('quantum_token');
    localStorage.removeItem('quantum_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be invoked within an AuthProvider scope.');
  }
  return context;
};

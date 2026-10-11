import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../api/client';
import { authReducer, initialAuthState } from '../reducers/authReducer';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    async function restore() {
      try {
        const [token, rawUser] = await Promise.all([
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('user'),
        ]);
        dispatch({
          type: 'RESTORE',
          token,
          user: rawUser ? JSON.parse(rawUser) : null,
        });
      } catch {
        dispatch({ type: 'RESTORE', token: null, user: null });
      }
    }
    restore();
  }, []);

  async function persist(token, user) {
    await AsyncStorage.multiSet([
      ['token', token],
      ['user', JSON.stringify(user)],
    ]);
    dispatch({ type: 'LOGIN', token, user });
  }

  async function login(email, password) {
    const data = await authApi.login(email, password);
    await persist(data.token, data.user);
    return data.user;
  }

  async function register(payload) {
    const data = await authApi.register(payload);
    await persist(data.token, data.user);
    return data.user;
  }

  async function logout() {
    await AsyncStorage.multiRemove(['token', 'user']);
    dispatch({ type: 'LOGOUT' });
  }

  const value = useMemo(
    () => ({
      ...state,
      login,
      register,
      logout,
      isManager: state.user?.role === 'manager',
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

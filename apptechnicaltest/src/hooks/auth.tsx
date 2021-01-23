import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  login: string;
  senha: string;
  nomeApp: string;
  versaoApp: string;
  versaoSO: string;
  idDispositivo: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@EEM:token',
        '@EEM:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }

    loadStorageData();
  });

  const signIn = useCallback(
    async ({ login, senha, nomeApp, versaoApp, versaoSO, idDispositivo }) => {
      const res = await api.post('', {
        login,
        senha,
        nomeApp,
        versaoApp,
        versaoSO,
        idDispositivo,
      });
      console.log(res.data);
      const { token, user } = res.data;

      await AsyncStorage.setItem('@EEM:token', token);
      await AsyncStorage.setItem('@EEM:user', JSON.stringify(user));

      await AsyncStorage.multiSet([
        ['@EEM:token', token],
        ['@EEM:user', JSON.stringify(user)],
      ]);

      setData({ token, user });
    },
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@EEM:user', '@EEM:token']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

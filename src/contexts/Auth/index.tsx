import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext
} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type User = FirebaseAuthTypes.User | null;

interface AuthParams {
  user: User;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

const initialValue: AuthParams = {
  user: null,
  isAuthenticated: false,
  isInitializing: true
};

export const AuthContext = createContext<AuthParams>(initialValue);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isInitializing, setIsInitializing] = useState(
    initialValue.isInitializing
  );
  const [user, setUser] = useState<User>(initialValue.user);
  const isAuthenticated = useMemo(() => !!user, [user]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  function onAuthStateChanged(user: User) {
    setUser(user);
    if (isInitializing) {
      setIsInitializing(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
}

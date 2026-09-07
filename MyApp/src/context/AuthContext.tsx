import { onIdTokenChanged, type User } from "@react-native-firebase/auth";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { authentication } from "../config/firebase";
import { refreshCurrentUser } from "../services/authService";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setRefreshCount] = useState(0);

  useEffect(() => {
    return onIdTokenChanged(authentication, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
  }, []);

  const refreshUser = useCallback(async () => {
    const refreshedUser = await refreshCurrentUser();
    setUser(refreshedUser);
    setRefreshCount((currentCount) => currentCount + 1);
    return refreshedUser;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }

  return context;
}

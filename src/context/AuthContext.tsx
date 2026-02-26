import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextData, AuthUserDynamo } from "../types/auth";
import { getUser } from "../api/loadUser";
import { AuthUser } from "aws-amplify/auth";

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({
  children,
  userCognito,
}: {
  children: ReactNode;
  userCognito?: AuthUser;
}) {
  const [user, setUser] = useState<AuthUserDynamo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mpConnected, setMpConnected] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (!userCognito?.userId) return; // ← evita chamada com userId vazio

      try {
        setIsLoading(true);
        const response = await getUser(userCognito.userId);
        console.log("Usuário carregado:", response);
        setUser(response);
        setMpConnected(response.mp.isConnected);
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [userCognito?.userId]);

  async function updateUser(data: Partial<AuthUserDynamo>) {
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, mpConnected }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}

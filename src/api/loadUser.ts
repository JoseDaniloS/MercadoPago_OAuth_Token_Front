import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";
import { toast } from "sonner";

export async function getUser(userId: string) {
  const idToken = await getCognitoIdToken();
  try {
    if (!userId) throw new Error("User id não informado");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("Erro ao carregar usuário:", error);
    toast.error(error.message)
    throw error;
  }
}

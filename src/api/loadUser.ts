import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";

export async function getUser(userId: string) {
  const idToken = await getCognitoIdToken();
  try {
    if (!userId) throw new Error("User id não informado");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log("Erro ao carregar usuário:", error);
    throw error;
  }
}

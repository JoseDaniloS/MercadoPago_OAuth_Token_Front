import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";

export async function fetchOAuthMercadoPago(code: string, user_id: string) {
  if (!code) throw new Error("Code não informado");
  if (!user_id) throw new Error("User id não informado");

  const idToken = await getCognitoIdToken();

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/oauth?code=${code}`,
    {
      user_id,
    },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );

  return response.data;
}

import axios from "axios";

const API_URL = "https://clunroropj.execute-api.us-east-1.amazonaws.com/";

export async function fetchOAuthMercadoPago(token: string, user_id: string) {
  if (!token) {
    throw new Error("Token não encontrado");
  }
  if (!user_id) {
    throw new Error("User id não informado");
  }
  try {
    const response = await axios.post(`${API_URL}oauth?code=${token}`, {
      user_id: user_id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

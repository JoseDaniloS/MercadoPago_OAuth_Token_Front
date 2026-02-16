import axios from "axios";

const API_URL = "https://clunroropj.execute-api.us-east-1.amazonaws.com/";

export async function fetchOAuthMercadoPago(token: string) {
  if (!token) {
    throw new Error("Token não encontrado");
  }
  try {
    const response = await axios.post(`${API_URL}oauth?code=${token}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

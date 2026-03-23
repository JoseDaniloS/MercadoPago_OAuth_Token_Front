import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";
import { toast } from "sonner";

type LastEvaluatedKey = Record<string, unknown>;

export async function fetchTransactionsWithPagination(
  userId?: string,
  pageSize?: number,
  lastEvaluatedKey?: LastEvaluatedKey,
  filters?: object,
) {
  try {
    const params = new URLSearchParams({
      pageSize: String(pageSize),
      ...(lastEvaluatedKey && {
        lastEvaluatedKey: JSON.stringify(lastEvaluatedKey),
      }),
      ...filters,
    });

    const idToken = await getCognitoIdToken();

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    toast.success("Transações obtidas com sucesso!!");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    toast.error("Erro ao buscar transações");
    throw error;
  }
}

export async function fetchPlans() {
  try {
    const idToken = await getCognitoIdToken();
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/subscribe`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    toast.success("Planos obtidos com sucesso!!");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar planos:", error);
    toast.error("Erro ao buscar Planos");
    throw error;
  }
}

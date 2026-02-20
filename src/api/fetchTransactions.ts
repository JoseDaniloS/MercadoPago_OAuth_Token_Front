import axios from "axios";

const API_URL = "https://clunroropj.execute-api.us-east-1.amazonaws.com/";

export async function fetchTransactionsWithPagination(
  userId?: string,
  pageSize?: string | number,
  lastEvaluatedKey?: object | undefined,
) {
  if (!userId) {
    throw new Error("User id não informado");
  }
  try {
    const params = new URLSearchParams({
      userId,
      pageSize: String(1),
      lastEvaluatedKey: lastEvaluatedKey ? JSON.stringify(lastEvaluatedKey) : ""
    });
    const response = await axios.get(
      `${API_URL}payments?${params}
      `,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

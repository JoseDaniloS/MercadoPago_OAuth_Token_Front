import { fetchAuthSession } from "aws-amplify/auth";

export async function getCognitoIdToken(): Promise<string> {
  const session = await fetchAuthSession();

  const accessToken = session.tokens?.idToken?.toString();

  if (!accessToken) {
    throw new Error("Access token não encontrado");
  }
  return accessToken;
}

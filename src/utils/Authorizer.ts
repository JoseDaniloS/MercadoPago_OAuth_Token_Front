import { fetchAuthSession } from "aws-amplify/auth";

export async function getCognitoIdToken(): Promise<string> {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken?.toString();

  if (!idToken) throw new Error("ID Token não encontrado");

  return idToken;
}

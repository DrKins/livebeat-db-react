import { ID } from "appwrite";
import { account } from "./appwrite";

export async function logIn(email: string) {
  const data = await account.createMagicURLToken(
    ID.unique(),
    email,
    `${window.location.origin}/session`
  );
  return data;
}

export interface VerifySessionOptions {
  userId: string;
  secret: string;
}

export async function verifySession({ userId, secret }: VerifySessionOptions) {
  const data = await account.updateMagicURLSession(userId, secret);
  return data;
}

export async function getCurrentSession() {
  const session = await account.getSession("current");
  return {
    session,
  };
}

export async function deleteCurrentSession() {
  const data = await account.deleteSession("current");
  return data;
}

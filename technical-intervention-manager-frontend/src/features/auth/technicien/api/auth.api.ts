import api from "@/lib/api";
import { SignInFormData, SignUpFormData } from "../types/auth.types";

export async function signIn(data: SignInFormData) {
  const res = await api.post("/auth/sign-in", data);
  return res.data;
}

export async function signUp(data: SignUpFormData) {
  const res = await api.post("/auth/sign-up", data);
  return res.data;
}

import { axios } from "@/lib/axios";

import { AuthResponse } from "../types";

export type LoginCredentials = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (
  data: LoginCredentials
): Promise<AuthResponse> => {
  return axios.post("/api/login/", data);
};

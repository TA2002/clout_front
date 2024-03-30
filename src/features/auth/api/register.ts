import { axios } from "@/lib/axios";

import { AuthResponse } from "../types";

export type RegisterCredentials = {
  user_type: string;
  cloutname: string;
  full_name: string;
  email: string;
  password: string;
};

export const registerCreator = (
  data: RegisterCredentials
): Promise<AuthResponse> => {
  return axios.post("/api/register/", data);
};

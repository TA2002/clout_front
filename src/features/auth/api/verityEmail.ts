import { axios } from "@/lib/axios";

// import { AuthResponse } from "../types";

export type OTPCredentials = {
  email: string;
  otp: string;
};

export const verifyEmail = (data: OTPCredentials): Promise<any> => {
  return axios.post("/api/user/email/verify/", data);
};

export const resendOTP = (email: string): Promise<any> => {
  return axios.post("/api/user/email/otp/create/", { email });
};

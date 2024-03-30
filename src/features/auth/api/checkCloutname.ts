import { axios } from "@/lib/axios";
import { Availability } from "../types";

export type CloutnameCredentials = {
  cloutname: string;
};

export const checkCloutname = (cloutname: string): Promise<Availability> => {
  return axios.get(`/mediakits/${cloutname}/check`);
};

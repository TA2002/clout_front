import { axios } from "@/lib/axios";

export const deleteAccount = (
  cloutname: string,
  platformName: string,
  platformId: string
): Promise<any> => {
  return axios.post(
    `mediakits/${cloutname.toLowerCase()}/${platformName.toLowerCase()}/${platformId}/delete/`
  );
};

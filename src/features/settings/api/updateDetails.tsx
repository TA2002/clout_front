import { axios } from "@/lib/axios";

export type ProfileDetails = {
  cloutname: string;
  display_name: string;
  about: string | undefined;
  tags: string | undefined;
};

export const updateProfileDetails = (
  data: ProfileDetails,
  id: string
): Promise<any> => {
  return axios.put(`/mediakits/update/${id}/`, data);
};

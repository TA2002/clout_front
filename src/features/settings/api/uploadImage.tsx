import { axios } from "@/lib/axios";

export const uploadImages = (formData: FormData, id: string): Promise<any> => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Set the Content-Type header
    },
  };
  return axios.put(`mediakits/update/${id}/`, formData, config);
};

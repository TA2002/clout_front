import { axios } from "@/lib/axios";

export const tiktokOauth = (): Promise<any> => {
  return axios.get(`tiktok/business/oauth/`);
};

export const youtubeOauth = (): Promise<any> => {
  return axios.get(`youtube/oauth/`);
};

export const instagramOauth = (): Promise<any> => {
  return axios.get(`instagram/user/oauth/`);
};

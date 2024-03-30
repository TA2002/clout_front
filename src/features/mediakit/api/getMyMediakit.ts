// import { useQuery } from "react-query";
// import { useQuery } from "react-query";
// import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { axios } from "@/lib/axios";
// import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Mediakit } from "@/features/main/types";

export const getMyMediakit = (): Promise<Mediakit> => {
  return axios.get(`/mediakits/`);
};

// type QueryFnType = typeof getMyMediakit;

// type UseMyMediakitOptions = {
//   config?: QueryConfig<QueryFnType>;
// };

// export const useMyMediakit = ({ config }: UseMyMediakitOptions) => {
//   return useQuery<ExtractFnReturnType<QueryFnType>>({
//     ...config,
//     queryKey: ["myMediakit"],
//     queryFn: () => getMyMediakit(),
//   });
// };

// type QueryFnType = typeof getMyMediakit;

// type UseMyMediakitOptions = {
//   cloutname: string;
//   config?: QueryConfig<QueryFnType>;
// };

// export const useMediakit = ({ cloutname, config }: UseMyMediakitOptions) => {
//   return useQuery<ExtractFnReturnType<QueryFnType>>({
//     ...config,
//     queryKey: ["mediakit", cloutname],
//     queryFn: () => getMediakit({ cloutname }),
//   });
// };

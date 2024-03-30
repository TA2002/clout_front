import { useQuery } from "react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { InstagramData } from "../types";

export const getInstagramData = ({
  cloutname,
}: {
  cloutname: string;
}): Promise<InstagramData[]> => {
  return axios.get(`/instagram/api/user/data/?cloutname=${cloutname}`);
};

type QueryFnType = typeof getInstagramData;

type UseInstagramDataOptions = {
  cloutname: string;
  config?: QueryConfig<QueryFnType>;
};

export const useInstagramData = ({
  cloutname,
  config,
}: UseInstagramDataOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["instagram_data", cloutname],
    queryFn: () => getInstagramData({ cloutname }),
  });
};

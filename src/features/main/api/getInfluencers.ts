import { useQuery } from "react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Influencer } from "../types";

export const getInfluencers = (): Promise<Influencer[]> => {
  return axios.get("/mediakits/api/list");
};

type QueryFnType = typeof getInfluencers;

type UseInfluencersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useInfluencers = ({ config }: UseInfluencersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getInfluencers(),
  });
};

import { useQuery } from "react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { TiktokData } from "../types";

export const getTiktokData = ({
  cloutname,
}: {
  cloutname: string;
}): Promise<TiktokData[]> => {
  return axios.get(`/tiktok/api/business/user/data/?cloutname=${cloutname}`);
};

type QueryFnType = typeof getTiktokData;

type UseTiktokDataOptions = {
  cloutname: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTiktokData = ({ cloutname, config }: UseTiktokDataOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["tiktok_data", cloutname],
    queryFn: () => getTiktokData({ cloutname }),
  });
};

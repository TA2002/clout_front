import { useQuery } from "react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Account } from "../types";

export const getPlatforms = ({
  cloutname,
}: {
  cloutname: string;
}): Promise<Account[]> => {
  return axios.get(`/mediakits/api/platforms/?cloutname=${cloutname}`);
};

type QueryFnType = typeof getPlatforms;

type UsePlatformsOptions = {
  cloutname: string;
  config?: QueryConfig<QueryFnType>;
};

export const usePlatforms = ({ cloutname, config }: UsePlatformsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["platforms", cloutname],
    queryFn: () => getPlatforms({ cloutname }),
  });
};

import { useQuery } from "react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Mediakit } from "@/features/main/types";

export const getMediakit = ({
  cloutname,
}: {
  cloutname: string;
}): Promise<Mediakit> => {
  return axios.get(`/mediakits/${cloutname}`);
};

type QueryFnType = typeof getMediakit;

type UseMediakitOptions = {
  cloutname: string;
  config?: QueryConfig<QueryFnType>;
};

export const useMediakit = ({ cloutname, config }: UseMediakitOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["mediakit", cloutname],
    queryFn: () => getMediakit({ cloutname }),
    cacheTime: 0,
  });
};

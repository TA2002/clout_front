import { useQuery } from "react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { YoutubeData } from "../types";

export const getYoutubeData = ({
  cloutname,
}: {
  cloutname: string;
}): Promise<YoutubeData[]> => {
  return axios.get(`/youtube/api/user/data/?cloutname=${cloutname}`);
};

type QueryFnType = typeof getYoutubeData;

type UseYoutubeDataOptions = {
  cloutname: string;
  config?: QueryConfig<QueryFnType>;
};

export const useYoutubeData = ({
  cloutname,
  config,
}: UseYoutubeDataOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["youtube_data", cloutname],
    queryFn: () => getYoutubeData({ cloutname }),
  });
};

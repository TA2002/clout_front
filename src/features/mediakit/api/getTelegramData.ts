import { useQuery } from "react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { TelegramData } from "../types";

export const getTelegramData = ({
  cloutname,
}: {
  cloutname: string;
}): Promise<TelegramData[]> => {
  return axios.get(`/telegram/api/user/data/?cloutname=${cloutname}`);
};

type QueryFnType = typeof getTelegramData;

type UseTelegramDataOptions = {
  cloutname: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTelegramData = ({
  cloutname,
  config,
}: UseTelegramDataOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["telegram_data", cloutname],
    queryFn: () => getTelegramData({ cloutname }),
  });
};

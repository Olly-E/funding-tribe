import { useQuery } from "@tanstack/react-query";

import { adminNewsKey } from "@/app/utils/query-key-factory";
import { fetchData } from "@/app/utils/fetchData";
import { INewsData } from "../../news/types";

interface INewsDetailsResponse {
  data: INewsData;
}
export const useNewsDetails = (slug: string) => {
  return useQuery<INewsDetailsResponse>({
    queryKey: adminNewsKey.list(slug),
    queryFn: async () => fetchData(`/api/news/${slug}`),
    enabled: !!slug,
  });
};

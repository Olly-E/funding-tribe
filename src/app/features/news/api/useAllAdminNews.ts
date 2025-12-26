import { adminNewsKey } from "@/app/utils/query-key-factory";
import { fetchData } from "@/app/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { INewsData } from "../../news/types";

interface INewsDataResponse {
  message: string;
  data: INewsData[];
}
export const useAllAdminNews = () => {
  return useQuery<INewsDataResponse>({
    queryKey: adminNewsKey.lists(),
    queryFn: async () => fetchData(`/api/news`),
  });
};

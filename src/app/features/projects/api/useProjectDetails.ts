import { useQuery } from "@tanstack/react-query";

import { adminProjectKey } from "@/app/utils/query-key-factory";
import { fetchData } from "@/app/utils/fetchData";
import { IProjectData } from "../types";

interface IProjectDetailsResponse {
  data: IProjectData;
}
export const useProjectDetails = (slug: string) => {
  return useQuery<IProjectDetailsResponse>({
    queryKey: adminProjectKey.list(slug),
    queryFn: async () => fetchData(`/api/projects/${slug}`),
    enabled: !!slug,
  });
};

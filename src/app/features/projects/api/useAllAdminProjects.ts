import { adminProjectKey } from "@/app/utils/query-key-factory";
import { fetchData } from "@/app/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { IProjectData } from "../types";

interface IAdminProjectResponse {
  message: string;
  data: IProjectData[];
}
export const useAllAdminProjects = () => {
  return useQuery<IAdminProjectResponse>({
    queryKey: adminProjectKey.lists(),
    queryFn: async () => fetchData(`/api/projects`),
  });
};

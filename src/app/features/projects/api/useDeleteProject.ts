import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminProjectKey } from "@/app/utils/query-key-factory";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useDeleteProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Response, AxiosErrorResponse>({
    mutationFn: () => fetchData(`/api/projects/${projectId}/`, "DELETE"),
    onSuccess: () => {
      toast.success("Project deleted.");
      queryClient.invalidateQueries({
        queryKey: adminProjectKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};

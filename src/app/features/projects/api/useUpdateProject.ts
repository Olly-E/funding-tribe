import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminProjectKey } from "@/app/utils/query-key-factory";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";
import { AddProjectForm } from "../types";

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Response, AxiosErrorResponse, AddProjectForm>({
    mutationFn: (payload) =>
      fetchData<AddProjectForm>(
        `/api/projects/${projectId}/`,
        "PUT",
        payload
      ),
    onSuccess: () => {
      toast.success("Project updated.");
      queryClient.invalidateQueries({
        queryKey: adminProjectKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};

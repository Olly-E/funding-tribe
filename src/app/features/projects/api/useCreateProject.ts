import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminProjectKey } from "@/app/utils/query-key-factory";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";
import { AddProjectPayload } from "../types";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<Response, AxiosErrorResponse, AddProjectPayload>({
    mutationFn: (payload) =>
      fetchData<AddProjectPayload>(`/api/projects`, "POST", payload),
    onSuccess: () => {
      toast.success("Project added.");
      queryClient.invalidateQueries({
        queryKey: adminProjectKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};

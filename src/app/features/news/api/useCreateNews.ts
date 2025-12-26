import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminNewsKey } from "@/app/utils/query-key-factory";
import { AddNewsPayload } from "../../news/types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  return useMutation<Response, AxiosErrorResponse, AddNewsPayload>({
    mutationFn: (payload) =>
      fetchData<AddNewsPayload>(`/api/news`, "POST", payload),
    onSuccess: () => {
      toast.success("Project added.");
      queryClient.invalidateQueries({
        queryKey: adminNewsKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};

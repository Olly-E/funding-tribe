import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminNewsKey } from "@/app/utils/query-key-factory";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useDeleteNews = (newsId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Response, AxiosErrorResponse>({
    mutationFn: () => fetchData(`/api/news/${newsId}/`, "DELETE"),
    onSuccess: () => {
      toast.success("News deleted.");
      queryClient.invalidateQueries({
        queryKey: adminNewsKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};

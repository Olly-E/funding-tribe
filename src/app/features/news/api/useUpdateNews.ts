import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { adminNewsKey } from "@/app/utils/query-key-factory";
import { AddNewsPayload } from "../../news/types";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

export const useUpdateNews = (newsId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Response, AxiosErrorResponse, AddNewsPayload>({
    mutationFn: (payload) =>
      fetchData<AddNewsPayload>(`/api/news/${newsId}`, "PUT", payload),
    onSuccess: () => {
      toast.success("News updated.");
      queryClient.invalidateQueries({
        queryKey: adminNewsKey.all,
      });
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "../types";

interface DeleteProps {
  publicIds: string[]; 
}

export const useDeleteUploads = () => {
  return useMutation<void, AxiosErrorResponse, DeleteProps>({
    mutationFn: async ({ publicIds }) => {
      if (!publicIds.length) return;

      await Promise.all(
        publicIds.map((id) =>
          fetchData("/api/common/delete-upload", "POST", { publicId: id })
        )
      );
    },
    onSuccess: () => {
      toast.success("Images deleted successfully.");
    },
    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};

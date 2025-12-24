import { useMutation } from "@tanstack/react-query";
import { AxiosErrorResponse } from "../types";

export const useFileUpload = () =>
  useMutation<
    { images: { url: string; publicId: string }[] },
    AxiosErrorResponse,
    FormData
  >({
    mutationFn: async (formData) => {
      const res = await fetch("/api/common/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw json;
      return json;
    },
  });

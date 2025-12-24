"use client";

import { axiosInstance, setAxiosDefaultToken } from "@/app/lib/axios";
import { tokenStorage, userIDStorage } from "@/app/utils/storage";
import { LoginFormProps, LoginSuccessResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { transformError } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { AxiosErrorResponse } from "@/app/types";

import toast from "react-hot-toast";

export const useLogin = () => {
  return useMutation<LoginSuccessResponse, AxiosErrorResponse, LoginFormProps>({
    mutationFn: (payload) =>
      fetchData<LoginFormProps>("/api/auth/login", "POST", payload),

    onSuccess: async (response) => {
      const { token, email, _id: id } = response.data;
      const miniUserObject = {
        email,
        id,
      };
      tokenStorage.setToken(token);

      userIDStorage.setUserID(id);
      setAxiosDefaultToken(token, axiosInstance);
      window.localStorage.setItem("userData", JSON.stringify(miniUserObject));
    },
    onError: async (error) => {
      toast.error(transformError(error));
    },
  });
};

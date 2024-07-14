import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { displayErrorMessage } from "@/utils/displayErrorMsg";

const apiURL = '/api';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return axios.post(`${apiURL}/login/`, data);
    },
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
    onSuccess: (response: AxiosResponse, data: any) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(response.data));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = window.location.origin + "/";
      }
    },
  });
};

import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const deniedRequest = async (id: string) => {
  const response = await requestManager.get(`/cancel-booking/deny/${id}`);
  return response?.data;
};

export const useDeniedRequest = () => {
  return useMutation({
    mutationFn: deniedRequest,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};
const requestApprove = async (id: string) => {
  const response = await requestManager.get(`/cancel-booking/approve/${id}`);
  return response?.data;
};

export const useRequestApprove = () => {
  return useMutation({
    mutationFn: requestApprove,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

export const useGetRequests = () => {
  return useQuery({
    queryKey: ["cancel-request"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/cancel-booking`);
        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

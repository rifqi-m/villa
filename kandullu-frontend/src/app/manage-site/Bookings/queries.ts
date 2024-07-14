import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const deleteBooking = async (id: string) => {
  const response = await requestManager.delete(`/booking/${id}`);
  return response?.data;
};

export const useDeleteBooking = () => {
  return useMutation({
    mutationFn: deleteBooking,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

export const useGetBooking = () => {
  return useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/booking`);
        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

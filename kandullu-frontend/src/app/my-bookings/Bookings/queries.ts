import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const cancelReuqest = async (value: any) => {
  const response = await requestManager.post(`/cancel-booking`, value);
  return response?.data;
};

export const useCreateRequest = () => {
  return useMutation({
    mutationFn: cancelReuqest,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

export const useGetBooking = (id: string) => {
  return useQuery({
    queryKey: ["user-booking"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(
          `/booking/user-bookings/${id}`
        );
        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

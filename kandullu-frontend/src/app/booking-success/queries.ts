import requestManager from "@/configs/requestManager";
import { useMutation } from "@tanstack/react-query";

const createBookingSucces = async (success: any) => {
  const response = await requestManager.post("/booking-success", success);
  return response?.data;
};

export const useCreateBookingSuccess = () => {
  return useMutation({
    mutationFn: createBookingSucces,
  });
};

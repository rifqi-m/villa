import requestManager from "@/configs/requestManager";
import { useMutation } from "@tanstack/react-query";

const createBookingError = async (success: any) => {
  const response = await requestManager.post("/booking-error", success);
  return response?.data;
};

export const useCreateBookingError = () => {
  return useMutation({
    mutationFn: createBookingError,
  });
};

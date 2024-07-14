import requestManager from "@/configs/requestManager";
import { useMutation } from "@tanstack/react-query";

const createContact = async (success: any) => {
  const response = await requestManager.post("/contact-us", success);
  return response?.data;
};

export const useCreateContact = () => {
  return useMutation({
    mutationFn: createContact,
  });
};

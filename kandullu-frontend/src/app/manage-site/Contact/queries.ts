import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const deleteContact = async (id: string) => {
  const response = await requestManager.delete(`/contact-us/${id}`);
  return response?.data;
};

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: deleteContact,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

export const useGetContact = () => {
  return useQuery({
    queryKey: ["contact-us"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/contact-us`);
        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

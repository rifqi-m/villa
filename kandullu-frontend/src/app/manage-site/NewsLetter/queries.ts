import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const deleteNewsLetter = async (id: string) => {
  const response = await requestManager.delete(`/newsletter/${id}`);
  return response?.data;
};

export const useDeleteNewsLetter = () => {
  return useMutation({
    mutationFn: deleteNewsLetter,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

export const useGetNewsLetter = () => {
  return useQuery({
    queryKey: ["newsletter"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/newsletter`);
        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

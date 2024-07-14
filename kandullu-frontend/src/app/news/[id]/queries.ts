import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetNewsById = (id: string) => {
  return useQuery({
    queryKey: ["news-id", id],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/news/${id}`);
        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

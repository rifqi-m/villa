import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/news`);
        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

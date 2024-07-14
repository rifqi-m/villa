import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type newsType = {
  id?: string;
  user_id: string;
  title: string;
  subtitle: string;
  main_image: string;
  content: string;
};

const createNews = async (news: newsType) => {
  const response = await requestManager.post("/news", news);
  return response?.data;
};

export const useCreateNews = () => {
  return useMutation({
    mutationFn: createNews,
  });
};
const updateNews = async (news: newsType) => {
  const response = await requestManager.put(`/news/${news.id}`, news);
  return response?.data;
};

export const useUpdateNews = () => {
  return useMutation({
    mutationFn: updateNews,
  });
};

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

const deleteNews = async (id: string) => {
  const response = await requestManager.delete(`/news/${id}`);
  return response?.data;
};

export const useDeleteNews = () => {
  return useMutation({
    mutationFn: deleteNews,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

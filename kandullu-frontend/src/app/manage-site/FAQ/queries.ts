import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const createFaq = async (faq: { question: string; answer: string }) => {
  const response = await requestManager.post("/faq/create", faq);
  return response?.data;
};

export const useCreateFaq = () => {
  return useMutation({
    mutationFn: createFaq,
  });
};
const updateFaq = async (faq: {
  id: string;
  question: string;
  answer: string;
}) => {
  const response = await requestManager.put(`/faq/${faq.id}`, {
    question: faq.question,
    answer: faq.answer,
  });
  return response?.data;
};

export const useUpdateFaq = () => {
  return useMutation({
    mutationFn: updateFaq,
  });
};

export const useGetFaq = () => {
  return useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/faq`);
        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

const deleteFaq = async (id: string) => {
  const response = await requestManager.delete(`/faq/delete/${id}`);
  return response?.data;
};

export const useDeleteFaq = () => {
  return useMutation({
    mutationFn: deleteFaq,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

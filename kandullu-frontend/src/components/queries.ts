import requestManager from "@/configs/requestManager";
import { useMutation } from "@tanstack/react-query";

const createNewsLetter = async (newsData: any) => {
  const response = await requestManager.post("/newsletter", newsData);
  return response?.data;
};

export const useCreateNewsLetter = () => {
  return useMutation({
    mutationFn: createNewsLetter,
  });
};

import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export async function getFAQ() {
  try {
    const response = await requestManager.get(`/faq`);
    return response.data;
  } catch (error) {
    displayErrorMessage(error as AxiosError);
    throw error;
  }
}
export const useGetFaq = () => {
  return useQuery({
    queryKey: ["faq-page"],
    queryFn: getFAQ,

    staleTime: 0,
  });
};

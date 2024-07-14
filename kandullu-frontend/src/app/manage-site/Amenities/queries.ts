import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { map } from "lodash";
type amenitiesType = {
  id?: string;
  title: string;
  image: string;
  description: string;
};

const createAmenities = async (amenities: amenitiesType) => {
  const payload = {
    ...amenities,
    path: "#",
  };
  const response = await requestManager.post("/local-amenities", payload);
  return response?.data;
};

export const useCreateAmenities = () => {
  return useMutation({
    mutationFn: createAmenities,
  });
};
const updateAmenities = async (amenities: amenitiesType) => {
  const payload = {
    ...amenities,
    path: "#",
  };
  const response = await requestManager.put(
    `/local-amenities/${amenities.id}`,
    payload
  );
  return response?.data;
};

export const useUpdateAmenities = () => {
  return useMutation({
    mutationFn: updateAmenities,
  });
};

export const useGetAmenities = () => {
  return useQuery({
    queryKey: ["local-amenities"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/local-amenities`);

        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

const deleteAmentites = async (id: string) => {
  const response = await requestManager.delete(`/local-amenities/delete/${id}`);
  return response?.data;
};

export const useDeleteAmentites = () => {
  return useMutation({
    mutationFn: deleteAmentites,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

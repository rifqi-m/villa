import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { map } from "lodash";
type villaType = {
  id?: string;
  title: string;
  about: string;
  gallery: {
    url: string;
    index: string;
  }[];
  description: string;
  summary: string;
  facilities: Array<any>;
  room_rates: Array<any>;
  baths: number;
  beds: number;
  max_guest: number;
};

const transformFormValuesToAPIPayload = (formValues: villaType) => {
  return {
    ...formValues,
    gallery: {
      images: formValues.gallery.map((item) => ({
        url: item.url,
        index: item.index,
      })),
    },
    facilities: {
      amenities: formValues.facilities.map((item) => ({
        icon: item.icon,
        name: item.name,
      })),
    },
    room_rates: {
      rate: formValues.room_rates.map((item) => ({
        name: item.name,
        rates: item.rates,
      })),
    },
  };
};

const createVilla = async (villa: villaType) => {
  const payload = {
    ...transformFormValuesToAPIPayload(villa),
    is_rented: false,
  };
  const response = await requestManager.post("/villa", payload);
  return response?.data;
};

export const useCreateVilla = () => {
  return useMutation({
    mutationFn: createVilla,
  });
};
const updateVilla = async (villa: villaType) => {
  const payload = transformFormValuesToAPIPayload(villa);
  const response = await requestManager.put(`/villa/${villa.id}`, payload);
  return response?.data;
};

export const useUpdateVilla = () => {
  return useMutation({
    mutationFn: updateVilla,
  });
};

export const useGetVillas = () => {
  return useQuery({
    queryKey: ["villa"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/villa`);

        return transformAPIPayloadToFormValues(response.data);
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

const deleteVilla = async (id: string) => {
  const response = await requestManager.delete(`/villa/${id}`);
  return response?.data;
};

export const useDeleteVilla = () => {
  return useMutation({
    mutationFn: deleteVilla,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

const transformAPIPayloadToFormValues = (data: any[]) => {
  const transformData = map(data, (apiResponse) => {
    // const menu = JSON.parse(apiResponse.menu);
    // const timings = JSON.parse(apiResponse.timings);
    // const gallery = JSON.parse(apiResponse.gallery);
    // console.log(apiResponse);
    return {
      ...apiResponse,
      gallery: transformObjectToArray(JSON.parse(apiResponse.gallery) || []),
      facilities: transformObjectToArray(
        JSON.parse(apiResponse.facilities) || []
      ),
      room_rates: transformObjectToArray(
        JSON.parse(apiResponse.room_rates) || []
      ),
    };
  });
  return transformData;
};
const transformObjectToArray = (object: any) => {
  let transformedArray: any[] = [];

  // Iterate over each key-value pair in the object
  Object.keys(object).forEach((key) => {
    const items = object[key]; // Array of RestaurantMenu objects under current key
    transformedArray = [...transformedArray, ...items]; // Append items to transformedArray
  });

  return transformedArray;
};

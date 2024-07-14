import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { map } from "lodash";

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

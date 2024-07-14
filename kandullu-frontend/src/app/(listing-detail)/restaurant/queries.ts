import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { map } from "lodash";

export async function getRestaurant() {
  try {
    const response = await requestManager.get(`/restaurant`);
    return transformAPIPayloadToFormValues(response.data);
  } catch (error) {
    displayErrorMessage(error as AxiosError);
    throw error;
  }
}
export const useGetRestaurant = () => {
  return useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/restaurant`);
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
    const menu = JSON.parse(apiResponse.menu);
    const timings = JSON.parse(apiResponse.timings);
    const gallery = JSON.parse(apiResponse.gallery);

    return {
      id: apiResponse.id,
      title: apiResponse.title,
      about: apiResponse.about,
      menu: transformObjectToArray(menu),
      timings: timings,
      gallery: transformObjectToArray(gallery),
      description: apiResponse.description,
      summary: apiResponse.summary,
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

import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { map } from "lodash";
type restaurantType = {
  id?: string;
  title: string;
  about: string;
  menu: {
    _id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    foodType: string;
  }[];
  timings: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  gallery: {
    url: string;
    index: string;
  }[];
  description: string;
  summary: string;
};
const transformFormValuesToAPIPayload = (formValues: restaurantType) => {
  // Initialize an object to hold menu items grouped by foodType
  const groupedMenu: { [key: string]: any } = {};

  // Populate groupedMenu based on formValues.menu
  formValues.menu.forEach((item) => {
    const { foodType, ...restItem } = item;
    if (!groupedMenu[foodType]) {
      groupedMenu[foodType] = [];
    }
    groupedMenu[foodType].push(item);
  });

  // Return the transformed payload
  return {
    title: formValues.title,
    about: formValues.about,
    menu: groupedMenu,
    timings: formValues.timings,
    gallery: {
      images: formValues.gallery.map((item) => ({
        url: item.url,
        index: item.index,
      })),
    },
    description: formValues.description,
    summary: formValues.summary,
  };
};
const createRestaurant = async (Restaurant: restaurantType) => {
  const payload = transformFormValuesToAPIPayload(Restaurant);
  const response = await requestManager.post("/restaurant", payload);
  return response?.data;
};

export const useCreateRestaurant = () => {
  return useMutation({
    mutationFn: createRestaurant,
  });
};
const updateRestaurant = async (Restaurant: restaurantType) => {
  const payload = transformFormValuesToAPIPayload(Restaurant);
  const response = await requestManager.put(
    `/restaurant/${Restaurant.id}`,
    payload
  );
  return response?.data;
};

export const useUpdateRestaurant = () => {
  return useMutation({
    mutationFn: updateRestaurant,
  });
};

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

const deleteRestaurant = async (id: string) => {
  const response = await requestManager.delete(`/restaurant/delete/${id}`);
  return response?.data;
};

export const useDeleteRestaurant = () => {
  return useMutation({
    mutationFn: deleteRestaurant,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
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

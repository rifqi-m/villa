import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type villaJsonType = {
  id?: string;
  title: string;
  about: string;
  gallery: string;
  description: string;
  summary: string;
  facilities: string;
  room_rates: string;
  baths: number;
  beds: number;
  max_guest: number;
};

type bookingType = {
  start_date: Date | null | string;
  end_date: Date | null | string;
  property_id: number;
  payment_type: "half_payment" | "full_payment";
  amount: number;
  pending_amount: number;
  user_id: number;
  guests: {
    adults: number;
    child: number;
    infants: number;
  };
};

export const useGetVillasById = (id: string) => {
  return useQuery({
    queryKey: ["villa-id", id],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/villa/${id}`);

        return transformAPIPayloadToFormValues(response.data);
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};
export const useGetVillasReviewById = (id: string) => {
  return useQuery({
    queryKey: ["review-villa-id", id],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/villa-reviews/${id}`);

        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

const transformAPIPayloadToFormValues = (data: villaJsonType) => {
  // const menu = JSON.parse(apiResponse.menu);
  // const timings = JSON.parse(apiResponse.timings);
  // const gallery = JSON.parse(apiResponse.gallery);
  // console.log(apiResponse);
  return {
    ...data,
    gallery: transformObjectToArray(JSON.parse(data.gallery) || []),
    facilities: transformObjectToArray(JSON.parse(data.facilities) || []),
    room_rates: transformObjectToArray(JSON.parse(data.room_rates) || []),
  };
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

const checkAvailability = async (body: {
  property_id: string;
  rent_start: Date;
  rent_end: Date;
}) => {
  const response = await requestManager.post(
    `/booking/check-availability`,
    body
  );
  return response;
};

export const useCheckAvailability = () => {
  return useMutation({
    mutationFn: checkAvailability,
  });
};

const reserveBooking = async (bookings: bookingType) => {
  const response = await requestManager.post("/booking", bookings);
  return response?.data;
};

export const useReserveBooking = () => {
  return useMutation({
    mutationFn: reserveBooking,
  });
};
const createReview = async (review: any) => {
  const response = await requestManager.post("/review", review);
  return response?.data;
};

export const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview,
  });
};

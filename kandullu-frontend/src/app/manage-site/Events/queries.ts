import requestManager from "@/configs/requestManager";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { map } from "lodash";
type eventType = {
  id?: string;
  name: string;
  href: string;
  description: string;
  thumbnail: string;
};

const createEvent = async (event: eventType) => {
  const payload = {
    ...event,
  };
  const response = await requestManager.post("/event", payload);
  return response?.data;
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
  });
};
const updateEvent = async (event: eventType) => {
  const payload = {
    ...event,
  };
  const response = await requestManager.put(`/event/${event.id}`, payload);
  return response?.data;
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: updateEvent,
  });
};

export const useGetEvent = () => {
  return useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      try {
        const response = await requestManager.get(`/event`);

        return response.data;
      } catch (error) {
        displayErrorMessage(error as AxiosError);
        throw error;
      }
    },

    staleTime: 0,
  });
};

const deleteEvent = async (id: string) => {
  const response = await requestManager.delete(`/event/${id}`);
  return response?.data;
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: deleteEvent,
    onError: (error: AxiosError) => {
      displayErrorMessage(error);
    },
  });
};

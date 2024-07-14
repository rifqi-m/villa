import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { Route } from "@/routers/types";
import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { useQuery } from "@tanstack/react-query";
import { map } from "lodash";

export const newsEventsChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/events", name: "EVENTS" },
  { id: ncNanoId(), href: "/news" as Route, name: "NEWS" },
];

export const getVillaOptions = () => {
  return useQuery({
    queryKey: ["villa-options"],
    queryFn: async () => {
      const response = await requestManager.get("/villa-options");
      return response.data;
    },
  });
};

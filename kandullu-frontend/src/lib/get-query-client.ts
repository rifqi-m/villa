import { queryClient } from "@/configs/queryClient";
import { cache } from "react";

const getQueryClient = cache(() => queryClient);
export default getQueryClient;

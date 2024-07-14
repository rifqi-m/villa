import requestManager from "@/configs/requestManager";
import { useMutation } from "@tanstack/react-query";

type signupType = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const signUp = async (user: signupType) => {
  const response = await requestManager.post("/user", { ...user, role: "" });
  return response?.data;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getCurrUser } from "../services/apiUser";

export function useCurrUser() {
  const { isLoading: isGettingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrUser,
  });
  return { isGettingUser, user };
}

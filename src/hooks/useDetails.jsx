import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useDetails = () => {
  const { user } = useAuth();
  const { data: loggedInUser } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/role/${user?.email}`
      );
      const res = await result.json();
      console.log("useRole", res);
      return res;
    },
  });
  return loggedInUser;
};

export default useDetails;

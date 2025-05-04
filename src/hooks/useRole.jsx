import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"

const useRole = () => {
    const { user } = useAuth()
    const { data: role } = useQuery({
        queryKey: ["role", user?.email],
        queryFn: async () => {
            const result = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/role/${user?.email}`
            );
            const res = await result.json();
            console.log('useRole', res);
            return res
        },
    })
    return role;
}

export default useRole
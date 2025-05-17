import { useQuery } from "@tanstack/react-query";

const useTasks = ({ type, email, sortByDate }) => {
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const result = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/${type}/tasks?email=${email}`,
        { method: "GET", credentials: "include" }
      );
      const res = await result.json();
      sortByDate &&
        res.sort((a, b) => {
          return new Date(b.task_deadline) - new Date(a.task_deadline);
        });
      return res;
    },
  });
  return { tasks, refetch };
};

export default useTasks;

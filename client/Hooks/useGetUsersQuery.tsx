import { getdataUsers } from "@/service/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersQuery = () => {
  const { status, data, error, refetch, isLoading, isError } = useQuery({
    queryKey: ["Users"],
    queryFn: getdataUsers,
  });

  return { status, data, error, refetch, isLoading, isError };
};

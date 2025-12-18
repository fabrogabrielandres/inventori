import { getdatadashboard } from "@/service/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardMetricsQuery = () => {
  const { status, data, error, refetch, isLoading, isError } = useQuery({
    queryKey: ["DashboardMetrics"],
    queryFn: getdatadashboard,
  });

  return { status, data, error, refetch, isLoading, isError };
};

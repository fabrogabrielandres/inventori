"use client";

import { useGetDashboardMetricsQuery } from "@/Hooks/useGetDashboardMetricsQuery";

export default function Page() {
  const { data: dataa } = useGetDashboardMetricsQuery();
  console.log(dataa, "dataa page expenses");

  return <>slug</>;
}

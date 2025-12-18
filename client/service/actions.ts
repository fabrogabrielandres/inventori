import { DashboardMetrics } from "@/interfaces/dashboard.interface";
import { api } from "@/lib/axios.api";

export const getdatadashboard = async () => {
    const { data } = await api.get<DashboardMetrics>("/dashboard");
    return data;
};
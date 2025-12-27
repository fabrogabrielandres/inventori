import { DashboardMetrics,  Product } from "@/interfaces/dashboard.interface";
import { api } from "@/lib/axios.api";

export const getdatadashboard = async () => {
    const { data } = await api.get<DashboardMetrics>("/dashboard");
    return data;
};



export const getProducts = async (search: string | void) => {
    const { data } = await api.get<Product[]>("/products", {
        params: search ? { search } : {},
    });
    return data;
};


export const createProduct = async (newProduct: Product) => {
    const data = await api.post<Product, Product>("/products", { ...newProduct });
    return data;
};
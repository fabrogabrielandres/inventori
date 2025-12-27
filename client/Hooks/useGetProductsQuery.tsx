import { Product } from "@/interfaces/dashboard.interface";
import { createProduct, getProducts } from "@/service/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProductsQuery = (search: string | void) => {
  return useQuery({
    queryKey: ["Products", { filterKey: search }],
    queryFn: () => getProducts(search),
  });
};

export interface OptimisticProduct extends Product {
  _isOptimistic?: boolean;
}

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: (data: {
      productData: OptimisticProduct;
      queryKey?: readonly unknown[];
    }) => {
      // Enviamos solo productData a createProduct
      return createProduct(data.productData);
    },

    onMutate: (data) => {
      // Extraemos productData y queryKey del objeto recibido
      const { productData, queryKey = ["Products"] } = data;

      const optimisticProduct = {
        ...productData,
        productId: Math.random().toString(),
        _isOptimistic: true,
      };

      console.log("Optimistic update para queryKey:", queryKey,productData);

      // Actualizar la cache con el queryKey específico
      queryClient.setQueryData(queryKey, (old: OptimisticProduct[]) => {
        if (!old) return [optimisticProduct];
        return [...old, optimisticProduct];
      });

      return {
        optimisticProduct,
        queryKey, // Guardar el queryKey para usarlo en los callbacks
      };
    },

    onSuccess: (data, variable, context) => {
      console.log("onSuccess - Datos reales recibidos:", data);

      const queryKey = context?.queryKey || ["Products"];

      // Reemplazar el producto optimista por los datos reales
      queryClient.setQueryData(queryKey, (old: OptimisticProduct[]) => {
        if (!old) return [data];
        return old.map((cacheProduct) => {
          // Buscar el producto optimista por su ID generado
          if (
            cacheProduct._isOptimistic &&
            cacheProduct.productId === context?.optimisticProduct.productId
          ) {
            return { ...data, productId: data.productId || data.productId }; // Usar el ID real
          }
          return cacheProduct;
        });
      });

      // Invalidar otras consultas relacionadas si es necesario
      queryClient.invalidateQueries({
        queryKey: ["Products"], // Invalidar la consulta base
      });

      // También invalidar la consulta específica si tiene filtros
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },

    onError: (data, variable, context) => {
      console.log(
        "onError - Revertiendo optimista para queryKey:",
        context?.queryKey,data, variable
      );

      const queryKey = context?.queryKey || ["Products"];

      // Revertir el producto optimista en caso de error
      queryClient.setQueryData(queryKey, (old: OptimisticProduct[]) => {
        if (!old) return [];
        return old.filter((cacheProduct) => {
          // Eliminar solo el producto optimista que insertamos
          return !(
            cacheProduct._isOptimistic &&
            cacheProduct.productId === context?.optimisticProduct.productId
          );
        });
      });
    },
  });

  return { productMutation };
};

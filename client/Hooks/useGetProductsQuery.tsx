import { Product } from "@/interfaces/dashboard.interface";
import { createProduct, getProducts } from "@/service/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProductsQuery = (search: string | void) => {
  return useQuery({
    queryKey: ["Products"],
    queryFn: () => getProducts(search),
  });
};



export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  const productMutation = useMutation({
    mutationFn: createProduct,

    onMutate: (product) => {
      const optimisticProduct  = { ...product, productId: Math.random().toString() };
      console.log("optimisticProduc", optimisticProduct);
      queryClient.setQueryData(
        ["Products"],
        (old: Product[]) => {
          if (!old) return [optimisticProduct];
          return [...old, optimisticProduct];
        }
      );
      return { optimisticProduct };
    },
    onSuccess: (data, variable, context) => {
      console.log("onSuccess", { data, variable, context });
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct],
      });

      queryClient.setQueryData(
        ["Products"],
        (old: Product[]) => {
          if (!old) return [data];
          return old.map((cacheProduct) => {
            return cacheProduct.productId === context?.optimisticProduct.productId
              ? data
              : cacheProduct;
          });
        }
      );
    },

    onError: (data, variable, context) => {
      console.log("onError", { data, variable, context });
       queryClient.setQueryData(
        ["Products"],
        (old: Product[]) => {
          if (!old) return [];
          return old.filter((cacheProduct, idx) => {
            console.log(
              old,
              idx,
              cacheProduct.productId === context?.optimisticProduct.productId
            );
            return cacheProduct.productId === context?.optimisticProduct.productId  
              ? null
              : cacheProduct;
          });
        }
      );
    },
  });
  return { productMutation };
};

"use client";

import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Rating from "@/components/Rating";
import {
  OptimisticProduct,
  useCreateProductMutation,
  useGetProductsQuery,
} from "@/Hooks/useGetProductsQuery";
import { useDebounce } from "@/Hooks/useDebounce";

const Products = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [wasFocused, setWasFocused] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { debouncedValue } = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (wasFocused && inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleInputFocus = () => {
    setWasFocused(true);
  };

  const handleInputBlur = () => {
    setWasFocused(false);
  };

  const {
    data: products,
    isLoading,
    isError,
    isFetching,
  } = useGetProductsQuery(debouncedValue);

  const { productMutation } = useCreateProductMutation();
  const handleCreateProduct = async (productData: OptimisticProduct) => {
    await productMutation.mutate({
      productData,
      queryKey: ["Products", { filterKey: debouncedValue }],
    });
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      {/* <div className="mb-6" >
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            autoFocus
          />
          {isFetching && (
            <span className="text-sm text-gray-500 ml-2">Searching...</span>
          )}
        </div>
      </div> */}
      <div className="mb-6">
        {/* NOTA: focus-within aplica estilos cuando CUALQUIER elemento dentro está enfocado */}
        <div className="flex items-center border-2 border-gray-200 rounded transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            ref={inputRef}
            className="w-full py-2 px-4 rounded bg-white outline-none"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {isFetching && (
            <span className="text-sm text-gray-500 ml-2">Searching...</span>
          )}
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId + product.name }
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                {/* <Image
                  src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                /> */}
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price?.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;

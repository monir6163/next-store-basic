"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearError = () => setError(null);

  const newProduct = async (productData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/admin/products/create`,
        productData
      );

      if (data?.status === true) {
        toast.success("New product created successfully");
        setLoading(false);
        router.push("/admin/products");
      }
    } catch (error) {
      setLoading(false);
      toast.error("New product created failed");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        newProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

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

  const updateProduct = async (productData, id) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/api/admin/products/update?id=${id}`,
        productData
      );

      if (data?.status === true) {
        toast.success("update product successfully");
        setLoading(false);
        router.push(`/admin/products/${id}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("update product failed");
    }
  };

  const updateProductImages = async (imgData, id) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/admin/products/updateimage?id=${id}`,
        imgData
      );

      if (data?.status === true) {
        toast.success("update product images successfully");
        setLoading(false);
        router.push("/admin/products");
      }
    } catch (error) {
      setLoading(false);
      toast.error("update product images failed");
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `/api/admin/products/delete?id=${id}`
      );

      if (data?.status === true) {
        toast.success("delete product successfully");
        setLoading(false);
        router.push(`/admin/products`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("delete product failed");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        clearError,
        newProduct,
        updateProductImages,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

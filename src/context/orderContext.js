"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canReview, setCanReview] = useState(false);

  const clearError = () => setError(null);

  const updateOrder = async (id, orderData) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/api/admin/orders/update?id=${id}`,
        orderData
      );

      if (data?.status === true) {
        toast.success("update order successfully");
        setLoading(false);
        router.push(`/admin/orders/${id}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("update order failed");
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/admin/orders/delete?id=${id}`);

      if (data?.status === true) {
        toast.success("delete order successfully");
        setLoading(false);
        router.push(`/admin/orders`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("delete order failed");
    }
  };

  const canUserReview = async (id) => {
    try {
      const { data } = await axios.get(
        `/api/products/canreview?productId=${id}`
      );

      if (data?.status === true) {
        setCanReview(data?.canReview);
      }
    } catch (error) {
      toast.error("Failed to check if user can review");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        error,
        loading,
        clearError,
        updateOrder,
        deleteOrder,
        canUserReview,
        canReview,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

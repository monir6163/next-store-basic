/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { CartContext } from "@/context/cartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import CustomPagination from "./CustomPagination";
import OrderItem from "./OrdersItem";

const ListOrders = ({ orders }) => {
  const { clearCart } = useContext(CartContext);
  const params = useSearchParams();
  const router = useRouter();
  const orderSuccess = params.get("order_success");
  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart();
      router.replace("/me/orders");
    }
  }, [orderSuccess]);

  return (
    <>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {orders?.orders?.map((order, i) => (
        <OrderItem key={i} order={order} />
      ))}
      <CustomPagination
        resPerPage={orders?.resPerPage}
        productsCount={orders?.ordersCount}
      />
    </>
  );
};

export default ListOrders;

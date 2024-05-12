"use client";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import { ProductProvider } from "@/context/productContext";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <SessionProvider>{children}</SessionProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

"use client";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ session, children }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <CartProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
  }) => {
    const item = {
      product,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
    };

    const isexistItem = cart?.cartItems?.find(
      (x) => x.product === item.product
    );
    let newCartItems;
    if (isexistItem) {
      newCartItems = cart?.cartItems?.map((x) =>
        x.product === isexistItem.product ? item : x
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((x) => x.product !== id);
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
    toast.success("Product removed from cart");
  };

  const saveOnCheckout = ({ amount, tax, total }) => {
    const checkOutInfo = {
      amount,
      tax,
      total,
    };
    const newCart = { ...cart, checkOutInfo };
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        saveOnCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

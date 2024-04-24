import { CartProvider } from "@/context/cartContext";

export function GlobalProvider({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

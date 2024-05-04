"use client";
import { AuthContext } from "@/context/authContext";
import { CartContext } from "@/context/cartContext";
import { ShoppingBasket, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Search from "./Search";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const totalItems = cart?.cartItems?.length;
  const { data } = useSession();
  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);

  const signOutHandler = async () => {
    await signOut();
    setUser(null);
    toast.success("Sign out successfully");
  };
  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              {/* <Image
                src="/images/logo.png"
                height="40"
                width="120"
                alt="BuyItNow"
              /> */}
              <span className="font-extrabold text-black">
                NextJs <span className="text-blue-500">Ecommerce</span>
              </span>
            </Link>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <div className="flex">
                <ShoppingBasket className="text-gray-400 w-5" />
                <span className="hidden lg:inline ml-1">
                  Cart (<b>{totalItems || 0}</b>)
                </span>
              </div>
            </Link>
            {user ? (
              <button
                onClick={() => signOutHandler()}
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <div className="flex">
                  <User className="text-gray-400 w-5" />
                  <span className="hidden lg:inline ml-1">Sign Out</span>
                </div>
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <div className="flex">
                  <User className="text-gray-400 w-5" />
                  <span className="hidden lg:inline ml-1">Sign in</span>
                </div>
              </Link>
            )}
            {user && (
              <Link href="/me">
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <Image
                    className="w-10 h-10 rounded-full"
                    src={
                      user?.avatar ? user?.avatar?.url : "/images/default.png"
                    }
                    alt="user"
                    width="40"
                    height="40"
                    priority={true}
                  />
                  <div className="space-y-1 font-medium">
                    <p>
                      {user?.name}
                      <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </time>
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

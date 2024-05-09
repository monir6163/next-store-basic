"use client";
import { CartContext } from "@/context/cartContext";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import BreadCrumbs from "./BreadCrumbs";

const breadCrumbs = [
  { name: "Home", url: "/" },
  { name: "Cart", url: "/cart" },
  { name: "Order", url: "" },
];

const Shipping = ({ addresses }) => {
  const { cart } = useContext(CartContext);

  const [shippingInfo, setShippingInfo] = useState("");

  const changeShippingHandler = (address) => {
    setShippingInfo(address?._id);
  };

  const checkOutHandler = async () => {
    if (!shippingInfo) {
      toast.error("Please select a shipping address");
      return;
    }
    try {
      const { data } = await axios.post("/api/checkout", {
        shippingInfo,
        cartItems: cart?.cartItems,
      });
      if (data.status) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 className="text-xl font-semibold mb-5">
                  Shipping information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {addresses?.map((address, i) => (
                    <label
                      key={i}
                      className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                      onClick={() => changeShippingHandler(address)}
                    >
                      <span>
                        <input
                          name="shipping"
                          type="radio"
                          className="h-4 w-4 mt-1"
                        />
                      </span>
                      <p className="ml-2">
                        <span>{address?.address}</span>
                        <small className="block text-sm text-gray-400">
                          {address?.state}, {address?.city}, {address?.zip}
                          <br />
                          {address?.country}
                          <br />
                          {address?.phone}
                        </small>
                      </p>
                    </label>
                  ))}
                </div>
                <Link
                  href="/address/new"
                  className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <PlusCircle size={20} className="inline-block mr-2" />
                  Add new address
                </Link>

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Back
                  </Link>
                  <a
                    className={`${
                      !shippingInfo
                        ? "px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md cursor-not-allowed opacity-50"
                        : "px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    }`}
                    onClick={checkOutHandler}
                  >
                    Checkout
                  </a>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Amount:</span>
                    <span>${cart?.checkOutInfo?.amount}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>Est TAX:</span>
                    <span>${cart?.checkOutInfo?.tax}</span>
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total Amount:</span>
                    <span className="text-gray-900 font-bold">
                      ${cart?.checkOutInfo?.total}
                    </span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold mb-3">Items in cart</h2>
                {cart?.cartItems?.map((item, i) => (
                  <figure key={i} className="flex items-center mb-4 leading-5">
                    <div>
                      <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                        <Image
                          width={50}
                          height={50}
                          className="object-cover w-full h-full rounded"
                          src={item?.image}
                          alt={item?.name}
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                          {item?.quantity}
                        </span>
                      </div>
                    </div>
                    <figcaption className="ml-3">
                      <p>{item?.name?.substring(0, 50)}</p>
                      <p className="mt-1 text-gray-400">
                        Total: ${item?.quantity * item?.price}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;

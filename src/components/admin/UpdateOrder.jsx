"use client";
import { OrderContext } from "@/context/orderContext";
import Image from "next/image";
import { useContext, useState } from "react";

const UpdateOrder = ({ orders, id }) => {
  const [data, setData] = useState("");
  const { updateOrder, loading } = useContext(OrderContext);

  const handleClick = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateOrder(id, data);
  };
  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: {orders?.order?._id} </span>
            {orders?.order?.orderStatus === "processing" ? (
              <span className="text-red-500">
                {" "}
                • {orders?.order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                {" "}
                • {orders?.order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="text-gray-500">
            {new Date(orders?.order?.createdAt).toLocaleString()}
          </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Person</p>
          <ul className="text-gray-600">
            <li>{orders?.order?.user?.name}</li>
            <li>Phone: {orders?.order?.shippingInfo?.phone}</li>
            <li>Email: {orders?.order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Delivery address</p>
          <ul className="text-gray-600">
            <li>{orders?.order?.shippingInfo?.address}</li>
            <li>
              {orders?.order?.shippingInfo?.state},{" "}
              {orders?.order?.shippingInfo?.city},{" "}
              {orders?.order?.shippingInfo?.zip}
            </li>
            <li>{orders?.order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Payment</p>
          <ul className="text-gray-600">
            <li className="text-green-400">
              {orders?.order?.paymentInfo?.status.toUpperCase()}
            </li>
            <li>Tax paid: ${orders?.order?.paymentInfo?.taxPaid}</li>
            <li>Total paid: ${orders?.order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {orders?.order?.orderItems?.map((item, i) => (
          <figure className="flex flex-row mb-4" key={i}>
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={item?.image}
                  width={80}
                  height={80}
                  priority={true}
                  alt={item?.name}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item?.name.substring(0, 20) + "..."}</p>
              <p className="mt-1 font-semibold">
                {item?.quantity}x{item?.price} = ${item?.price * item?.quantity}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <hr />

      <div className="my-8">
        <label className="block mb-3"> Update Order Status </label>
        <div className="relative">
          <select
            className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            name="orderStatus"
            required
            onClick={handleClick}
          >
            {["Processing", "Shipped", "Delivered"]?.map((status) => (
              <option
                key={status}
                value={status.toLowerCase()}
                selected={status.toLowerCase() === orders?.order?.orderStatus}
              >
                {status}
              </option>
            ))}
          </select>
          <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
            <svg
              width="22"
              height="22"
              class="fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </i>
        </div>
      </div>

      <button
        type="submit"
        className="mb-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        onClick={handleSubmit}
      >
        {loading ? "loading..." : "Update"}
      </button>
    </article>
  );
};

export default UpdateOrder;

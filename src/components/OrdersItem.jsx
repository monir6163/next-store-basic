import Image from "next/image";

const OrderItem = ({ order }) => {
  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: {order?._id} </span>
            {order?.orderStatus === "processing" ? (
              <span className="text-red-500">
                {" "}
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                {" "}
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="text-gray-500">
            {new Date(order?.createdAt).toLocaleString()}
          </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Person</p>
          <ul className="text-gray-600">
            <li>{order?.user?.name}</li>
            <li>Phone: {order?.shippingInfo?.phone}</li>
            <li>Email: {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Delivery address</p>
          <ul className="text-gray-600">
            <li>{order?.shippingInfo?.address}</li>
            <li>
              {order?.shippingInfo?.state}, {order?.shippingInfo?.city},{" "}
              {order?.shippingInfo?.zip}
            </li>
            <li>{order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Payment</p>
          <ul className="text-gray-600">
            <li className="text-green-400">
              {order?.paymentInfo?.status.toUpperCase()}
            </li>
            <li>Tax paid: ${order?.paymentInfo?.taxPaid}</li>
            <li>Total paid: ${order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((item, i) => (
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
    </article>
  );
};

export default OrderItem;

"use client";
import { CartContext } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";
import Rating from "./Rating";

const ProductItem = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const addToCartHandler = () => {
    toast.success("Product added to cart");
    addItemToCart({
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0].url,
      stock: product?.stock,
      seller: product?.seller,
      quantity: 1,
    });
  };
  return (
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="flex flex-col md:flex-row hover:bg-gray-100 transition duration-300">
        <div className="md:w-1/4 flex p-3">
          <div
            style={{
              width: "80%",
              height: "70%",
              position: "relative",
            }}
          >
            <Image
              src={
                product?.images[0]
                  ? product?.images[0].url
                  : "/images/default_product.png"
              }
              alt="product anme"
              height="240"
              width="240"
              priority={true}
            />
          </div>
        </div>
        <div className="md:w-2/4">
          <div className="p-4">
            <Link
              href={`/product/${product._id}`}
              className="hover:text-blue-600"
            >
              {product.name}
            </Link>
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
                  <Rating rating={product?.ratings} />
                </div>
              </div>
              <b className="text-gray-300">•</b>
              <span className="ml-1 text-yellow-500">{product?.ratings}</span>
              <div className="ratings">
                <div className="my-1">{product?.category}</div>
              </div>
            </div>
            <p className="text-gray-500 mb-2">
              {product?.description.substring(0, 150)}...
            </p>
          </div>
        </div>
        <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="p-5">
            <span className="text-xl font-semibold text-black">
              ${product?.price}
            </span>

            <p className="text-green-500">Free Shipping</p>
            <div className="my-3">
              <button
                className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
                onClick={addToCartHandler}
                disabled={product?.stock === 0}
              >
                {" "}
                Add to Cart{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;

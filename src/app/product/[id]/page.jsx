import ProductDetails from "@/components/ProductDetails";
import axios from "axios";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

async function getProductDetails(id) {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/singleproduct?id=${id}`
  );
  return data["products"];
}

const page = async ({ params }) => {
  const isValidId = mongoose.isValidObjectId(params?.id);

  if (!isValidId) {
    return redirect("/");
  }
  const product = await getProductDetails(params.id);
  return <ProductDetails product={product} />;
};

export default page;

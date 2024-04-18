import ProductDetails from "@/components/ProductDetails";
import axios from "axios";

async function getProductDetails(id) {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/singleproduct?id=${id}`
  );
  return data["products"];
}

const page = async ({ params }) => {
  const product = await getProductDetails(params.id);
  return <ProductDetails product={product} />;
};

export default page;

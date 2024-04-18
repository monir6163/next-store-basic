import ListProducts from "@/components/ListProducts";
import axios from "axios";

async function getProducts() {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/getproducts`
  );
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="">
      <ListProducts products={products} />
    </main>
  );
}

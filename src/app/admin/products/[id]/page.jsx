import UpdateProduct from "@/components/admin/UpdateProduct";
import axios from "axios";

async function getProducts(params) {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/singleproduct?id=${params}`
  );
  return data;
}

export default async function page({ params }) {
  const pdata = await getProducts(params.id);

  return (
    <main>
      <UpdateProduct pdata={pdata?.products} id={params?.id} />
    </main>
  );
}

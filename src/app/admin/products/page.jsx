import Products from "@/components/admin/Products";
import axios from "axios";
import queryString from "query-string";

async function getProducts(searchParams) {
  const urlParamas = {
    page: searchParams.page,
  };
  const queryStr = queryString.stringify(urlParamas);
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/getproducts?${queryStr}`
  );
  return data;
}

export default async function page({ searchParams }) {
  const data = await getProducts(searchParams);

  return (
    <main>
      <Products data={data} />
    </main>
  );
}

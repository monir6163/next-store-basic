import ListProducts from "@/components/ListProducts";
import axios from "axios";
import queryString from "query-string";

async function getProducts(searchParams) {
  const urlParamas = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "ratings[gte]": searchParams.ratings,
  };
  const queryStr = queryString.stringify(urlParamas);
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/getproducts?${queryStr}`
  );
  return data;
}

export default async function Home({ searchParams }) {
  const products = await getProducts(searchParams);

  return (
    <main className="">
      <ListProducts products={products} />
    </main>
  );
}

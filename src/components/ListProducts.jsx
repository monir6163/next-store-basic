import CustomPagination from "./CustomPagination";
import Filters from "./Filters";
import ProductItem from "./ProductItem";

const ListProducts = ({ products }) => {
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {products?.products?.map((product, i) => (
              <ProductItem key={i} product={product} />
            ))}
            {products?.products?.length === 0 ? (
              <div className="text-center">No Products Found</div>
            ) : (
              <CustomPagination
                resPerPage={products?.resPerPage}
                productsCount={products?.filteredProductsCount}
              />
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;

import ItemsCarousel from "./ItemsCarousel";

const ProductsRow = ({ data, objects }) => {
  const products = objects.map((obj) =>
    obj.data.products.map((product) => product[0])
  )[0];

  return (
    <section className="mb-8 px-4">
      {data.show_header && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
          {data.show_view_all && (
            <span className="text-green-600 font-medium text-sm cursor-pointer">
              see all
            </span>
          )}
        </div>
      )}
      <ItemsCarousel topItems={products} />
    </section>
  );
};

export default ProductsRow;

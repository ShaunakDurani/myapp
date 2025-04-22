import { useParams } from "react-router-dom";
import { ProductDetails, MoreProducts } from "../components/Products";
import NotAvailable from "../BrowseComponents/NotAvailable";
import { getProductById } from "../BrowseComponents/helper";

const ProductView = () => {
  const { id } = useParams();

  const productFound = getProductById(id);

  if (!productFound) {
    window.scrollTo(0, 0);
    return <NotAvailable />;
  }

  const productItem = productFound.product_data;
  const productInfo = {
    product: productItem.data.product,
    varients: productItem.data.variants_info,
  };

  const moreProducts = productItem.objects.map((obj) => {
    const { products, title } = obj.data;
    return {
      products,
      title,
    };
  });

  return (
    <div className="_container">
      <ProductDetails {...productInfo} />
      {moreProducts.map((products, i) => (
        <MoreProducts key={i} {...products} />
      ))}
    </div>
  );
};

export default ProductView;

import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import { convertTextToURLSlug } from "./helper";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const {
    product_id,
    name,
    unit,
    price,
    mrp,
    image_url,
    discount,
    delivery_time,
  } = data;

  const cartProduct = {
    id: product_id.toString(),
    title: name,
    subTitle: unit,
    image: image_url,
    price,
    mrp,
  };

  const handleProductClick = () => {
    const pname = convertTextToURLSlug(name);
    navigate(`/prn/${pname}/prid/${product_id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="flex flex-col w-full bg-white border border-gray-100 rounded-lg cursor-pointer p-2"
    >
      {/* Delivery Time */}
      {delivery_time && (
        <div className="flex items-center gap-1 mb-2">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-xs text-gray-600">{delivery_time} MINS</span>
        </div>
      )}

      {/* Product Image */}
      <div className="flex justify-center items-center h-36 mb-3">
        <img src={image_url} alt={name} className="h-full object-contain" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{unit}</p>

        {/* Price Section */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-semibold">₹{price}</span>
          <div className="flex justify-end">
            <AddToCartButton product={cartProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import { convertTextToURLSlug } from "./helper";
import React from "react";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const { product_id, name, unit, price, mrp, image_url, delivery_time } = data;

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
      className="flex flex-col w-full bg-white rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105" // Added shadow and hover effect
      onClick={handleProductClick} // Make the entire card clickable
    >
      {/* Delivery Time */}
      {delivery_time && (
        <div className="flex items-center gap-1 p-2">
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
      <div className="flex justify-center items-center h-48 p-4">
        {" "}
        {/* Increased image height */}
        <img src={image_url} alt={name} className="h-full object-contain" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[48px] mb-2">
          {" "}
          {/* Increased font size and min height */}
          {name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{unit}</p>

        {/* Price Section */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">₹{price}</span>{" "}
          {/* Increased font size and weight */}
          <div className="flex justify-end">
            <AddToCartButton product={cartProduct} />
          </div>
        </div>
        {mrp && mrp > price && (
          <p className="text-xs text-gray-500 line-through">MRP: ₹{mrp}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

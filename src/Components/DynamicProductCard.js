import AddToCartButton from "../CartComponents/AddToCartButton";

const DynamicProductCard = ({ item }) => {
  const { id, desc, w, pricing, images } = item;

  const price = pricing?.discount?.prim_price?.sp || 0;
  const mrp = pricing?.discount?.mrp || 0;
  const image_url = images?.[0]?.m || "";

  const cartProduct = {
    id: id.toString(),
    title: desc,
    subTitle: w,
    image: image_url,
    price,
    mrp,
  };

  return (
    <div className="flex flex-col w-full bg-white border border-gray-100 rounded-lg p-2">
      {/* Product Image */}
      <div className="flex justify-center items-center h-36 mb-3">
        <img src={image_url} alt={desc} className="h-full object-contain" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {desc}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{w}</p>

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

export default DynamicProductCard;

import { useState, useEffect } from "react";
import HeroArea from "../BrowseComponents/HeroArea";
import CategoriesList from "../BrowseComponents/CategoriesList";
import DiscountOffers from "../BrowseComponents/DiscountOffers";
import FeaturedPromo from "../BrowseComponents/FeaturedPromo";
import HighlightedPromo from "../BrowseComponents/HighlightedPromo";
import ProductsRow from "../BrowseComponents/ProductsRow";
import Misc from "../Data/layout.json";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Get all product items from Misc data
  const productItems = Misc.filter((item) => item.type === 77).map((el) => ({
    data: el.data,
    objects: el.objects,
  }));

  // Function to extract all products from the nested structure
  const getAllProducts = () => {
    let allProducts = [];

    productItems.forEach((item) => {
      if (item.objects && Array.isArray(item.objects)) {
        item.objects.forEach((object) => {
          // Check if object has data and products
          if (
            object.data &&
            object.data.products &&
            Array.isArray(object.data.products)
          ) {
            // Products is an array of arrays, each containing product objects
            object.data.products.forEach((productGroup) => {
              if (Array.isArray(productGroup)) {
                productGroup.forEach((product) => {
                  allProducts.push(product);
                });
              }
            });
          }
        });
      }
    });

    return allProducts;
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  // Search functionality
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const lowercaseQuery = query.toLowerCase();

    // Get all products
    const allProducts = getAllProducts();

    // Filter products based on search query
    const results = allProducts.filter((product) => {
      // Check if product is defined
      if (!product) return false;

      // Search in name, brand, type, and other relevant fields
      const name = product.name?.toLowerCase() || "";
      const brand = product.brand?.toLowerCase() || "";
      const type = product.type?.toLowerCase() || "";
      const line1 = product.line_1?.toLowerCase() || "";
      const line2 = product.line_2?.toLowerCase() || "";

      return (
        name.includes(lowercaseQuery) ||
        brand.includes(lowercaseQuery) ||
        type.includes(lowercaseQuery) ||
        line1.includes(lowercaseQuery) ||
        line2.includes(lowercaseQuery)
      );
    });

    setSearchResults(results);
  };

  // Reset search
  const resetSearch = () => {
    setSearchQuery("");
    setSearchResults(null);
    setIsSearching(false);
  };

  // Get URL parameters on component mount to handle direct links to search
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("q");

    if (queryParam) {
      setSearchQuery(queryParam);
      performSearch(queryParam);
    }
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 max-w-[1440px] mx-auto">
      {/* Search Form */}
      <div className="mt-4 mb-6">
        <form onSubmit={handleSearchSubmit} className="flex w-full">
          <input
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-l focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r"
          >
            Search
          </button>
        </form>
      </div>

      {isSearching ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Search Results for "{searchQuery}"
            </h2>
            <button
              onClick={resetSearch}
              className="text-green-600 hover:text-green-800 underline"
            >
              Back to Home
            </button>
          </div>

          {searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((product, index) => (
                <div key={index} className="border rounded-lg p-4 shadow">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-lg">
                    {product.name || ""}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {product.brand || ""} {product.type || ""}
                  </p>
                  {product.mrp && (
                    <div className="mt-2">
                      <p className="text-green-600 font-bold">
                        ₹{product.price || product.mrp}
                      </p>
                      {product.mrp !== product.price && (
                        <p className="text-gray-500 text-sm line-through">
                          MRP: ₹{product.mrp}
                        </p>
                      )}
                      {product.offer && (
                        <p className="text-orange-500 text-sm font-semibold">
                          {product.offer}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">
                No products found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          <HeroArea />
          <FeaturedPromo />
          <CategoriesList />
          <DiscountOffers />
          <HighlightedPromo />
          {productItems.map((products, i) => (
            <ProductsRow key={i} {...products} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;

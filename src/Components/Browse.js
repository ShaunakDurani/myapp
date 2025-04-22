import HeroArea from "../BrowseComponents/HeroArea";
import CategoriesList from "../BrowseComponents/CategoriesList";
import DiscountOffers from "../BrowseComponents/DiscountOffers";
import FeaturedPromo from "../BrowseComponents/FeaturedPromo";
import HighlightedPromo from "../BrowseComponents/HighlightedPromo";
import ProductsRow from "../BrowseComponents/ProductsRow";
import Misc from "../Data/layout.json";

const Browse = () => {
  const productItems = Misc.filter((item) => item.type === 77).map((el) => ({
    data: el.data,
    objects: el.objects,
  }));

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 max-w-[1440px] mx-auto">
      <div className="space-y-10 mt-4">
        <HeroArea />
        <FeaturedPromo />
        <CategoriesList />
        <DiscountOffers />
        <HighlightedPromo />
        {productItems.map((products, i) => (
          <ProductsRow key={i} {...products} />
        ))}
      </div>
    </div>
  );
};

export default Browse;

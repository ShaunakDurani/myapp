// ItemsCarousel.jsx - Blinkit style
import Carousel from "react-multi-carousel";
import { shuffleItems } from "./helper";
import CarouselButtonGroup from "./CarouselButtonGroup";
import ProductCard from "./ProductCard";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  uhdDesktop: {
    breakpoint: { max: 1920, min: 1440 },
    items: 7,
    slidesToSlide: 2,
  },
  superLargeDesktop: {
    breakpoint: { max: 1440, min: 1200 },
    items: 6,
    slidesToSlide: 2,
  },
  largeDesktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 767 },
    items: 4,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 767, min: 560 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 560, min: 420 },
    items: 2,
    slidesToSlide: 1,
  },
  minimobile: {
    breakpoint: { max: 420, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ItemsCarousel = (props) => {
  const items = shuffleItems(props.topItems);

  return (
    <div className="relative w-full">
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<CarouselButtonGroup />}
        shouldResetAutoplay={false}
        infinite={false}
        itemClass="px-2"
      >
        {items?.map((item, i) => (
          <ProductCard key={i} data={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default ItemsCarousel;

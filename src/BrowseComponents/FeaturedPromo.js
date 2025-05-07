import Carousel from "react-multi-carousel";
import { shuffleItems } from "./helper";
import Misc from "../Data/layout.json";
import "react-multi-carousel/lib/styles.css";
import React from "react";

const responsive = {
  uhdDesktop: {
    breakpoint: { max: 1920, min: 1601 },
    items: 4,
    slidesToSlide: 4,
    partialVisibilityGutter: 40,
  },
  superLargeDesktop: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 40,
  },
  largeDesktop: {
    breakpoint: { max: 1200, min: 767 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 20,
  },
  tablet: {
    breakpoint: { max: 767, min: 540 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 540, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 20,
  },
};

const CarouselButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
  const { totalItems, currentSlide, slidesToShow } = carouselState;
  const isFirst = currentSlide === 0;
  const isLast = currentSlide + slidesToShow >= totalItems;

  return (
    <div className="carousel-button-group flex justify-center gap-4 mt-4">
      <button
        onClick={previous}
        disabled={isFirst}
        className={`px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Previous
      </button>
      <button
        onClick={next}
        disabled={isLast}
        className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Next
      </button>
    </div>
  );
};

const FeaturedPromo = () => {
  const allPromos = Misc.filter((item) => item.type === 66)[0].objects?.map(
    (el) => el.data.image_url
  );

  const promos = shuffleItems(allPromos);

  return (
    <section>
      <div className="mx-4 relative py-4">
        <Carousel
          swipeable={true} // Enable swipe
          draggable={true} // Enable drag
          responsive={responsive}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<CarouselButtonGroup />}
          shouldResetAutoplay={false}
          infinite={false}
          itemClass="px-2"
          partialVisible
        >
          {promos?.map((promo, i) => (
            <div
              key={i}
              className="rounded-lg w-full cursor-pointer overflow-hidden"
              style={{ maxHeight: "280px" }} // Added inline style for max-height
            >
              <img
                src={promo}
                alt={`Promo ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedPromo;

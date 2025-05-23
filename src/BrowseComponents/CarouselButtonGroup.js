import { IoChevronBack, IoChevronForwardSharp } from "react-icons/io5";

const CarouselButton = ({ icon, onButtonClick }) => {
  const IconComponent =
    icon === "prev" ? (
      <IoChevronBack size={20} />
    ) : (
      <IoChevronForwardSharp size={20} />
    );

  return (
    <button
      className="bg-white h-9 w-9 _fab"
      type="button"
      onClick={onButtonClick}
    >
      {IconComponent}
    </button>
  );
};

const CarouselButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide, slidesToShow, totalItems },
  } = rest;

  return (
    <>
      <div className="w-9 flex items-center z-10 absolute right-auto top-0 bottom-0 -left-4">
        {currentSlide !== 0 && (
          <CarouselButton icon="prev" onButtonClick={previous} />
        )}
      </div>
      <div className="w-9 flex items-center z-10 absolute top-0 -right-4 bottom-0 left-auto">
        {currentSlide < totalItems - slidesToShow && (
          <CarouselButton icon="next" onButtonClick={next} />
        )}
      </div>
    </>
  );
};

export default CarouselButtonGroup;

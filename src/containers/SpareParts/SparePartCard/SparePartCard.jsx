import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SparePartCard({
  items,
  currentImage,
  setCurrentImage,
  name,
  timerID,
}) {
  useEffect(() => {
    timerID.current =
      items.length > 1
        ? setInterval(function () {
            if (currentImage < items.length - 1) {
              if (currentImage === -1)
                setCurrentImage((prevCurrentImage) => prevCurrentImage + 2);
              else setCurrentImage((prevCurrentImage) => prevCurrentImage + 1);
            } else {
              setCurrentImage(0);
            }
          }, 3000)
        : null;
    return () => {
      clearInterval(timerID.current);
    };
  }, [currentImage, items.length, setCurrentImage, timerID]);

  return items.length ? <div className="relative w-full h-full flex justify-start items-center">
      {currentImage < 0 ? (
        <img
          className="border-r-[10px] border-l-[10px] border-t-[10px] border-accent-light  rounded-tl rounded-tr object-cover w-full h-full"
          src={items[0]}
          alt={name}
        />
      ) : (
        items.map((_, index) => (
          <img
            key={`original_image_${index}`}
            className={
              index === currentImage
                ? 'absolute animate-sparepart-from-right border-r-[10px] border-l-[10px] border-t-[10px] border-accent-light bg-white rounded-tl rounded-tr object-cover w-full h-full'
                : 'absolute translate-x-full border-r-[10px] border-l-[10px] border-t-[10px] border-accent-light bg-white rounded-tl rounded-tr object-cover w-full h-full'
            }
            src={items[currentImage]}
            alt={name}
          />
        ))
      )
      }
    </div> :null;
  };
    


SparePartCard.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  currentImage: PropTypes.number,
  name: PropTypes.string,
  setCurrentImage: PropTypes.func,
  timerID: PropTypes.shape({ current: PropTypes.number }),
};
SparePartCard.defaultProps = {
  items: [],
  currentImage: -1,
  name: 'Części zamienne do przemysłowych urządzeń pralniczych Primus, Unimac, Pralma, Electrolux',
  setCurrentImage: () => {},
  timerID: { current: undefined },
};

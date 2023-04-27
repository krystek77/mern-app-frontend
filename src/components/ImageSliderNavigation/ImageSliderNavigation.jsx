import React from 'react';
import PropTypes from 'prop-types';
import { GoArrowSmallUp, GoArrowSmallDown } from 'react-icons/go';

export default function ImageSliderNavigation({
  items,
  currentImage,
  setCurrentImage,
  timerID,
}) {
  return items.length ? (
    <div className="flex items-center justify-center w-full">
      <button
        title="kolejne zdjęcie"
        aria-label="next-photo"
        type="button"
        className={
          currentImage === items.length - 1
            ? '-rotate-90 border rounded-full bg-slate-100  border-slate-100 pointer-events-none'
            : '-rotate-90 border rounded-full bg-slate-100  border-slate-200 cursor-pointer hover:bg-slate-200'
        }
        onClick={() => {
          if (currentImage < items.length - 1) {
            if (currentImage === -1)
              setCurrentImage((prevCurrentImage) => prevCurrentImage + 2);
            else setCurrentImage((prevCurrentImage) => prevCurrentImage + 1);
          }
        }}
      >
        <GoArrowSmallUp
          className={
            currentImage === items.length - 1
              ? 'w-6 h-6 text-slate-200 '
              : 'w-6 h-6 text-black-dark group-hover:text-white'
          }
        />
      </button>
      <div className="thumnails-wrapper my-2 mx-2 p-1 w-full overflow-y-hidden border border-accent-light rounded-t-full rounded-b-full">
        <div className="thumbnails flex flex-row justify-left items-center">
          {items.map((thumbnail, index) => {
            return (
              <div
                className={
                  currentImage === index || (currentImage < 0 && index === 0)
                    ? 'overflow-hidden w-8 h-8 border m-px rounded-full flex justify-center items-center cursor-pointer bg-accent-light border-accent'
                    : 'overflow-hidden w-8 h-8 border border-slate-300 m-px rounded-full flex justify-center items-center cursor-pointer hover:bg-accent-light hover:border-accent'
                }
                key={index}
                onClick={() => {
                  setCurrentImage(index);
                  clearInterval(timerID);
                }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={thumbnail}
                  alt="części zamienne do przemysłowych maszyn pralniczych"
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        title="poprzednie zdjęcie"
        aria-label="prev photo"
        type="button"
        className={
          currentImage <= 0
            ? '-rotate-90 border rounded-full bg-slate-100  border-slate-100  pointer-events-none'
            : '-rotate-90 border rounded-full bg-slate-100  border-slate-200 cursor-pointer hover:bg-slate-200'
        }
        onClick={() => {
          if (currentImage > 0) {
            setCurrentImage((prevCurrentImage) => prevCurrentImage - 1);
          }
        }}
      >
        <GoArrowSmallDown
          className={
            currentImage <= 0
              ? 'w-6 h-6 text-slate-200 '
              : 'w-6 h-6 text-black-dark group-hover:text-white'
          }
        />
      </button>
    </div>
  ) : null;
}

ImageSliderNavigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  currentImage: PropTypes.number,
  setCurrentImage: PropTypes.func,
  timerID: PropTypes.shape({ current: PropTypes.number }),
};
ImageSliderNavigation.defaultProps = {
  items: [],
  currentImage: -1,
  setCurrentImage: () => {},
  timerID: { current: undefined },
};

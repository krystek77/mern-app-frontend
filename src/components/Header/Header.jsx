import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from 'react-router-dom';
import { fisherYatesShuffle as shuffleArray } from '../../utils';
import QuickContact from '../QuickContact';

const MIX_BLEND_MODE = [
  'mix-blend-color',
  'mix-blend-hard-light',
  'mix-blend-hue',
  'mix-blend-lighten',
  'mix-blend-luminosity',
  'mix-blend-multiply',
  'mix-blend-normal',
];

const shuffle = (array) => {
  const tempBoxes = [...array];
  const shuffle = [];
  for (let index = 0; index < tempBoxes.length; index++) {
    shuffle.push(shuffleArray([...array[index]]));
  }
  return shuffle;
};

export const Header = forwardRef((props, ref) => {
  const { boxes, images, queryTitle } = props;
  const navigation = useNavigation();
  const [shuffledTablesOfSquares, setShuffledTablesOfSquares] = useState(() =>
    shuffle(boxes)
  );
  const [currentMixBlendMode, setCurrentMixBlendMode] = useState(
    () => shuffleArray(MIX_BLEND_MODE)[0]
  );
  const [bgImages, setBgImages] = useState(() => shuffleArray(images));

  useEffect(() => {
    const timerID = setInterval(function () {
      setShuffledTablesOfSquares(() => shuffle(boxes));
      setCurrentMixBlendMode(() => shuffleArray(MIX_BLEND_MODE)[0]);
      setBgImages(() => shuffleArray(images));
    }, 6000);

    setShuffledTablesOfSquares(() => shuffle(boxes));
    setCurrentMixBlendMode(() => shuffleArray(MIX_BLEND_MODE)[0]);
    setBgImages(() => shuffleArray(images));
    return () => {
      clearInterval(timerID);
    };
  }, [navigation.location, boxes, images, queryTitle]);

  return (
    <>
      <header
        ref={ref}
        className={`relative h-[430px] px-4 flex flex-col justify-evenly items-center ${props.bgGradient}`}
      >
        <div className="images absolute inset-x-0 inset-y-0 grid grid-cols-4 grid-rows-2">
          {bgImages.map((image) => {
            return image.src ? (
              <div key={image.id} className="border-r border-b border-white">
                <img
                  className={`object-cover w-full h-full ${image.position}`}
                  src={image.src}
                  alt="urządzenia pralnicze, pralki przemysłowe, suszarki przemysłowe, pralnicowirówki, prasownice, wirówki"
                />
              </div>
            ) : (
              <div key={image.id} className="border-r border-b"></div>
            );
          })}
        </div>
        <div
          className={`squares absolute inset-x-0 inset-y-0 hidden md:flex flex-col ${currentMixBlendMode}`}
        >
          {shuffledTablesOfSquares.map((row, index) => {
            return (
              <div key={`row-${index}`} className="row flex flex-grow ">
                {row.map((column, index) => {
                  switch (column) {
                    case 1:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-primary-dark m-px rounded-lg"
                        ></div>
                      );
                    case 2:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-primary-light m-px rounded-lg"
                        ></div>
                      );
                    case 3:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-primary m-px rounded-lg"
                        ></div>
                      );
                    case 4:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-accent-dark m-px rounded-lg"
                        ></div>
                      );
                    case 5:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-accent-light m-px rounded-lg"
                        ></div>
                      );
                    case 6:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-accent m-px rounded-lg"
                        ></div>
                      );
                    case 7:
                      return (
                        <dlg
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-admin-dark m-px rounded-lg"
                        ></dlg>
                      );
                    case 8:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-admin-light m-px rounded-lg"
                        ></div>
                      );
                    case 9:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow bg-opacity-90 bg-admin m-px rounded-lg"
                        ></div>
                      );
                    default:
                      return (
                        <div
                          key={`column-${index}`}
                          className="column flex-grow border border-transparent m-px rounded-lg"
                        ></div>
                      );
                  }
                })}
              </div>
            );
          })}
        </div>

        <h1 className="relative capitalize font-light lg:text-2xl text-center bg-black-dark bg-opacity-95 p-4 rounded-md text-white max-w-lg">
          {props.title}
        </h1>
        {props.children}
      </header>
      <QuickContact />
    </>
  );
});

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      src: PropTypes.elementType,
      position: PropTypes.string,
    })
  ),
  boxes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  bgGradient: PropTypes.string,
};
Header.defaultProps = {
  title: 'Przemysłowe urządzenia pralnicze',
  children: null,
  images: [
    { id: uuidv4(), src: '', position: 'object-center' },
    { id: uuidv4(), src: '', position: '' },
    { id: uuidv4(), src: '', position: '' },
    { id: uuidv4(), src: '', position: 'object-center' },
    { id: uuidv4(), src: '', position: '' },
    { id: uuidv4(), src: '', position: '' },
    { id: uuidv4(), src: '', position: 'object-center' },
    { id: uuidv4(), src: '', position: 'object-bottom' },
  ],
  boxes: [
    [
      0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 4, 4, 6,
    ],
    [
      0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 5, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 3,
    ],
    [
      0, 0, 0, 1, 4, 0, 0, 0, 0, 0, 0, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 2, 3,
    ],
  ],
  bgGradient: 'bg-gradient-radial-circle-from-cc-primary',
};

export default Header;

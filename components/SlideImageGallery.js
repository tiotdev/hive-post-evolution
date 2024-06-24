import { useRef, useEffect, useState } from "react";
import ImageGalleryImage from "./ImageGalleryImage";

const dimensionConverter = (width, height, changedWidth, changedHeight) => {
  let newWidth = changedWidth;
  let newHeight = changedHeight;
  if (changedWidth) newHeight = Math.round(newWidth / (width / height));
  if (changedHeight) newWidth = Math.round(newHeight / (height / width));
  return { width: newWidth, height: newHeight };
};

export default function ImageGallery(props) {
  const { images, toggleLightbox } = props;

  const ref = useRef(null);
  const elRef = useRef(null);

  const imgHeight = 512;

  const [leftArrowVisible, setLeftArrowVisible] = useState(false);
  const [rightArrowVisible, setRightArrowVisible] = useState(true);

  const scroll = isLeft => {
    let scrollOffset = elRef.current.offsetWidth;
    if (isLeft) scrollOffset = 0 - scrollOffset;
    ref.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    const listenToScroll = () => {
      setLeftArrowVisible(ref.current.scrollLeft !== 0);
      setRightArrowVisible(
        ref.current.scrollLeft <
          ref.current.scrollWidth - elRef.current.offsetWidth - 1,
      );
    };

    const curRef = ref.current;
    curRef.addEventListener("scroll", listenToScroll);
    return () => curRef.removeEventListener("scroll", listenToScroll);
  }, [props]);

  if (!props.images || props.images.length === 0 || !props.images.forEach)
    return <div ref={ref} />;

  let arrowColor =
    "stroke-red-500 group-hover:border-red-500 group-hover:bg-red-100 active:bg-red-200 dark:group-hover:bg-red-900 dark:active:bg-red-800";
  if (rightArrowVisible && !leftArrowVisible) {
    arrowColor =
      "stroke-red-500 group-hover:border-red-500 bg-red-100 dark:bg-red-900 group-hover:bg-red-100 active:bg-red-200 dark:group-hover:bg-red-900 dark:active:bg-red-800";
  }

  return (
    <div className="relative">
      <div
        className={
          "not-prose flex w-full snap-x snap-mandatory flex-nowrap overflow-x-hidden scroll-smooth rounded"
        }
        ref={ref}
      >
        {images.map(image => {
          if (!image || !image.url || !image.height || !image.width)
            return <></>;
          const { width, height } = dimensionConverter(
            image.width,
            image.height,
            undefined, // imgWidth,
            imgHeight,
          );
          const handleLightboxToggle = () => toggleLightbox(image.url);
          return (
            <div
              className={
                "m-auto flex size-full shrink-0 snap-center snap-always flex-wrap"
              }
              key={image.url}
            >
              <div
                ref={node => {
                  elRef.current = node;
                }}
                className="max-h-80 w-full sm:max-h-[32rem] xl:max-h-[40rem]"
              >
                <ImageGalleryImage
                  image={image}
                  height={height}
                  width={width}
                  handleLightboxToggle={handleLightboxToggle}
                />
              </div>
              {image.caption && (
                <div className="py-1 font-sans text-base font-medium">
                  {image.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {images.length > 1 && rightArrowVisible && (
        <div className={"absolute right-1 top-0 z-10 h-full py-2 pl-2"}>
          <div className={"group flex h-full"}>
            <button
              onClick={e => scroll(false, e)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  "h-12 w-12 rounded-full border-2 border-transparent pl-1 opacity-95 group-hover:opacity-100 " +
                  arrowColor
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {leftArrowVisible && (
        <div className={"absolute left-1 top-0 z-10 h-full py-2 pr-2"}>
          <div className={"group flex h-full"}>
            <button
              onClick={e => scroll(true, e)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  "h-12 w-12 rounded-full border-2 border-transparent pr-1 opacity-95 hover:opacity-100 " +
                  arrowColor
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

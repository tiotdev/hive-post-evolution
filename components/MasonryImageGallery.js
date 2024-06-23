import MasonryPortrait from "./MasonryPortrait.js";
import MasonryImage from "./MasonryImage.js";
import ImageCaption from "./ImageCaption.js";
import MasonryGrid from "./MasonryGrid.js";

export default function MasonryImageGallery({ images, toggleLightbox }) {
  if (!images || images.length === 0) return <></>;

  // 2 portrait images
  if (
    images.length === 2 &&
    images[0].height > images[0].width &&
    images[1].height > images[1].width
  )
    return (
      <div>
        <MasonryPortrait images={images} toggleLightbox={toggleLightbox} />
        <ImageCaption
          captions={[
            {
              position: "left",
              caption: images[0].caption,
            },
            { position: "right", caption: images[1].caption },
          ]}
        />
      </div>
    );

  // 3 portrait images
  if (
    images.length === 3 &&
    images[0].height > images[0].width &&
    images[1].height > images[1].width &&
    images[2].height > images[2].width
  )
    return (
      <div>
        <MasonryPortrait images={images} toggleLightbox={toggleLightbox} />
        <ImageCaption
          captions={[
            {
              position: "left",
              caption: images[0].caption,
            },
            {
              position: "middle",
              caption: images[1].caption,
            },
            { position: "right", caption: images[2].caption },
          ]}
        />
      </div>
    );

  // 2 portrait + 1 landscape
  if (
    images.length === 3 &&
    images[0].height >= images[0].width &&
    images[1].height >= images[1].width
  )
    return (
      <div>
        <MasonryPortrait
          images={[images[0], images[1]]}
          toggleLightbox={toggleLightbox}
        />
        <div className="mt-2 flex">
          <MasonryImage
            rounded
            image={images[2]}
            toggleLightbox={toggleLightbox}
          />
        </div>
        <ImageCaption
          captions={[
            {
              position: "left",
              caption: images[0].caption,
            },
            {
              position: "right",
              caption: images[1].caption,
            },
            {
              position: "bottom",
              caption: images[2].caption,
            },
          ]}
        />
      </div>
    );

  if (
    images.length === 3 &&
    images[1].height >= images[1].width &&
    images[2].height >= images[2].width
  )
    return (
      <div>
        <div className="mb-2 flex">
          <MasonryImage
            image={images[0]}
            toggleLightbox={toggleLightbox}
            rounded
          />
        </div>
        <MasonryPortrait
          images={[images[1], images[2]]}
          toggleLightbox={toggleLightbox}
        />
        <ImageCaption
          captions={[
            {
              position: "top",
              caption: images[0].caption,
            },
            {
              position: "left",
              caption: images[1].caption,
            },
            {
              position: "right",
              caption: images[2].caption,
            },
          ]}
        />
      </div>
    );

  return (
    <div className="not-prose">
      <MasonryGrid images={images} toggleLightbox={toggleLightbox} />
    </div>
  );
}

import MasonryImage from "./MasonryImage";

export default function MasonryPortrait({ images, toggleLightbox }) {
  return (
    <div className="flex gap-2">
      {images.map(image => (
        <MasonryImage
          key={image.url}
          image={image}
          toggleLightbox={toggleLightbox}
          rounded
        />
      ))}
    </div>
  );
}

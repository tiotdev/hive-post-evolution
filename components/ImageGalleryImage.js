import Image from "components/Image";

export default function ImageGalleryImage({
  image,
  height,
  width,
  handleLightboxToggle,
}) {
  return (
    <div className="size-full">
      <div className="flex size-full">
        <div className="m-auto flex size-full items-center justify-center">
          <Image
            src={image.url}
            alt={image.alt || ""}
            height={height}
            width={width}
            className="h-auto max-h-full w-full cursor-zoom-in rounded object-scale-down"
            onClick={handleLightboxToggle}
            onKeyPress={handleLightboxToggle}
          />
        </div>
      </div>
    </div>
  );
}

import Image from "components/Image";

export default function MasonryImage({
  image,
  toggleLightbox,
  rounded,
  isFullWidth,
}) {
  return (
    <Image
      className={
        "block cursor-zoom-in" +
        (rounded ? " rounded" : "") +
        (isFullWidth ? " h-auto w-full" : " h-auto w-0 ")
      }
      style={{ flexGrow: image.width / image.height }}
      src={image.url}
      alt={image.caption || ""}
      height={image.height}
      width={image.width}
      onClick={() => toggleLightbox(image.url)}
      onKeyPress={() => toggleLightbox(image.url)}
    />
  );
}

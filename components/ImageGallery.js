import MasonryImageGallery from "./MasonryImageGallery";
import SlideImageGallery from "./SlideImageGallery";
import LightboxGallery from "./LightboxGallery";
import { useState } from "react";

export default function ImageGallery(props) {
  const [lightboxImage, setLightboxImage] = useState();

  return (
    <>
      {props.style === "masonry" ? (
        <MasonryImageGallery {...props} toggleLightbox={setLightboxImage} />
      ) : (
        <SlideImageGallery {...props} toggleLightbox={setLightboxImage} />
      )}
      <LightboxGallery
        lightboxImage={lightboxImage}
        handleClose={() => setLightboxImage(undefined)}
      />
    </>
  );
}

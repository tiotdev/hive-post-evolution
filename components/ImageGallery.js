import MasonryImageGallery from "./MasonryImageGallery";
import LightboxGallery from "./LightboxGallery";
import { useState } from "react";

export default function ImageGallery(props) {
  const [lightboxImage, setLightboxImage] = useState();

  return (
    <>
      {props.style === "masonry" ? (
        <MasonryImageGallery {...props} toggleLightbox={setLightboxImage} />
      ) : (
        <>TODO: Slider</>
      )}
      <LightboxGallery
        lightboxImage={lightboxImage}
        handleClose={() => setLightboxImage(undefined)}
      />
    </>
  );
}

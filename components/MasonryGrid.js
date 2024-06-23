import { useEffect, useState } from "react";
import MasonryImage from "./MasonryImage.js";

export default function MasonryGrid(props) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    function handleResize() {
      const masonryRows = [];
      const isMobile = window.innerWidth < 640;
      let currentRow = [];
      let rowWidth = 0;
      let maxRowWidth = 3.4;
      if (isMobile) maxRowWidth = 2.2;
      props.images.forEach((image, i) => {
        if (i === props.images.length - 1 && image.height >= image.width) {
          if (rowWidth === 0 && masonryRows.length > 0)
            masonryRows[masonryRows.length - 1].push(image);
          else {
            currentRow.push(image);
          }
        } else {
          const normalisedWidth = image.width / image.height;
          if (
            rowWidth + normalisedWidth > maxRowWidth ||
            currentRow.length > 2
          ) {
            if (currentRow.length === 0) currentRow.push(image);
            masonryRows.push(currentRow);
            currentRow = [];
            rowWidth = 0;
          }
          rowWidth += normalisedWidth;
          currentRow.push(image);
        }
      });
      masonryRows.push(currentRow);
      setRows(masonryRows);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [props]);

  return rows.map((images, i) => {
    return (
      <div key={i} className={"flex gap-1" + (i > 0 ? " pt-1" : "")}>
        {images.map(image => (
          <MasonryImage
            isFullWidth={images.length === 1}
            key={image.url}
            image={image}
            toggleLightbox={props.toggleLightbox}
            rounded
          />
        ))}
      </div>
    );
  });
}

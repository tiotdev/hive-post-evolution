const capitalize = str => str[0].toUpperCase() + str.substr(1);

export default function ImageCaption({ captions }) {
  if (!captions || captions.length === 0) return <></>;

  const validCaptions = [];
  captions.forEach(caption => {
    if (caption && caption.caption) validCaptions.push(caption);
  });
  if (!validCaptions || validCaptions.length === 0) return <></>;

  return (
    <div className="imgcaption py-1 font-sans">
      {validCaptions.map(caption => {
        if (caption && caption.caption)
          return (
            <div className="text-base" key={caption.caption}>
              <span className="font-medium">
                {capitalize(caption.position)}
              </span>
              : {caption.caption}
            </div>
          );
      })}
    </div>
  );
}

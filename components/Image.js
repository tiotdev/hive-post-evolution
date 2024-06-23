const bs58 = require("bs58");
import Image from "next/image";

const hiveImagesLoader = ({
  src,
  width,
  // quality,
  //   ratio,
}) => {
  const bytes = Buffer.from(src);
  const address = bs58.encode(bytes);
  return `https://images.hive.blog/p/${address}/?format=match${
    width ? `&width=${width}` : ""
  }`;
};

export default function ProxyImage(props) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image loader={hiveImagesLoader} {...props} />;
}

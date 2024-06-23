import withMDX from "@next/mdx";

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    // Add any options here if needed
  },
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  images: {
    domains: ["images.hive.blog"],
  },
};

export default mdxConfig(nextConfig);

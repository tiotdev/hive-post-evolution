import "@/styles/globals.css";
import MDXLayout from "components/MDXLayout";
import { Fragment } from "react";

export default function App({ Component, pageProps }) {
  const isMDXPage = Component.name === "MDXContent";
  const Layout = isMDXPage ? MDXLayout : Fragment;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

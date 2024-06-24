import "@/styles/globals.css";
import Header from "components/Docs/Header";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

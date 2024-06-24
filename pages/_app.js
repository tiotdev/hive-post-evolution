import "@/styles/globals.css";
import Header from "components/Docs/Header";
import { AuthProvider } from "components/Docs/AuthProvider";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

import type { AppProps } from "next/app";
import { AnonymousUserProvider } from "../providers/AnonymousUserProvider";
import "tailwindcss/tailwind.css";

if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development"
  // && /VIVID_ENABLED=true/.test(document.cookie)
) {
  import("vivid-studio").then((v) => v.run());
  import("vivid-studio/style.css");
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnonymousUserProvider>
      <Component {...pageProps} />
    </AnonymousUserProvider>
  );
}

import type { AppProps } from "next/app";
import { AnonymousUserProvider } from "../providers/AnonymousUserProvider";
import 'tailwindcss/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnonymousUserProvider>
      <Component {...pageProps} />
    </AnonymousUserProvider>
  );
}

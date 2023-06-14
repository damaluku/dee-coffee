import React from "react";

import BaseLayout from "@/layouts/BaseLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "@/store/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </StoreProvider>
  );
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/CormorantUpright-Bold.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        {/*        <link
          rel="preload"
          href="/fonts/CormorantUpright-Light.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CormorantUpright-Medium.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CormorantUpright-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CormorantUpright-SemiBold.ttf"
          as="font"
          crossOrigin="anonymous"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="7ZYigLaiHmOoedZGHjAH681d323gSj0AyiWAgmnOg5E" />

        {/* Favicon links */}
        <link rel="icon" href="/logos/dreamfox_emblem.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/logos/dreamfox_emblem.svg" color="#E62D8D" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/logos/dreamfox_emblem.svg" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#E62D8D" />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="DreamFox" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DreamFox" />
        <meta name="description" content="DreamFox - Digital Marketing Agency specializing in brand advisory, digital marketing, and digital media mix services." />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Robots meta - remove noindex for production */}
        {process.env.NEXT_PUBLIC_NODE_ENV === "production" ? (
          <meta name="robots" content="index, follow" />
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}

        {/* Viewport meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body className="antialiased">   
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXV4TPDV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
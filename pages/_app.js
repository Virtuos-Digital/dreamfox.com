import Layout from "@/components/Layout/layout";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";
import client from "../lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SEOHead from "@/components/seohead/seohead";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import WebGL component to avoid SSR issues
const WebGLCursorEffect = dynamic(() => import("@/components/Webgl/webgl"), {
  ssr: false,
});

const ScrollSmootherWrapper = dynamic(
  () => import("@/components/SmoothScroll/SmoothScrollWrapper"),
  {
    ssr: false,
  }
);

const PWAInstallPrompt = dynamic(
  () => import("@/components/PWA/PWAInstallPrompt"),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }

    const handleRouteChangeStart = () => {
      // Kill all GSAP animations and ScrollTriggers on route change
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

    const handleRouteChangeComplete = () => {
      // Scroll to top when route changes
      window.scrollTo(0, 0);
      
      // Refresh ScrollTrigger after route change
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Subscribe to route change events
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Initial scroll to top
    handleRouteChangeComplete();

    // Cleanup
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV4TPDV');`,
        }}
      />

      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-CKSP8XNWKJ"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CKSP8XNWKJ');
          `,
        }}
      />

      <WebGLCursorEffect />
      <SEOHead />
      <PWAInstallPrompt />
      {/* <SmoothScroll> */}
      <ApolloProvider client={client}>
        <ScrollSmootherWrapper>
          <Component {...pageProps} />
        </ScrollSmootherWrapper>
      </ApolloProvider>
      {/* </SmoothScroll> */}
    </>
  );
}

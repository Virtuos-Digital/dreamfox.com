import Head from "next/head";
import { useRouter } from "next/router";

const seoData = {
  "/": {
    title: "DreamFox: Intelligent Digital Branding & AI Marketing Studio",
    description:
      "DreamFox transforms brands with intelligent digital branding, design, AI-driven marketing, and immersive experiences that fuel creativity, speed, and innovation.",
    image: "https://dreamfox.com/og-images/homepage.jpg",
  },
  "/services/digital-marketing": {
    title: "DreamFox Digital Marketing Services - SEO, Funnels & AI Growth",
    description:
      "DreamFox elevates brands with SEO, social, PPC, funnels, AI insights, and conversion-focused strategies that turn data, design, and creativity into measurable growth.",
    image: "https://dreamfox.com/og-images/ai_marketing.jpg",
  },
  "/services/brand-advisory": {
    title: "DreamFox Brand Advisory Services - Identity, Strategy & Design",
    description:
      "DreamFox elevates brands with identity design, strategic advisory, UX/UI, AI-driven marketing, and creative systems that build powerful, scalable brand experiences.",
    image: "https://dreamfox.com/og-images/branding.jpg",
  },
  "/services/design-studio": {
    title: "Designara™ Studio | Digital Experience & UX/UI Design-DreamFox",
    description:
      "DreamFox's Designara™ Studio builds immersive digital experiences with UX/UI, DXP design, Webflow, Framer, React, and AI-powered creativity for modern brands.",
    image: "https://dreamfox.com/og-images/designara_studio.jpg",
  },
  "/services/digital-media-mix": {
    title: "Yippee Media | Digital Media Mix & Content Marketing-DreamFox",
    description:
      "DreamFox's Yippee Media delivers data-driven content, PR, storytelling, and omnichannel media strategies powered by AI to amplify brand reach and performance.",
    image: "https://dreamfox.com/og-images/yippee_media.jpg",
  },
  "/about/alliances": {
    title: "DreamFox Alliances | Strategic Partnerships & Innovation",
    description:
      "Discover how DreamFox builds strategic alliances that strengthen digital innovation, enhance capabilities, and deliver high-value solutions for every client.",
    image: "https://dreamfox.com/og-images/alliances.jpg",
  },
  "/services": {
    title: "DreamFox Services | Digital Marketing, Design & Development",
    description:
      "Discover DreamFox services in digital marketing, design, development, content creation, and analytics—crafted to help brands grow with bold strategy and creativity.",
    image: "https://dreamfox.com/og-images/services.jpg",
  },
  "/about": {
    title: "About DreamFox | Digital Innovation & Creative Excellence",
    description:
      "Discover DreamFox—design, brand, and digital innovators crafting immersive experiences powered by creativity, AI, and technology to help businesses grow.",
    image: "https://dreamfox.com/og-images/about.jpg",
  },
  "/work-portfolio": {
    title: "DreamFox Portfolio | Creative Web, Design & Digital Projects",
    description:
      "Explore the DreamFox portfolio showcasing innovative web designs, digital experiences, branding, and technology projects crafted for diverse industries.",
    image: "https://dreamfox.com/og-images/portfolio.jpg",
  },
  "/contactus": {
    title: "Contact DreamFox | Connect for Digital & AI Solutions",
    description:
      "Contact DreamFox to discuss your digital, design, or AI automation needs. Reach our team for project inquiries, consultations, and business transformation support.",
    image: "https://dreamfox.com/og-images/contact_us.jpg",
  },
  "/about/team": {
    title: "Meet the DreamFox Team | Creators of Digital Innovation",
    description:
      "Meet the DreamFox team driving AI innovation, digital strategy, and creative excellence. Discover the experts behind world-class products and transformative solutions.",
    image: "https://dreamfox.com/og-images/team.jpg",
  },
  "/about/careers": {
    title: "Careers at DreamFox | Build Your Future in Tech & Design",
    description:
      "Join DreamFox and shape the future of AI, design, and digital innovation. Explore open roles in creative, marketing, UX, and tech to build an impactful career.",
    image: "https://dreamfox.com/og-images/careers.jpg",
  },
  "/news-events": {
    title: "DreamFox News & Events | Latest Press & Company Updates",
    description:
      "Explore DreamFox news, press releases, and events featuring acquisitions, partnerships, product launches, and industry updates shaping our digital innovation journey.",
    image: "https://dreamfox.com/og-images/news_and_events.jpg",
  },
  "/news-events/dreamfox-acquires-yippee-media": {
    title: "DreamFox Acquires Yippee Media | Creative Intelligence Growth",
    description:
      "DreamFox announces the acquisition of Yippee Media, expanding its creative intelligence, digital design strength, and AI-driven marketing capabilities worldwide.",
    image: "https://dreamfox.com/og-images/yippee_acquisition.jpg",
  },
  "/news-events/dreamfox-enbrand-unite-integrated-branding-digital-experience-solutions":
    {
      title: "DreamFox & EnBrand Unite for Integrated Branding Innovation",
      description:
        "DreamFox partners with EnBrand to deliver integrated branding, experience design, and AI-driven marketing, helping enterprises accelerate digital transformation.",
      image: "https://dreamfox.com/og-images/enbrand_partnership.jpg",
    },
  "/news-events/dreamfox-develops-plumjob-brand-designara-experience-services":
    {
      title: "DreamFox Develops PlumJob Brand with Designara™ Expertise",
      description:
        "DreamFox unveils PlumJob.com, a modern HRTech brand built through Designara™ experience design, delivering AI-driven, human-centric talent and hiring solutions.",
      image: "https://dreamfox.com/og-images/plumjob_brand.jpg",
    },
  "/news-events/plumjob-launch-dxpify-dxp-as-a-service-developed-by-dreamfox": {
    title: "PlumJob to Launch Dxpify — DXP-as-a-Service by DreamFox",
    description:
      "DreamFox introduces Dxpify, a DXP-as-a-Service platform enabling brands to design and scale next-gen digital experiences, integrated into PlumJob's HRTech ecosystem.",
    image: "https://dreamfox.com/og-images/dxpify_launch.jpg",
  },
  "/work-portfolio/vsys-case-study": {
    title: "VSYS Case Study | Future-Ready Systems by DreamFox",
    description:
      "Explore how DreamFox built VSYS, a unified platform driving scalable growth, AI-powered operations, and a future-ready digital ecosystem for ventures.",
    image: "https://dreamfox.com/og-images/vsys.jpg",
  },
  "/work-portfolio/tekcorp-case-study": {
    title: "TEKCORP Case Study — Reinventing a Legacy Tech Brand",
    description:
      "Explore how DreamFox transformed TEKCORP into a future-ready brand leading in Agentic AI, robotics, cloud infrastructure, and modern digital experience design.",
    image: "https://dreamfox.com/og-images/tekcorp.jpg",
  },
  "/work-portfolio/plumjob-case-study": {
    title: "PlumJob.com Case Study — Next-Gen Talent Branding",
    description:
      "Discover how DreamFox built PlumJob.com for VSys—a premium talent experience platform that redefines hiring with a global brand identity, clean design, and curated roles.",
    image: "https://dreamfox.com/og-images/plumjob.jpg",
  },
  "/work-portfolio/sweven-case-study": {
    title: "Sweven Case Study — Vision-Driven Salesforce Consulting Brand",
    description:
      "Explore how DreamFox built Sweven—a visionary Salesforce consulting brand with a bold identity, global scalability, and a future-ready digital experience.",
    image: "https://dreamfox.com/og-images/sweven.jpg",
  },
  "/work-portfolio/indic-case-study": {
    title: "INDIC Case Study — Building a Global Identity Rooted in India",
    description:
      "Discover how INDIC evolved into a powerful global identity rooted in India's culture, heritage, and digital ambition, built with strong strategy, design, and vision.",
    image: "https://dreamfox.com/og-images/indic.jpg",
  },
  "/work-portfolio/better-buy-club-case-study": {
    title: "BetterBuyClub Case Study — Modern Retail Reinvented Online",
    description:
      "See how BetterBuyClub was transformed into a modern digital retail experience through branding, UX design, catalog strategy, and a full-scale online launch built for growth.",
    image: "https://dreamfox.com/og-images/betterbuy.jpg",
  },
  "/work-portfolio/giftcart-case-study": {
    title: "Giftcart.com Case Study — Reinventing Digital Gifting Experiences",
    description:
      "Discover how Giftcart.com evolved into a modern gifting platform through brand identity, UX redesign, Shopify migration, and AI-driven personalization for digital consumers.",
    image: "https://dreamfox.com/og-images/giftcart.jpg",
  },
  "/terms-of-use": {
    title: "DreamFox Terms & Conditions | User Responsibilities & Data Use",
    description:
      "Review DreamFox's Terms & Conditions to understand user eligibility, data use, intellectual property rights, and our commitment to ethical digital practices.",
    image: "https://dreamfox.com/og-images/terms_and_condition.jpg",
  },
  "/privacy-policy": {
    title: "DreamFox Privacy Policy | Data Protection & User Confidentiality",
    description:
      "Read DreamFox's Privacy Policy to understand how we protect user data, ensure confidentiality, and maintain transparency across our digital platforms.",
    image: "https://dreamfox.com/og-images/privacy_policy.jpg",
  },
  "/safe-harbour-policy": {
    title: "DreamFox Safe Harbour Policy | Global Data Protection & Security",
    description:
      "Read DreamFox's Safe Harbour Statement outlining forward-looking disclosures, risk factors, and legal commitments under securities regulations.",
    image: "https://dreamfox.com/og-images/safe_harbour_policy.jpg",
  },
  "/cookie-policy": {
    title: "DreamFox Cookie Policy | Tracking, Analytics & Privacy",
    description:
      "Learn how DreamFox uses cookies for site functionality, analytics, personalization, and marketing, plus how to manage your preferences securely.",
    image: "https://dreamfox.com/og-images/cookie_policy.jpg",
  },
  "/gdpr-policy": {
    title: "DreamFox GDPR Policy | Data Protection & User Rights",
    description:
      "Learn how DreamFox ensures GDPR compliance with secure data processing, user rights protection, lawful transfers, encryption, and transparent marketing.",
    image: "https://dreamfox.com/og-images/gdpr_policy.jpg",
  },
  "/disclaimer": {
    title: "DreamFox Disclaimer | Website Liability & Content Terms",
    description:
      "Read DreamFox's Disclaimer outlining content accuracy, no professional advice, AI limitations, third-party links, liability limits, and user responsibilities.",
    image: "https://dreamfox.com/og-images/disclaimer.jpg",
  },
};
const SEOHead = ({
  title,
  description,
  url,
  image,
  type = "website",
  twitterHandle = "@dreamfoxstudio",
}) => {
  const router = useRouter();
  const currentPath = router.asPath;

  // Get SEO data based on current path, fallback to props or defaults
  const pageSeoData = seoData[currentPath] || {};
  const finalTitle =
    title ||
    pageSeoData.title ||
    "DreamFox | Intelligent Digital Branding & AI Marketing Studio";
  const finalDescription =
    description ||
    pageSeoData.description ||
    "DreamFox transforms brands with intelligent digital branding, design, AI-driven marketing, and immersive experiences that fuel creativity, speed, and innovation.";
  const finalUrl = url || `https://dreamfox.com${currentPath}`;
  const finalImage =
    image || pageSeoData.image || "https://dreamfox.com/og-images/homepage.jpg";

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="DreamFox" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Additional SEO Tags */}
      {process.env.NEXT_PUBLIC_NODE_ENV === "production" ? (
        <meta name="robots" content="index, follow" />
      ) : (
        <meta name="robots" content="noindex, nofollow" />
      )}
      <meta name="author" content="DreamFox Team" />
      <meta name="publisher" content="DreamFox" />
      <meta name="theme-color" content="#D2448D" />

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "DreamFox",
            url: "https://dreamfox.com",
            logo: "https://dreamfox.com/dreamfox_logo.png",
            description: finalDescription,
            sameAs: [
              "https://twitter.com/dreamfoxstudio",
              "https://linkedin.com/company/dreamfox",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              url: "https://dreamfox.com/contactus",
            },
          }),
        }}
      />
    </Head>
  );
};

export default SEOHead;

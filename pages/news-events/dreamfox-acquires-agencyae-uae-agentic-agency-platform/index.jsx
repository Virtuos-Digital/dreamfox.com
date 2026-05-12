import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  UserIcon,
  CalendarDaysIcon,
  ShareIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import TextReveal from "@/components/Text Reveal/textreveal";
import Link from "next/link";
import ShareModal from "@/components/SocialShare/Sharemodal";
import { useRouter } from "next/router";

const NewsDetailPage = () => {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const router = useRouter();

  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    handleRouteChange();
  }, [router.asPath, router.events]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const animateElements = () => {
      if (headerRef.current) {
        headerRef.current.style.opacity = "0";
        headerRef.current.style.transform = "translateY(-20px)";
        setTimeout(() => {
          headerRef.current.style.transition = "all 0.8s ease-out";
          headerRef.current.style.opacity = "1";
          headerRef.current.style.transform = "translateY(0)";
        }, 100);
      }

      if (heroRef.current) {
        heroRef.current.style.opacity = "0";
        heroRef.current.style.transform = "translateY(30px)";
        setTimeout(() => {
          heroRef.current.style.transition = "all 1s ease-out 0.3s";
          heroRef.current.style.opacity = "1";
          heroRef.current.style.transform = "translateY(0)";
        }, 300);
      }

      if (contentRef.current) {
        contentRef.current.style.opacity = "0";
        contentRef.current.style.transform = "translateY(40px)";
        setTimeout(() => {
          contentRef.current.style.transition = "all 1s ease-out 0.6s";
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "translateY(0)";
        }, 600);
      }

      if (sidebarRef.current) {
        sidebarRef.current.style.opacity = "0";
        sidebarRef.current.style.transform = "translateX(30px)";
        setTimeout(() => {
          sidebarRef.current.style.transition = "all 1s ease-out 0.9s";
          sidebarRef.current.style.opacity = "1";
          sidebarRef.current.style.transform = "translateX(0)";
        }, 900);
      }
    };

    animateElements();
  }, []);

  const article = {
    id: 1,
    title:
      "DreamFox Acquires Agency.ae to Launch UAE's Next-Generation Agentic Agency Platform",
    category: "Acquisition",
    tags: ["ACQUISITION", "PRESS RELEASES"],
    author: "DreamFox Communications",
    date: "May 12, 2026",
    location: "Dubai",
    readTime: "5 min read",
    image: "/images/Agency_ae_News_Release.webp",
    excerpt:
      '"Agency.ae represents the future of digital agency operations — autonomous, intelligent, scalable, and experience-led. Our vision is to build the UAE\'s most advanced agentic agency platform that combines AI velocity with world-class creative and operational excellence." — Venky Vijay Reddi, Founder, DreamFox',
    content: `
    <p>DreamFox, the modern digital transformation and AI-driven brand agency from Virtuos Digital (VDC.com), today announced the strategic acquisition of Agency.ae, marking its official expansion into the United Arab Emirates and the broader Middle East market.</p>

    <p class="my-4">Built on a powerful Agentic AI infrastructure, Agency.ae is being launched as a first-of-its-kind, AI-native and agentic-powered digital agency ecosystem designed to virtually deliver world-class branding, digital marketing, AI marketing operations, content intelligence, SEO transformation, customer engagement, and growth acceleration services across industries.</p>

    <p>Launching officially in May 2026, Agency.ae aims to become the UAE's most advanced one-stop destination for consuming intelligent agency services at enterprise scale.</p>

    <h3 class="text-20 my-4 font-semibold">A New Era of Agentic Agency Operations</h3>
    <p>Powered end-to-end by Agentic AI Infrastructure, the platform introduces autonomous, always-on operational intelligence across:</p>
    <ul class="list-disc pl-6 my-4 space-y-1">
      <li>AI Marketing Operations</li>
      <li>Digital Branding &amp; Identity</li>
      <li>SEO &amp; Search Intelligence</li>
      <li>Social Media Experience Management</li>
      <li>AI Content Engineering</li>
      <li>Performance Marketing</li>
      <li>Customer Experience Campaigns</li>
      <li>Creative Automation</li>
      <li>AI Studio &amp; Media Services</li>
      <li>Demand Generation &amp; Growth Systems</li>
      <li>Brand Reputation &amp; Listening Intelligence</li>
      <li>Omnichannel Engagement Operations</li>
    </ul>
    <p>Unlike traditional agencies, Agency.ae combines human creativity with autonomous AI execution models to deliver faster outcomes, intelligent automation, and scalable digital experiences.</p>

    <h3 class="text-20 my-4 font-semibold">UAE: The Emerging Global Hub for AI &amp; Agentic Infrastructure</h3>
    <p>As the UAE rapidly transforms itself into one of the world's most progressive destinations for Artificial Intelligence, Digital Economy, and autonomous enterprise innovation, DreamFox believes the timing is ideal to introduce a future-ready agency operating model.</p>
    <p class="my-4">Agency.ae is designed to empower Startups, Mid-market companies, Large enterprises, Government organizations, and Digital-first brands with highly scalable, AI-powered agency operations delivered virtually and continuously.</p>

    <h3 class="text-20 my-4 font-semibold">India Delivery Center: Speed, Scale &amp; 24x7 AI Operations</h3>
    <p>The backbone of Agency.ae operations will be supported through DreamFox's India Delivery Center, enabling round-the-clock AI-powered execution, rapid deployment cycles, continuous campaign optimization, global delivery efficiency, and intelligent platform operations at scale.</p>
    <p class="my-4">This model combines UAE market proximity with India's technology and AI operational excellence.</p>

    <h3 class="text-20 my-4 font-semibold">Powered by the Virtuos Digital Ecosystem</h3>
    <p>DreamFox is an integral part of Virtuos Digital (VDC.com) and brings together capabilities across branding, customer experience, digital transformation, AI enablement, and marketing intelligence through strategic alliances including EnBrand, Audacis, and top-tier marketing alliances with Salesforce, Oracle, Optimizely, and Adobe.</p>

    <h3 class="text-20 my-4 font-semibold">Building UAE's First Business Evangelist Ecosystem</h3>
    <p>Agency.ae will also establish a premium network of business evangelists, strategists, AI specialists, creative experts, and customer experience teams to deliver high-standard agency operations tailored for the region's evolving digital economy.</p>

    <h3 class="text-20 my-4 font-semibold">About Agency.ae</h3>
    <p>Agency.ae — Your Ultimate Destination for Agentic Marketing Services. Powered by DreamFox and Virtuos Digital, Agency.ae is the UAE's first AI-native and agentic-powered digital agency ecosystem delivering world-class branding, marketing, SEO, content intelligence, and growth acceleration services at enterprise scale. Visit <a href="https://www.agency.ae" target="_blank" rel="noopener noreferrer" class="text-[#ea4079] hover:text-[#ff5a9a] underline transition-colors">www.agency.ae</a>.</p>

    <h3 class="text-20 my-4 font-semibold">About DreamFox</h3>
    <p>DreamFox is a next-generation Digital, Design, and AI Marketing Agency specializing in brand architecture, design experience (DXP), and AI-powered marketing, content, and social media management. With deep ties to Virtuos Digital (vdc.com) and strategic partnerships with Salesforce, Oracle, Adobe, and Microsoft, DreamFox delivers business transformation, brand elevation, and scalable digital success for enterprises worldwide.</p>

    <p class="my-4">For more information visit us at <a href="https://www.dreamfox.com" target="_blank" rel="noopener noreferrer" class="text-[#ea4079] hover:text-[#ff5a9a] underline transition-colors">www.dreamfox.com</a>.</p>
  `,
  };

  const relatedArticles = [
    {
      id: 1,
      title:
        "DreamFox Acquires Yippee Media — Expanding the Creative Intelligence Frontier",
      date: "November 14, 2025",
      slug: "dreamfox-acquires-yippee-media",
      image: "/images/dreamfox_yippeemedia.webp",
    },
    {
      id: 2,
      title:
        "DreamFox + EnBrand Unite to Offer Integrated Branding and Digital Experience Solutions",
      date: "November 14, 2025",
      slug: "dreamfox-enbrand-unite-integrated-branding-digital-experience-solutions",
      image: "/images/dreamfox_enbrand_branding.webp",
    },
    {
      id: 3,
      title:
        "DreamFox Develops PlumJob.com Brand Through Its Designara™ Experience Services",
      date: "November 14, 2025",
      slug: "dreamfox-develops-plumjob-brand-designara-experience-services",
      image: "/images/DreamForce_Plumjob_designara.webp",
    },
  ];

  return (
    <div className="min-h-screen pt-28 sm:pt-44 bg-gradient-to-br relative from-black via-gray-900 to-black pb-16 lg:pb-32">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pb-16">
        <div className="container mx-auto px-6 xl:border-b-[0.5px] xl:py-20 xl:border-t-[0.5px] border-gray-700">
          <div className="mx-auto flex flex-col lg:flex-row gap-6 xl:gap-20 items-center">
            {/* Title */}
            <div className="lg:w-1/2">
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="text-[#ea4079] text-16 font-semibold uppercase rounded-sm">
                  {article.category}
                </span>
              </div>
              <TextReveal
                className="text-60 font-bold text-white mb-8 leading-tight"
                animation="fadeInUp"
                stagger={0.1}
                duration={1}
              >
                {article.title}
              </TextReveal>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-start gap-6 text-gray-400 mb-12">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5" />
                  <span>
                    {article.date}, {article.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:w-1/2 rounded-lg overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[400px] md:h-[500px] object-right    object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="xl:py-16 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div
              ref={contentRef}
              className="lg:col-span-3 sm:border-r-[0.5px] sm:pr-12 border-gray-700"
            >
              <div>
                {/* Article Content */}
                <div
                  className="prose prose-invert prose-lg max-w-none"
                  style={{
                    color: "#d1d5db",
                    lineHeight: "1.8",
                  }}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Quote */}
                <div className="my-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
                  <p className="text-lg text-gray-300 leading-relaxed italic">
                    {article.excerpt}
                  </p>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-medium">
                      Share this article
                    </span>
                    <ShareModal
                      url={
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      }
                      title={article.title}
                      description=""
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div ref={sidebarRef} className="lg:col-span-1 sticky top-64">
              <div className="sticky top-64 space-y-12">
                {/* Related Articles */}
                <div className="shadow-2xl border-b-[0.5px] pb-12 border-gray-700">
                  <h3 className="text-20 border-l-2 border-[#ea4079] pl-2 font-bold text-white mb-6">
                    Related Articles
                  </h3>
                  <div className="flex flex-col gap-6">
                    {relatedArticles.map((related) => (
                      <Link
                        href={`/news-events/${related.slug}`}
                        key={related.id}
                        className="group cursor-pointer"
                      >
                        <div className="flex gap-4">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-20 h-20 object-cover rounded-xl bg-white/5 border border-white/10"
                          />
                          <div className="flex-1">
                            <h4 className="text-white line-clamp-2 text-16 font-medium leading-tight group-hover:text-pink-500 transition-colors duration-300 mb-2">
                              {related.title}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {related.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-black/10 via-gray- to-[#ea4079] border border-[#ea4079] backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-30 text-center font-bold text-[#fff] mb-2">
                    Discover
                  </h3>
                  <p className="text-[#fff] text-24 text-center mb-6">
                    What Dreamfox can do for you.
                  </p>
                  <div className="space-y-4">
                    <Link href={"/contactus"}>
                      <button className="w-full text-black bg-gradient-to-r from-[#fff] to-[#fff] hover:text-black font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-300">
                        Talk to an Expert
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .prose h3 {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .prose ul {
          margin-bottom: 1.5rem;
        }

        .prose li {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default NewsDetailPage;

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  UserIcon,
  CalendarDaysIcon,
  ArrowTopRightOnSquareIcon,
  ShareIcon,
  BookmarkIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";
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

  const handleShareJob = async () => {
    try {
      // Get current URL
      const currentUrl = window.location.href;

      // Copy to clipboard
      await navigator.clipboard.writeText(currentUrl);

      // Show success message
      setShowCopyMessage(true);

      // Hide message after 3 seconds
      setTimeout(() => {
        setShowCopyMessage(false);
      }, 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      // Show success message
      setShowCopyMessage(true);
      setTimeout(() => {
        setShowCopyMessage(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      // Scroll to top when route changes
      window.scrollTo(0, 0);

      // Alternative: For smooth scroll behavior
      // window.scrollTo({
      //   top: 0,
      //   left: 0,
      //   behavior: 'smooth'
      // });
    };

    handleRouteChange();
  }, [router.asPath, router.events]);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Animate elements on load
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

  // Mock data
  // Mock data
  const article = {
    id: 1,
    title:
      "DreamFox + EnBrand Unite to Offer Integrated Branding and Digital Experience Solutions",
    category: "Company News",
    tags: ["ACQUISITION", "GROWTH", "CREATIVE INTELLIGENCE"],
    author: "DreamFox Communications",
    date: "November 14, 2025",
    readTime: "4 min read",
    image: "/images/dreamfox_enbrand_branding.webp",
    excerpt:
      "Our partnership with EnBrand allows DreamFox to complete its vision of becoming a full-spectrum digital and brand powerhouse,” said a spokesperson for DreamFox. “We’re merging analytics, design, and human experience to build brands that thrive in the AI age.",
    content: `
    <p>DreamFox, the Digital + AI Marketing Agency, has announced a strategic collaboration with EnBrand, a specialized Brand Experience and Digital Transformation firm, to deliver integrated branding, experience design, and AI-powered marketing under one umbrella.
</p>
    
    <p class="my-4">The collaboration positions DreamFox as a holistic growth partner for enterprises seeking end-to-end digital and brand transformation. Through the EnBrand Suite, the partnership enables organizations to measure brand equity, user experience, and engagement performance in real time—combining insights, creativity, and intelligence.

</p>
    
<p>

The collaboration will strengthen DreamFox’s position across AI Marketing, Designara™ Experience Design, Brand Strategy, and Content + Media Operations, providing a unified framework for innovation, agility, and measurable growth.


</p>

    <h3 class="text-20 my-4 font-semibold">About DreamFox</h3>
    <p>"DreamFox is a next-generation Digital, Design, and AI Marketing Agency specializing in brand architecture, design experience (DXP), and AI-powered marketing, content, and social media management. With deep ties to Virtuos Digital (vdc.com) and partnerships with Salesforce, Oracle, Adobe, and Microsoft, DreamFox enables enterprises worldwide to scale brands, experiences, and digital transformation outcomes.
"</p>
    
   

    <p>For more information visit us at <a href="https://www.dreamfox.com" target="_blank" rel="noopener noreferrer" class="text-[#ea4079] hover:text-[#ff5a9a] underline transition-colors">www.dreamfox.com</a>.</p>
  `,
  };

  const relatedArticles = [
    {
      id: 2,
      title:
        "DreamFox Develops PlumJob.com Brand Through Its Designara™ Experience Services",
      date: "November 14, 2025",
      slug: "dreamfox-develops-plumjob-brand-designara-experience-services",
      image: "/images/DreamForce_Plumjob_designara.webp",
    },
    {
      id: 3,
      title:
        "PlumJob to Launch Dxpify — DXP-as-a-Service Platform Developed by DreamFox",
      date: "November 14, 2025",
      slug: "plumjob-launch-dxpify-dxp-as-a-service-developed-by-dreamfox",
      image: "/images/Dreamfox_dxify.webp",
    },
    {
      id: 1,
      title:
        "DreamFox Acquires Yippee Media — Expanding the Creative Intelligence Frontier",
      date: "November 14, 2025",
      slug: "dreamfox-acquires-yippee-media",

      image: "/images/dreamfox_yippeemedia.webp",
    },
  ];

  return (
    <div className="min-h-scree  pt-28 sm:pt-44 bg-gradient-to-br relative from-black via-gray-900 to-black pb-16 lg:pb-32">
      {/* Navigation */}
      {/* <nav ref={headerRef} className="bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group">
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to News</span>
          </button>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
              <ShareIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
              <BookmarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section ref={heroRef} className="relative pb-16  ">
        <div className="container mx-auto px-6 xl:border-b-[0.5px] xl:py-20 xl:border-t-[0.5px] border-gray-700">
          <div className=" mx-auto flex flex-col lg:flex-row gap-6 xl:gap-20 items-center ">
            {/* Category and Tags */}

            {/* Title */}
            <div className="lg:w-1/2">
              <div className="flex flex-wrap gap-3 mb-8">
                <span className=" text-[#ea4079] text-16 font-semibold uppercase  rounded-sm">
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
              <div className=" flex flex-wrap items-center justify-start gap-6 text-gray-400 mb-12">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5" />
                  <span>{article.date}</span>
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
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="xl:py-16 relative">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div
              ref={contentRef}
              className="lg:col-span-3 sm:border-r-[0.5px] sm:pr-12  border-gray-700"
            >
              <div className=" ">
                {/* Excerpt */}

                {/* Article Content */}
                <div
                  className="prose prose-invert prose-lg max-w-none"
                  style={{
                    color: "#d1d5db",
                    lineHeight: "1.8",
                  }}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <div className="my-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
                  <p className="text-lg text-gray-300 leading-relaxed italic">
                    {article.excerpt}
                  </p>
                </div>

                {/* Share Section */}
                <div className="mt-12  pt-8 border-t border-white/10">
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
                      // buttonText="Share Article"
                      title={article.title}
                      description=""
                    />
                    {/* <div className="flex relative items-center gap-3">
                      <button
                        onClick={handleShareJob}
                        className="bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <ShareIcon className="w-5 h-5" />
                      </button>
                      {showCopyMessage && (
                        <div className="absolute top-1.5 right-15 z-[100] border border-white text-gray-400 px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 animate-pulse">
                          
                          <span className="font-medium text-xs">Copied!</span>
                        </div>
                      )}
                     
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div ref={sidebarRef} className="lg:col-span-1 sticky top-64">
              <div className="sticky top-64 space-y-12">
                {/* Related Articles */}
                <div className=" shadow-2xl  border-b-[0.5px] pb-12  border-gray-700">
                  <h3 className="text-20 border-l-2 border-[#ea4079] pl-2 font-bold text-white mb-6">
                    Related Articles
                  </h3>
                  <div className="flex flex-col gap-6">
                    {relatedArticles.map((related) => (
                      <Link
                        href={`/news-events/${related.slug}`}
                        key={related.id}
                        className="group cursor-pointer "
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

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-black/10 via-gray- to-[#ea4079] border border-[#ea4079] backdrop-blur-xl  rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-30 text-center font-bold text-[#fff] mb-2">
                    Discover
                  </h3>
                  <p className="text-[#fff] text-24 text-center mb-6">
                    What Dreamfox can do for you.
                  </p>
                  <div className="space-y-4">
                    {/* <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:bg-white/10 transition-all outline-none"
                    /> */}
                    <Link href={"/contactus"}>
                      <button className="w-full text-black bg-gradient-to-r from-[#fff] to-[#fff]  hover:text-black     font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-300 ">
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
      `}</style>
    </div>
  );
};

export default NewsDetailPage;

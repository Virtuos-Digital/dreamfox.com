import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { CalendarIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NewsCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef(null);
  const searchRef = useRef(null);
  const articlesRef = useRef(null);

  // Dummy news data
  // Updated news data with real DreamFox content
  const newsData = [
    {
      id: 1,
      title:
        "DreamFox + EnBrand Unite to Offer Integrated Branding and Digital Experience Solutions",
      category: "Partnership",
      tags: ["PARTNERSHIP", "COMPANY NEWS"],
      author: "DreamFox Team",
      slug: "dreamfox-enbrand-unite-integrated-branding-digital-experience-solutions",
      date: "Nov 14, 2025",

      image: "/images/dreamfox_enbrand_branding.webp",
      imageAlt: "DreamFox and EnBrand strategic collaboration",
      excerpt:
        "DreamFox announces strategic collaboration with EnBrand to deliver integrated branding, experience design, and AI-powered marketing under one umbrella, positioning as a holistic growth partner for enterprises.",
    },
    {
      id: 2,
      title:
        "DreamFox Develops PlumJob.com Brand Through Its Designara™ Experience Services",
      category: "Product Launch",
      tags: ["PRODUCT LAUNCH", "DESIGNARA™"],
      slug: "dreamfox-develops-plumjob-brand-designara-experience-services",

      author: "DreamFox Team",
      date: "Nov 14, 2025",
      image: "/images/DreamForce_Plumjob_designara.webp",
      imageAlt: "PlumJob.com brand development",
      excerpt:
        "DreamFox unveils PlumJob.com, a next-generation HRTech and Talent Experience platform designed for the modern technology workforce, built through Designara™ Experience Design practice.",
    },
    {
      id: 3,
      title:
        "PlumJob to Launch Dxpify — DXP-as-a-Service Platform Developed by DreamFox",
      category: "Technology",
      tags: ["TECHNOLOGY", "DXP", "PLATFORM LAUNCH"],
      slug: "plumjob-launch-dxpify-dxp-as-a-service-developed-by-dreamfox",

      author: "DreamFox Team",
      date: "Nov 14, 2025",
      image: "/images/Dreamfox_dxify.webp",

      imageAlt: "Dxpify DXP-as-a-Service platform",
      excerpt:
        "DreamFox announces the upcoming launch of Dxpify.com, a groundbreaking Digital Experience Platform (DXP-as-a-Service) that enables brands to rapidly design, deliver, and scale next-generation digital experiences.",
    },
  ];

  const categories = [
    "All Categories",
    "Partnership",
    "Product Launch",
    "Technology",
  ];

  // Filter articles based on category and search
  const filteredArticles = newsData.filter((article) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className=" py-16 md:py-44 bg-black ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            Latest News & Events
          </h1>
          <p className="text-20 text-gray-300 max-w-3xl mx-auto">
            Stay updated with our latest achievements, company news, and
            industry insights
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col xl:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative 2xl:flex-1 max-w-2xl 2xl:max-w-md">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 size-6 z-20 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search news and articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-sm sm:min-w-md bg-white/5 backdrop-blur-xl border border-white/20 rounded-full pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-white/40 focus:bg-white/10 transition-all duration-300 outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#ee5363] to-[#e62f8c] text-white shadow-lg transform"
                      : "bg-white/5 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div
          ref={articlesRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-8 mt-20"
        >
          {filteredArticles.map((article, index) => (
            <Link
              href={`/news-events/${article.slug}`}
              key={article.id}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden  hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:transform hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute -inset-2 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center gap-1 text-[6px] font-medium text-gray-400 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 py-1"
                    >
                      <TagIcon className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-20 font-bold text-white leading-tight group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {/* <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div> */}
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link
                    href={`/news-events/${article.slug}`}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 group/btn"
                  >
                    <span>Read More</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
              <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-20 font-semibold text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default NewsCategory;

import React, { useEffect, useRef } from "react";
import BannerTextReveal from "../Text Reveal/bannertextreveal";
import TextReveal from "../Text Reveal/textreveal";
import Image from "next/image";
import Link from "next/link";

// Simulating GSAP for animations since we can't import external libraries
// In a real Next.js project, you would: npm install gsap

const NewsroomPage = () => {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Simulate GSAP timeline animations
    const animateElements = () => {
      // Header animation
      if (headerRef.current) {
        headerRef.current.style.opacity = "0";
        headerRef.current.style.transform = "translateY(-20px)";
        setTimeout(() => {
          headerRef.current.style.transition = "all 0.8s ease-out";
          headerRef.current.style.opacity = "1";
          headerRef.current.style.transform = "translateY(0)";
        }, 100);
      }

      // Hero text animation
      if (heroRef.current) {
        heroRef.current.style.opacity = "0";
        heroRef.current.style.transform = "translateY(30px)";
        setTimeout(() => {
          heroRef.current.style.transition = "all 1s ease-out 0.3s";
          heroRef.current.style.opacity = "1";
          heroRef.current.style.transform = "translateY(0)";
        }, 300);
      }

      // Buttons animation
      if (buttonsRef.current) {
        buttonsRef.current.style.opacity = "0";
        buttonsRef.current.style.transform = "translateY(20px)";
        setTimeout(() => {
          buttonsRef.current.style.transition = "all 0.8s ease-out 0.6s";
          buttonsRef.current.style.opacity = "1";
          buttonsRef.current.style.transform = "translateY(0)";
        }, 600);
      }

      // Card animation
      if (cardRef.current) {
        cardRef.current.style.opacity = "0";
        cardRef.current.style.transform = "translateY(40px) scale(0.95)";
        setTimeout(() => {
          cardRef.current.style.transition = "all 1s ease-out 0.9s";
          cardRef.current.style.opacity = "1";
          cardRef.current.style.transform = "translateY(0) scale(1)";
        }, 900);
      }
    };

    animateElements();
  }, []);

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/20 via-black/70 to-transparent -z-5"></div>
      <div className=" container pt-32 sm:pt-64 min-h-screen ">
        {/* Header */}
        {/* Black gradient overlay at bottom - stronger version */}

        <Image
          src={"/images/news.jpg"}
          alt="News"
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-[15%]"
        />
        <header ref={headerRef} className="pt-8 pb-4">
          <div className=" mx-auto sm:px-6">
            <div className="text-[#e83584] text-20 font-semibold tracking-wider uppercase mb-2">
              NEWS AND PRESS
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className=" mx-auto sm:px-6">
          <div className="max-w-7xl">
            <BannerTextReveal
              titleClassName="text-white text-130 font-bold leading-tight"
              descriptionClassName="text-24 text-white max-w-7xl"
              title="News and Events"
              description="News and announcements featuring our solutions, team, and company."
            />
          </div>
          {/* <div ref={heroRef} className="mb-12">
          <h1 className="text-120 font-semibold text-gray-100 mb-6 leading-tight">
            Newsroom
          </h1>
          <p className="text-20 text-gray-600 max-w-2xl leading-relaxed">
            News and announcements featuring our solutions, team, and company.
          </p>
        </div> */}

          {/* Action Buttons */}
          {/* <div ref={buttonsRef} className="flex gap-4 mb-16">
          <button className="bg-[#e83584] hover:bg-pink-600 text-white sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Media inquiry →
          </button>
          <button className="border border-[#e83584] text-[#e83584] hover:bg-pink-50 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Media kit
          </button>
        </div> */}

          {/* News Card */}
          <div ref={cardRef} className=" mt-16 xl:mt-24">
            <div className="bg-gradient-to-r from-black/10 via-gray- to-[#ea4079] border border-[#ea4079] backdrop-blur-xl  rounded-3xl  shadow-2xl p-4 sm:p-10 flex flex-col lg:flex-row overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              {/* Card Header */}
              <div className="relative lg:w-1/2">
                <div className=" h-full flex items-center justify-center rounded-2xl relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e83584]/20 to-transparent"></div>
                  </div>

                  {/* Logos */}
                  <Image
                    src={"/images/dreamfox_yippeemedia.webp"}
                    alt="News"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="lg:p-8 py-4 lg:py-0 lg:w-1/2">
                <div className=" text-white flex gap-2">
                  <span className="text-[#e83584] bg-white px-3 py-1 rounded-full text-xs flex items-center justify-center font-medium">
                    PRESS RELEASES
                  </span>
                  |
                  <span className="bg-transparent text-white border  px-3 py-1 rounded-full text-xs lex items-center justify-center font-medium">
                    COMPANY NEWS
                  </span>
                </div>
                <p
                  className="text-30 mt-4 sm:mt-10 font-light text-gray-50 mb-4 sm:mb-6 leading-tight hover:text-gray-100 transition-colors duration-300"
                  // animation="rotateX"
                  // stagger={0.1}
                  // delay={0.1}
                  // duration={0.5}
                >
                  {/* <h2 c> */}
                  DreamFox Acquires Yippee Media — Expanding the Creative
                  Intelligence Frontier
                  {/* </h2> */}
                </p>
                <p className="text-white line-clamp-3 text-16 mb-6 leading-relaxed">
                  DreamFox, the Digital + AI Marketing Agency, today announced
                  the successful acquisition of Yippee Media, a fast-rising
                  creative communications company. The move strengthens
                  DreamFox’s integrated marketing and digital design
                  capabilities across global markets.
                </p>
                <div className="flex items-center gap-3 mb-6 sm:mb-10">
                  {/* <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">V</span>
                  </div> */}
                  <div className="text-gray-50">
                    {/* <span className="text-sm">Written by </span>
                    <span className="font-medium text-gray-100">
                      Venky Vijay Reddi
                    </span> */}
                    <span className="text-sm">
                      {" "}
                      November 14, 2025, Gurugram
                    </span>
                  </div>
                </div>

                <Link
                  href={`/news-events/dreamfox-acquires-yippee-media`}
                  className="text-[#fff] hover:bg-transparent hover:border hover:text-white border-white border-3 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg group px-6"
                >
                  Read More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer spacing */}
      </div>
    </div>
  );
};

export default NewsroomPage;

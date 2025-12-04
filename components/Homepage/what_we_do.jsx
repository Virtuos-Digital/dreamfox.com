"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../Text Reveal/textreveal";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
const slides = [
  {
    link: "/services/brand-advisory",
    image: "/images/home/brandlara_advisory.webp",
    title: "Brandlara Advisory",
    description: "Strategy, storytelling, and identity that connect deeply.",
  },
  {
    link: "/services/design-studio",
    image: "/images/home/designara_studio.webp",
    title: "Designará Studio",
    description: "Fusing form, function, and emotional resonance.",
  },
  {
    link: "/services/digital-marketing",
    image: "/images/home/assimilations.webp",
    title: "Assimilations",
    description: "Performance Marketing and Platform in perfect harmony.",
  },
  {
    link: "/services/digital-media-mix",
    image: "/images/home/yippee_media.webp",
    title: "Yippee Media",
    description: "Videos, memes, shorts—all with a marketing soul.",
  },
];
const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardRefs = useRef([]);
  // const [isDesktop, setIsDesktop] = useState(false);

  useGSAP(() => {
    // ScrollTrigger.defaults({
    //   scroller: "#smooth-content", // ✅ Required for ScrollSmoother
    // });
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 801px)": function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              // end: `+=${slides.length * 700}`,
              // end: `+=${slides.length * 700}`,
              end: "bottom top-=40%",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              markers: false,
            },
          });

          // Animate heading and text
          tl.from(textRef.current, {
            opacity: 0,
            y: 60,
            duration: 1.5,
            ease: "power2.out",
          });

          // Reveal cards wrapper
          tl.to(cardsWrapperRef.current, {
            opacity: 1,
            duration: 1,
          });

          // Animate each card stacked in exact center
          slides.forEach((_, i) => {
            const card = cardRefs.current[i];
            const zIndex = 10 + i; // Higher z-index for later cards

            tl.fromTo(
              card,
              {
                x: "25vw",
                opacity: 0,
              },
              {
                x: 0,
                opacity: 1,
                zIndex,
                duration: 5,
                ease: "power2.inOut",
              },
              "+=5"
            );
          });
        },
        "(max-width: 800px)": function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 5%",
              end: "bottom top-=40%",

              scrub: 1,
              pin: true,
              pinSpacing: true,
              markers: false,
            },
          });

          // Animate heading and text
          tl.from(textRef.current, {
            opacity: 0,
            y: 60,
            duration: 1.5,
            ease: "power2.out",
          });

          // Reveal cards wrapper
          tl.to(cardsWrapperRef.current, {
            opacity: 1,
            duration: 1,
          });

          // Animate each card stacked in exact center
          slides.forEach((_, i) => {
            const card = cardRefs.current[i];
            const zIndex = 10 + i; // Higher z-index for later cards

            tl.fromTo(
              card,
              {
                x: "30vw",
                opacity: 0,
              },
              {
                x: 0,
                opacity: 1,
                zIndex,
                duration: 1,
                ease: "power2.out",
              },
              `+=0.7`
            );
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen sm:min-h-[70vh] w-full overflow-hidden  text-white"
    >
      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 py-8 md:py-0">
        {/* Left Text Column */}
        <div
          // ref={textRef}
          className="w-full md:w-1/3 z-10 text-center md:text-left"
        >
          <TextReveal
            animation="rotateX"
            stagger={0.1}
            duration={0.8}
            className="text-60 whitespace-nowrap font-semibold mb-4 md:mb-6 text-[#ec4672] mt-10 md:mt-0"
          >
            What we do
          </TextReveal>
          <TextReveal
            animation="rotateX"
            stagger={0.1}
            duration={0.5}
            className="text-30 text-gray-300 max-w-md mx-auto md:mx-0"
          >
            At DreamFox, we go far beyond simply offering digital services — we
            architect meaningful brand journeys from the ground up.
          </TextReveal>
        </div>

        {/* Right Cards Stack */}
        <div
          ref={cardsWrapperRef}
          className="w-full md:w-2/3 h-[500px] relative opacity-0 flex items-center justify-start"
        >
          <div className="relative w-full h-full max-w-none">
            {slides.map((slide, index) => (
              <Link
                href={slide.link}
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="card w-full cursor-pointer h-[300px] xs:h-[400px] md:h-[450px]  3xl:h-[660px] rounded-xl bg-gray-800 text-white absolute left-0 xs:top-1/2 top-1/3 -translate-y-1/2 shadow-2xl border border-white/20 p-6 flex flex-col"
                style={{
                  zIndex: 10 + index,
                }}
              >
                {/* Full-width image with dynamic height */}
                <div
                  className="w-full h-[85%] bg-cover bg-center rounded-lg mb-4"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                ></div>

                {/* Text below image */}
                <div className="flex flex-col justify-center  flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold mb-1">
                    {slide.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300  ">
                    {slide.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;

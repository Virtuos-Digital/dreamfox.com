"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../Text Reveal/textreveal";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    number: "01",
    heading: "Audacis SEO",
    description:
      "Boost your website's visibility and rankings with our comprehensive SEO strategies that drive organic traffic.",
    image: "/images/audacis_dreamfox.webp",
  },
  {
    number: "02",
    heading: "OutLaunch",
    description:
      "Engage your audience across all social platforms with compelling content and strategic campaigns.",
    image: "/images/outlaunch_dreamfox.webp",
  },
  {
    number: "03",
    heading: "Assimilations",
    description:
      "Maximize your ROI with targeted pay-per-click campaigns that convert visitors into customers.",
    image: "/images/assimilations_dreamfox.webp",
  },
  {
    number: "04",
    heading: "Yippee Media",
    description:
      "Create valuable content that resonates with your audience and builds lasting brand connections.",
    image: "/images/yippeemedia_dreamfox.webp",
  },
];

const ServicesSectionDigitalM = () => {
  const containerRef = useRef(null);
  const textCardsRef = useRef([]);
  const imageCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textCards = textCardsRef.current;
      const imageCards = imageCardsRef.current;

      // GSAP MatchMedia for responsive animations
      const mm = gsap.matchMedia();

      // Mobile (up to 768px) - Horizontal animation
      mm.add("(max-width: 1268px)", () => {
        // Set initial positions - horizontal for mobile
        gsap.set(textCards.slice(1), { x: "120vw" });
        gsap.set(imageCards.slice(1), { x: "-120vw" });

        // Create timeline for mobile
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top+=10%",
            end: `+=${(servicesData.length - 1) * 170}vh`, // Shorter for mobile
            scrub: 3,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Add card transitions for mobile
        servicesData.forEach((_, index) => {
          if (index > 0) {
            const startTime = (index - 1) * 3;

            mobileTl
              .to(
                textCards[index],
                {
                  x: "0vw", // Horizontal movement for mobile
                  duration: 2.5,
                  ease: "power1.inOut",
                },
                startTime
              )
              .to(
                imageCards[index],
                {
                  x: "0vw", // Horizontal movement for mobile
                  duration: 2.5,
                  ease: "power1.inOut",
                },
                startTime
              );
          }
        });
      });

      // Desktop (768px and above) - Vertical animation
      mm.add("(min-width: 1269px)", () => {
        // Set initial positions - vertical for desktop
        gsap.set(textCards.slice(1), { y: "120vh" });
        gsap.set(imageCards.slice(1), { y: "-120vh" });

        // Create timeline for desktop
        const desktopTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top+=10%",
            end: `+=${(servicesData.length - 1) * 300}vh`,
            scrub: 4,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Add card transitions for desktop
        servicesData.forEach((_, index) => {
          if (index > 0) {
            const startTime = (index - 1) * 4;

            if (index % 2 === 1) {
              desktopTl
                .to(
                  textCards[index],
                  {
                    y: "0vh", // Vertical movement for desktop
                    duration: 3,
                    ease: "power1.inOut",
                  },
                  startTime
                )
                .to(
                  imageCards[index],
                  {
                    y: "0vh", // Vertical movement for desktop
                    duration: 3,
                    ease: "power1.inOut",
                  },
                  startTime
                );
            } else {
              desktopTl
                .to(
                  textCards[index],
                  {
                    y: "0vh", // Vertical movement for desktop
                    duration: 3,
                    ease: "power1.inOut",
                  },
                  startTime
                )
                .to(
                  imageCards[index],
                  {
                    y: "0vh", // Vertical movement for desktop
                    duration: 3,
                    ease: "power1.inOut",
                  },
                  startTime
                );
            }
          }
        });
      });

      return mm; // Return matchMedia instance for cleanup
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={containerRef}>
      <section className="relative xs:overflow-hidden h-screen bg-black">
        {/* Heading */}
        <div className="z-30 text-center">
          <TextReveal
            className="text-120 font-bold text-white mt-8 sm:mt-16 md:mt-28 2xl:mt-28"
            animation="rotateX"
            stagger={0.1}
            duration={0.8}
          >
            Our Services
          </TextReveal>
        </div>

        {/* Cards Container */}
        <div className="relative h-full w-full pt-16 md:pt-32 flex flex-col">
          {/* Text Cards */}
          <div className="absolute inset-0 flex ">
            {servicesData.map((service, index) => (
              <div
                key={`text-${index}`}
                ref={(el) => (textCardsRef.current[index] = el)}
                className="absolute top-0 left-0 w-full md:w-1/2 sm:h-1/2 md:h-full flex items-start z-20 "
              >
                <div className="w-full h-[35vh] md:h-[65vh] p-4 md:p-8 xl:ml-20">
                  <div className="w-full h-full bg-[#2b2725] border border-black rounded-3xl p-4 md:p-8 2xl:p-20 flex flex-col justify-between">
                    {/* <div className="sm:flex hidden  items-center gap-4">
                      <span className="text-40 md:text-80 font-black text-white  opacity-80">
                        {service.number}
                      </span>
                    </div> */}

                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-60 font-bold text-white mb-3 md:mb-6">
                        {service.heading}
                      </h3>
                      <p className="text-24 text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="text-80 md:text-200 font-black text-white opacity-70 text-right">
                      {service.number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Cards */}
          <div className="absolute inset-0 mt-8 sm:mt-0 flex h-[65vh]">
            {servicesData.map((service, index) => (
              <div
                key={`image-${index}`}
                ref={(el) => (imageCardsRef.current[index] = el)}
                className="absolute bottom-0 md:top-0 right-0 w-full md:w-1/2 h-1/2 md:h-full flex items-start z-10"
              >
                <div className="w-full h-full  p-4 md:p-8  xl:mr-20">
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[50vh] md:h-[50vh] lg:h-[85vh] xl:h-[90vh] 3xl:h-[80vh] 4xl:h-[90vh]  "></div>
    </div>
  );
};

export default ServicesSectionDigitalM;

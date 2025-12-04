"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../Text Reveal/textreveal";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    year: "2010",
    heading: "Started",
    description: "We laid the foundation of our journey with Yippee Media Services.",
    image: "/images/Started.webp",
  },
  {
    year: "2023",
    heading: "Built",
    description: "Structured core teams and systems for growth and launched Audacis.",
    image: "/images/Build.webp",
  },
  {
    year: "2024",
    heading: "Scaled",
    description: "Rapid expansion with new projects on Branding and partnerships.",
    image: "/images/Scaled.webp",
  },
  {
    year: "2025",
    heading: "Innovated",
    description: "DreamFox is born with a new ID—Tech, AI, and Digital Assimilations.",
    image: "/images/innovation.webp",
  },
];

const StackingCards = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll(".stacking-cards .card");
      const totalCards = cards.length - 1;
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 40; // pixels gap between cards
      // const visiblePortion = cardWidth * 0.13;
      // const stackOffset = cardWidth - visiblePortion; 
      
      // Move by 75% of card width
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cardWidth = cards[0]?.offsetWidth || 0;
        const visiblePortion = cardWidth * 0.13;
        const stackOffset = cardWidth - visiblePortion;

        gsap.to(cards, {
          x: (i) => -i * stackOffset,
          duration: (i) => 0.5 * i,
          ease: "none",
          scrollTrigger: {
            trigger: ".stacking-cards",
            pin: true,
            scrub: true,
            end: `+=${totalCards * 150}% bottom`,
            anticipatePin: 1,
          },
        });
      });

      mm.add("(max-width: 768px)", () => {
        const cardWidth = cards[0]?.offsetWidth || 0;
        const visiblePortion = cardWidth * 0; // Show more on tablet
        const stackOffset = cardWidth - visiblePortion;

        gsap.to(cards, {
          x: (i) => -i * stackOffset,
          duration: (i) => 0.6 * i,
          ease: "none",
          scrollTrigger: {
            trigger: ".stacking-cards",
            pin: true,
            scrub: true,
            end: `+=${totalCards * 120}% bottom`,
            anticipatePin: 1,
          },
        });
      });

      // Mobile (below 768px)
      // mm.add("(max-width: 767px)", () => {
      //   // Reset any transforms
      //   gsap.set(cards, { x: 0 });

      //   // Create vertical scroll animation for mobile
      //   cards.forEach((card, index) => {
      //     gsap.fromTo(card, 
      //       {
      //         opacity: 0,
      //         y: 100,
      //         scale: 0.9
      //       },
      //       {
      //         opacity: 1,
      //         y: 0,
      //         scale: 1,
      //         duration: 0.8,
      //         ease: "power2.out",
      //         scrollTrigger: {
      //           trigger: card,
      //           start: "top 80%",
      //           end: "bottom 20%",
      //           toggleActions: "play reverse play reverse",
      //         }
      //       }
      //     );
      //   });
      // }); 
      // gsap.to(cards, {
      //   x: (i) => -i * stackOffset,
      //   duration: (i) => 0.5 * i,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: ".stacking-cards",
      //     pin: true,
      //     scrub: true,
      //     end: `+=${totalCards * 100}% bottom`,
      //   },
      // });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="stacking-cards relative flex flex-col items-center justify-center overflow-hidden h-screen">
        <div className="text-center mt-40 mb-12">
          <TextReveal
            className="text-120 font-bold text-white"
            animation="rotateX"
            stagger={0.1}
            duration={0.8}
          >
            Our Story
          </TextReveal>

          
        </div>

        <div className="w-full h-full 2xl:mb-0 mb-60">
          <div className="w-full h-full px-5 md:px-20">
            <div className="flex h-full container  stacking-cards  card-stack gap-x-10 ">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="card flex-shrink-0 w-full  h-[60vh] border-1 border-white card-container-pink rounded-4xl "
                >
                  <div className="flex flex-col sm:flex-row h-full  overflow-hidden card-container-pink bg-black/10 backdrop-blur-2xl 0 rounded-4xl">
                    {/* Left */}
                    <div className="flex lg:w-1/2 flex-col gap-5 justify-start sm:pl-12 lg:pl-64 pr-24 sm:pr-4 p-10 sm:p-0 sm:pt-[68px] bg-black/10">
                      <div className="hidden lg:block  text-250 absolute xl:-left-20 xl:top-32  sm:top-20 lg:top-32 lg:-left-28 2xl:-left-32 3xl:-left-36 3xl:top-48 5xl:top-72 -rotate-90 font-semibold text-gray-300/20">
                        {card.year}
                      </div>

                      <div className="lg:hidden  text-[7rem] absolute  top-32 md:top-64 font-semibold text-gray-300/20">
                        {card.year}
                      </div>
                      <div className="text-48 text-white font-bold mt-2">
                        {card.heading}
                      </div>
                      <div className="text-30 text-gray-300 leading-relaxed ">
                        {card.description}
                      </div>
                      {/* <div className="text-250   font-semibold text-gray-50/10">
                        {card.year}
                      </div>
                      <div className="text-250   font-semibold text-gray-200/10">
                        {card.year}
                      </div> */}
                      {/* <div className="text-48 font-extrabold text-black opacity-10">
                        {index + 1}
                      </div> */}
                    </div>

                    {/* Right */}
                    <div className=" h-full lg:w-1/2">
                      <img
                        src={card.image}
                        alt={card.heading}
                        className="w-full grayscale-100 h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StackingCards;

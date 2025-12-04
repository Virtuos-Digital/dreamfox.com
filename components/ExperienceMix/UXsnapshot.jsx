import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const UXSnapshot = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const contentCardsRef = useRef([]);

  const cardData = [
    {
      id: 1,
      img: "/images/vsys.webp",
      url: "/work-portfolio/vsys-case-study",
      title: "From Our UXBook",
      description:
        "Deep dive into user behavior and needs to create meaningful experiences.",
      bgColor: "bg-[#1a4be5]", // Dark navy blue
    },
    {
      id: 2,
      type: "video",
      videoSrc: "/videos/Brand_Design_Dreamfox.mp4",
      poster: "/images/marketing-mix/2.jpg",
      img: "/images/marketing-mix/2.jpg",
      url: "",
      title: "Design Brands",
      description:
        "Building consistent and scalable design frameworks for digital products.",
      bgColor: "bg-[#16213e]", // Deep blue
    },
    {
      id: 3,
      url: "/work-portfolio/giftcart-case-study",
      title: "ECommerce",
      img: "/images/giftcart.webp",
      description:
        "Creating interactive prototypes to validate design concepts and user flows.",
      bgColor: "bg-[#cb2c24]", // Royal blue
    },
    {
      id: 4,
      type: "video",
      url: "",
      videoSrc: "/videos/Brand_idendity_DreamFox.mp4",
      poster: "/images/marketing-mix/4.jpg",
      img: "/images/marketing-mix/4.jpg",
      title: "Branding & Identity",
      description:
        "Continuous testing and refinement to optimize user experience.",
      bgColor: "bg-[#303653]", // Purple
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current;
    const contentCards = contentCardsRef.current;

    // Set initial positions
    gsap.set(cards.slice(1), { yPercent: 100 });
    gsap.set(contentCards, { y: 0, rotation: 0, scale: 1 });

    // Create timeline for stacking animation - faster scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 2}`, // Reduced from 3 to 2 for faster animation
        scrub: 0.5, // Reduced from 1 to 0.5 for faster response
        pin: true,
        anticipatePin: 1,
      },
    });

    cards.forEach((card, index) => {
      if (index > 0) {
        tl.to(
          card,
          {
            yPercent: 0,
            duration: 0.3, // Slightly increased for smoother transition
            ease: "power2.inOut",
          },
          index * 0.3
        ); // Reduced stagger timing
      }
    });

    // Add parallax effects to content cards - faster parallax
    contentCards.forEach((contentCard, index) => {
      if (contentCard) {
        gsap.to(contentCard, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 2}`, // Reduced end distance
            scrub: 0.8, // Faster scrub for content
          },
          //   y: () => -50 * (index + 1),
          //   rotation: () => (index % 2 === 0 ? 2 : -2) * Math.sin(index * 0.5),
          scale: () => 1 + index * 0.02,
          ease: "none",
        });

        // Additional floating animation - faster
        gsap.to(contentCard, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 2}`, // Reduced end distance
            scrub: 1, // Faster floating effect
          },
          // x: () => Math.sin(index * 1.2) * 20,
          ease: "none",
        });

        // Opacity and blur effects - faster response
        gsap.to(contentCard, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 2}`, // Reduced end distance
            scrub: 0.3, // Much faster response for blur/opacity
          },
          //   filter: `blur(${index * 0.5}px)`,
          //   opacity: () => 1 - index * 0.1,
          ease: "none",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {cardData.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (cardsRef.current[index] = el)}
          className={`absolute z-10 px- sm:px-0 inset-0 w-full h-screen flex flex-col items-center justify-center ${card.bgColor} `}
          //   style={{
          //     background: `linear-gradient(135deg,
          //                     hsl(${220 + index * 30}, 70%, ${60 + index * 10}%),
          //                     hsl(${250 + index * 30}, 80%, ${
          //       40 + index * 10
          //     }%))`,
          //   }}
        >
          {card.type === "video" ? (
            <video
              src={card.videoSrc}
              poster={card.poster}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              preload="metadata"
              style={{ pointerEvents: "none" }}
              ref={(el) => (contentCardsRef.current[index] = el)}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 relative z-20 w-[90%] lg:w-[60%]  4xl:w-[48%] mx-4 border border-white/20 shadow-2xl transform-gpu mt-44 xl:mt-12 3xl:mt-40"
            />
          ) : (
            <Image
              src={card.img}
              alt={card.title}
              height={900}
              width={1600}
              ref={(el) => (contentCardsRef.current[index] = el)}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 relative z-20 w-[90%] lg:w-[60%]  4xl:w-[48%] mx-4 border border-white/20 shadow-2xl transform-gpu mt-44 xl:mt-12 3xl:mt-24"
              style={{
                transformOrigin: "center center",
              }}
            />
          )}

          <h2 className="text-120 z-0 text-center sm:text-left absolute top-[28%] lg:top-[31%] lg2:top-[14%] xl:top-[14%] 2xl:top-26 3xl:top-40 2xl:left-64 4xl:top-[16%] font-bold text-white mb-4">
            {card.title}
          </h2>
          {card.url ? (
            <Link
              href={card.url}
              className="font-semibold cursor-pointer hover:scale-105 transition-all text-24 bg-transparent text-white border-3 px-6 py-3 rounded-full shadow-lg hover:bg-white/60 mt-16  duration-300 z-20 xl:mt-12  sm:mt-0 md:mt-6"
            >
              View Case Study
            </Link>
          ) : null}

          {/* <p className="text-white/80 text-lg leading-relaxed">
            {card.description}
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default UXSnapshot;

"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { gsap } from "gsap";

import BannerButton from "@/components/buttons/BannerButton";


const Banner3 = () => {
  const h3Ref3 = useRef(null);
  const h1Ref3 = useRef(null);
  const whereRef3 = useRef(null);
  const brandsRef3 = useRef(null);
  const ringRef3 = useRef(null);

  const dreamRef3 = useRef(null);
  const buttonRef3 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // H3 animation
    tl.fromTo(
      h3Ref3.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
    )

      // H1 container
      .fromTo(
        h1Ref3.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      )

      // WHERE text appears straight
      .fromTo(
        whereRef3.current,
        { opacity: 0, x: -50, rotation: 0 },
        { opacity: 1, x: 0, rotation: 0, duration: 0.6 },
        "-=0.2"
      )

      // Brands span appears straight
      .fromTo(
        brandsRef3.current,
        { opacity: 0, scale: 0.8, rotation: 0 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.7 },
        "-=0.4"
      )

      // Dream text
      .fromTo(
        dreamRef3.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )

      // Button
      .fromTo(
        buttonRef3.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.2"
      )

      // Brands span tilts and falls after everything is revealed
      .to(brandsRef3.current, {
        transformOrigin: "center bottom",
        rotation: -5,
        duration: 0.8,
        ease: "bounce.out",
        delay: 0.5,
      });

    gsap.fromTo(
      ringRef3.current,
      { opacity: 0 },
      {
        opacity: 1,
      },
      "+=0.2"
    );

    gsap.to(ringRef3.current, {
      rotation: 360,
      duration: 3,
      ease: "none",
      repeat: -1,
    });

    // Ring hover effect
    // const handleMouseEnter = () => {
    //   gsap.to(ringRef3.current, {
    //     rotation: 360,
    //     duration: 3,
    //     ease: "none",
    //     repeat: -1,
    //   });
    // };

    // const handleMouseLeave = () => {
    //   gsap.killTweensOf(ringRef3.current);
    //   gsap.to(ringRef3.current, {
    //     rotation: 0,
    //     duration: 0.5,
    //   });
    // };

    // const h1Element = h1Ref3.current;
    // h1Element.addEventListener("mouseenter", handleMouseEnter);
    // h1Element.addEventListener("mouseleave", handleMouseLeave);

    // return () => {
    //   h1Element.removeEventListener("mouseenter", handleMouseEnter);
    //   h1Element.removeEventListener("mouseleave", handleMouseLeave);
    // };
  }, []);

  return (
    <div className="container relative flex justify-center min-h-[90vh] items-center 2xl:min-h-[100vh] lg:pt-32">
      <div className="text-left relative ">
        <div>
          {/* <h3 ref={h3Ref3} className="text-24 font-semibold text-[#d2448d] mb-4">
            Digital branding, reimagined by DreamFox
          </h3> */}
          <h1
            ref={h1Ref3}
            className="text-130 xl:w-[70%] 3xl:w-[100%] font-semibold uppercase text-white leading-tight group"
          >
            <span ref={whereRef3}>Marketing Made</span>
            <span
              ref={brandsRef3}
              className="gradient-selection  bg-gradient-to-r px-0 sm:px-6 inline-block from-[#DC6263] to-[#D2448D] text-black relative z-20 origin-bottom-left"
              style={{ transformOrigin: "bottom left" }}
            >
               Intelligent.
            </span>{" "}
            <br />

            {/* <Image
              ref={ringRef3}
              src="/icons/ring.svg"
              alt="Ring Icon"
              width={100}
              height={100}
              className="inline-block size-[40px] sm:size-[66px] lg:size-[80px] 2xl:size-[100px] bg-[#000] rounded-full ml-2 absolute sm:-top-4 top-16 right-10 sm:right-auto  -translate-x-16"
            /> */}
             <span className="block 2xl:hidden" ref={dreamRef3}>
            With data.
            </span>
            <span className="hidden 2xl:block" ref={dreamRef3}>
            With data<br/> that’s alive.
            </span>
          </h1>
        </div>

        {/* <div ref={buttonRef3} className="2xl:absolute mt-16 2xl:mt-0 right-0 bottom-0">
          <HoverButton
            text="Get Started"
            href="/welcome"
            className="hover:scale-105 transition-all absolute right-0 bottom-0 text-30 font-semibold rounded-lg pl-8 pr-16 pb-4 pt-32 bg-gray-200 flex gap-4"
          />
        </div>  */}
        <div ref={buttonRef3} className="lg:absolute right-0 bottom-0">
          {/* <AnimatedButton text="ABOUT ME" href="/about" /> */}
          <BannerButton
            text="OutLaunch"
            href="/services/digital-marketing"
            // className="w-4xl h-[70px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner3;

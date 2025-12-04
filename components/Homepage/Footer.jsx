"use client";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

import React from "react";
import Link from "next/link";

import { FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa";
// import { CiLinkedin } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);
  const rippleRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Initialize button animations
    gsap.set(rippleRef.current, { scale: 0, opacity: 0 });
    gsap.set(glowRef.current, { scale: 0.8, opacity: 0 });
  }, []);

  const handleMouseEnter = () => {
    const tl = gsap.timeline();

    // Ripple effect
    tl.to(
      rippleRef.current,
      {
        scale: 1.5,
        opacity: 0.3,
        duration: 0.6,
        ease: "power2.out",
      },
      0
    );

    // Glow effect
    tl.to(
      glowRef.current,
      {
        scale: 1.2,
        opacity: 0.6,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    // Text animation - slide up effect
    tl.to(
      textRef.current,
      {
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    // Arrow bounce and glow
    tl.to(
      arrowRef.current,
      {
        x: 5,
        scale: 1.1,
        rotation: 45,
        duration: 0.3,
        ease: "back.out(1.7)",
      },
      0
    );

    // Create particle explosion effect
    createParticles();
  };

  const handleMouseLeave = () => {
    const tl = gsap.timeline();

    // Reset all animations
    tl.to(
      [rippleRef.current, glowRef.current],
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      textRef.current,
      {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      arrowRef.current,
      {
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );
  };

  const handleClick = () => {
    // Epic click animation
    const tl = gsap.timeline();

    // Button press effect
    tl.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    });

    // Button release with overshoot
    tl.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "back.out(1.7)",
    });

    // Return to normal
    tl.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Mega ripple effect
    tl.to(
      rippleRef.current,
      {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.1
    );
  };

  const createParticles = () => {
    // Create floating particles around the button
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 bg-white rounded-full pointer-events-none";
      particle.style.left = "50%";
      particle.style.top = "50%";
      buttonRef.current.appendChild(particle);

      gsap.fromTo(
        particle,
        { x: 0, y: 0, opacity: 1, scale: 1 },
        {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          opacity: 0,
          scale: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        }
      );
    }
  };
  return (
    <footer className="relative  bg-[#1a1a1a] text-white overflow-hidden">
      {/* Main Content */}

      <div className="container">
        <div className=" mx-auto sm:px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {/* Left Nav */}
          <div className="flex flex-col space-y-4 text-30">
            <h3 className="uppercase tracking-widest font-bold text-gray-500 text-40 mb-6 ">
              Menu
            </h3>
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: "About", href: "/about" },
              { name: "Portfolio", href: "/work-portfolio" },
              { name: "Contact", href: "/contactus" },
            ].map(({ name, href }) => {
              if (name === "Home") {
                return (
                  <a
                    key={name}
                    href={href}
                    className="text-white group w-fit uppercase"
                  >
                    <span className="link-underline">{name}</span>
                  </a>
                );
              }
              return (
                <Link
                  key={name}
                  href={href}
                  className="text-white group w-fit uppercase"
                >
                  <span className="link-underline">{name}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col space-y-4 text-20">
            <h3 className="uppercase tracking-widest font-bold text-gray-500 text-40 mb-6 ">
              Socials
            </h3>
            {[
              // { name: "Instagram", href: "#", Icon: FaInstagram },
              {
                name: "Linkedin",
                href: "https://www.linkedin.com/company/dreamfox-com",
                Icon: FaLinkedinIn,
              },
              {
                name: "X",
                href: "https://x.com/dreamfox_com",
                Icon: FaXTwitter,
              },
            ].map(({ name, href, Icon }) => (
              <Link
                key={name}
                href={href}
                className="flex uppercase items-center gap-4 w-fit group"
              >
                <div className="h-16 w-16 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 group-hover:bg-white mb-2">
                  <Icon className="h-7 w-7 text-white transition-all duration-300 group-hover:text-black" />
                </div>
                <span className="text-white transition-all duration-300">
                  {name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Email */}
          <div className="flex  flex-col space-y-4">
            <h3 className="uppercase tracking-widest font-bold text-gray-500 text-40 mb-6 ">
              Connect
            </h3>
            <Link href={"/contactus"} className="group cursor-pointer flex items-center bg-gray-200 text-black rounded-full overflow-hidden max-w-[230px] sm:max-w-[280px] transition-all hover:scale-105 transition-all">
              <span className="pl-4 sm:px-4 uppercase font-sm py-2 w-full text-24 bg-transparent text-left">
                Get Started
              </span>

              {/* Icon container */}
              <div className="relative bg-black m-2 h-12 w-16 rounded-full overflow-hidden flex items-center justify-center">
                {/* Outgoing arrow (exits top-right) */}
                <ArrowRightIcon className="absolute h-5 w-5 text-white -rotate-45 transition-all duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:opacity-0" />

                {/* Incoming arrow (enters from bottom-left) */}
                <ArrowRightIcon className="absolute h-5 w-5 text-white -rotate-45 opacity-0 transition-all duration-500 ease-out delay-100 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-4 translate-y-4" />
              </div>
            </Link>
          </div>
        </div>
        {/* <div className="py-8 border-t border-b border-gray-700 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-16 md:text-18">
              {[
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Use", href: "/terms-of-use" },
                { name: "Cookie Policy", href: "/cookie-policy" },
                { name: "GDPR Policy", href: "/gdpr-policy" },
                { name: "Safe Harbor Policy", href: "/safe-harbour-policy" },
                { name: "Disclaimer", href: "/disclaimer" },
              ].map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {name}
                </Link>
              ))}
            </div>

            <div className="text-gray-400 text-16 md:text-18 text-center md:text-right">
              © {new Date().getFullYear()} DreamFox. All rights reserved.
            </div>
          </div>
        </div> */}
        {/* Logo as cutout mask with background video */}
        <div className="mt-0 sm:mt-12 glow-svg-mask aspect-[1048/172]  overflow-hidden">
          <video
            src="/videos/0_Car_Drifting_3840x2160.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="w-full h-full object-cover pointer-events-none"
          ></video>
        </div>

        {/* Policy Links and Copyright */}
        <div className="py-8 border-t border-gray-700 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Policy Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-16 md:text-18">
              {[
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Use", href: "/terms-of-use" },
                { name: "Cookie Policy", href: "/cookie-policy" },
                { name: "GDPR Policy", href: "/gdpr-policy" },
                { name: "Safe Harbor Policy", href: "/safe-harbour-policy" },
                { name: "Disclaimer", href: "/disclaimer" },
              ].map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-16 md:text-18 text-center md:text-right">
              © 2025 DreamFox. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

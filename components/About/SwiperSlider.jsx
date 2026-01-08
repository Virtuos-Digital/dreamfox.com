"use client";
import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { FaUser, FaQuoteLeft } from "react-icons/fa";
import TextReveal from "../Text Reveal/textreveal";

const TeamSlider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const swiper = new Swiper(".swiper", {
      effect: "coverflow",
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      autoplay: {
        delay: 25000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1.5 },
        580: { slidesPerView: 2 },
        767: { slidesPerView: 3 },
        992: { slidesPerView: 3.5 },
        1200: { slidesPerView: 4 },
        1400: { slidesPerView: 4 },
        2200: { slidesPerView: 4.5 },
      },
    });

    return () => {
      if (swiper) swiper.destroy();
    };
  }, [isMounted]);

  const slides = [
    {
      url: "/images/About/ams.webp",
      name: "Amarinder Singh",
      description: "Senior Director",
    },
    {
      url: "/images/About/shaloo_reddi.webp",

      name: "Shaloo Reddi",
      description: "VP & Senior HR",
    },
    {
      url: "/images/About/Hashim.png",

      name: "Hashim Marazi",
      description: "Project Manager",
    },
    {
      url: "/images/About/shivam_chawla.jpg",

      name: "Shivam Chawla",
      description: "Lead Application Developer",
    },

    {
      url: "/images/About/samriddhi.webp",

      name: "Samriddhi Gulati",
      description: "Associate Tech Sales Consultant",
    },
    {
      url: "/images/About/shivam_rajotiya.webp",

      name: "Shivam Rajotiya",
      description: "Software Engineer",
    },
    {
      url: "/images/About/aditya.webp",
      name: "Aditya Kumar",
      description: "SEO Associate",
    },

    {
      url: "/images/About/siddhant.webp",
      name: "Siddhant Sharma",
      description: "Software Engineer - Trainee",
    },
    {
      url: "/images/About/abdul.webp",

      name: "Abdul Ahad",
      description: "Software Engineer - Trainee",
    },
    {
      url: "/images/About/sukriti.webp",
      name: "Sukriti Kumari",
      description: "Associate UI/UX Designer",
    },
  ];
  const multipleSlides = [...slides, ...slides, ...slides];

  // Don't render until mounted to avoid SSR/hydration issues
  if (!isMounted) {
    return (
      <div className="min-h-[50vh] py-16 lg:py-32" id="team">
        <TextReveal
          animation="rotateX"
          stagger={0.1}
          duration={0.8}
          className=" text-120 text-white text-center font-semibold mb-8 2xl:mb-16"
        >
          Meet The Team
        </TextReveal>
        <div className="w-full h-[500px] flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        body {
          background: #000;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          margin: 0;
          overflow: hidden;
        }
        .full-height-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 40px;
        }
        .slider-heading {
          color: white;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .swiper {
          width: 100%;
          padding: 20px 0 50px;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 400px;
          height: 500px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }
        .info {
          position: absolute;
          width: 100%;
          height: 30%;
          text-align: left;
          background: linear-gradient(180deg, #fff0 0, #0008 50px), linear-gradient(180deg, #fff0 , #0009);
          padding: 20px;
          bottom: -100%;
          box-sizing: border-box;
          transition: bottom 0.5s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .swiper-slide-active .info {
          bottom: 0;
        }
        .info .name,
        .info .desc {
          color: #e6e6e6;
          display: flex;
          align-items: center;
          font-size: 14px;
          gap: 10px;
          text-transform: none;
        }
        .swiper-pagination-bullet {
          background: #696969;
          transition: all 0.5s ease;
          border-radius: 8px;
        }
        .swiper-pagination-bullet-active {
          background: purple !important;
          width: 30px;
        }
      `}</style>

      <div className="min-h-[50vh] py-16 lg:py-32" id="team">
        <TextReveal
          animation="rotateX"
          stagger={0.1}
          duration={0.8}
          className=" text-120 text-white text-center font-semibold mb-8 2xl:mb-16"
        >
          Meet The Team
        </TextReveal>
        <div className="swiper 5xl:max-w-[70vw]">
          <div className="swiper-wrapper">
            {multipleSlides?.map((slide, i) => (
              <div
                key={i}
                className="swiper-slide bg-white border-2 border-black shadow-lg"
                style={{ backgroundImage: `url(${slide.url})` }}
              >
                <div className="info">
                  <div className="name ">
                    <FaUser />{" "}
                    <p className="text-[12px] sm:text-[16px] lg:text-[20px] xl:text-[24px] 3xl:text-[30px] 5xl:text-[40px] ">
                      {" "}
                      {slide.name}
                    </p>
                  </div>
                  <div className="desc">
                    <FaQuoteLeft /> {slide.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="swiper-pagination" /> */}
        </div>
      </div>
    </>
  );
};

export default TeamSlider;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Teams = () => {
  const containerRef = useRef(null);
  const teamMembersRef = useRef([]);

  const teamMembers = [
    {
      url: "/images/About/Digital_Marketing_Head.webp",
      // name: "Amarinder Singh",
      role: "Digital Marketing Head",
      image: "/images/About/Digital_Marketing_Head.webp",
      height: "h-126",
      bgColor: "bg-purple-200",
    },
    {
      image: "/images/About/Brand_Manager.webp",
      // name: "Shaloo Reddi",
      role: "Brand Manager",
      height: "h-126",
      bgColor: "bg-blue-200",
    },
    {
      image: "/images/About/Customer_Success_Manager.webp",
      // name: "Shivam Chawla",
      role: "Customer Success Manager",
      height: "h-126",
      bgColor: "bg-pink-200",
    },
    {
      image: "/images/About/SEO_SMO_Executive.webp",
      // name: "Tina Sachdeva",
      role: "SEO/SMO Executive",
      height: "h-126",
      bgColor: "bg-green-200",
    },
    {
      image: "/images/About/Demandgen_Executive.webp",
      // name: "Team Member",
      role: "DemandGen Executive",
      height: "h-126",
      bgColor: "bg-yellow-200",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(teamMembersRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
      });

      // Create scroll-triggered animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(teamMembersRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.to(teamMembersRef.current, {
            y: -250,
            opacity: 0.7,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.inOut",
          });
        },
        onEnterBack: () => {
          gsap.to(teamMembersRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
      });

      // Add hover animations
      //   teamMembersRef.current.forEach((member, index) => {
      //     if (member) {
      //       member.addEventListener("mouseenter", () => {
      //         gsap.to(member, {
      //           scale: 1.05,
      //           y: -10,
      //           duration: 0.3,
      //           ease: "power2.out",
      //         });
      //       });

      //       member.addEventListener("mouseleave", () => {
      //         gsap.to(member, {
      //           scale: 1,
      //           y: 0,
      //           duration: 0.3,
      //           ease: "power2.out",
      //         });
      //       });
      //     }
      //   });
    });

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className=" bg-black flex items-end justify-center  sm:p-8 pb-16 lg:pb-70">
      <div ref={containerRef} className="container w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:hidden items-end justify-center ">
          {teamMembers.map((member, index) => (
            <div
              // href={"/about/careers#openings"}
              key={member.role}
              ref={(el) => (teamMembersRef.current[index] = el)}
              className="flex relative  flex-col group items-center cursor-pointer"
            >
              {/* Cylindrical container with varying heights */}
              <div
                className={`relative px-4 pt-4  ${member.bgColor} rounded-lg `}
              >
                {/* Member info at top */}
                <div className=" text-center z-10 px-4">
                  <h3 className="text-black font-bold text-24 tracking-wide leading-tight">
                    {member.role}
                  </h3>
                  {/* <p className="text-gray-700 text-16 mt-1 font-medium">
                    {member.role}
                  </p> */}
                </div>

                {/* Member image positioned at bottom */}
                <div className="">
                  <Image
                    height={200}
                    width={200}
                    src={member.image}
                    alt={member.role}
                    className="w-full h-full mt-4 object-cover "
                    style={{ filter: "grayscale(100%)" }}
                  />
                </div>

                {/* Bottom rounded section */}
                {/* <div
                  className={`absolute bottom-0 left-0 right-0 h-8 ${member.bgColor} rounded-b-3xl`}
                ></div> */}
              </div>
              {/* <div
                className={`relative w-56 z-50 rotate-180 lg:w-64 2xl:w-80 ${member.height} ${member.bgColor} opacity-20 rounded-t-full  overflow-hidden shadow-2xl`}
              > */}
            </div>
            // </div>
          ))}
        </div>

        <div className=" hidden lg:flex items-end justify-center ">
          {teamMembers.map((member, index) => (
            <div
              href={"/careers#openings"}
              key={member.name}
              ref={(el) => (teamMembersRef.current[index] = el)}
              className={`flex relative  flex-col group items-center cursor-pointer ${
                index === 4 ? "hidden 2xl:block" : ""
              }`}
            >
              {/* Cylindrical container with varying heights */}
              <div
                className={`relative w-56 z-20 lg:w-64 2xl:w-80 ${member.height} ${member.bgColor} rounded-t-full rounded-b-  overflow-hidden shadow-2xl`}
              >
                {/* Member info at top */}
                <div className="absolute top-28 left-0 right-0 text-center z-10 px-4">
                  <h3 className="text-black font-bold text-24 tracking-wide leading-tight">
                    {member.role}
                  </h3>
                  {/* <p className="text-gray-700 text-16 mt-1 font-medium">
                    {member.role}
                  </p> */}
                </div>

                {/* Member image positioned at bottom */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-44 lg:w-52 h-44 lg:h-52 xl:size-64 overflow-hidden  group-hover:scale-120 transition-transform duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    style={{ filter: "grayscale(100%)" }}
                  />
                </div>
                <div className="absolute -inset-40 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
                {/* Bottom rounded section */}
                {/* <div
                  className={`absolute bottom-0 left-0 right-0 h-8 ${member.bgColor} rounded-b-3xl`}
                ></div> */}
              </div>
              {/* <div
                className={`relative w-56 z-50 rotate-180 lg:w-64 2xl:w-80 ${member.height} ${member.bgColor} opacity-20 rounded-t-full  overflow-hidden shadow-2xl`}
              > */}
              <Image
                src={member.image}
                alt={member.name}
                height={1000}
                width={1000}
                className="w-44 z-10 lg:w-52 h-44 lg:h-52 xl:size-64 object-cover object-bottom absolute -bottom-48 xl:-bottom-58 left-[56%] transform -translate-x-1/2  group-hover:scale-y-120 group-hover:-scale-x-120 transition-transform duration-500 rotate-170 brightness-0 grayscale-100 opacity-20 -scale-x-100 invert-75 "
              />
            </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;

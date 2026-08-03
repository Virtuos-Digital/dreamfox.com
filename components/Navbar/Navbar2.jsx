import {
  BookOpenIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  NewspaperIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  SparklesIcon,
  Squares2X2Icon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
// import a from "next/a";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

const ABOUT_LINKS = [
  {
    href: "/about",
    label: "Background",
    description: "Our Story & Vision",
    Icon: BookOpenIcon,
  },
  {
    href: "/about/team",
    label: "Our Team",
    description: "The People Behind The Work",
    Icon: UsersIcon,
  },
  {
    href: "/careers",
    label: "Careers",
    description: "Join The Pack",
    Icon: BriefcaseIcon,
  },
  {
    href: "/about/alliances",
    label: "Alliances",
    description: "Partners & Technology Allies",
    Icon: PuzzlePieceIcon,
  },
  {
    href: "/news-events",
    label: "News & Events",
    description: "Latest Updates & Press",
    Icon: NewspaperIcon,
  },
];

const SERVICE_LINKS = [
  {
    href: "/services",
    label: "Our Work",
    description: "Everything We Do",
    Icon: Squares2X2Icon,
  },
  {
    href: "/services/brand-advisory",
    label: "Branding",
    description: "Identity & Brand Strategy",
    Icon: SparklesIcon,
  },
  {
    href: "/services/design-studio",
    label: "Design",
    description: "Experience-Led Digital Design",
    Icon: PaintBrushIcon,
  },
  {
    href: "/services/digital-marketing",
    label: "AI Marketing",
    description: "AI-Driven Growth & Performance",
    Icon: RocketLaunchIcon,
  },
  {
    href: "/services/digital-media-mix",
    label: "Media",
    description: "Content, PR & Storytelling",
    Icon: VideoCameraIcon,
  },
];

/* Menu row: icon tile — label — tagline */
const MenuRow = ({ item, active, onSelect }) => {
  const { href, label, description, Icon } = item;

  return (
    <a
      href={href}
      onClick={onSelect}
      className="group/row flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-300 ease-out hover:bg-white/[0.06]"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
          active
            ? "bg-[#ec466f]/15"
            : "bg-white/[0.06] group-hover/row:bg-[#ec466f]/15"
        }`}
      >
        <Icon className="h-5 w-5 text-[#ff6b9d]" />
      </span>

      <span className="flex-1">
        <span
          className={`block text-[17px] font-medium leading-tight transition-colors duration-300 ${
            active ? "text-[#ff6b9d]" : "text-white group-hover/row:text-[#ff6b9d]"
          }`}
        >
          {label}
        </span>
        <span className="mt-1 block text-[13px] leading-snug text-white/40 transition-colors duration-300 group-hover/row:text-white/60">
          {description}
        </span>
      </span>
    </a>
  );
};

/* Desktop dropdown panel */
const DropdownPanel = ({ items, isOpen, currentPath, onSelect }) => (
  <div
    className={`absolute top-10 left-1/2 mt-3 w-88 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 shadow-2xl shadow-black/60 backdrop-blur-2xl transition-all duration-500 ease-out ${
      isOpen
        ? "visible translate-y-0 scale-100 opacity-100"
        : "invisible -translate-y-4 scale-95 opacity-0"
    }`}
  >
    <div className="p-2">
      {items.map((item) => (
        <MenuRow
          key={item.href}
          item={item}
          active={item.href === currentPath}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenAbout, setDropdownOpenAbout] = useState(false);

  const [overlayStyle, setOverlayStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isActivea, setActive] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRefAbout = useRef(null);
  const dropdownRefServices = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefAbout.current &&
        !dropdownRefAbout.current.contains(event.target)
      ) {
        setDropdownOpenAbout(false);
      }
      if (
        dropdownRefServices.current &&
        !dropdownRefServices.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setDropdownOpen(false);
      setDropdownOpenAbout(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
    setDropdownOpenAbout(false);
  };

  const toggleDropdown = () => {
    const newState = !dropdownOpen;
    setDropdownOpen(newState);
    // Close the About dropdown when Services is opened
    if (newState) {
      setDropdownOpenAbout(false);
    }
  };
  const toggleDropdownAbout = () => {
    const newState = !dropdownOpenAbout;
    setDropdownOpenAbout(newState);
    // Close the Services dropdown when About is opened
    if (newState) {
      setDropdownOpen(false);
    }
  };
  //   const handleMouseEnter = (e) => {
  //     if (!buttonRef.current) return;

  //     const rect = buttonRef.current.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;

  //     // Calculate position as percentage
  //     const xPercent = (x / rect.width) * 100;
  //     const yPercent = (y / rect.top) * 100;

  //     setOverlayStyle({
  //       left: `${xPercent}%`,
  //       top: `${yPercent}%`,
  //       transformOrigin: `${xPercent}% ${yPercent}%`,
  //     });

  //     setIsHovered(true);
  //   };

  //   const handleMouseLeave = () => {
  //     setIsHovered(false);
  //   };
  const handleMouseEnter = (e) => {
    setIsHovered(true);
    updateOverlayPosition(e);
  };

  const handleMouseMove = (e) => {
    updateOverlayPosition(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const updateOverlayPosition = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setOverlayStyle({
      left: `${xPercent}%`,
      top: `${yPercent}%`,
    });
  };

  const isActive = (href) => {
    return router.pathname === href;
  };

  const isAboutActive = () => {
    return (
      router.pathname.startsWith("/about") || router.pathname === "/news-events"
    );
  };

  const isServicesActive = () => {
    return router.pathname.startsWith("/services");
  };

  const isPortfolioActive = () => {
    return router.pathname.includes("/work-portfolio");
  };

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 z-40 ${
          dropdownOpen || dropdownOpenAbout
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setDropdownOpen(false);
          setDropdownOpenAbout(false);
        }}
      />

      <nav
        className={`fixed top-0 mx-auto max-w-[95rem]  left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-gray-900/60 backdrop-blur-xl  border border-white/10 lg:rounded-full xl:px-6  lg:mt-4 shadow-full"
            : "lg:bg-transparent bg-gray-900/60 backdrop-blur-xl lg:backdrop-blur-none"
        }`}
      >
        <div
          className={`container mx-auto px-6 lg:px-8 transition-all duration-500 ${
            isScrolled ? "py-4" : "py-4"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href={"/"}
              // onClick={() => {
              //   setActive("");
              // }}
              className="flex-shrink-0 flex items-center overflow-hidden"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              {/* Container for both logos with smooth width transition */}
              <div
                className={`flex items-center transition-all duration-500 ease-in-out ${
                  isLogoHovered ? "w-auto" : "w-auto"
                }`}
              >
                {/* Emblem - always visible */}
                <Image
                  src={"/logos/dreamfox_emblem.svg"}
                  alt="DreamFox Emblem"
                  width={150}
                  height={50}
                  className="h-9 lg:ml-4 lg:h-12 w-auto transition-all cursor-pointer duration-300"
                />

                {/* Logo text - slides in from left */}
                <div
                  className={`overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
                    isLogoHovered
                      ? "max-w-[200px] opacity-100 ml-2"
                      : "max-w-0 opacity-0 ml-0"
                  }`}
                >
                  <Image
                    src={"/logos/dreamfox_logo.svg"}
                    alt="DreamFox Logo"
                    width={150}
                    height={50}
                    className={`h-9 w-auto cursor-pointer transition-all duration-500 ease-in-out transform ${
                      isLogoHovered
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0"
                    }`}
                  />
                </div>
              </div>
            </a>

            {/* Desktop Menu Items - Center */}
            <div className="hidden lg:flex items-center space-x-12">
              <div
                ref={dropdownRefAbout}
                className="relative"
                onClick={() => setDropdownOpenAbout(true)}
                onMouseEnter={() => setDropdownOpenAbout(true)}
                onMouseLeave={() => setDropdownOpenAbout(false)}
              >
                <p
                  // href={"/about"}
                  // onClick={() => {
                  //   setActive("services");
                  // }}
                  className={`${
                    isAboutActive() ? "text-[#ec466f]" : "text-[#fff]"
                  } text-20 font-normal hover:text-[#ec466f] transition-all duration-500 ease-out hover:scale-105 relative group flex items-center gap-2`}
                >
                  ABOUT
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-500 ease-out ${
                      dropdownOpenAbout ? "rotate-180" : "rotate-0"
                    }`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ec466f] to-[#ff6b9d] group-hover:w-full transition-all duration-500 ease-out"></span>
                </p>

                {/* Invisible bridge so the menu survives the gap on hover */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-6 w-44" />

                {/* Triangle pointer */}
                <div
                  className={`absolute top-10 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out ${
                    dropdownOpenAbout
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <svg
                    width="20"
                    height="10"
                    viewBox="0 0 20 10"
                    className="fill-[#0a0a0a] drop-shadow-lg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 0L20 10H0L10 0Z" />
                  </svg>
                </div>

                <DropdownPanel
                  items={ABOUT_LINKS}
                  isOpen={dropdownOpenAbout}
                  currentPath={router.pathname}
                  onSelect={() => setDropdownOpenAbout(false)}
                />
              </div>

              {/* Services Dropdown */}
              {/* Services Dropdown */}
              <div
                ref={dropdownRefServices}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <p
                  // href={"/services"}
                  // onClick={() => {
                  //   setActive("services");
                  // }}
                  className={`${
                    isServicesActive() ? "text-[#ec466f]" : "text-[#fff]"
                  } text-20 font-normal hover:text-[#ec466f] transition-all duration-500 ease-out hover:scale-105 relative group flex items-center gap-2`}
                >
                  SERVICES
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-500 ease-out ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ec466f] to-[#ff6b9d] group-hover:w-full transition-all duration-500 ease-out"></span>
                </p>

                {/* Invisible bridge so the menu survives the gap on hover */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-6 w-44" />

                {/* Triangle pointer */}
                <div
                  className={`absolute top-10 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out ${
                    dropdownOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <svg
                    width="20"
                    height="10"
                    viewBox="0 0 20 10"
                    className="fill-[#0a0a0a] drop-shadow-lg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 0L20 10H0L10 0Z" />
                  </svg>
                </div>

                <DropdownPanel
                  items={SERVICE_LINKS}
                  isOpen={dropdownOpen}
                  currentPath={router.pathname}
                  onSelect={() => setDropdownOpen(false)}
                />
              </div>

              <a
                href="/work-portfolio"
                // onClick={() => {
                //   setActive("portfolio");
                // }}
                className={`${
                  isPortfolioActive() ? "text-[#ec466f]" : "text-[#fff]"
                }  text-20 font-normal hover:text-[#ec466f] transition-all duration-300 hover:scale-105 relative group`}
              >
                PORTFOLIO
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ec466f] group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            <div className="hidden lg:block">
              <button
                ref={buttonRef}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative px-8 cursor-pointer py-4  font-black text-lg border-[#fff] border-2 rounded-full overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                {/* Overlay effect */}
                <a
                  href={"/contactus"}
                  className={`absolute inset-0 bg-gradient-to-r from-[#ec466f] to-[#ff6b9d] rounded-full transition-all duration-300 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{
                    transformOrigin: `${overlayStyle.left || "50%"} ${
                      overlayStyle.top || "50%"
                    }`,
                  }}
                />

                <a href={"/contactus"} className="relative z-10 text-white ">
                  CONTACT US
                </a>

                <span className=" rounded-full relative z-10">
                  <svg
                    data-slot="icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="size-8 group-hover:text-white text-[#ec466f] p-1 rounded-full "
                  >
                    <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z"></path>
                  </svg>
                </span>
              </button>
            </div>
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 relative w-10 h-10 flex flex-col justify-center items-center group"
              >
                <div className="relative w-6 h-5">
                  {/* Top bar */}
                  <div
                    className={`absolute w-6 h-0.5 bg-white rounded transition-all duration-200 ease-in-out transform origin-center ${
                      isMenuOpen
                        ? "rotate-45 translate-y-2"
                        : "rotate-0 translate-y-0"
                    }`}
                  />

                  {/* Middle bar */}
                  <div
                    className={`absolute w-6 h-0.5 bg-white rounded transition-all duration-150 ease-in-out top-2 ${
                      isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  />

                  {/* Bottom bar */}
                  <div
                    className={`absolute w-6 h-0.5 bg-white rounded transition-all duration-200 ease-in-out transform origin-center top-4 ${
                      isMenuOpen
                        ? "-rotate-45 -translate-y-2"
                        : "rotate-0 translate-y-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-200 ease-in-out ${
              isMenuOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-4 pb-4 border-t border-white/10">
              <div
                className={`flex flex-col space-y-4 pt-4 px-4 transform transition-all duration-200 ease-in-out ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
              >
                <div>
                  <button
                    onClick={toggleDropdownAbout}
                    className="text-white text-20 font-bold hover:text-[#ec466f] transition-all duration-300 flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/10 transform hover:translate-x-2 w-full text-left"
                  >
                    <span>ABOUT</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform duration-300 ${
                        dropdownOpenAbout ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile About Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      dropdownOpenAbout
                        ? "max-h-136 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-2 space-y-1 border-l border-white/10 pl-2">
                      {ABOUT_LINKS.map((item) => (
                        <MenuRow
                          key={item.href}
                          item={item}
                          active={isActive(item.href)}
                          onSelect={closeMenu}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Services Dropdown */}
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="text-white text-20 font-bold hover:text-[#ec466f] transition-all duration-300 flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/10 transform hover:translate-x-2 w-full text-left"
                  >
                    <span>SERVICES</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Services Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      dropdownOpen
                        ? "max-h-136 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-2 space-y-1 border-l border-white/10 pl-2">
                      {SERVICE_LINKS.map((item) => (
                        <MenuRow
                          key={item.href}
                          item={item}
                          active={isActive(item.href)}
                          onSelect={closeMenu}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <a
                  href="/work-portfolio"
                  className={`text-white text-20 font-bold transition-all duration-300 px-2 py-2 rounded-lg hover:bg-white/10 transform hover:translate-x-2 ${
                    isPortfolioActive()
                      ? "text-[#ec466f]"
                      : "hover:text-[#ec466f]"
                  }`}
                  onClick={closeMenu}
                >
                  PORTFOLIO
                </a>
                {/* Mobile Contact Button */}
                <a
                  href={"/contactus"}
                  onClick={closeMenu}
                  className="relative px-6  w-fit py-3 text-white font-black text-lg bg-gradient-to-r from-[#ec466f] to-[#ff6b9d] rounded-full overflow-hidden group hover:shadow-xl transition-all duration-300 mx-2 mt-4"
                >
                  <span className="relative z-10">CONTACT US</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

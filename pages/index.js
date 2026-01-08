import Banner from "@/components/Homepage/banner";

import OurVision from "@/components/Homepage/ourvision";
import ReviewsSection from "@/components/Homepage/ReviewsSection";
import Showreel from "@/components/Homepage/showreel";
import Snapshot from "@/components/Homepage/snapshot";
import WhatWeDo from "@/components/Homepage/what_we_do";
import WhyDreamfox from "@/components/Homepage/WhyDreamfox";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">

      <Banner />
      <OurVision />

      <WhatWeDo />

      <WhyDreamfox />

      <Snapshot />
      <div className="overflow-hidden">
        <ReviewsSection />
      </div>
      {/* <ScrollControlledSwiper /> */}
      {/* <div className="overflow-hidden">
        <ReviewsSection />
      </div> */}
      <Showreel />
    </div>
  );
}

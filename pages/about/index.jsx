import React from "react";
import Team from "@/components/About/Team";
import BannerSection from "@/components/About/BannerSection";
import CultureValuesSection from "@/components/About/CultureValuesSection";
import Mission from "@/components/About/Mission";
import StackingCards from "@/components/About/Timeline";
import DreamFoxModel from "@/components/About/DreamFoxModel";
// import SwiperSlider from "@/components/About/SwiperSlider";
import CultureValuesSection2 from "@/components/About/CultureValuesSection2";
import TeamSlider from "@/components/About/SwiperSlider";
import VirtuosHero from "@/components/About/Part2";

function Index() {
  return (
    <div>
      <BannerSection />
      <VirtuosHero />
      {/* <Proud_Part /> */}
      <StackingCards />
      <DreamFoxModel />
      <Mission />
      <TeamSlider />
      <CultureValuesSection />
      {/* <Team/> */}
      {/* <CultureValuesSection2/> */}
    </div>
  );
}

export default Index;

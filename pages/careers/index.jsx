import JobListingsGrid from "@/components/Careers/3snippets";
// import Snippets from "@/components/Careers/3snippets";
import Careersbanner from "@/components/Careers/Banner";
import Fun_Career from "@/components/Careers/fun";
import TeamSection from "@/components/Careers/Teams";
import React from "react";

const index = () => {
  return (
    <>
      <Careersbanner />
      <TeamSection/>
      <Fun_Career/>
      <JobListingsGrid/>
    </>
  );
};

export default index;

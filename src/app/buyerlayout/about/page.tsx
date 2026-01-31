"use client";
import React from "react";
import Banner from "@/Components/PageComponents/mainPages/About/Banner";
import Community from "@/Components/PageComponents/mainPages/About/Community";
import OurMission from "@/Components/PageComponents/mainPages/About/OurMission";
import CoreValues from "@/Components/PageComponents/mainPages/About/CoreValues";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import { AboutBanner, Ourmission, CommunityData } from "@/Hooks/api/cms_api";

const page = () => {
  const { data, isPending } = AboutBanner();
  const { data: mission } = Ourmission();
  const { data: community } = CommunityData();
  return (
    <>
      <Banner data={data} />
      <OurMission mission={mission} />
      <Community community={community} />
      <CoreValues />
      <ListPropertyCTA />
    </>
  );
};

export default page;

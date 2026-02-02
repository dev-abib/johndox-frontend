"use client";
import React from "react";
import Banner from "@/Components/PageComponents/mainPages/About/Banner";
import Community from "@/Components/PageComponents/mainPages/About/Community";
import OurMission from "@/Components/PageComponents/mainPages/About/OurMission";
import CoreValues from "@/Components/PageComponents/mainPages/About/CoreValues";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import {
  AboutBanner,
  Ourmission,
  CommunityData,
  Corevalues,
  ListPropertyBrowse,
} from "@/Hooks/api/cms_api";

const page = () => {
  const { data } = AboutBanner();
  const { data: mission } = Ourmission();
  const { data: corevalues } = Corevalues();
  const { data: community } = CommunityData();
  const { data: Listproperty } = ListPropertyBrowse();

  return (
    <>
      <Banner data={data} />
      <OurMission mission={mission} />
      <Community community={community} />
      <CoreValues corevalues={corevalues} />
      <ListPropertyCTA Listproperty={Listproperty} />
    </>
  );
};

export default page;

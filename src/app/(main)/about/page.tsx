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
import AboutSkeleton from "@/Components/Skeleton/AboutSkeleton";

const page = () => {
  const { data, isLoading: bannerLoading } = AboutBanner();
  const { data: mission, isLoading: missionLoading } = Ourmission();
  const { data: corevalues, isLoading: coreLoading } = Corevalues();
  const { data: community, isLoading: communityLoading } = CommunityData();
  const { data: Listproperty, isLoading: ctaLoading } = ListPropertyBrowse();

  const isLoading =
    bannerLoading ||
    missionLoading ||
    coreLoading ||
    communityLoading ||
    ctaLoading;

  if (isLoading) {
    return <AboutSkeleton />;
  }

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

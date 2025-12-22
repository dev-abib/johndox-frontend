import React from "react";
import Banner from "@/Components/PageComponents/mainPages/About/Banner";
import Community from "@/Components/PageComponents/mainPages/About/Community";
import OurMission from "@/Components/PageComponents/mainPages/About/OurMission";

const page = () => {
  return (
    <>
      <Banner />
      <OurMission />
      <Community/>
    </>
  );
};

export default page;

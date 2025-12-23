import WhySell from "@/Components/PageComponents/mainPages/forseller/WhySell";
import HowItWorks from "@/Components/PageComponents/mainPages/forseller/HowItWorks";
import ReadytoSell from "@/Components/PageComponents/mainPages/forseller/ReadytoSell";
import SellerPageHero from "@/Components/PageComponents/mainPages/forseller/SellerPageHero";
import React from "react";

const page = () => {
  return (
    <>
      <SellerPageHero />
      <WhySell />
      <HowItWorks />
      <ReadytoSell />
    </>
  );
};

export default page;

import React from "react";
import WhySell from "@/Components/PageComponents/mainPages/forseller/WhySell";
import HowItWorks from "@/Components/PageComponents/mainPages/forseller/HowItWorks";
import ReadytoSell from "@/Components/PageComponents/mainPages/forseller/ReadytoSell";
import SellerPageHero from "@/Components/PageComponents/mainPages/forseller/SellerPageHero";

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

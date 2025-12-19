"use client";

import HowItWorks from "@/Components/PageComponents/mainPages/forseller/HowItWorks";
import ReadytoSell from "@/Components/PageComponents/mainPages/forseller/ReadytoSell";
import SellerPageHero from "@/Components/PageComponents/mainPages/forseller/SellerPageHero";
import WhySell from "@/Components/PageComponents/mainPages/forseller/WhySell";

export default function Page() {
  return (
    <div>
      <SellerPageHero />
      <WhySell />
      <HowItWorks />
      <ReadytoSell />
    </div>
  );
}

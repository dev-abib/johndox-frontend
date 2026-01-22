"use client";
import HowItWorks from "@/Components/PageComponents/mainPages/forseller/HowItWorks";
import ReadytoSell from "@/Components/PageComponents/mainPages/forseller/ReadytoSell";
import SellerPageHero from "@/Components/PageComponents/mainPages/forseller/SellerPageHero";
import WhySell from "@/Components/PageComponents/mainPages/forseller/WhySell";
import { forSellerBanner, useWhyChoose, whyitWorks } from "@/Hooks/api/cms_api";

export default function Page() {
  const { data: hero } = forSellerBanner();
  const { data: whyitworks } = whyitWorks();
  const { data, isLoading, error } = useWhyChoose();
  return (
    <div>
      <SellerPageHero hero={hero} />
      <WhySell data={data} />
      <HowItWorks whyitworks={whyitworks} />
      <ReadytoSell />
    </div>
  );
}

"use client";
import HowItWorks from "@/Components/PageComponents/mainPages/forseller/HowItWorks";
import ReadytoSell from "@/Components/PageComponents/mainPages/forseller/ReadytoSell";
import SellerPageHero from "@/Components/PageComponents/mainPages/forseller/SellerPageHero";
import WhySell from "@/Components/PageComponents/mainPages/forseller/WhySell";
import { useWhyChoose } from "@/Hooks/api/cms_api";

export default function Page() {
  const { data, isLoading, error } = useWhyChoose();
  return (
    <div>
      <SellerPageHero />
      <WhySell data={data} />
      <HowItWorks />
      <ReadytoSell />
    </div>
  );
}

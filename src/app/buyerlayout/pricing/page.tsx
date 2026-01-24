"use client";
import FAQSection from "@/Components/PageComponents/mainPages/pricing/FAQSection";
import PricingTable from "@/Components/PageComponents/mainPages/pricing/PricingTable";
import { PricingPage } from "@/Hooks/api/cms_api";

export default function Page() {
  const { data } = PricingPage();
  console.log(data);
  
  
  return (
    <>
      <PricingTable data={data} />
      <FAQSection data={data} />
    </>
  );
}

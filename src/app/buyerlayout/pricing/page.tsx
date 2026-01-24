"use client";
import FAQSection from "@/Components/PageComponents/mainPages/pricing/FAQSection";
import PricingTable from "@/Components/PageComponents/mainPages/pricing/PricingTable";
import { PricingPage, PricingPlan } from "@/Hooks/api/cms_api";

export default function Page() {
  const { data } = PricingPage();
  const { data: plan } = PricingPlan();
  

  return (
    <>
      <PricingTable data={data} plan={plan} />
      <FAQSection data={data} />
    </>
  );
}

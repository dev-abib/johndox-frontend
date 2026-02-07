'use client'
import PricingSkeleton from "@/Components/Skeleton/PricingSkeleton";
import { AllFaw, PricingPage, PricingPlan } from "@/Hooks/api/cms_api";
import FAQSection from "@/Components/PageComponents/mainPages/pricing/FAQSection";
import PricingTable from "@/Components/PageComponents/mainPages/pricing/PricingTable";

export default function Page() {
 const { data: faq, isLoading: faqLoading } = AllFaw();
  const { data, isLoading: pricingLoading } = PricingPage();
  const { data: plan, isLoading: planLoading } = PricingPlan();

  const isLoading = faqLoading || pricingLoading || planLoading;

  if (isLoading) {
    return <PricingSkeleton />;
  }

  return (
    <>
      <PricingTable data={data} plan={plan} />
      <FAQSection data={data} faq={faq} />
    </>
  );
}
// 
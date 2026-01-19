import { Suspense } from "react";
import { getFeaturedListings } from "@/Hooks/api/cms_api";
import Hero from "@/Components/PageComponents/mainPages/Home/Hero";
import Browser from "@/Components/PageComponents/mainPages/Home/Browser";
import { FeaturedSkeleton } from "@/Components/Skeleton/FeaturedSkeleton";
import Featured from "@/Components/PageComponents/mainPages/Home/Featured";
import WhyChoose from "@/Components/PageComponents/mainPages/Home/WhyChoose";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";

const Page = async () => {
  const response = await getFeaturedListings();
  const featuredProperties = response?.data?.items || [];

  return (
    <>
      <Hero />
      <Suspense fallback={<FeaturedSkeleton />}>
        <Featured data={featuredProperties} />
      </Suspense>
      <Browser />
      <WhyChoose />
      <ListPropertyCTA />
    </>
  );
};

export default Page;

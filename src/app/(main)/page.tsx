import {
  Category,
  getFeaturedListings,
  Whychooseus,
} from "@/Hooks/api/cms_api";
import Hero from "@/Components/PageComponents/mainPages/Home/Hero";
import Browser from "@/Components/PageComponents/mainPages/Home/Browser";
import Featured from "@/Components/PageComponents/mainPages/Home/Featured";
import WhyChoose from "@/Components/PageComponents/mainPages/Home/WhyChoose";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";

const Page = async () => {
  const category = await Category();
  const AllCategory = category?.data;
  const response = await getFeaturedListings();
  const AllProperty = response?.data?.items;
  const whychooseus = await Whychooseus();
  const WhyChooseUs = whychooseus?.data;
  console.log(WhyChooseUs);

  return (
    <>
      <Hero />
      <Featured data={AllProperty} />
      <Browser AllCategory={AllCategory} />
      <WhyChoose WhyChooseUs={WhyChooseUs} />
      <ListPropertyCTA />
    </>
  );
};

export default Page;

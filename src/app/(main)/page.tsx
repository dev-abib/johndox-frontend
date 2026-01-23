import Hero from "@/Components/PageComponents/mainPages/Home/Hero";
import Browser from "@/Components/PageComponents/mainPages/Home/Browser";
import Featured from "@/Components/PageComponents/mainPages/Home/Featured";
import WhyChoose from "@/Components/PageComponents/mainPages/Home/WhyChoose";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import {
  Banner,
  Category,
  getFeaturedListings,
  ListProperty,
  Whychooseus,
} from "@/Hooks/api/cms_api";

const Page = async () => {
  const category = await Category();
  const AllCategory = category?.data;
  const whychooseus = await Whychooseus();
  const WhyChooseUs = whychooseus?.data;
  const landingBanner = await Banner();
  const hero = landingBanner?.data;
  const response = await getFeaturedListings();
  const AllProperty = response?.data?.items;
  const Listproperty = await ListProperty();

  return (
    <>
      <Hero hero={hero} />
      <Featured data={AllProperty} />
      <Browser AllCategory={AllCategory} />
      <WhyChoose WhyChooseUs={WhyChooseUs} />
      <ListPropertyCTA Listproperty={Listproperty} />
    </>
  );
};

export default Page;

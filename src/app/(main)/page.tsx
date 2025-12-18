import Container from "@/Components/Common/Container";
import Browser from "@/Components/PageComponents/mainPages/Home/Browser";
import Featured from "@/Components/PageComponents/mainPages/Home/Featured";
import Hero from "@/Components/PageComponents/mainPages/Home/Hero";
import WhyChoose from "@/Components/PageComponents/mainPages/Home/WhyChoose";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";

const Page = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Browser />
      <WhyChoose />
      <ListPropertyCTA/>
    </>
  );
};

export default Page;

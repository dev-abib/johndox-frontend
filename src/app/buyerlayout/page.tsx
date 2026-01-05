import Browser from "@/Components/PageComponents/mainPages/Home/Browser";
import Featured from "@/Components/PageComponents/mainPages/Home/Featured";
import Hero from "@/Components/PageComponents/mainPages/Home/Hero";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import WhyChoose from "@/Components/PageComponents/mainPages/Home/WhyChoose";


const page = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Browser />
      <WhyChoose />
      <ListPropertyCTA />
    </>
  );
};

export default page;

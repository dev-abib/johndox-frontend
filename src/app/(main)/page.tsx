import Container from "@/Components/Common/Container";
import Browser from "@/Components/PageComponents/mainPages/Home/Browser";
import Featured from "@/Components/PageComponents/mainPages/Home/Featured";
import Hero from "@/Components/PageComponents/mainPages/Home/Hero";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";

const Page = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Browser />
      <ListPropertyCTA/>
    </>
  );
};

export default Page;

import Container from "@/Components/Common/Container";
import Browser from "@/Components/PageComponents/mainPages/Home/Browser";
import Featured from "@/Components/PageComponents/mainPages/Home/Featured";
import Hero from "@/Components/PageComponents/mainPages/Home/Hero";

const Page = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Browser />
    </>
  );
};

export default Page;

import React from "react";
import Container from "@/Components/Common/Container";

const Banner = () => {
  return (
    <section className="pt-30 lg:pb-[280px] pb-20 bannerhero">
      <Container>
        <h2 className="text-center font-bold lg:text-[56px] md:text-[48px] text-[32px] text-white">
          About Terralink
        </h2>
        <p className="text-center font-medium lg:text-[20px] text-base text-white max-w-[750px] mx-auto mt-3">
          Transforming the real estate market in Honduras by connecting buyers,
          sellers, and agents with innovative technology and exceptional
          service.
        </p>
      </Container>
    </section>
  );
};

export default Banner;

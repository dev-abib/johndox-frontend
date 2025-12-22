import Container from "@/Components/Common/Container";
import React from "react";

const Banner = () => {
  return (
    <section className="pt-30 pb-[280px] bannerhero">
      <Container>
        <h2 className="text-center font-bold text-[56px] text-white">
          About Terralink
        </h2>
        <p className="text-center font-medium text-[20px] text-white max-w-[750px] mx-auto mt-3">
          Transforming the real estate market in Honduras by connecting buyers,
          sellers, and agents with innovative technology and exceptional
          service.
        </p>
      </Container>
    </section>
  );
};

export default Banner;

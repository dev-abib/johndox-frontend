import React from "react";
import Container from "@/Components/Common/Container";

interface BannerProps {
  data: any;
}

const Banner = ({ data }: BannerProps) => {
  return (
    <section
      style={{
        backgroundImage: data?.data?.bgImg
          ? `url(${data?.data?.bgImg})`
          : "url('/Assets/aboutbanner.png')",
      }}
      className="pt-30 lg:pb-[280px] pb-20 bannerhero bg-cover bg-center"
    >
      <Container>
        <h2 className="text-center font-bold lg:text-[56px] md:text-[48px] text-[32px] text-white">
          {data?.data?.title}
        </h2>
        <p className="text-center font-medium lg:text-[20px] text-base text-white max-w-[750px] mx-auto mt-3">
          {data?.data?.subtitle}
        </p>
      </Container>
    </section>
  );
};

export default Banner;

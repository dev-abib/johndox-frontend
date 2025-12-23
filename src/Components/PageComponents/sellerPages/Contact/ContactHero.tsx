import Container from "@/Components/Common/Container";
import React from "react";

const ContactHero = () => {
  return (
    <section className="pt-30 lg:pb-[280px] pb-20 contacthero">
      <Container>
        <h2 className="text-center font-bold lg:text-[56px] md:text-[48px] text-[32px] text-white">
          Get in Touch
        </h2>
        <p className="text-center font-medium lg:text-[20px] text-base text-white max-w-[750px] mx-auto mt-3">
          Have a question or need assistance? Our team is always ready to help
          you with property buying, selling, or listing.
        </p>
      </Container>
    </section>
  );
};

export default ContactHero;

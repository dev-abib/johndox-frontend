import Container from "@/Components/Common/Container";
import React from "react";

const Maps: React.FC = () => {
  return (
    <section className="lg:py-[150px] py-10">
      <Container>
        <h2 className="text-[24px] font-medium text-[#000000]">MAP</h2>

        <div className="pt-5">
          {/* Responsive Map Wrapper */}
          <div className="relative w-full xl:h-[900px] h-[500px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1592031.5707395207!2d-78.55606543384506!3d38.7995468775738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64debe9f190df%3A0xf2af37657655f6b1!2sMaryland%2C%20USA!5e0!3m2!1sen!2sbd!4v1766141900353!5m2!1sen!2sbd"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Maps;

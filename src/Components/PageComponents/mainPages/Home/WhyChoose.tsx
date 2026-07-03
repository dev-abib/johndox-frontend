import Image from "next/image";
import Container from "@/Components/Common/Container";

interface whychooseusProps {
  WhyChooseUs?: any;
}

const WhyChoose = ({ WhyChooseUs }: whychooseusProps) => {
  return (
    <section className="py-16 sm:py-20 lg:py-[150px] xl:px-5 px-0">
      <Container>
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-3 sm:px-0">
          <h2 className="font-medium text-black text-2xl sm:text-3xl md:text-4xl xl:text-[38px]">
            {WhyChooseUs?.section?.sectionTitle}
          </h2>
          <p className="font-normal text-black text-sm sm:text-base lg:text-[18px] mt-3 sm:mt-4 max-w-3xl mx-auto px-2 sm:px-0">
            {WhyChooseUs?.section?.sectionSubTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-9">
          {WhyChooseUs?.items?.map((feature: any) => {
            return (
              <div
                key={feature?._id}
                className="bg-[rgba(230,243,255,0.4)] rounded-xl sm:rounded-[18px] shadow-[0_0_8px_rgba(145,158,171,0.4)] py-6 sm:py-8 md:py-10 px-5 sm:px-6 md:px-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <Image
                    src={feature?.iconImg}
                    alt="iconimg"
                    width={60}
                    height={60}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-[60px] md:h-[60px]"
                  />
                </div>

                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#212B36] mt-3 sm:mt-4 md:mt-5 mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base lg:text-lg text-[#637381] leading-relaxed">
                  {feature.shortDescription}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhyChoose;

import Container from "@/Components/Common/Container";

interface whyitworksprops {
  whyitworks?: any;
}

const HowItWorks = ({ whyitworks }: whyitworksprops) => {
  return (
    <section className="py-20 lg:pt-[150px]">
      <Container>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-medium text-black text-2xl sm:text-4xl xl:text-[38px]">
            {whyitworks?.data?.section?.sectionTitle}
          </h2>
          <p className="font-normal text-black text-base sm:text-lg lg:text-[18px] mt-4 max-w-3xl mx-auto">
            {whyitworks?.data?.section?.sectionSubTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9">
          {whyitworks?.data?.items?.map((feature: any, index: number) => {
            return (
              <div
                key={feature?._id}
                className="bg-[rgba(230,243,255,0.4)] rounded-[18px] shadow-[0_0_8px_rgba(145,158,171,0.4)] py-10 px-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-15 h-15 mx-auto rounded-full bg-blue-600 text-white text-3xl font-bold">
                  {index + 1}
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-[#212B36] mt-5 mb-2 text-center">
                  {feature.title}
                </h3>

                <p className="text-base lg:text-lg text-[#637381] leading-relaxed text-center">
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

export default HowItWorks;

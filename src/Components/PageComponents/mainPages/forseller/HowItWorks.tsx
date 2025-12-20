import Container from "@/Components/Common/Container";
import { HowItWorksdata } from "@/Components/Data/data";

const HowItWorks = () => {
  return (
    <section className="py-20 lg:pb-[150px]">
      <Container>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-medium text-black text-2xl sm:text-4xl xl:text-[38px]">
            How It Works
          </h2>
          <p className="font-normal text-black text-base sm:text-lg lg:text-[18px] mt-4 max-w-3xl mx-auto">
            Understand the simple steps to start your property journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-9">
          {HowItWorksdata.map((feature, index) => {
            const Icon = feature.count;
            return (
              <div
                key={index}
                className="bg-[rgba(230,243,255,0.20)] rounded-[18px] shadow-[0_0_8px_0_rgba(145,158,171,0.40)] py-10 px-8 hover:shadow-[0_0_8px_0_rgba(145,158,171,0.80)] transition-shadow duration-300"
              >
                <div className="flex items-center justify-center ">
                  <div className="flex w-[72px] h-[72px] flex-col items-center justify-center gap-[10px] shrink-0 rounded-[65px] bg-[#0085FF] text-[24px] font-medium leading-[36px] text-white mb-3">
                    {Icon}
                  </div>
                </div>

                <h3 className="text-xl lg:text-[28]  text-center font-medium text-[#212B36] mt-5 mb-2">
                  {feature.title}
                </h3>

                <p className="text-base lg:text-xl leading-[30px] text-center text-[#637381] ">
                  {feature.description}
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

import Image from "next/image";
import Container from "@/Components/Common/Container";

interface CoreProps {
  corevalues: any;
}

const CoreValues = ({ corevalues }: CoreProps) => {
  return (
    <section className="lg:py-[150px] py-20">
      <Container>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-medium text-black text-2xl sm:text-4xl xl:text-[38px]">
            {corevalues?.data?.section?.   sectionTitle}
          </h2>
          <p className="font-normal text-black text-base sm:text-lg lg:text-[18px] mt-4 max-w-3xl mx-auto">
            {corevalues?.data?.section?.sectionSubTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9">
          {corevalues?.data?.items?.map((feature: any) => {
            return (
              <div
                key={feature?._id}
                className="bg-[rgba(230,243,255,0.4)] rounded-[18px] shadow-[0_0_8px_rgba(145,158,171,0.4)] xl:py-10 xl:px-8 p-5 hover:shadow-lg transition-shadow duration-300"
              >
                {/* <div className="">
                  <Icon />
                </div> */}
                <Image
                  src={feature?.iconImg}
                  alt="mission"
                  // className="w-full h-auto rounded-xl"
                  height={80}
                  width={80}
                />

                <h3 className="text-xl lg:text-2xl font-semibold text-[#212B36] mt-5 mb-2">
                  {feature.title}
                </h3>

                <p className="text-base lg:text-lg text-[#637381] leading-relaxed">
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

export default CoreValues;

"use client";



interface faqprops {
  data?: any;
  faq?: any;
}

const FAQSection = ({ data, faq }: faqprops) => {
  return (
    <section className="px-6 lg:pt-[150px] pt-15">
      <h2 className="text-center text-[#101010] lg:text-[38px] md:text-[32px] text-[24px] font-semibold mb-10">
        {data?.data?.faqTitle}
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faq?.data?.map((faq: any) => (
          <div
            key={faq?._id}
            className="rounded-[18px] border border-[#B0D9FF] bg-[rgba(230,243,255,0.20)] shadow-[0_0_4px_0_rgba(145,158,171,0.40)]
             lg:py-7.5 lg:px-12.5 p-5"
          >
            <h3 className="lg:text-[24px] text-lg font-medium text-[#000]">
              {faq.question}
            </h3>
            <p className="lg:text-[18px] md:text-base text-sm font-normal text-[#000] lg:mt-5 mt-2">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

"use client";

const faqs = [
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all plans come with a 14-day free trial. No credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, bank transfers, and digital wallets.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee if you're not satisfied.",
  },
];

interface faqprops {
  data?: any;
}

const FAQSection = ({ data }: faqprops) => {
  return (
    <section className="px-6 lg:pt-[150px] pt-15">
      {/* Heading */}
      <h2 className="text-center text-[#101010] lg:text-[38px] md:text-[32px] text-[24px] font-semibold mb-10">
        {data?.data?.faqTitle}
      </h2>

      {/* FAQ Cards */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
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

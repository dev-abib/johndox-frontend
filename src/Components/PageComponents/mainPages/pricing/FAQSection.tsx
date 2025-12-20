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

const FAQSection = () => {
  return (
    <section className="px-6 pt-[150px]">
      {/* Heading */}
      <h2 className="text-center text-[#101010] text-[38px] font-semibold mb-10">
        Frequently Asked Questions
      </h2>

      {/* FAQ Cards */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-[18px] border border-[#B0D9FF] bg-[rgba(230,243,255,0.20)] shadow-[0_0_4px_0_rgba(145,158,171,0.40)] py-7.5 px-12.5"
          >
            <h3 className="text-[24px] font-medium text-[#000]">
              {faq.question}
            </h3>
            <p className="text-[18px] font-normal text-[#000] mt-5">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

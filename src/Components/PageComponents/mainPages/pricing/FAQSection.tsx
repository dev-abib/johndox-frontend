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
    <section className="px-6 py-20">
      {/* Heading */}
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-10">
        Frequently Asked Questions
      </h2>

      {/* FAQ Cards */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border border-[#D6E4FF] bg-white px-6 py-4"
          >
            <h3 className="text-base font-medium text-[#212B36]">
              {faq.question}
            </h3>
            <p className="mt-2 text-sm text-[#637381]">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

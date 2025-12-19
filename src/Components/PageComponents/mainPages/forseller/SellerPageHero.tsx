"use client";

const SellerPageHero = () => {
  return (
    <section
      className="w-full
      
      
      overflow-hidden"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/dyFnX7s/75ab89b5571bc80421e7ab6184068221c93c6cb1-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="w-full h-full bg-black/50 px-6 py-20 sm:py-24 lg:py-28 flex items-center justify-center">
        <div className="max-w-3xl text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Sell Your Property Faster
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/90">
            Join thousands of sellers who trust Terralink to sell their
            properties. Reach more buyers, close deals faster.
          </p>

          <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#2F80ED] px-8 py-4 text-white text-base font-medium hover:opacity-90 transition">
            Start selling Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default SellerPageHero;

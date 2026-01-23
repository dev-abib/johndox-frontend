import Link from "next/link";

const ReadytoSell = () => {
  return (
    <section
      className="relative w-full  py-16 xl:py-24 px-6 flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/VW8vzVDx/Group-35-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 ">
        <h2 className=" text-2xl 2xl:text-[32px] font-semibold leading-8 xl:leading-[48px] text-[#0085FF] mb-4">
          Ready to Sell?
        </h2>

        <p className="2xl:text-[24px] font-semibold xl:leading-[36px] text-[#454F5B] mb-5 xl:mb-10">
          List your property today and start connecting with buyers.
        </p>

        <Link href={"auth/login"}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button className="px-8 xl:text-xl py-2.5 xl:py-[20px] rounded-xl bg-primary-blue text-white font-medium hover:bg-primary-blue transition cursor-pointer">
              Create Free Account
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ReadytoSell;

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface ListPropertyprops {
  Listproperty?: any;
}

const ListPropertyCTA = ({ Listproperty }: ListPropertyprops) => {
  const pathname = usePathname();
  const isBuyerLayout = pathname.startsWith("/buyerlayout");
  return (
    <section
      className="relative w-full py-12 sm:py-16 xl:py-24 px-4 sm:px-6 flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/VW8vzVDx/Group-35-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="relative z-10 px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[32px] font-semibold leading-7 sm:leading-8 xl:leading-[48px] text-[#212B36] mb-3 sm:mb-4">
          {Listproperty?.data?.title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg 2xl:text-[24px] font-semibold xl:leading-[36px] text-[#454F5B] mb-4 sm:mb-5 xl:mb-10">
          {Listproperty?.data?.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Link href={`${isBuyerLayout ? "/buyerlayout/pricing" : "/pricing"}`} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 cursor-pointer text-sm sm:text-base xl:text-xl py-3 sm:py-2.5 xl:py-[20px] rounded-xl bg-primary-blue text-white font-medium hover:bg-primary-blue transition">
              {Listproperty?.data?.btnTxt?.[0] ?? "Start Selling Today"}
            </button>
          </Link>
          <Link href={`${isBuyerLayout ? "/buyerlayout/pricing" : "/pricing"}`} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 cursor-pointer text-sm sm:text-base xl:text-xl py-3 sm:py-2.5 xl:py-[20px] rounded-xl border-2 border-primary-blue text-primary-blue font-medium hover:bg-blue-50 transition">
              {Listproperty?.data?.btnTxt?.[1] ?? "View Pricing Plans"}
            </button>
          </Link>
        </div>

        <p className="text-sm sm:text-base text-[#212B36] xl:text-lg">
          No credit card required. Get started in minutes.
        </p>
      </div>
    </section>
  );
};

export default ListPropertyCTA;

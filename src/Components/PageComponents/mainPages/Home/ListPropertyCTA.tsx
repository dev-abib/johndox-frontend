import Link from "next/link";
interface ListPropertyprops {
  Listproperty?: any;
}

const ListPropertyCTA = ({ Listproperty }: ListPropertyprops) => {
  console.log(Listproperty);
  

  return (
    <section
      className="relative w-full  py-16 xl:py-24 px-6 flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/VW8vzVDx/Group-35-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="relative z-10 ">
        <h2 className=" text-2xl 2xl:text-[32px] font-semibold leading-8 xl:leading-[48px] text-[#212B36] mb-4">
          {Listproperty?.data?.title}
        </h2>

        <p className="2xl:text-[24px] font-semibold xl:leading-[36px] text-[#454F5B] mb-5 xl:mb-10">
          {Listproperty?.data?.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href={"/browse"}>
            <button className="px-8 cursor-pointer xl:text-xl py-2.5 xl:py-[20px] rounded-xl bg-primary-blue text-white font-medium hover:bg-primary-blue transition">
              {Listproperty?.data?.btnTxt?.[0] ?? "Start Selling Today"}
            </button>
          </Link>
          <Link href={"/pricing"}>
            <button className="px-8 cursor-pointer xl:text-xl py-2.5 xl:py-[20px] rounded-xl border-2 border-primary-blue text-primary-blue font-medium hover:bg-blue-50 transition">
              {Listproperty?.data?.btnTxt?.[1] ?? "View Pricing Plans"}
            </button>
          </Link>
        </div>

        <p className="text-[#212B36] xl:text-lg">
          No credit card required. Get started in minutes.
        </p>
      </div>
    </section>
  );
};

export default ListPropertyCTA;

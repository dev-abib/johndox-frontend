"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Container from "@/Components/Common/Container";

type ConverterForm = {
  lempira: string;
  downPayment: string;
};

const CurrencyConverter = () => {
  const { register, handleSubmit, setValue, watch } = useForm<ConverterForm>({
    defaultValues: {
      lempira: "$ 950,000",
      downPayment: "$ 2000",
    },
  });

  const [isSwapped, setIsSwapped] = useState(false);

  const onSubmit = (data: ConverterForm) => {
    console.log("Converter Data:", data);
  };

  const handleSwap = () => {
    const left = watch("lempira");
    const right = watch("downPayment");

    setValue("lempira", right);
    setValue("downPayment", left);

    setIsSwapped((prev) => !prev);
  };

  return (
    <Container>
      <div className="w-full mb-30">
        {/* Title */}
        <h2 className="text-xl font-semibold text-[#212B36] mb-4">
          Currency Converter
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Gray Wrapper */}
          <div className="bg-[#F9FAFB] rounded-xl px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              {/* Left Input */}
              <div>
                <label className="block text-sm font-medium text-[#5F5F5F] mb-2">
                  Lempira
                </label>
                <input
                  {...register("lempira")}
                  className="w-full border border-[#CFCFCF] bg-white px-4 py-3 rounded-lg text-sm text-[#212B36] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-[#ECECEC] flex items-center justify-center hover:bg-[#E0E0E0] transition cursor-pointer"
                >
                  <span className="text-lg text-[#212B36]">⇄</span>
                </button>
              </div>

              {/* Right Input */}
              <div>
                <label className="block text-sm font-medium text-[#5F5F5F] mb-2">
                  Down Payment
                </label>
                <input
                  {...register("downPayment")}
                  className="w-full border border-[#CFCFCF] bg-white px-4 py-3 rounded-lg text-sm text-[#212B36] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
            </div>
          </div>

          {/* OK Button */}
          <button
            type="submit"
            className="mt-6 w-[100px] bg-primary-blue text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition cursor-pointer"
          >
            OK
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CurrencyConverter;

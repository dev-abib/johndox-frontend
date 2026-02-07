"use client";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { PiSpinnerBold } from "react-icons/pi";
import Container from "@/Components/Common/Container";
import { useCurrencyConverter } from "@/Hooks/api/post_api";

type ConverterForm = {
  lempira: string;
  usd: string;
};

const CurrencyConverter = () => {
  const { register, handleSubmit, setValue, watch } = useForm<ConverterForm>({
    defaultValues: {
      lempira: "20,000",
      usd: "755.32",
    },
  });

  const { mutate, isLoading } = useCurrencyConverter();

  const onSubmit = (data: ConverterForm) => {
    const cleanedLempira = data.lempira.replace(/[^0-9.]/g, "");

    mutate(
      { lempira: cleanedLempira },
      {
        onSuccess: (res: any) => {
          if (res?.data) {
            toast.success("Currency converted successfully");
            setValue("lempira", res.data.lempira.toLocaleString());
            setValue("usd", res.data.usd.toLocaleString());
          }
        },
      },
    );
  };

  // 4. Handle Swap Logic
  const handleSwap = () => {
    const currentLempira = watch("lempira");
    const currentUsd = watch("usd");

    setValue("lempira", currentUsd);
    setValue("usd", currentLempira);
  };

  return (
    <Container>
      <div className="w-full lg:mb-30 mb-10">
        <h2 className="text-xl font-semibold text-[#212B36] mb-4">
          Currency Converter
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-[#F9FAFB] rounded-xl px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] lg:gap-6 gap-3 items-end">
              {/* Lempira Input */}
              <div>
                <label className="block text-sm font-medium text-[#5F5F5F] mb-2">
                  Lempira (HNL)
                </label>
                <input
                  {...register("lempira")}
                  className="w-full border border-[#CFCFCF] bg-white px-4 py-3 rounded-lg text-sm text-[#212B36] focus:outline-none focus:border-primary-blue"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-[#ECECEC] flex items-center justify-center hover:bg-[#E0E0E0] transition-colors"
                >
                  ⇄
                </button>
              </div>

              {/* USD Input */}
              <div>
                <label className="block text-sm font-medium text-[#5F5F5F] mb-2">
                  USD ($)
                </label>
                <input
                  {...register("usd")}
                  className="w-full border border-[#CFCFCF] bg-white px-4 py-3 rounded-lg text-sm text-[#212B36] focus:outline-none focus:border-primary-blue"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-[100px] cursor-pointer bg-primary-blue text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:bg-gray-400"
          >
            {isLoading ? (
              <PiSpinnerBold className="animate-spin size-[20px] fill-white mx-auto" />
            ) : (
              "OK"
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CurrencyConverter;

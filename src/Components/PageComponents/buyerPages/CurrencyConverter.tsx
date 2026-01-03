"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const CurrencyConverter = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [isReversed, setIsReversed] = useState(false);

  const conversionRate = 1; // Define the conversion rate (e.g., 1 USD = 24 Lempira)

  const handleConversion = (data: any) => {
    const amount = parseFloat(data.amount);
    if (isNaN(amount)) {
      alert("Please enter a valid number");
      return;
    }
    const result = isReversed
      ? amount / conversionRate
      : amount * conversionRate;

    setConvertedAmount(result);
  };

  const handleSwitchCurrency = () => {
    setIsReversed(prev => !prev);
    setValue("amount", ""); // Reset the amount field when switching currencies
    setConvertedAmount(null);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-[#212B36] mb-4">Currency Converter</h2>

      <form onSubmit={handleSubmit(handleConversion)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Amount Field */}
          <div>
            <label htmlFor="amount" className="text-sm font-medium text-[#5F5F5F]">
              {isReversed ? "Amount in Lempira" : "Amount in USD"}
            </label>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{ required: "Amount is required" }}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  placeholder="Enter amount"
                  className="w-full p-3 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            {errors.amount && <p className="text-sm text-red-500">{typeof errors.amount.message === 'string' ? errors.amount.message : ''}</p>}
          </div>

          {/* Currency Switch Button */}
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={handleSwitchCurrency}
              className="text-xl text-[#0085FF] hover:text-blue-500"
            >
              ⇄
            </button>
          </div>
        </div>

        {/* Convert Button */}
        <button
          type="submit"
          className="w-full bg-[#0085FF] text-white py-3 rounded-2xl hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300"
        >
          Convert
        </button>

        {/* Converted Amount */}
        {convertedAmount !== null && (
          <div className="mt-6 text-center text-[#212B36] font-semibold">
            <p className="text-lg">
              {isReversed ? `Amount in USD: $${convertedAmount.toFixed(2)}` : `Amount in Lempira: L${convertedAmount.toFixed(2)}`}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CurrencyConverter;

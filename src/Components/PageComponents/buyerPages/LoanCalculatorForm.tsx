"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import InputMask from "react-input-mask";
import Container from "@/Components/Common/Container";

const LoanCalculatorForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loanAmount, setLoanAmount] = useState<number | null>(null);

  const onSubmit = (data: any) => {
    // Convert values to numbers
    const price = parseFloat(data.assetsPrice);
    const down = parseFloat(data.downPayment);
    const years = parseFloat(data.loanTerms);
    const rate = parseFloat(data.interestRate) / 100;

    // Loan calculation
    const principal = price - down;
    const monthlyRate = rate / 12;
    const numberOfPayments = years * 12;

    const monthlyPayment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    setLoanAmount(monthlyPayment * 12);
  };

  return (
    <Container>
      <div className="my-10  w-full">
        <h2 className="text-xl font-semibold text-[#212B36] mb-4">
          Loan Calculator
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-[#F9FAFB] p-6   rounded-3xl shadow-lg ">
          <div className="grid grid-cols-2 gap-4">
            {/* Assets Price */}
            <div>
              <label
                htmlFor="assetsPrice"
                className="text-sm font-medium text-[#5F5F5F]"
              >
                Assets Price
              </label>
              <Controller
                name="assetsPrice"
                control={control}
                defaultValue=""
                rules={{ required: "Assets price is required" }}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    placeholder="$ 950,000"
                    className="w-full p-3 border border-[#CFCFCF] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              {errors.assetsPrice && (
                <p className="text-sm text-red-500">
                  {typeof errors.assetsPrice.message === "string"
                    ? errors.assetsPrice.message
                    : "Invalid input"}
                </p>
              )}
            </div>

            {/* Down Payment */}
            <div>
              <label
                htmlFor="downPayment"
                className="text-sm font-medium text-[#5F5F5F]"
              >
                Down Payment
              </label>
              <Controller
                name="downPayment"
                control={control}
                defaultValue=""
                rules={{ required: "Down payment is required" }}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    placeholder="$ 2,000"
                    className="w-full p-3 border border-[#CFCFCF] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              {errors.downPayment && (
                <p className="text-sm text-red-500">
                  {typeof errors.downPayment.message === "string"
                    ? errors.downPayment.message
                    : "Invalid input"}
                </p>
              )}
            </div>

            {/* Loan Terms */}
            <div>
              <label
                htmlFor="loanTerms"
                className="text-sm font-medium text-[#5F5F5F]"
              >
                Loan Terms (years)
              </label>
              <Controller
                name="loanTerms"
                control={control}
                defaultValue=""
                rules={{ required: "Loan terms are required" }}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    placeholder="30"
                    className="w-full p-3 border border-[#CFCFCF] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              {errors.loanTerms && (
                <p className="text-sm text-red-500">
                  {typeof errors.loanTerms.message === "string"
                    ? errors.loanTerms.message
                    : "Invalid input"}
                </p>
              )}
            </div>

            {/* Interest Rate */}
            <div>
              <label
                htmlFor="interestRate"
                className="text-sm font-medium text-[#5F5F5F]"
              >
                Interest Rate
              </label>
              <Controller
                name="interestRate"
                control={control}
                defaultValue=""
                rules={{ required: "Interest rate is required" }}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    placeholder="10%"
                    className="w-full p-3 border border-[#CFCFCF] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              {errors.interestRate && (
                <p className="text-sm text-red-500">
                  {typeof errors.interestRate.message === "string"
                    ? errors.interestRate.message
                    : "Invalid input"}
                </p>
              )}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            className="  bg-[#0085FF] text-white py-3 px-4 rounded-md hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300"
          >
            Calculate
          </button>

          {/* Loan Amount Display */}
          {loanAmount !== null && (
            <div className="mt-6 text-center text-[#212B36] font-semibold">
              <p className="text-lg">
                Total Loan Amount: ${loanAmount.toFixed(2)}
              </p>
            </div>
          )}
        </form>
      </div>
    </Container>
  );
};

export default LoanCalculatorForm;

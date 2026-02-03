"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Container from "@/Components/Common/Container";
import { LoanConverter } from "@/Hooks/api/post_api";

type LoanFormInput = {
  assetsPrice: string;
  downPayment: string;
  loanTerms: string;
  interestRate: string;
};

const LoanCalculatorForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [submittedData, setSubmittedData] = useState<LoanFormInput | null>(
    null,
  );

  const { control, handleSubmit } = useForm<LoanFormInput>({
    defaultValues: {
      assetsPrice: "950000",
      downPayment: "20000",
      loanTerms: "30",
      interestRate: "18",
    },
  });

  const { mutate, isLoading } = LoanConverter();

  const onSubmit = (data: LoanFormInput) => {
    const payload = {
      asset_price: data.assetsPrice,
      down_payment: data.downPayment,
      loan_terms_years: data.loanTerms,
      interest_rate: data.interestRate,
    };

    mutate(payload, {
      onSuccess: (response: any) => {
        setResult(response.data);
        setSubmittedData(data);
        setIsModalOpen(true);
      },
    });
  };

  return (
    <Container>
      <div className="my-10 w-full">
        <h2 className="text-xl font-semibold text-[#212B36] mb-4">
          Loan Calculator
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-[#F9FAFB] p-6 rounded-3xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input fields remain the same */}
            {["assetsPrice", "downPayment", "loanTerms", "interestRate"].map(
              name => (
                <div key={name}>
                  <label className="text-sm font-medium text-[#5F5F5F] capitalize">
                    {name.replace(/([A-Z])/g, " $1")}
                  </label>
                  <Controller
                    name={name as keyof LoanFormInput}
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        className="w-full p-3 border border-[#CFCFCF] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>
              ),
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#0085FF] text-white py-3 px-8 rounded-md hover:bg-blue-600 transition-all disabled:bg-gray-400 cursor-pointer"
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </button>
        </form>

        {/* --- RESULT MODAL --- */}
        {isModalOpen && result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#212B36]">
                  Estimation Result
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-600 font-medium">
                    Monthly Payment
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    $
                    {Number(result.monthly_payment).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-100 rounded-xl">
                    <p className="text-xs text-gray-500">Total Asset Price</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ${Number(submittedData?.assetsPrice).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl">
                    <p className="text-xs text-gray-500">Loan Amount</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ${Number(result.loan_amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-8 w-full bg-[#212B36] text-white py-3 rounded-xl font-medium hover:bg-black transition-colors"
              >
                Close Result
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default LoanCalculatorForm;

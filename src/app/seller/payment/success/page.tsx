import Container from "@/Components/Common/Container";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#0085FF]/5 flex flex-col items-center justify-center px-5 py-12 sm:py-16 md:py-20">
      <Container>
        <div className="w-full max-w-md text-center space-y-9 sm:space-y-10">
          <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0085FF]/15 to-[#0184ff]/5 blur-2xl animate-pulse-slow"></div>
            <div className="relative flex items-center justify-center w-full h-full rounded-full bg-white shadow-xl border border-[#0085FF]/10">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-[#0085FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Payment Success
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#5F5F5F] font-light leading-relaxed px-2">
            Thank you — your payment was completed successfully.
          </p>

          <div className="pt-6 sm:pt-8">
            <Link
              href="/seller/profile"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#0085FF] to-[#0184ff] hover:from-[#006fd1] hover:to-[#0073e6] text-white font-medium text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95"
            >
              Go to Dashboard
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

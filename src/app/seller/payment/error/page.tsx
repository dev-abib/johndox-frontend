import Container from "@/Components/Common/Container";
import Link from "next/link";

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/5 flex flex-col items-center justify-center px-5 py-12 sm:py-16 md:py-20">
      <Container>
        <div className="w-full  text-center space-y-9 sm:space-y-10">
          <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/10 to-rose-400/5 blur-2xl animate-pulse-slow"></div>

            <div className="relative flex items-center justify-center w-full h-full rounded-full bg-white shadow-xl border border-red-100">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Payment Failed
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#5F5F5F] font-light leading-relaxed px-2">
            Something went wrong with your payment.
            <br className="hidden sm:inline" />
            Please try again or use a different method.
          </p>

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
            <Link
              href="/seller/pricing"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#0085FF] to-[#0184ff] hover:from-[#006fd1] hover:to-[#0073e6] text-white font-medium text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
            >
              Try Again
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </Link>

            <Link
              href="/seller/profile"
              className="inline-flex items-center justify-center gap-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-lg px-10 py-4 rounded-full transition-all duration-300 hover:bg-gray-50 active:scale-95 w-full sm:w-auto"
            >
              Back to Home
            </Link>
          </div>

          <p className="pt-10 sm:pt-12 text-sm sm:text-base text-gray-400/90">
            If the problem continues, please{" "}
            <a
              href="mailto:support@yourdomain.com"
              className="text-[#0085FF] hover:underline"
            >
              contact support
            </a>
            <br className="sm:hidden" />
          </p>
        </div>
      </Container>
    </div>
  );
}

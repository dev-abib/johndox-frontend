import { Suspense } from "react";
import VerifyOTPClient from "../../../Components/Auth/VerifyOTPClient";

export default function Page() {
  return (
    <Suspense>
      <VerifyOTPClient />
    </Suspense>
  );
}

import { Suspense } from "react";
import VerifyAccount from "@/Components/Auth/VerifyAccount";

export default function Page() {
  return (
    <Suspense>
      <VerifyAccount />
    </Suspense>
  );
}

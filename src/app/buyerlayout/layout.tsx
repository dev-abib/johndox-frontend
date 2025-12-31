import React from "react";
import Footer from "@/Shared/Footer";
import BuyerNav from "@/Shared/BuyerNav";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BuyerNav />
      <main className="mt-28">{children}</main>
      <Footer />
    </>
  );
};

export default SellerLayout;

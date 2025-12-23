import React from "react";
import Footer from "@/Shared/Footer";
import SellerNav from "@/Shared/SellerNav";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SellerNav />
      <main className="mt-28">{children}</main>
      <Footer />
    </>
  );
};

export default SellerLayout;

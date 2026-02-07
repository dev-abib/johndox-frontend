import Footer from "@/Shared/Footer";
import SellerNav from "@/Shared/SellerNav";
import PrivateRoute from "@/Private/PrivateLayout";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute allowedRoles={["seller"]}>
      <SellerNav />
      <main className=" mt-28">{children}</main>
      <Footer />
    </PrivateRoute>
  );
}

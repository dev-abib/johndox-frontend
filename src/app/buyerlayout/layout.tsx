import Footer from "@/Shared/Footer";
import BuyerNav from "@/Shared/BuyerNav";
import PrivateRoute from "@/Private/PrivateLayout";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute allowedRoles={["buyer"]}>
      <BuyerNav /> <main className="mt-28">{children}</main>
      <Footer />
    </PrivateRoute>
  );
}

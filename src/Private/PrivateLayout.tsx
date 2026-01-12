// Components/PrivateRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";

type Role = "buyer" | "seller" | "any"; // "any" = authenticated user of any role

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[]; // e.g. ["buyer"] or ["seller"] or ["buyer", "seller"]
  redirectTo?: string; // optional custom redirect
}

const PrivateRoute = ({
  children,
  allowedRoles,
  redirectTo,
}: PrivateRouteProps) => {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  const userRole = user?.role?.toLowerCase() as "buyer" | "seller" | undefined;

  useEffect(() => {
    if (loading) return;

    // Not authenticated → go to login
    if (!token || !user) {
      router.push("/auth/login");
      return;
    }

    // Authenticated but wrong role
    const hasAccess =
      allowedRoles.includes("any") ||
      (userRole && allowedRoles.includes(userRole));

    if (!hasAccess) {
      // Redirect based on role
      if (userRole === "seller") {
        router.push("/seller/dashboard"); // or "/seller/my-listings"
      } else if (userRole === "buyer") {
        router.push("/"); // or "/buyer/favorites"
      } else {
        router.push("/");
      }
    }
  }, [loading, token, user, userRole, allowedRoles, router]);


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  if (!token || !user) return null;

  const hasAccess =
    allowedRoles.includes("any") ||
    (userRole && allowedRoles.includes(userRole));

  if (!hasAccess) return null;

  return <>{children}</>;
};

export default PrivateRoute;

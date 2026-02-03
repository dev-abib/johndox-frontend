"use client";

import { useEffect } from "react";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import { Riple } from "react-loading-indicators";


type Role = "buyer" | "seller" | "any";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  const userRole = user?.role?.toLowerCase() as Role | undefined;

  useEffect(() => {
    if (loading) return;

    if (!token && !user) {
      router.push("/auth/login");
      return;
    }

    const hasAccess =
      allowedRoles.includes("any") ||
      (userRole && allowedRoles.includes(userRole));

    if (!hasAccess && userRole) {
      if (userRole === "seller") {
        router.push("/seller");
      } else if (userRole === "buyer") {
        router.push("/buyerlayout");
      }
    }
  }, [loading, token, user, userRole, allowedRoles, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Riple color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  if (!token && !user) return null;

  const hasAccess =
    allowedRoles.includes("any") ||
    (userRole && allowedRoles.includes(userRole));

  if (!hasAccess) return null;

  return <>{children}</>;
};

export default PrivateRoute;

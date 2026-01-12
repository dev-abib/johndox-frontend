"use client";

import { useEffect } from "react";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";

type Role = "buyer" | "seller" | "any"; 

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[]; 
  redirectTo?: string;
}

const PrivateRoute = ({
  children,
  allowedRoles,
}: PrivateRouteProps) => {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  const userRole = user?.role?.toLowerCase() as "buyer" | "seller" | undefined;

  useEffect(() => {
    if (loading) return;

    if (!token || !user) {
      router.push("/auth/login");
      return;
    }

    // Authenticated but wrong role
    const hasAccess =
      allowedRoles.includes("any") ||
      (userRole && allowedRoles.includes(userRole));

    if (!hasAccess) {
      if (userRole === "seller") {
        router.push("/seller"); 
      } else if (userRole === "buyer") {
        router.push("/buyerlayout"); 
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

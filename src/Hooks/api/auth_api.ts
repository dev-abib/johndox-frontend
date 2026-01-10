"use client";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import useClientApi from "@/Hooks/useClientApi";

// Get User Data
export const useGetUserData = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["user", token],
    enabled: !!token,
    endpoint: "/get-me",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};

// Registration
export const useRegister = () => {
  const router = useRouter();
  return useClientApi({
    method: "post",
    key: ["register"],
    endpoint: "/register",
    onSuccess: (data: any) => {
      console.log(data);

      if (data?.status || data?.success) {
        toast.success(data?.message);
        router.push(
          `/auth/verify-otp?email=${encodeURIComponent(data?.data?.email)}`
        );
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Login
export const useLogin = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["login"],
    endpoint: "/api/users/login",
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        setToken(data?.data?.token);
        toast.success(data?.message);
        router.push("/dashboard");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Verify-otp
export const useVeifyOtp = () => {
  const router = useRouter();
  return useClientApi({
    method: "post",
    key: ["verifyotp"],
    endpoint: "/verify-otp",
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message);
        router.push("/auth/login");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};
// Resend Verify-otp
export const useResendVeifyOtp = () => {
  return useClientApi({
    method: "post",
    key: ["resendotp"],
    endpoint: "/resend-otpp",
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

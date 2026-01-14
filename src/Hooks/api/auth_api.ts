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
    endpoint: "/login",
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        const token = data?.data?.token;
        const role = data?.data?.role;

        if (token) {
          setToken(token);
        }

        toast.success(data?.message || "Login successful!");

        if (role === "buyer") {
          router.push("/buyerlayout");
        } else if (role === "seller") {
          router.push("/seller");
        } else {
          toast.error("Unknown user role");
        }
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });
};

// Verify-Acc
export const useVerifyOtp = () => {
  const router = useRouter();
  return useClientApi({
    method: "put",
    key: ["verifyotp"],
    endpoint: "/verify-acc",
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

// Verify-otp
export const useVerify_Otp = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["verifyotp"],
    endpoint: "/verify-otp",
    isPrivate: false,
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        const token = data?.data?.token;
        setToken(token);
        localStorage.setItem("reset_token", token);
        toast.success(data?.message);
        router.push("/auth/reset-password");
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
    method: "put",
    key: ["resendotp"],
    endpoint: "/resend-otp",
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

// Forgot Password
export const useForgotPassWord = () => {
  const router = useRouter();

  return useClientApi({
    method: "post",
    key: ["forgot-password"],
    endpoint: "/verify-email",
    onSuccess: (data: any, variables: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message);
        sessionStorage.setItem("verify_email", variables.email);
        router.push("/auth/verify-account");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Reset Password
export const UseResetPassword = () => {
  const router = useRouter();
  const token = localStorage.getItem("reset_token");
  return useClientApi({
    method: "post",
    key: ["reset-password"],
    endpoint: "/reset-pass",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

// Change Password
export const useChnagePassword = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  return useClientApi({
    method: "put",
    key: ["changepassword"],
    endpoint: "/change-password",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

// Update User
export const useUpdateUserBuyer = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const { data: user, isLoading } = useGetUserData(token);

  return useClientApi({
    method: "put",
    key: ["updateuser"],
    endpoint: "/update-user",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    onSuccess: (data: any) => {
      if (data?.status || data?.success) toast.success(data?.message);

      if (!user) {
        console.log("User data not loaded yet");
        return;
      }

      const role = user?.data?.role?.trim().toLowerCase();
      console.log("User role:", role);

      if (role === "seller") {
        router.push("/seller/profile-info");
      } else if (role === "buyer") {
        router.push("/buyerlayout/profile-info");
      } else {
        router.push("/");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });
};


// Logout
export const useLogout = () => {
  const token = localStorage.getItem("token");
  return useClientApi({
    method: "post",
    key: ["logout"],
    endpoint: "/log-out",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message);
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Logout failed");
    },
  });
};

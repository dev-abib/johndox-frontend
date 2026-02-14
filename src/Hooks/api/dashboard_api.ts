// All Dashboard API
import toast from "react-hot-toast";
import useClientApi from "../useClientApi";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

// Add Listing
export const useAddListing = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  return useClientApi({
    method: "post",
    key: ["addlisting"],
    endpoint: "/add-new-property",
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message || "Listing created successfully!");
        router.push("/seller/profile");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create listing");
    },
  });
};

// Edit Listing
export const useEditListing = (listingId: string) => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return useClientApi({
    method: "put",
    key: ["edit-listing", listingId],
    endpoint: `/update-property/${listingId}`,
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message || "Listing updated successfully!");
        router.push("/seller/profile");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update listing");
    },
  });
};

// Get Categories
export const useCategory = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["category", token],
    enabled: !!token,
    endpoint: "/get-category-section",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};

// Get Seller Analytics
export const GetAnalytics = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["analytics", token],
    enabled: !!token,
    endpoint: "/get-seller-statics",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};

// Get Seller Statistics
export const GetStatistics = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["statistics", token],
    enabled: !!token,
    endpoint: "/get-my-property-analytics",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};

// Get All Amenities
export const GetAllamenities = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["amenities", token],
    enabled: !!token,
    endpoint: "/get-all-amenities",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};

// Get All Listing
export const useAlllisting = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["listing", token],
    enabled: !!token,
    endpoint: "/my-listings?page=1&limit=10",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};

// Get All Listing
export const GetAllFavourite = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["listing", token],
    enabled: !!token,
    endpoint: "/get-my-favourite-listing",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};

// Delete Listing
export const useDelete = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useClientApi({
    method: "delete",
    key: ["delete-property"],
    onSuccess: (data: any) => {
      if (data?.status || data?.success) {
        toast.success(data?.message || "Listing deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["listings"] });
        router.push("/seller/profile");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete listing");
    },
  });
};


import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/Hooks/useAxiosSecure";
import { axiosPublic } from "@/Hooks/useAxiosPublic";

type apiProps = {
  key?: any[];
  endpoint?: string;
  method?: "get" | "post" | "put" | "delete";
  isPrivate?: boolean;
  onSuccess?: any;
  onError?: any;
  queryOptions?: any;
  mutationOptions?: any;
  axiosOptions?: any;
  params?: any;
  headers?: any;
  enabled?: boolean;
  trigger?: boolean; // New: force mutation behavior
};

export default function useClientApi({
  endpoint,
  method = "get",
  isPrivate = false,
  key,
  onSuccess,
  onError,
  params,
  headers,
  queryOptions,
  mutationOptions,
  axiosOptions,
  enabled = true,
  trigger = false,
}: apiProps): any {
  const axiosInstance = isPrivate ? axiosSecure : axiosPublic;

  // Standard GET Request (Automatic fetch)
  if (method === "get" && !trigger) {
    return useQuery({
      queryKey: key,
      queryFn: async () => {
        const res = await axiosInstance.get(endpoint!, { params, headers });
        return res.data;
      },
      enabled,
      staleTime: 0,
      ...queryOptions,
    });
  }

  // Mutation Request (Manual trigger on click)
  return useMutation({
    mutationKey: key,
    mutationFn: async (variables?: any) => {
      // Allow overriding endpoint dynamically
      const finalEndpoint = variables?.endpoint || endpoint;

      if (method === "get") {
        const res = await axiosInstance.get(finalEndpoint!, {
          params: variables?.params || params,
          headers,
          ...axiosOptions,
        });
        return res.data;
      }

      const res = await axiosInstance[method](
        finalEndpoint!,
        variables?.data || variables,
        { headers, ...axiosOptions },
      );
      return res.data;
    },
    onSuccess,
    onError,
    ...mutationOptions,
  });
}

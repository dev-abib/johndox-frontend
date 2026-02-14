import useClientApi from "../useClientApi";
import { useServerApi } from "@/Hooks/useServerApi";

//  CSR (Client Side Rendering)
export const useGetProperties = (filters: any = {}) => {
  return useClientApi({
    method: "get",
    key: ["get-properties", filters],
    endpoint: `/all-listings`,
    params: filters,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });
};

// Why Choose Us
export const useWhyChoose = () => {
  return useClientApi({
    method: "get",
    key: ["why-choose-us"],
    endpoint: "/get-why-sell-with-us-section",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Why it Works
export const whyitWorks = () => {
  return useClientApi({
    method: "get",
    key: ["whyitwork"],
    endpoint: "/get-how-it-works-section",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Seller Banner
export const forSellerBanner = () => {
  return useClientApi({
    method: "get",
    key: ["forsellerbanner"],
    endpoint: "/get-sellers-hero",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// List Property Browse
export const ListPropertyBrowse = () => {
  return useClientApi({
    method: "get",
    key: ["list-property-browse"],
    endpoint: "/list-property-sections",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Pricing Page
export const PricingPage = () => {
  return useClientApi({
    method: "get",
    key: ["get-pricing-page"],
    endpoint: "/get-pricing-page-cms",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Pricing Plan
export const PricingPlan = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-plan"],
    endpoint: "/get-all-plan",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// All Faq
export const AllFaw = () => {
  return useClientApi({
    method: "get",
    key: ["faq"],
    endpoint: "/get-faq",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// About Banner
export const AboutBanner = () => {
  return useClientApi({
    method: "get",
    key: ["AboutBanner"],
    endpoint: "/get-about-hero",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Our Mission
export const Ourmission = () => {
  return useClientApi({
    method: "get",
    key: ["ourmission"],
    endpoint: "/get-our-mission-section",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Buyer &Seller Community
export const CommunityData = () => {
  return useClientApi({
    method: "get",
    key: ["community"],
    endpoint: "/community",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Core Values
export const Corevalues = () => {
  return useClientApi({
    method: "get",
    key: ["corevalues"],
    endpoint: "/get-core-value-section",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Contact Us
export const ConatctUs = () => {
  return useClientApi({
    method: "get",
    key: ["contact-us"],
    endpoint: "/get-contact-us-hero",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Site Settings
export const SiteSettings = () => {
  return useClientApi({
    method: "get",
    key: ["sitesettings"],
    endpoint: "/get/site-settings",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Terms & Conditions
export const TermsCondition = () => {
  return useClientApi({
    method: "get",
    key: ["terms"],
    endpoint: "/get-terms-and-conditions",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

//  SSR (Server Side Rendering)
export async function getFeaturedListings() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/get-featured-properties",
  });
}

// Get Category
export async function Category() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/get-category-section",
  });
}

// Why Choose Us
export async function Whychooseus() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/get-why-sell-with-us-section",
  });
}

// Landing Banner
export async function Banner() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/get-property-hero",
  });
}

// List Property
export async function ListProperty() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/list-property-sections",
  });
}

// Site Settings — NO CACHE
export async function getSiteSettings() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/api/site-settings",
  });
}

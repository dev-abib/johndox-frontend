let domain = "example.com"; // fallback
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (siteUrl) {
  try {
    domain = new URL(siteUrl).hostname;
  } catch {
    console.warn("Invalid NEXT_PUBLIC_SITE_URL, using fallback domain.");
  }
} else {
  console.warn("NEXT_PUBLIC_SITE_URL not set, using fallback domain.");
}

const nextConfig = {
  images: {
    remotePatterns: [
      // Your own site (dynamic)
      {
        protocol: "https",
        hostname: domain,
        pathname: "/**",
      },

      // iBB image hosting (logo)
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

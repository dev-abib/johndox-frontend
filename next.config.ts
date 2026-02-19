let domain = "example.com";
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
      {
        protocol: "https",
        hostname: domain,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

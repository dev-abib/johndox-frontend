"use client";
import { CiLinkedin } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { SiteSettings } from "@/Hooks/api/cms_api";
import { LiaFacebookSquare } from "react-icons/lia";
import Container from "@/Components/Common/Container";
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getItem } from "@/lib/localStorage";
import { useGetUserData } from "@/Hooks/api/auth_api";

const socialIcons: Record<string, any> = {
  facebook: LiaFacebookSquare,
  instagram: FaInstagram,
  linkedin: CiLinkedin,
  x: RiTwitterXFill,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  youtube: FaYoutube,
};

// ── Role-based footer link definitions ──────────────────────────────────────
const footerLinks = {
  guest: {
    column1: [
      { label: "Browse Properties", href: "/browse" },
      { label: "Houses", href: "/browse?type=house" },
      { label: "Land", href: "/browse?type=land" },
    ],
    column2: [
      { label: "Commercial", href: "/browse?type=commercial" },
      { label: "Pricing", href: "/pricing" },
    ],
    column3: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact-us" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  buyer: {
    column1: [
      { label: "Browse Properties", href: "/buyerlayout/browse" },
      { label: "My Favorites", href: "/buyerlayout/favourites" },
      { label: "Saved Searches", href: "/buyerlayout/searches" },
    ],
    column2: [
      { label: "Messages", href: "/buyerlayout/messages" },
      { label: "Notifications", href: "/buyerlayout/notifications" },
    ],
    column3: [
      { label: "About Us", href: "/buyerlayout/about" },
      { label: "Contact", href: "/buyerlayout/contact-us" },
      { label: "Terms & Conditions", href: "/buyerlayout/terms-service" },
    ],
  },
  seller: {
    column1: [
      { label: "My Listings", href: "/seller/my-listing" },
      { label: "New Listing", href: "/seller/new-listing" },
      { label: "Analytics", href: "/seller/analytics" },
    ],
    column2: [
      { label: "Subscription Plans", href: "/seller/pricing" },
      { label: "Messages", href: "/seller/message" },
    ],
    column3: [
      { label: "About Us", href: "/seller/about" },
      { label: "Contact", href: "/seller/contact-us" },
      { label: "Terms & Conditions", href: "/seller/terms-service" },
    ],
  },
};

type FooterRole = "guest" | "buyer" | "seller";

const Footer = () => {
  const { data: siteData } = SiteSettings();
  const socialLinks = siteData?.data?.socialLinks || {};

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<FooterRole>("guest");

  useEffect(() => {
    const savedToken = getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const { data: userData } = useGetUserData(token);

  useEffect(() => {
    if (userData?.data?.role === "buyer") {
      setRole("buyer");
    } else if (userData?.data?.role === "seller") {
      setRole("seller");
    } else {
      setRole("guest");
    }
  }, [userData]);

  const links = footerLinks[role];

  const renderLinkList = (items: { label: string; href: string }[]) =>
    items.map(item => (
      <li key={item.label}>
        <a href={item.href} className="hover:text-white transition-colors">
          {item.label}
        </a>
      </li>
    ));

  return (
    <footer className="bg-[#0f0f0f] text-white overflow-hidden lg:mt-[150px] mt-15">
      <Container>
        <div>
          <div className="px-5 py-5 xl:py-10 flex flex-col xl:flex-row gap-4 xl:gap-12">
            {/* Left Text */}
            <div className="xl:w-[37%] w-full">
              <p className="footer_text xl:w-[80%] w-full text-center xl:text-left">
                The leading real estate marketplace in Honduras.
              </p>
            </div>

            {/* Links — role-aware */}
            <div className="flex flex-col sm:flex-row xl:flex-row justify-between items-start flex-1 gap-5 xl:gap-10 xl:w-[63%] w-full">
              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  {renderLinkList(links.column1)}
                </ul>
              </div>

              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  {renderLinkList(links.column2)}
                </ul>
              </div>

              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  {renderLinkList(links.column3)}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <img
              src={siteData?.data?.footerLogo}
              alt=""
              className="mx-auto xl:mx-0"
            />
          </div>
        </div>

        <div className="relative z-10 border-t border-[#454F5B] mt-10">
          <div className="px-5 xl:px-0 pt-6 pb-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
            <p className="text-sm xl:text-[16px] md:text-[18px] font-normal leading-[28px] text-[#FFF] text-center md:text-left">
              {/* {data?.data?.copyrightTxt ||
                "© 2025 Terralink. All rights reserved."} */}
            </p>

            <div className="flex items-center gap-5">
              {Object.entries(socialLinks).map(([key, url]) => {
                if (!url || typeof url !== "string") return null;
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition text-white text-2xl"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

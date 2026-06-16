"use client";
import { CiLinkedin } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { SiteSettings } from "@/Hooks/api/cms_api";
import { LiaFacebookSquare } from "react-icons/lia";
import Container from "@/Components/Common/Container";
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from "react-icons/fa";

const socialIcons: Record<string, any> = {
  facebook: LiaFacebookSquare,
  instagram: FaInstagram,
  linkedin: CiLinkedin,
  x: RiTwitterXFill,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  youtube: FaYoutube,
};

const Footer = () => {
  const { data } = SiteSettings();
  const socialLinks = data?.data?.socialLinks || {};
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

            {/* Links */}
            <div className="flex flex-col sm:flex-row xl:flex-row justify-between items-start flex-1 gap-5 xl:gap-10 xl:w-[63%] w-full">
              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  <li>
                    <a href="#" className="hover:text-white">
                      Browse Properties
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Houses
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Land
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Commercial
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  <li>
                    <a href="#" className="hover:text-white">
                      List Property
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:text-white">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  <li>
                    <a href="#" className="hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <img
              src={data?.data?.footerLogo}
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

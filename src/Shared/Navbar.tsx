"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Container from "@/Components/Common/Container";
import { PlanetSvg } from "@/Components/Svg/SvgContainer";
import { AngleBottomSvg } from "@/Components/Svg/SvgContainer2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages = ["English", "Spanish"];
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("English");

  // ✅ Guest-only static config
  const config = {
    logoHref: "/",
    desktopLinks: [
      {
        type: "li-link",
        label: "Home",
        href: "/",
        linkClassName: "hover:text-black transition",
      },
      {
        type: "link-li",
        label: "Browse Properties",
        href: "/browse",
        liClassName:
          "flex items-center gap-1 cursor-pointer hover:text-black transition",
      },
      {
        type: "li-link",
        label: "For Sellers",
        href: "/forseller",   
        linkClassName: "hover:text-black transition",
      },
      {
        type: "li-link",
        label: "About",
        href: "/about",
        linkClassName: "hover:text-black transition",
      },
      {
        type: "li-link",
        label: "Contact Us",
        href: "/contact-us",
        linkClassName: "hover:text-black transition",
      },
    ],
    desktopButtons: [
      {
        label: "Log In",
        href: "/auth/login",
        className:
          "rounded-xl border-2 border-primary-blue px-[24px] py-2 2xl:py-3  2xl:text-xl leading-[30px] text-primary-blue hover:bg-primary-blue hover:text-white transition",
      },
      {
        label: "Sign Up",
        href: "/auth/register",
        className:
          "rounded-xl bg-primary-blue px-[18px] py-1.5 2xl:py-3  2xl:text-xl leading-[30px] text-white hover:opacity-90 hover:bg-white hover:border-2 border-2 border-primary-blue transition hover:text-primary-blue",
      },
    ],
    mobileLinks: [
      {
        type: "li-link",
        label: "Home",
        href: "/",
        closeOnClick: true,
      },
      {
        type: "link-li",
        label: "Browse Properties",
        href: "/browse",
        liClassName: "flex items-center gap-1 cursor-pointer",
        closeOnClick: false,
      },
      {
        type: "li-link",
        label: "For Sellers",
        href: "/forseller",
        closeOnClick: true,
      },
      {
        type: "li-link",
        label: "About",
        href: "/about",
        closeOnClick: true,
      },
      {
        type: "li-link",
        label: "Contact Us",
        href: "/contact-us",
        closeOnClick: true,
      },
    ],
    mobileButtons: [
      {
        label: "Log In",
        href: "/auth/login",
        className:
          "rounded-xl border-2 border-primary-blue px-[24px] py-3 text-center text-primary-blue",
      },
      {
        label: "Sign Up",
        href: "/auth/register",
        className:
          "rounded-xl bg-primary-blue px-[18px] py-3 text-center text-white",
      },
    ],
  };

  const renderDesktopLink = (item: any) => {
    if (item.type === "link-li") {
      return (
        <Link key={item.label} href={item.href}>
          <li className={item.liClassName}>{item.label}</li>
        </Link>
      );
    }

    return (
      <li key={item.label}>
        <Link href={item.href} className={item.linkClassName}>
          {item.label}
        </Link>
      </li>
    );
  };

  const renderMobileLink = (item: any) => {
    if (item.type === "link-li") {
      return (
        <Link key={item.label} href={item.href}>
          <li className={item.liClassName}>{item.label}</li>
        </Link>
      );
    }

    return (
      <li key={item.label}>
        <Link
          href={item.href}
          onClick={item.closeOnClick ? () => setIsOpen(false) : undefined}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  const changeLanguage = (lang: "en" | "es") => {
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement;

    if (!select) return;

    select.value = lang;
    select.dispatchEvent(new Event("change"));
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Container>
        <header className="w-full text-black">
          {/* =======================
              TOP BAR (DESKTOP)
              ======================= */}
          <div className="flex items-center justify-between py-[26px]">
            <Link href={config.logoHref} className="flex items-center">
              <Image
                src="https://i.ibb.co.com/2YMddrBt/Group-1321314777.png"
                alt="Terralink Logo"
                width={220}
                height={60}
                priority
                className="w-[150px] 2xl:w-[220px]"
              />
            </Link>

            <ul className="hidden xl:flex items-center gap-3.5 2xl:gap-8 menu_item">
              {config.desktopLinks.map(renderDesktopLink)}

              <li className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 cursor-pointer hover:text-black transition"
                >
                  <PlanetSvg /> {activeLang}
                  <span
                    className={`text-xs ml-3 transition-transform ${
                      langOpen ? "rotate-180" : ""
                    }`}
                  >
                    <AngleBottomSvg />
                  </span>
                </button>

                <div
                  className={`absolute top-full right-0 mt-3 w-[160px] rounded-xl bg-white shadow-lg border border-text-dark transition-all duration-200 ${
                    langOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  {languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLang(lang);
                        setLangOpen(false);
                        changeLanguage(lang === "Spanish" ? "es" : "en");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-xl transition"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </li>
            </ul>

            <div className="hidden xl:flex items-center gap-4">
              {config.desktopButtons.map(btn => (
                <Link key={btn.label} href={btn.href} className={btn.className}>
                  {btn.label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden text-2xl"
            >
              <FaBars />
            </button>
          </div>

          {/* =======================
              DRAWER (MOBILE)
              ======================= */}
          <div
            className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-xl transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } xl:hidden`}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <Image
                src="https://i.ibb.co.com/2YMddrBt/Group-1321314777.png"
                alt="Terralink Logo"
                width={160}
                height={40}
              />
              <button onClick={() => setIsOpen(false)} className="text-xl">
                <FaTimes />
              </button>
            </div>

            <ul className="flex flex-col gap-3 px-6 py-5 ">
              {config.mobileLinks.map(renderMobileLink)}

              <li className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 cursor-pointer hover:text-black transition"
                >
                  <PlanetSvg /> {activeLang}
                  <span
                    className={`text-xs ml-3 transition-transform ${
                      langOpen ? "rotate-180" : ""
                    }`}
                  >
                    <AngleBottomSvg />
                  </span>
                </button>

                <div
                  className={`absolute top-full right-0 mt-3 w-[160px] rounded-xl bg-white shadow-lg border border-text-dark transition-all duration-200 ${
                    langOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  {languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLang(lang);
                        setLangOpen(false);
                        changeLanguage(lang === "English" ? "en" : "es");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </li>
            </ul>

            <div className="px-6 flex flex-col gap-4">
              {config.mobileButtons.map(btn => (
                <Link
                  key={btn.label}
                  href={btn.href}
                  onClick={() => setIsOpen(false)}
                  className={btn.className}
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>

          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 xl:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
        </header>
      </Container>
    </nav>
  );
};

export default Navbar;

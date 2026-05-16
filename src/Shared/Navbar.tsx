"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Container from "@/Components/Common/Container";
import { PlanetSvg } from "@/Components/Svg/SvgContainer";
import { AngleBottomSvg } from "@/Components/Svg/SvgContainer2";

type Lang = "English" | "Spanish";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<Lang>("English");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages: Lang[] = ["English", "Spanish"];

  /* ===============================
     MANUAL AUTH LABEL CONTROL
     =============================== */
  const authLabels = {
    English: {
      login: "Log In",
      register: "Sign Up",
    },
    Spanish: {
      login: "Acceso",
      register: "Inscribirse",
    },
  };

  const changeLanguage = (lang: "en" | "es") => {
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement | null;

    if (!select) return;

    select.value = lang;
    select.dispatchEvent(new Event("change"));
  };

  const config = {
    logoHref: "/",

    desktopLinks: [
      {
        type: "li-link",
        label: "Home",
        href: "/",
        linkClassName: "hover:text-black transition text-lg",
      },
      {
        type: "link-li",
        label: "Browse Properties",
        href: "/browse",
        liClassName:
          "flex items-center gap-1 cursor-pointer hover:text-black transition text-lg",
      },
      {
        type: "li-link",
        label: "For Sellers",
        href: "/forseller",
        linkClassName: "hover:text-black transition text-lg",
      },
      {
        type: "li-link",
        label: "About",
        href: "/about",
        linkClassName: "hover:text-black transition text-lg",
      },
      {
        type: "li-link",
        label: "Contact Us",
        href: "/contact-us",
        linkClassName: "hover:text-black transition text-lg",
      },
    ],

    desktopButtons: [
      {
        label: authLabels[activeLang].login,
        href: "/auth/login",
        className:
          "notranslate rounded-xl border-2 border-primary-blue px-4 py-2 2xl:py-3 2xl:text-lg leading-[30px] text-primary-blue hover:bg-primary-blue hover:text-white transition",
      },
      {
        label: authLabels[activeLang].register,
        href: "/auth/register",
        className:
          "notranslate rounded-xl bg-primary-blue px-4 py-1.5 2xl:py-3 2xl:text-lg leading-[30px] text-white hover:opacity-90 hover:bg-white hover:border-2 border-2 border-primary-blue transition hover:text-primary-blue",
      },
    ],

    mobileLinks: [
      { type: "li-link", label: "Home", href: "/", closeOnClick: true },
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
      { type: "li-link", label: "About", href: "/about", closeOnClick: true },
      {
        type: "li-link",
        label: "Contact Us",
        href: "/contact-us",
        closeOnClick: true,
      },
    ],

    mobileButtons: [
      {
        label: authLabels[activeLang].login,
        href: "/auth/login",
        className:
          "notranslate rounded-xl border-2 border-primary-blue px-[24px] py-3 text-center text-primary-blue",
      },
      {
        label: authLabels[activeLang].register,
        href: "/auth/register",
        className:
          "notranslate rounded-xl bg-primary-blue px-[18px] py-3 text-center text-white",
      },
    ],
  };

  const renderDesktopLink = (item: any) =>
    item.type === "link-li" ? (
      <Link key={item.label} href={item.href}>
        <li className={item.liClassName}>{item.label}</li>
      </Link>
    ) : (
      <li key={item.label}>
        <Link href={item.href} className={item.linkClassName}>
          {item.label}
        </Link>
      </li>
    );

  const renderMobileLink = (item: any) =>
    item.type === "link-li" ? (
      <Link key={item.label} href={item.href}>
        <li className={item.liClassName}>{item.label}</li>
      </Link>
    ) : (
      <li key={item.label}>
        <Link
          href={item.href}
          onClick={item.closeOnClick ? () => setIsOpen(false) : undefined}
        >
          {item.label}
        </Link>
      </li>
    );

  const handleLangSelect = (lang: Lang) => {
    setActiveLang(lang);
    setLangOpen(false);
    changeLanguage(lang === "Spanish" ? "es" : "en");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 xl:px-5 px-0 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Container>
        <header className="w-full text-black">
          <div className="flex items-center justify-between py-[26px]">
            <Link href={config.logoHref}>
              <Image
                src="https://i.ibb.co.com/2YMddrBt/Group-1321314777.png"
                alt="Terralink Logo"
                width={220}
                height={60}
                priority
                className="w-[150px] 2xl:w-[220px]"
              />
            </Link>

            <ul className="hidden xl:flex items-center gap-4">
              {config.desktopLinks.map(renderDesktopLink)}

              <li className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1"
                >
                  <PlanetSvg /> {activeLang} <AngleBottomSvg />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-3 w-[160px] rounded-xl bg-white shadow-lg border">
                    {languages.map(lang => (
                      <button
                        key={lang}
                        onClick={() => handleLangSelect(lang)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            <div className="hidden xl:flex gap-4">
              {config.desktopButtons.map(btn => (
                <Link key={btn.href} href={btn.href} className={btn.className}>
                  <span translate="no">{btn.label}</span>
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

          {/* MOBILE DRAWER */}
          <div
            className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-xl transform transition-transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } xl:hidden`}
          >
            <div className="flex justify-between px-6 py-5 border-b">
              <Image
                src="https://i.ibb.co.com/2YMddrBt/Group-1321314777.png"
                alt="Terralink Logo"
                width={160}
                height={40}
              />
              <button onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <ul className="px-6 py-5 flex flex-col gap-3">
              {config.mobileLinks.map(renderMobileLink)}
            </ul>

            <div className="px-6 flex flex-col gap-4">
              {config.mobileButtons.map(btn => (
                <Link
                  key={btn.href}
                  href={btn.href}
                  onClick={() => setIsOpen(false)}
                  className={btn.className}
                >
                  <span translate="no">{btn.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </header>
      </Container>
    </nav>
  );
};

export default Navbar;

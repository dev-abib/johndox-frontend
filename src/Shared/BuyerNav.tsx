"use client";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { GoListUnordered } from "react-icons/go";
import { FaBars, FaTimes } from "react-icons/fa";
import Container from "@/Components/Common/Container";
import { useGetUserData } from "@/Hooks/api/auth_api";
import { PlanetSvg } from "@/Components/Svg/SvgContainer";
import { AngleBottomSvg, LoveSvg } from "@/Components/Svg/SvgContainer2";

const BuyerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("Spanish");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages = ["English", "Spanish"];

  const changeLanguage = (lang: "en" | "es") => {
    const tryChange = (attempts = 0) => {
      const select = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement | null;

      if (!select) {
        if (attempts < 5) setTimeout(() => tryChange(attempts + 1), 200);
        return;
      }

      select.value = lang;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      select.dispatchEvent(new Event("input", { bubbles: true }));

      setTimeout(() => {
        if (select.value !== lang && attempts < 5) {
          tryChange(attempts + 1);
        }
      }, 300);
    };

    tryChange();
  };

  const handleLangSelect = (lang: string) => {
    setActiveLang(lang);
    setLangOpen(false);
    changeLanguage(lang === "Spanish" ? "es" : "en");
  };

  const token = localStorage.getItem("token");
  const { data } = useGetUserData(token);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out xl:px-5 px-0 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Container>
        <header className="w-full text-black">
          <div className="flex items-center justify-between py-[26px]">
            <Link href="/buyerlayout" className="flex items-center">
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
              <li>
                <Link
                  href="/buyerlayout"
                  className="hover:text-black transition"
                >
                  Home
                </Link>
              </li>
              <Link href={"/buyerlayout/browse"}>
                <li className="flex items-center gap-1 cursor-pointer hover:text-black transition">
                  Browse Properties
                </li>
              </Link>
              <li>
                <Link
                  href="/buyerlayout/about"
                  className="hover:text-black transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/buyerlayout/contact-us"
                  className="hover:text-black transition"
                >
                  Contract Us
                </Link>
              </li>

              <li className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 cursor-pointer hover:text-black transition notranslate"
                  translate="no"
                >
                  <PlanetSvg />
                  <span translate="no" className="notranslate">
                    {activeLang}
                  </span>
                  <span
                    className={`text-xs ml-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
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
                      onClick={() => handleLangSelect(lang)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-xl transition notranslate"
                      translate="no"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </li>
            </ul>

            <div className="hidden xl:flex items-center gap-4">
              <Link
                href="/buyerlayout/favourites"
                className="rounded-xl border-2 border-primary-blue px-[24px] py-2 2xl:py-3 2xl:text-xl leading-[30px] text-primary-blue hover:bg-primary-blue hover:text-white transition flex gap-x-2 items-center"
              >
                <LoveSvg />
                My Favorites
              </Link>
              <Link
                href="/buyerlayout/profile"
                className="rounded-xl bg-primary-blue px-[18px] py-1.5 2xl:py-3 2xl:text-xl leading-[30px] text-white hover:opacity-90 hover:bg-white hover:border-2 border-2 border-primary-blue transition hover:text-primary-blue flex gap-x-2 items-center"
              >
                {data?.data?.profilePicture ? (
                  <Image
                    src={data?.data?.profilePicture}
                    alt="Profile"
                    width={300}
                    height={300}
                    className="rounded-full object-cover h-8 w-8"
                  />
                ) : (
                  <CgProfile className="size-7" />
                )}
                Profile
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden text-2xl"
            >
              <FaBars />
            </button>
          </div>

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

            <ul className="flex flex-col gap-3 px-6 py-5">
              <li>
                <Link href="/buyerlayout" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <Link href={"/buyerlayout/browse"}>
                <li className="flex items-center gap-1 cursor-pointer">
                  Browse Properties
                </li>
              </Link>
              <li>
                <Link
                  href="/buyerlayout/about"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/buyerlayout/contact-us"
                  onClick={() => setIsOpen(false)}
                >
                  Contract Us
                </Link>
              </li>

              <li className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 cursor-pointer hover:text-black transition notranslate"
                  translate="no"
                >
                  <PlanetSvg />
                  <span translate="no" className="notranslate">
                    {activeLang}
                  </span>
                  <span
                    className={`text-xs ml-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
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
                        handleLangSelect(lang);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition notranslate"
                      translate="no"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </li>
            </ul>

            <div className="px-6 flex flex-col gap-4">
              <Link
                href="/buyerlayout/favourites"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border-2 border-primary-blue px-[24px] py-3 text-center text-primary-blue flex gap-x-2 items-center"
              >
                <GoListUnordered className="size-7" />
                My Favourites
              </Link>
              <Link
                href="/buyerlayout/profile"
                className="rounded-xl bg-primary-blue px-[18px] py-1.5 2xl:py-3 2xl:text-xl leading-[30px] text-white hover:opacity-90 hover:bg-white hover:border-2 border-2 border-primary-blue transition hover:text-primary-blue flex gap-x-2 items-center"
              >
                {data?.data?.profilePicture ? (
                  <Image
                    src={data?.data?.profilePicture}
                    alt="Profile"
                    width={300}
                    height={300}
                    className="rounded-full object-cover h-8 w-8"
                  />
                ) : (
                  <CgProfile className="size-7" />
                )}
                Profile
              </Link>
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

export default BuyerNav;

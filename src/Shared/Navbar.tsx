"use client";

import { useEffect, useState } from "react";
import Container from "@/Components/Common/Container";
import { PlanetSvg } from "@/Components/Svg/SvgContainer";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { AngleBottomSvg } from "@/Components/Svg/SvgContainer2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 100);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <nav   className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
    scrolled ? "bg-white shadow-md" : "bg-transparent"
  }`}>
      <Container>
        <header className="w-full text-black">
          <div className="flex items-center justify-between px-6 py-[26px]">
            <Link href="/" className="flex items-center">
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
                <Link href="/" className="hover:text-black transition">
                  Home
                </Link>
              </li>

              <li className="flex items-center gap-1 cursor-pointer hover:text-black transition">
                Browse Properties
                <span className="text-xs ml-3">
                  <AngleBottomSvg />
                </span>
              </li>

              <li>
                <Link
                  href="/for-sellers"
                  className="hover:text-black transition"
                >
                  For Sellers
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-black transition">
                  About
                </Link>
              </li>

              <li className="flex items-center gap-1 cursor-pointer hover:text-black transition">
                <PlanetSvg /> English
                <span className="text-xs ml-3">
                  <AngleBottomSvg />
                </span>
              </li>
            </ul>
            <div className="hidden xl:flex items-center gap-4">
              <Link
                href="/login"
                className="rounded-xl border-2 border-primary-blue px-[24px] py-2 2xl:py-3  2xl:text-xl leading-[30px] text-primary-blue hover:bg-primary-blue hover:text-white transition"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-primary-blue px-[18px] py-1.5 2xl:py-3  2xl:text-xl leading-[30px] text-white hover:opacity-90 hover:bg-white hover:border-2 border-2 border-primary-blue transition hover:text-primary-blue"
              >
                Sign Up
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
            <ul className="flex flex-col gap-3 px-6 py-5 ">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>

              <li className="flex items-center gap-1 cursor-pointer">
                Browse Properties{" "}
                <span className="text-xs ml-3">
                  <AngleBottomSvg />
                </span>
              </li>

              <li>
                <Link href="/for-sellers" onClick={() => setIsOpen(false)}>
                  For Sellers
                </Link>
              </li>

              <li>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>

              <li className="flex items-center gap-2 cursor-pointer">
                <PlanetSvg /> English{" "}
                <span className="text-xs ml-3">
                  <AngleBottomSvg />
                </span>
              </li>
            </ul>
            <div className="px-6 flex flex-col gap-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border-2 border-primary-blue px-[24px] py-3 text-center text-primary-blue"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-primary-blue px-[18px] py-3 text-center text-white"
              >
                Sign Up
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

export default Navbar;

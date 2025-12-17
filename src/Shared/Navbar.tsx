'use client';

import { PlanetSvg } from '@/Components/Svg/SvgContainer';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="w-full  text-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://i.ibb.co.com/2YMddrBt/Group-1321314777.png"
            alt="Terralink Logo"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* Center Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <li>
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
          </li>

          <li className="flex items-center gap-1 cursor-pointer hover:text-black transition">
            Browse Properties
            <span className="text-xs">▾</span>
          </li>

          <li>
            <Link href="/for-sellers" className="hover:text-black transition">
              For Sellers
            </Link>
          </li>

          <li>
            <Link href="/about" className="hover:text-black transition">
              About
            </Link>
          </li>

          <li className="flex items-center gap-1 cursor-pointer hover:text-black transition">
            <PlanetSvg/> English
            <span className="text-xs">▾</span>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-lg border border-[#0085FF] px-5 py-2 text-sm font-medium text-[#0085FF] hover:bg-[#0085FF] hover:text-black transition"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-[#0085FF] px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

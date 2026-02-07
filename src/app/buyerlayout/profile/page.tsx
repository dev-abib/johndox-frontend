"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/Components/Common/Container";
import React, { SVGProps, useEffect, useState } from "react";
import {
  Analytics,
  Listing,
  Message,
  Settings,
} from "@/Components/Svg/SvgContainer";
import { getItem } from "@/lib/localStorage";
import { useGetConversations } from "@/Hooks/api/message.api";

interface Tab {
  label: string;
  href: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  badge?: number;
}

const Page = () => {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getItem("token"));
  }, []);

  const { data: msgData } = useGetConversations(token ?? undefined);

  const tabs: Tab[] = [
    {
      label: "Favorites",
      href: "/buyerlayout/favourites",
      icon: Listing,
    },
    {
      label: "Searches",
      href: "/buyerlayout/searches",
      icon: Analytics,
    },
    {
      label: "Messages",
      href: "/buyerlayout/messages",
      icon: Message,
      badge: msgData?.data?.totalUnreadCount ?? 0,
    },
    {
      label: "Settings",
      href: "/buyerlayout/settings",
      icon: Settings,
    },
  ];

  return (
    <section className="lg:pt-10 pt-0">
      <Container>
        <h3 className="lg:text-[32px] md:text-[24px] text-[20px] font-medium text-[#101010]">
          My Profile
        </h3>
        <p className="lg:text-[20px] text-base font-normal text-[#404040] mt-3">
          Manage your saved properties and searches
        </p>

        <div className="lg:my-15 my-8 md:flex md:flex-row flex flex-col 3xl:gap-x-11 gap-5 bg-[#ECECF0] rounded-[36px] p-3 lg:w-fit w-full">
          {tabs.map(item => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  xl:px-12 px-5 py-2 xl:text-[20px] lg:text-lg text-base font-medium 
                  flex gap-x-2 items-center rounded-[36px] transition-all
                  ${
                    isActive
                      ? "bg-white text-[#101010] shadow-sm"
                      : "text-[#101010]/70 hover:text-[#101010] hover:bg-white/30"
                  }
                `}
              >
                <item.icon />
                {item.label}

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Page;

"use client";
import React, { SVGProps, useState } from "react";
import Container from "@/Components/Common/Container";
import {
  Analytics,
  Listing,
  Message,
  Settings,
  Subscription,
} from "@/Components/Svg/SvgContainer";
import Setting from "@/Components/PageComponents/sellerPages/Profile/Setting";
import Analytic from "@/Components/PageComponents/sellerPages/Profile/Analytic";
import Messages from "@/Components/PageComponents/sellerPages/Profile/Messages";
import MyListings from "@/Components/PageComponents/sellerPages/Profile/MyListing";
import SubsCription from "@/Components/PageComponents/sellerPages/Profile/SubsCription";
import { GetAnalytics } from "@/Hooks/api/dashboard_api";
import { useGetConversations } from "@/Hooks/api/message.api";
import { usePathname, useRouter } from "next/navigation";

interface Tab {
  label: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  badge?: number | null;
}

const page = () => {
  const [activetab, setActiveTab] = useState("My Listings");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data } = GetAnalytics(token);

  const { data: msgData } = useGetConversations(token);

  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      label: "My Listings",
      icon: Listing,
      route: "/seller/my-listing",
    },
    {
      label: "Messages",
      icon: Message,
      route: "/seller/message",
      badge: msgData?.data?.totalUnreadCount,
    },
    { label: "Analytics", icon: Analytics, route: "/seller/analytics" },
    { label: "Settings", icon: Settings, route: "/seller/settings" },
    {
      label: "Subscription",
      icon: Subscription,
      route: "/seller/subscriptions",
    },
  ];

  const stats = [
    { value: data?.data?.allListing || 0, label: "Active Listings" },
    { value: data?.data?.allViews || 0, label: "Total Views" },
    { value: data?.data?.totalLeads || 0, label: "Total Leads" },
    { value: data?.data?.totalUnreadMsg || 0, label: "Unread Messages" },
  ];

  return (
    <section className="lg:pt-10 pt-0">
      <Container>
        <h3 className="lg:text-[32px] md:text-[24px] text-[20px] font-medium text-[#101010]">
          Seller Profile
        </h3>
        <p className="lg:text-[20px] text-base font-normal text-[#404040] mt-3">
          Manage your listings and grow your business
        </p>

        {activetab !== "Settings" && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-9">
            {stats.map((item, index) => (
              <div
                key={index}
                className="rounded-[16px] bg-[rgba(230,243,255,0.20)] shadow-[0_0_6px_0_rgba(145,158,171,0.40)] py-8 lg:py-10 px-5 lg:px-10"
              >
                <h4 className="text-[#5F5F5F] text-sm md:text-base lg:text-lg font-normal md:text-start text-center">
                  {item.label}
                </h4>
                <h3 className="text-3xl lg:text-[38px] text-[#404040] font-medium mt-4 md:text-start text-center">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>
        )}

        <div className="lg:my-15 my-8 xl:flex lg:flex-row flex flex-col 3xl:gap-x-11 gap-5 bg-[#ECECF0] rounded-[36px] p-3 lg:w-fit w-full">
          {tabs.map(item => {
            const isActive = pathname === item.route;

            return (
              <button
                key={item.label}
                onClick={() => router.push(item.route)}
                className={`
        xl:px-12 px-5 py-2 xl:text-[20px] lg:text-lg text-base font-medium cursor-pointer 
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
                {item.badge && item.badge !== 0 && (
                  <span className="ml-2 bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default page;

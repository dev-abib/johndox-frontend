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

interface Tab {
  label: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  active: boolean;
  badge: number | null;
  hasUnread?: boolean;
}

const tabs: Tab[] = [
  {
    label: "My Listings",
    icon: Listing,
    active: false,
    badge: null,
  },
  {
    label: "Messages",
    icon: Message,
    active: true,
    badge: 48,
    hasUnread: true,
  },
  {
    label: "Analytics",
    icon: Analytics,
    active: false,
    badge: null,
  },
  {
    label: "Settings",
    icon: Settings,
    active: false,
    badge: null,
  },
  {
    label: "Subscription",
    icon: Subscription,
    active: false,
    badge: null,
  },
];

const page = () => {
  const [activetab, setActiveTab] = useState("My Listings");

  return (
    <section className="py-10">
      <Container>
        <h3 className="text-[32px] font-medium text-[#101010]">
          Seller Profile
        </h3>
        <p className="text-[20px] font-normal text-[#404040] mt-3">
          Manage your listings and grow your business
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-9">
          {[
            { value: "3", label: "Active Listings" },
            { value: "4,444", label: "Total Views" },
            { value: "80", label: "Total Leads" },
            { value: "2", label: "Unread Messages" },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-[16px] bg-[rgba(230,243,255,0.20)] shadow-[0_0_6px_0_rgba(145,158,171,0.40)] py-8 lg:py-10 px-6 lg:px-10"
            >
              <h4 className="text-[#5F5F5F] text-base lg:text-lg font-normal">
                {item.label}
              </h4>
              <h3 className="text-3xl lg:text-[38px] text-[#404040] font-medium mt-4">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
        <div className="my-15 flex gap-x-11 bg-[#ECECF0] rounded-[36px] p-3 w-fit">
          {tabs.map(item => {
            const isActive = activetab === item.label;

            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`
          px-12 py-2 text-[20px] font-medium cursor-pointer 
          flex gap-x-2 items-center rounded-[36px] transition-all
          ${
            isActive
              ? "bg-white text-[#101010] shadow-sm"
              : "text-[#101010]/70 hover:text-[#101010] hover:bg-white/30"
          }
        `}
              >
                <div>
                  <item.icon />
                </div>
                {item.label}
                {item.badge && (
                  <span className="ml-2 bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
          
        {activetab === "My Listings" && <MyListings />}
        {activetab === "Messages" && <Messages />}
        {activetab === "Analytics" && <Analytic />}
        {activetab === "Settings" && <Setting />}
        {activetab === "Subscription" && <SubsCription />}
      </Container>
    </section>
  );
};

export default page;

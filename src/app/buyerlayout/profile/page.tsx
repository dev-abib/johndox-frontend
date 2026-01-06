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
import MyFavorites from "@/Components/PageComponents/buyerPages/MyFavorites";
import Setting from "@/Components/PageComponents/sellerPages/Profile/Setting";
import Messages from "@/Components/PageComponents/sellerPages/Profile/Messages";
import SavedSearches from "@/Components/PageComponents/buyerPages/SavedSearches";

interface Tab {
  label: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  active: boolean;
  badge: number | null;
  hasUnread?: boolean;
}

const tabs: Tab[] = [
  {
    label: "Favorites",
    icon: Listing,
    active: false,
    badge: null,
  },
  {
    label: "Searches",
    icon: Analytics,
    active: false,
    badge: null,
  },
  {
    label: "Messages",
    icon: Message,
    active: true,
    badge: 2,
    hasUnread: true,
  },
  {
    label: "Settings",
    icon: Settings,
    active: false,
    badge: null,
  },
];

const page = () => {
  const [activetab, setActiveTab] = useState("Favorites");

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
            const isActive = activetab === item.label;

            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
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

        {activetab === "Favorites" && <MyFavorites />}
        {activetab === "Searches" && <SavedSearches />}
        {activetab === "Messages" && <Messages />}
        {activetab === "Settings" && <Setting />}
      </Container>
    </section>
  );
};

export default page;

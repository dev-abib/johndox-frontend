"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Container from "@/Components/Common/Container";

const NotificationsPage = () => {
  const [toggles, setToggles] = useState({
    tagActivity: true,
    priceUpdates: false,
    propertyAlerts: true,
    promotionsOffers: true,
    emailNotifications: true,
    messageNotifications: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="mt-10">
      <Container>
        <Link
          href="/buyerlayout/profile"
          className="flex items-center gap-x-2 text-[#0085FF] text-xl sm:text-2xl lg:text-3xl font-medium mb-10 hover:underline"
        >
          <IoIosArrowBack className="size-7 lg:size-9" />
          Account Settings
        </Link>
        <div className="bg-[#F9FAFB] lg:p-17 p-4 rounded-[28px]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#101010] mb-10">
            Notifications
          </h1>
          <div className="">
            <h2 className="text-xl sm:text-2xl font-medium text-[#101010] mb-8">
              Notification type
            </h2>
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-[#101010]">
                    Property Alerts
                  </h3>
                  <p className="text-sm sm:text-base text-[#5F5F5F] mt-1">
                    Be the first to know when new properties match your saved
                    searches or preferred locations.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("propertyAlerts")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
                    toggles.propertyAlerts ? "bg-[#0085FF]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform cursor-pointer ${
                      toggles.propertyAlerts ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-[#101010]">
                    Message Notifications
                  </h3>
                  <p className="text-sm sm:text-base text-[#5F5F5F] mt-1">
                    Get instant alerts when buyers, sellers, or agents contact
                    you through Tereno.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("messageNotifications")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    toggles.messageNotifications
                      ? "bg-[#0085FF]"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      toggles.messageNotifications
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-[#101010]">
                    Price Updates
                  </h3>
                  <p className="text-sm sm:text-base text-[#5F5F5F] mt-1">
                    Stay informed about any price drops or changes on properties
                    you follow.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("priceUpdates")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    toggles.priceUpdates ? "bg-[#0085FF]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      toggles.priceUpdates ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-[#101010]">
                    Tag Activity
                  </h3>
                  <p className="text-sm sm:text-base text-[#5F5F5F] mt-1">
                    Receive updates when someone views, saves, or inquires about
                    your listing.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("tagActivity")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    toggles.tagActivity ? "bg-[#0085FF]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      toggles.tagActivity ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-[#101010]">
                    Promotions & Offers
                  </h3>
                  <p className="text-sm sm:text-base text-[#5F5F5F] mt-1">
                    Hear first about special Tereno promotions, premium listing
                    offers, and featured property highlights.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("promotionsOffers")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    toggles.promotionsOffers ? "bg-[#0085FF]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      toggles.promotionsOffers
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-[#101010]">
                    Email Notifications
                  </h3>
                  <p className="text-sm sm:text-base text-[#5F5F5F] mt-1">
                    Choose whether you want Tereno updates and property
                    recommendations delivered to your inbox.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    toggles.emailNotifications ? "bg-[#0085FF]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      toggles.emailNotifications
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotificationsPage;

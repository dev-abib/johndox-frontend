"use client";
import React from "react";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { listingsData } from "@/Components/Data/data";
import { BsCalendar3, BsEye, BsFillChatDotsFill } from "react-icons/bs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data matching the chart in your screenshot (December 2025)
const data = [
  { date: "Dec 02", views: 38, leads: 12 },
  { date: "Dec 03", views: 42, leads: 14 },
  { date: "Dec 04", views: 40, leads: 15 },
  { date: "Dec 05", views: 35, leads: 13 },
  { date: "Dec 06", views: 32, leads: 12 },
  { date: "Dec 07", views: 30, leads: 11 },
  { date: "Dec 08", views: 28, leads: 10 },
  { date: "Dec 09", views: 25, leads: 9 },
  { date: "Dec 10", views: 22, leads: 8 },
  { date: "Dec 11", views: 20, leads: 7 },
  { date: "Dec 12", views: 18, leads: 6 },
  { date: "Dec 13", views: 25, leads: 8 },
  { date: "Dec 14", views: 35, leads: 10 },
  { date: "Dec 15", views: 48, leads: 12 },
  { date: "Dec 16", views: 50, leads: 13 },
  { date: "Dec 17", views: 52, leads: 14 },
  { date: "Dec 18", views: 48, leads: 13 },
  { date: "Dec 19", views: 45, leads: 12 },
  { date: "Dec 20", views: 42, leads: 11 },
  { date: "Dec 21", views: 40, leads: 10 },
  { date: "Dec 22", views: 38, leads: 9 },
  { date: "Dec 23", views: 44, leads: 11 },
  { date: "Dec 24", views: 50, leads: 12 },
  { date: "Dec 25", views: 55, leads: 13 },
  { date: "Dec 26", views: 58, leads: 14 },
  { date: "Dec 27", views: 60, leads: 15 },
  { date: "Dec 28", views: 62, leads: 15 },
  { date: "Dec 29", views: 65, leads: 16 },
  { date: "Dec 30", views: 68, leads: 16 },
  { date: "Dec 31", views: 70, leads: 17 },
];

const Analytics = () => {
  return (
    <div>
      <h2 className="text-[#404040] lg:text-[28px] text-[24px] font-medium">
        Performance Analytics
      </h2>
      <h5 className="lg:text-[18px] text-base text-[#5F5F5F] font-normal mt-3">
        Track how your listings are performing in real time
      </h5>

      <div className="my-10 bg-[#F5F5F5] rounded-[28px] lg:p-8 p-3 shadow-sm border border-[#E7E7E7]">
        <div className="mb-6">
          <h3 className="text-[22px] font-medium text-[#101010]">
            Views Over Time
          </h3>
          <p className="text-[16px] text-[#5F5F5F] mt-1">
            Daily property views and lead generation
          </p>
        </div>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0085FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0085FF" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E7E7E7" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#5F5F5F", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#5F5F5F", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 15, 30, 45, 60]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E7E7E7",
                  borderRadius: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={value => (
                  <span className="text-[#5F5F5F]">{value}</span>
                )}
              />

              {/* Leads Area (green) */}
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#4ADE80"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorLeads)"
              />

              {/* Views Area (blue) */}
              <Area
                type="monotone"
                dataKey="views"
                stroke="#0085FF"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-15">
        <div className="bg-[#F5F5F5] p-2 lg:p-10 rounded-[28px] flex flex-col gap-5">
          {listingsData?.map(item => (
            <div
              key={item.id}
              className="bg-white border border-[#E7E7E7] px-5 py-7 rounded-[28px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-5 flex-1">
                <figure className="shrink-0 w-full lg:w-auto mb-4 lg:mb-0">
                  <Image
                    src={item?.imageUrl || "/images/placeholder.png"}
                    alt={item?.title || "Property"}
                    width={400}
                    height={300}
                    className="w-full lg:w-[180px] lg:h-[150px] h-[300px]  rounded-[16px] object-cover"
                  />
                </figure>

                <div className="flex-1 w-full">
                  <h3 className="lg:text-[24px] text-[20px] font-medium text-[#404040]">
                    {item.title}
                  </h3>
                  <p className="lg:text-[20px] text-base font-medium text-[#919191] mt-1">
                    {item.location}
                  </p>

                  <div className="flex flex-wrap gap-4 lg:gap-6 mt-4 text-[18px] text-[#5F5F5F]">
                    <span className="flex items-center gap-2">
                      <BsEye /> {item.views} views
                    </span>
                    <span className="flex items-center gap-2">
                      <BsFillChatDotsFill /> {item.leads} leads
                    </span>
                    <span className="flex items-center gap-2">
                      <BsCalendar3 /> Posted: {item.postedDate}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-5">
                    <button className="flex items-center cursor-pointer  gap-1 border border-[#E7E7E7] px-2.5 py-1 rounded-[12px] text-[#5F5F5F]">
                      <BsEye className="text-lg" /> View Post
                    </button>
                    <button className="flex items-center cursor-pointer  gap-1 border border-[#E7E7E7] px-2.5 py-1 rounded-[12px] text-[#5F5F5F]">
                      <MdEdit className="text-lg" /> Edit
                    </button>
                    <button className="flex items-center cursor-pointer  gap-1 border border-[#FCC9CB] text-[#E7000B] px-2.5 py-1 rounded-[12px] bg-[#FFE9EA]">
                      <MdDelete className="text-lg" /> Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-right shrink-0 mt-6 lg:mt-0">
                <p className="text-[28px] font-bold text-[#0085FF]">
                  ${item.price}
                  <span className="text-[#919191] text-[18px] font-normal ml-1">
                    {" "}
                    {item.currency}
                  </span>
                </p>
                <div className="inline-flex items-center gap-1 border border-[#E7E7E7] px-6 py-2.5 rounded-[12px] mt-4 text-[16px] font-medium text-[#5F5F5F]">
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

import React, { useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { Convert } from "../Svg/SvgContainer";

type FormData = {
  propertyName: string;
  description: string;
  propertyType: string;
  listingType: string;
  streetAddress: string;
  city: string;
  state: string;
  priceUSD: string;
  priceHNL: string;
};

const propertyTypes = [
  "Apartment",
  "House",
  "Villa",
  "Condo",
  "Townhouse",
  "Studio",
  "Land",
];


const USD_TO_HNL_RATE = 24.8; 
const listingTypes = ["For Sale", "For Rent", "Sold", "Rented"];

export type BasicInfoStepProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
};

export default function BasicInfoStep({
  register,
  errors,
  watch,
  setValue,
}: BasicInfoStepProps) {

  const priceUSD = watch("priceUSD");
  const priceHNL = watch("priceHNL");

  // Sync USD  HNL
  useEffect(() => {
    if (priceUSD && !isNaN(Number(priceUSD))) {
      const usd = parseFloat(priceUSD);
      const hnl = (usd * USD_TO_HNL_RATE).toFixed(2);
      setValue("priceHNL", hnl, { shouldValidate: true });
    } else if (priceUSD === "") {
      setValue("priceHNL", "");
    }
  }, [priceUSD, setValue]);

  // Sync HNL USD
  useEffect(() => {
    if (priceHNL && !isNaN(Number(priceHNL))) {
      const hnl = parseFloat(priceHNL);
      const usd = (hnl / USD_TO_HNL_RATE).toFixed(2);
      setValue("priceUSD", usd, { shouldValidate: true });
    } else if (priceHNL === "") {
      setValue("priceUSD", "");
    }
  }, [priceHNL, setValue]);

  return (
    <div className="space-y-5 mx-20">
      <h2 className="text-2xl font-medium">Basic Information</h2>

      {/* Property Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Property Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("propertyName", {
            required: "Property name is required",
          })}
          className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. Ocean View Villa in Riviera Maya"
        />
        {errors.propertyName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.propertyName.message}
          </p>
        )}
      </div>

      {/* Description (ID Frame example) */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={5}
          className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="ID Frame 2147230166"
          defaultValue="Describe your property in detail..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Property Type & Listing Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-16 gap-8">
        <div>
          <label className="block text-sm font-medium mb-2">
            Property Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("propertyType", {
              required: "Property type is required",
            })}
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select type</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.propertyType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Listing Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("listingType", {
              required: "Listing type is required",
            })}
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select type</option>
            {listingTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.listingType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.listingType.message}
            </p>
          )}
        </div>
      </div>

      {/* Full Address  */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Full Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register("streetAddress", {
            required: "Street address is required",
          })}
          className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Street address"
        />
        {errors.streetAddress && (
          <p className="text-red-500 text-sm mt-1">
            {errors.streetAddress.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-16 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            {...register("streetAddress", {
              required: "Street address is required",
            })}
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Playa del Carmen"
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.streetAddress.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <input
            {...register("streetAddress", {
              required: "Street address is required",
            })}
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Quintana Roo"
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.streetAddress.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 ">
        <div className="">
          <label className="block text-sm font-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="bg-gray-50 flex justify-between items-center">
            <div>
              <input
                {...register("streetAddress", {
                  required: "Street address is required",
                })}
                className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="100 $     Dollar"
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>
            <Convert />
            <div>
              <input
                {...register("streetAddress", {
                  required: "Street address is required",
                })}
                className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="  Lempira   L  1000"
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

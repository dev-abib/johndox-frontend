"use client";
import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  UseFormReset,
} from "react-hook-form";
import { Convert } from "../Svg/SvgContainer";
import { useCategory } from "@/Hooks/api/dashboard_api";
import { ListingFormData } from "@/app/seller/new-listing/page";

const propertyTypes = [
  "Apartment",
  "House",
  "Villa",
  "Condo",
  "Townhouse",
  "Studio",
  "Land",
];
const listingTypes = ["For Sale", "For Rent", "Sold", "Rented"];
const USD_TO_HNL_RATE = 24.8;

// Helper function to format numbers with proper thousands separators
const formatPrice = (value: string | number): string => {
  if (!value || isNaN(Number(value))) return "";
  const numValue = parseInt(String(value).replace(/,/g, ""));
  return numValue.toLocaleString("en-US");
};

export type BasicInfoStepProps = {
  register: UseFormRegister<ListingFormData>;
  errors: FieldErrors<ListingFormData>;
  watch: UseFormWatch<ListingFormData>;
  setValue: UseFormSetValue<ListingFormData>;
  reset: UseFormReset<ListingFormData>;
  data?: any;
};

export default function EditBasicinfo({
  data: lisiting,
  register,
  errors,
  watch,
  setValue,
  reset,
}: BasicInfoStepProps) {
  const priceUSD = watch("priceUSD");
  const price = watch("price");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data: categoryData } = useCategory(token);

  const [isInitializing, setIsInitializing] = useState(true);

  // 1. Sync API data to Form State
  useEffect(() => {
    if (lisiting) {
      reset({
        ...lisiting,
        propertyType: lisiting.propertyType
          ? lisiting.propertyType.charAt(0).toUpperCase() +
            lisiting.propertyType.slice(1)
          : "",
        listingType:
          lisiting.listingType === "for rent"
            ? "For Rent"
            : lisiting.listingType === "for sale"
              ? "For Sale"
              : lisiting.listingType,
        streetAddress: lisiting.fullAddress,
        price: lisiting.price?.toString(),
        priceUSD: (lisiting.price / USD_TO_HNL_RATE).toFixed(2),
      });
      setTimeout(() => setIsInitializing(false), 200);
    }
  }, [lisiting, reset]);

  // 2. Conversion: USD to Local
  useEffect(() => {
    if (!isInitializing && priceUSD && !isNaN(Number(priceUSD))) {
      const usd = Number(priceUSD);
      const local = parseFloat((usd * USD_TO_HNL_RATE).toFixed(2));
      setValue("price", local, { shouldValidate: true });
    } else if (
      !isInitializing &&
      (priceUSD === "" || priceUSD === null || priceUSD === undefined)
    ) {
      setValue("price", "", { shouldValidate: true });
    }
  }, [priceUSD, setValue, isInitializing]);

  // 3. Conversion: Local to USD
  useEffect(() => {
    if (!isInitializing && price && !isNaN(Number(price))) {
      const local = Number(price);
      const usd = parseFloat((local / USD_TO_HNL_RATE).toFixed(2));
      setValue("priceUSD", usd, { shouldValidate: true });
    } else if (
      !isInitializing &&
      (price === "" || price === null || price === undefined)
    ) {
      setValue("priceUSD", "", { shouldValidate: true });
    }
  }, [price, setValue, isInitializing]);

  return (
    <div className="space-y-5 lg:mx-20">
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
        />
        {errors.propertyName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.propertyName.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={5}
          className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Describe your property in detail..."
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

      {/* Full Address */}
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
            {...register("city", { required: "City is required" })}
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Playa del Carmen"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <input
            {...register("state", { required: "State is required" })}
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Quintana Roo"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-16 w-full">
        {/* Category */}
        {/* <div>
          <label className="block text-sm font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select type</option>
            {categoryData?.data?.categories?.map((cat: any) => (
              <option key={cat._id} value={cat?.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div> */}

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            {/* USD */}
            <div className="flex-1">
              <input
                {...register("priceUSD", {
                  required: "USD price is required",
                  valueAsNumber: true,
                })}
                type="text"
                inputMode="decimal"
                className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100 $ Dollar"
                onBlur={e => {
                  const value = e.target.value.replace(/,/g, "");
                  const numValue = value ? parseFloat(value) : "";
                  if (numValue) {
                    e.target.value = formatPrice(numValue);
                    setValue("priceUSD", numValue as any, {
                      shouldValidate: true,
                    });
                  }
                }}
                onChange={e => {
                  const value = e.target.value.replace(/,/g, "");
                  const numValue = value ? parseFloat(value) : "";
                  if (value === "") {
                    setValue("priceUSD", "" as any, { shouldValidate: true });
                  } else if (numValue) {
                    setValue("priceUSD", numValue as any, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              {errors.priceUSD && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.priceUSD.message}
                </p>
              )}
            </div>

            <Convert />

            {/* Local price */}
            <div className="flex-1">
              <input
                {...register("price", {
                  required: "Local price is required",
                  valueAsNumber: true,
                })}
                type="text"
                inputMode="decimal"
                className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="L 1000"
                onBlur={e => {
                  const value = e.target.value.replace(/,/g, "");
                  const numValue = value ? parseFloat(value) : "";
                  if (numValue) {
                    e.target.value = formatPrice(numValue);
                    setValue("price", numValue as any, {
                      shouldValidate: true,
                    });
                  }
                }}
                onChange={e => {
                  const value = e.target.value.replace(/,/g, "");
                  const numValue = value ? parseFloat(value) : "";
                  if (value === "") {
                    setValue("price", "" as any, { shouldValidate: true });
                  } else if (numValue) {
                    setValue("price", numValue as any, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { PiSpinnerBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import Container from "@/Components/Common/Container";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import EditBasicinfo from "@/Components/edit-listing/EditBasicinfo";
import { useAlllisting, useEditListing } from "@/Hooks/api/dashboard_api";
import EditPhotoMediaStep from "@/Components/edit-listing/EditPhotoMediaStep";
import EditPropertyDetails from "@/Components/edit-listing/EditPropertyDetails";

export type ListingFormData = {
  propertyName: string;
  description: string;
  propertyType: string;
  listingType: string;
  streetAddress: string;
  city: string;
  state: string;
  priceUSD: string;
  price: string;
  bedrooms?: string;
  bathrooms?: string;
  category: string;
  area?: string;
  yearBuilt?: string;
  lotSize?: string;
  amenities?: {
    pool?: boolean;
    garden?: boolean;
    parking?: boolean;
    airConditioning?: boolean;
    gym?: boolean;
    security?: boolean;
    oceanView?: boolean;
    mountainView?: boolean;
    beachAccess?: boolean;
    rooftopTerrace?: boolean;
    balcony?: boolean;
    petFriendly?: boolean;
  };
  photos?: FileList | null;
  video?: FileList | null;
};

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Details" },
  { id: 3, name: "Media" },
];

const TOTAL_STEPS = steps.length;

export default function CreateListingPage() {
  const params = useParams();
  const token = localStorage.getItem("token");
  const { data } = useAlllisting(token);
  const listingId = params?.id?.toString() || "";
  const singleListingData = data?.data?.items?.find(
    (item: any) => item._id === listingId,
  );

  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate: EditListing, isPending } = useEditListing(listingId);

  const methods = useForm<ListingFormData>({
    mode: "onChange",
    defaultValues: {
      propertyName: "",
      description: "Describe your property in detail...",
      propertyType: "",
      listingType: "",
      streetAddress: "",
      city: "",
      state: "",
      priceUSD: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      yearBuilt: "",
      lotSize: "",
      category: "",
      amenities: {},
      photos: null,
      video: null,
    },
  });

  const {
    register,
    watch,
    trigger,
    setValue,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = methods;

  const photos = watch("photos");

  const validateCurrentStep = async () => {
    switch (currentStep) {
      case 1:
        return await trigger([
          "propertyName",
          "description",
          "propertyType",
          "listingType",
          "streetAddress",
          "city",
          "state",
          "priceUSD",
          "category",
        ]);
      case 2:
        return await trigger([
          "bedrooms",
          "bathrooms",
          "area",
          "yearBuilt",
          "lotSize",
        ]);

      case 3:
        if (!photos || photos.length === 0) {
          setError("photos", { message: "At least one photo is required" });
          return false;
        }
        clearErrors("photos");
        return true;
      default:
        return true;
    }
  };

  const onNext = async () => {
    const ok = await validateCurrentStep();
    if (ok && currentStep < TOTAL_STEPS) {
      setCurrentStep(s => s + 1);
    }
  };

  const onPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(s => s - 1);
    }
  };

  const onSubmit = async (data: ListingFormData) => {
    try {
      const formData = new FormData();

      formData.append("propertyName", data.propertyName);
      formData.append("description", data.description);
      formData.append("propertyType", data.propertyType.toLowerCase());
      formData.append("listingType", data.listingType.toLowerCase());
      formData.append("fullAddress", data.streetAddress);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("price", data.priceUSD.toString());
      formData.append("category", data.category);

      if (data.bedrooms) formData.append("bedrooms", data.bedrooms.toString());
      if (data.bathrooms)
        formData.append("bathrooms", data.bathrooms.toString());
      if (data.yearBuilt)
        formData.append("yearBuilt", data.yearBuilt.toString());
      if (data.area) formData.append("areaInMeter", data.area.toString());
      if (data.lotSize)
        formData.append("areaInSqMeter", data.lotSize.toString());

      if (data.amenities) {
        Object.entries(data.amenities).forEach(([key, value]) => {
          if (value) {
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
            formData.append("amenities", formattedKey);
          }
        });
      }

      if (data.photos && data.photos.length > 0) {
        Array.from(data.photos).forEach(file => {
          formData.append("photos", file);
        });
      }

      if (data.video && data.video.length > 0) {
        formData.append("video", data.video[0]);
      }

      await EditListing(formData);

      await queryClient.invalidateQueries({
        queryKey: ["listing"],
        exact: false,
      });
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  return (
    <section className="py-10">
      <Container>
        <button className="flex items-center gap-2 text-2xl lg:text-3xl font-medium text-[#0085FF] mb-12 hover:underline">
          <IoIosArrowBack className="size-8" />
          Back
        </button>

        <div className="mb-5">
          <h2 className="text-[#404040] lg:text-[32px] text-[20px] font-medium">
            Create New Listing
          </h2>
          <p className="text-[#5F5F5F] lg:text-[18px] text-base mt-3">
            Fill in the details to list your property
          </p>
        </div>

        <div className="flex gap-6 mb-12">
          {steps.map(step => (
            <div key={step.id} className="flex-1">
              <div
                className={`h-3 rounded-full ${
                  step.id <= currentStep ? "bg-[#0085FF]" : "bg-gray-200"
                }`}
              />
              <p
                className={`mt-3 font-medium ${
                  step.id <= currentStep ? "text-[#0085FF]" : "text-black/40"
                }`}
              >
                {step.name}
              </p>
            </div>
          ))}
        </div>

        <FormProvider {...methods}>
          {/* STEP CONTENT */}
          {currentStep === 1 && (
            <EditBasicinfo
              data={singleListingData}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              reset={reset}
            />
          )}

          {currentStep === 2 && (
            <EditPropertyDetails data={singleListingData} />
          )}

          {currentStep === 3 && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <EditPhotoMediaStep data={singleListingData} />
              {errors.photos && (
                <p className="text-red-500 text-sm mt-4 text-center">
                  {errors.photos.message}
                </p>
              )}

              <div className="flex md:flex-row flex-col justify-end gap-10 mt-12">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-8 py-3 bg-gray-100 rounded-lg font-medium"
                >
                  Previous
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#0085FF] text-white rounded-lg font-medium cursor-pointer"
                >
                  {isPending ? (
                    <PiSpinnerBold className="animate-spin size-[20px] fill-white mx-auto" />
                  ) : (
                    " Create Listing"
                  )}
                </button>
              </div>
            </form>
          )}

          {currentStep < 3 && (
            <div className="flex justify-end gap-10 mt-12">
              <button
                type="button"
                onClick={onPrev}
                disabled={currentStep === 1}
                className="px-8 py-3 bg-gray-100 rounded-lg font-medium"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={onNext}
                className="px-8 py-3 bg-[#0085FF] text-white rounded-lg font-medium cursor-pointer"
              >
                Continue
              </button>
            </div>
          )}
        </FormProvider>
      </Container>
    </section>
  );
}

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
  amenities?: Record<string, boolean>;
  photos?: FileList | null;
  video?: FileList | null;
  existingMedia?: string[];
  deletedImages?: string[];
};

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Details" },
  { id: 3, name: "Media" },
];

export default function EditListingPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const listingId = params?.id?.toString() || "";
  const [currentStep, setCurrentStep] = useState(1);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data } = useAlllisting(token);
  const { mutate: EditListing, isPending } = useEditListing(listingId);

  const singleListingData = data?.data?.items?.find(
    (item: any) => item._id === listingId,
  );

  const methods = useForm<ListingFormData>({
    mode: "onChange",
    defaultValues: {
      propertyName: "",
      description: "",
      propertyType: "",
      listingType: "",
      streetAddress: "",
      city: "",
      state: "",
      priceUSD: "",
      price: "",
      amenities: {},
      deletedImages: [],
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
  const existingMedia = watch("existingMedia") || [];

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
        // Validation: Must have either existing photos OR new photos
        if (existingMedia.length === 0 && (!photos || photos.length === 0)) {
          setError("photos", { message: "At least one photo is required" });
          return false;
        }
        clearErrors("photos");
        return true;
      default:
        return true;
    }
  };
  const onSubmit = async (data: ListingFormData) => {
    try {
      const formData = new FormData();

      // 1. Basic Information
      formData.append("propertyName", data.propertyName);
      formData.append("description", data.description);
      formData.append("propertyType", data.propertyType.toLowerCase());
      formData.append("listingType", data.listingType.toLowerCase());
      formData.append("fullAddress", data.streetAddress);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("price", data.priceUSD.toString());
      formData.append("category", data.category);

      // 2. Property Details (Numeric fields converted to string)
      if (data.bedrooms) formData.append("bedrooms", data.bedrooms.toString());
      if (data.bathrooms)
        formData.append("bathrooms", data.bathrooms.toString());
      if (data.yearBuilt)
        formData.append("yearBuilt", data.yearBuilt.toString());
      if (data.area) formData.append("areaInMeter", data.area.toString());
      if (data.lotSize)
        formData.append("areaInSqMeter", data.lotSize.toString());

      // 3. Amenities (Array of strings)
      if (data.amenities) {
        Object.entries(data.amenities).forEach(([key, value]) => {
          if (value) {
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
            formData.append("amenities", formattedKey);
          }
        });
      }

      // 4. NEW Media (Files)
      if (data.photos && data.photos.length > 0) {
        Array.from(data.photos).forEach(file => {
          formData.append("photos", file);
        });
      }

      if (data.video && data.video.length > 0) {
        formData.append("video", data.video[0]);
      }

      if (data.existingMedia && data.existingMedia.length > 0) {
        data.existingMedia.forEach((url: string) => {
          formData.append("existingMedia", url);
        });
      }

      // 6. DELETED Images - FIXED FOR JSON ARRAY ERROR
      if (data.deletedImages && data.deletedImages.length > 0) {
        formData.append("deleteImages", JSON.stringify(data.deletedImages));
      }

      // 7. API Call & Cache Invalidation
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
    <section className="py-10 lg:px-5">
      <Container>
        <div className="flex gap-6 mb-12">
          {steps.map(step => (
            <div key={step.id} className="flex-1">
              <div
                className={`h-3 rounded-full ${step.id <= currentStep ? "bg-[#0085FF]" : "bg-gray-200"}`}
              />
              <p
                className={`mt-3 font-medium ${step.id <= currentStep ? "text-[#0085FF]" : "text-black/40"}`}
              >
                {step.name}
              </p>
            </div>
          ))}
        </div>

        <FormProvider {...methods}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <EditPhotoMediaStep data={singleListingData} />
              <div className="flex justify-end gap-10 mt-12">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="lg:px-8 px-4 py-3 bg-gray-100 rounded-lg cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="lg:px-8 px-4 py-3 bg-[#0085FF] text-white rounded-lg min-w-[160px] cursor-pointer"
                >
                  {isPending ? (
                    <PiSpinnerBold className="animate-spin mx-auto" />
                  ) : (
                    "Update Listing"
                  )}
                </button>
              </div>
            </form>
          )}
          {currentStep < 3 && (
            <div className="flex justify-end gap-10 mt-12">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(s => s - 1)}
                className="px-8 py-3 bg-gray-100 rounded-lg disabled:opacity-50 "
              >
                Previous
              </button>
              <button
                type="button"
                onClick={async () =>
                  (await validateCurrentStep()) && setCurrentStep(s => s + 1)
                }
                className="px-8 py-3 bg-[#0085FF] text-white rounded-lg cursor-pointer"
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

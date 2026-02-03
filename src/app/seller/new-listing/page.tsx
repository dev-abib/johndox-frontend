"use client";
import React, { useState } from "react";
import { PiSpinnerBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import Container from "@/Components/Common/Container";
import { useForm, FormProvider } from "react-hook-form";
import { useAddListing } from "@/Hooks/api/dashboard_api";
import MediaStep from "@/Components/Listing/PhotosMediaStep";
import BasicInfoStep from "@/Components/Listing/BasicInfoStep";
import DetailsStep from "@/Components/Listing/PropertyDetailsStep";

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
};

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Details" },
  { id: 3, name: "Media" },
];

const TOTAL_STEPS = steps.length;

export default function CreateListingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate: addListing, isPending } = useAddListing();

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

  const onSubmit = (data: ListingFormData) => {
    const formData = new FormData();

    formData.append("propertyName", data.propertyName);
    formData.append("description", data.description);
    formData.append("propertyType", data.propertyType.toLowerCase());
    formData.append("listingType", data.listingType.toLowerCase());
    formData.append("fullAddress", data.streetAddress);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("price", data.priceUSD);

    if (data.bedrooms) formData.append("bedrooms", data.bedrooms);
    if (data.bathrooms) formData.append("bathrooms", data.bathrooms);
    if (data.yearBuilt) formData.append("yearBuilt", data.yearBuilt);
    if (data.area) formData.append("areaInMeter", data.area);
    if (data.lotSize) formData.append("areaInSqMeter", data.lotSize);

    if (data.amenities) {
      Object.entries(data.amenities).forEach(([key, value]) => {
        if (value) {
          formData.append(
            "amenities",
            key.charAt(0).toUpperCase() + key.slice(1),
          );
        }
      });
    }

    formData.append("category", data.category);

    if (data.photos && data.photos.length > 0) {
      Array.from(data.photos).forEach(file => {
        formData.append("photos", file);
      });
    } else {
      console.warn("No photos uploaded");
    }

    if (data.video) {
      formData.append("video", data.video[0]);
    }

    console.log("Submitting formData with photos:", data.photos?.length || 0);

    addListing(formData);
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
            <BasicInfoStep
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          )}

          {currentStep === 2 && <DetailsStep />}

          {currentStep === 3 && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <MediaStep />
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

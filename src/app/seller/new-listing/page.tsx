"use client";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Container from "@/Components/Common/Container";
import { useForm, FormProvider } from "react-hook-form";
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
  priceHNL: string;
  bedrooms?: string;
  bathrooms?: string;
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

  images?: FileList | null;
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
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
      priceHNL: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      yearBuilt: "",
      lotSize: "",
      amenities: {},
      images: null,
      video: null,
    },
  });

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  const watchedImages = watch("images");

  useEffect(() => {
    if (watchedImages && watchedImages.length > 0) {
      const urls = Array.from(watchedImages).map((file: File) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(urls);

      return () => urls.forEach(url => URL.revokeObjectURL(url));
    } else {
      setImagePreviews([]);
    }
  }, [watchedImages]);

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
        return await trigger(["images"]);
      default:
        return true;
    }
  };

  const onNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const onPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = (data: ListingFormData) => {
    console.log("Final Submitted Data:", data);
    alert("Listing created successfully!");
  };

  return (
    <section className="py-10 ">
      <Container>
        {/* Back Button */}
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

        {/* Progress Steps */}
        <div className="flex gap-6 mb-12">
          {steps.map(step => (
            <div key={step.id} className="flex-1">
              <div
                className={`h-3 rounded-full transition-colors ${
                  step.id <= currentStep ? "bg-[#0085FF]" : "bg-gray-200"
                }`}
              />
              <p
                className={`mt-3  font-medium ${
                  step.id <= currentStep ? "text-[#0085FF]" : "text-black/40"
                }`}
              >
                {step.name}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <BasicInfoStep
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            )}

            {currentStep === 2 && <DetailsStep />}

            {currentStep === 3 && <MediaStep imagePreviews={imagePreviews} />}

            <div className="flex md:flex-row flex-col justify-end gap-10 mt-12">
              <button
                type="button"
                onClick={onPrev}
                disabled={currentStep === 1}
                className={`px-8 py-3 rounded-lg font-medium transition cursor-pointer ${
                  currentStep === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>

              {currentStep < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-8 py-3 cursor-pointer bg-[#0085FF] text-white rounded-lg font-medium hover:bg-blue-600 transition"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 cursor-pointer bg-[#0085FF] text-white rounded-lg font-medium hover:bg-blue-600 transition"
                >
                  Create Listing
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </Container>
    </section>
  );
}

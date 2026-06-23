"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getItem } from "@/lib/localStorage";
import User from "../../../../Assets/dummy.jpg";
import Container from "../../../Common/Container";
import { IoShareSocialOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import {
  Acceleration,
  Bathtub,
  Bed,
  Converter,
  Email,
  Location,
  Mobile,
  Save,
  Star,
  Video,
} from "@/Components/Svg/SvgContainer";
import { useGetUserData } from "@/Hooks/api/auth_api";
import { useCurrencyConverter, AddFavourite } from "@/Hooks/api/post_api";
import MessageModal from "../../buyerPages/MessageModal";
import React, { useEffect, useRef, useState } from "react";
import TourRequestModal from "../../buyerPages/TourRequestModal";
import toast from "react-hot-toast";

interface BrowswProps {
  data: any;
}

type ConverterForm = {
  amount: string;
};

const BrowseDetails: React.FC<BrowswProps> = ({ data }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [openConverter, setOpenConverter] = useState(false);
  const [convertedData, setConvertedData] = useState<{
    usd: number;
    rate: number;
  } | null>(null);

  // Lightbox modal state for expanding property images
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Favorite state and mutation
  const { mutate: toggleFavoriteMutate } = AddFavourite();
  const [isFavorite, setIsFavorite] = useState(data?.isFavorite || false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  const { mutate: convertCurrency, isLoading: isConverting } =
    useCurrencyConverter();

  const { register, handleSubmit, reset } = useForm<ConverterForm>({
    defaultValues: {
      amount: "100",
    },
  });

  useEffect(() => {
    const savedToken = getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Update favorite state when data changes
  useEffect(() => {
    if (data?.isFavorite !== undefined) {
      setIsFavorite(data.isFavorite);
    }
  }, [data?.isFavorite]);

  const { data: userdata } = useGetUserData(token);
  const isBuyer = userdata?.data?.role === "buyer";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = (): void => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = (): void => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTourRequestClick = () => {
    if (isBuyer) {
      setIsModalOpen(true);
    } else {
      router.push("/auth/login");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const openMessageModal = () => setIsMessageModalOpen(true);
  const closeMessageModal = () => setIsMessageModalOpen(false);

  // Handle Save Listing (Favorite Toggle)
  const handleSaveListing = () => {
    if (!token) {
      toast.error("Please login to save listings");
      return;
    }

    setIsLoadingFavorite(true);
    setIsFavorite(!isFavorite);

    toggleFavoriteMutate(
      { endpoint: `/toggle-favourite-listing/${data?._id}` },
      {
        onSuccess: () => {
          toast.success(
            isFavorite ? "Removed from favorites" : "Added to favorites",
          );
        },
        onError: () => {
          setIsFavorite(!isFavorite); // Revert on error
          toast.error("Failed to update favorite");
        },
        onSettled: () => setIsLoadingFavorite(false),
      },
    );
  };

  const onConvert = (formData: ConverterForm) => {
    convertCurrency(
      { lempira: formData.amount },
      {
        onSuccess: (res: any) => {
          setConvertedData({
            usd: res.data.usd,
            rate: res.data.rate,
          });
        },
      },
    );
  };

  const videoUrl = data?.media?.find(
    (item: any) => item.fileType === "video",
  )?.url;

  const imageUrls =
    data?.media
      ?.filter((item: any) => item.fileType === "image")
      .map((item: any) => item.url) || [];

  return (
    <>
      <section className="lg:pt-10 pt-5">
        <Container>
          <div className="flex flex-col lg:flex-row gap-y-4.5 lg:gap-x-4.5 2xl:gap-x-8.5">
            {/* Media Presentation Container */}
            <div className="w-full flex-1 flex flex-col gap-3">
              {/* Main Player Display */}
              {videoUrl ? (
                <div className="w-full rounded-lg overflow-hidden relative h-[440px] bg-black">
                  <video
                    ref={videoRef}
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onClick={handlePause}
                    playsInline
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {!isPlaying && (
                    <div
                      onClick={handlePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                    >
                      <Video className="animate-spin [animation-duration:3s]" />
                    </div>
                  )}
                </div>
              ) : imageUrls.length > 0 ? (
                <div className="w-full rounded-lg overflow-hidden relative h-[440px] bg-gray-100">
                  {/* Main Image Display */}
                  <div className="w-full h-[360px] bg-gray-100 overflow-hidden rounded-t-lg">
                    <Image
                      src={imageUrls[0]}
                      alt="Property main image"
                      width={800}
                      height={360}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setLightboxImage(imageUrls[0])}
                    />
                  </div>

                  {/* Image Thumbnails Grid */}
                  {imageUrls.length > 1 && (
                    <div className="flex gap-2 p-3 bg-white h-20 overflow-x-auto">
                      {imageUrls.map((url: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#0085FF] transition-all duration-200"
                          onClick={() => setLightboxImage(url)}
                        >
                          <Image
                            src={url}
                            alt={`Property thumbnail ${idx + 1}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {imageUrls.length > 5 && (
                        <div className="flex-shrink-0 h-16 w-16 rounded-lg bg-blue-50 border-2 border-[#0085FF] flex items-center justify-center text-[#0085FF] font-bold text-sm">
                          +{imageUrls.length - 5}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Image Count Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm font-medium">
                    📷 {imageUrls.length}{" "}
                    {imageUrls.length === 1 ? "Photo" : "Photos"}
                  </div>
                </div>
              ) : (
                <div className="w-full rounded-lg overflow-hidden relative h-[440px] bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
                  {/* No Media State - Professional Design */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Icon */}
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center border-2 border-[#0085FF]">
                      <svg
                        className="w-12 h-12 text-[#0085FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    {/* Text Content */}
                    <div className="text-center gap-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-800">
                        No Media Available
                      </h3>
                      <p className="text-gray-500 text-sm max-w-xs">
                        Photos and videos for this property will be added soon.
                        Contact the agent for more details.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={openMessageModal}
                      className="mt-6 px-6 py-2.5 bg-[#0085FF] text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 text-sm"
                    >
                      Message Agent
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 rounded-lg p-3">
              <div className="flex flex-col sm:flex-row gap-2.5 md:gap-5 2xl:gap-20 justify-end">
                <div className="flex gap-x-4 2xl:gap-x-8 justify-between w-full">
                  <h3 className="font-semibold text-[20px] 2xl:text-[28px]  text-[#0085FF] ">
                    {data?.propertyName}
                  </h3>
                  <div className="flex gap-x-3 bg-[#F9FAFB] p-2 items-center h-fit rounded-[5px] cursor-pointer">
                    <p className="font-medium text-[14px] 2xl:text-[18px] text-[#0085FF]">
                      Share
                    </p>
                    <IoShareSocialOutline className="text-[#0085FF]" />
                  </div>
                </div>
                <div className="flex gap-x-6 2xl:gap-x-20 w-full lg:justify-end justify-start">
                  <h4 className="font-semibold text-[18px] 2xl:text-[28px] text-[#0085FF] shrink-0">
                    ${data?.price?.toLocaleString()}
                  </h4>

                  {/* Action Icons Section */}
                  <div className="flex flex-row md:flex-col gap-3 md:gap-6">
                    {/* Save Listing Button - Now with working favorite toggle */}
                    <div className="group relative h-fit w-fit">
                      <button
                        onClick={handleSaveListing}
                        disabled={isLoadingFavorite}
                        className="cursor-pointer transition-all hover:text-blue-600 disabled:opacity-50"
                        title={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        {isLoadingFavorite ? (
                          <span className="w-[25px] h-[25px] 2xl:w-[38px] 2xl:h-[38px] border-2 border-blue-500 border-t-transparent rounded-full animate-spin inline-block" />
                        ) : (
                          <Save
                            className={`w-[25px] h-[25px] 2xl:w-[38px] 2xl:h-[38px] transition-colors ${
                              isFavorite ? "text-blue-600" : ""
                            }`}
                            fill={isFavorite ? "currentColor" : "none"}
                          />
                        )}
                      </button>
                      <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:inline-block bg-neutral-800 text-white text-xs whitespace-nowrap rounded px-2 py-1 shadow-md z-10">
                        {isFavorite ? "Remove from favorites" : "Save listing"}
                      </span>
                    </div>

                    {/* Currency Converter */}
                    <div className="group relative h-fit w-fit">
                      <button
                        onClick={() => setOpenConverter(true)}
                        className="cursor-pointer hover:text-blue-600 transition-colors"
                        title="Open currency converter"
                      >
                        <Converter className="w-[25px] h-[25px] 2xl:w-[38px] 2xl:h-[38px]" />
                      </button>
                      <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:inline-block bg-neutral-800 text-white text-xs whitespace-nowrap rounded px-2 py-1 shadow-md z-10">
                        Convert currency
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 2xl:pt-5 pb-4 2xl:pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2.5 ">
                  <Location className="w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
                  <p className="text-[13px] xl:text-[16px] font-medium text-[#404040]">
                    {data?.fullAddress}, {data?.city}
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 mt-2.5">
                  <div className="flex items-center gap-2.5">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm font-normal text-[#404040]">
                      {data?.bedrooms} Beds
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Bathtub className="w-4 h-4" />
                    <span className="text-sm font-normal text-[#404040]">
                      {data?.bathrooms} Baths
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Acceleration className="w-4 h-4" />
                    <span className="text-sm font-normal text-[#404040]">
                      {data?.areaInSqMeter} m²
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="text-[#101010] text-[14px] 2xl:text-[24px] font-medium uppercase">
                  Agent Information
                </h5>
                <div className="flex flex-col sm:flex-row gap-x-5 mt-4">
                  <Image
                    src={data?.author?.profilePicture || User}
                    alt="Agent"
                    width={80}
                    height={80}
                    className="rounded-full h-20 w-20 object-cover border-2 border-primary-blue"
                  />
                  <div
                    className={
                      !isBuyer ? "blur-sm pointer-events-none select-none" : ""
                    }
                  >
                    <div className="flex flex-col md:flex-row gap-x-10">
                      <ul>
                        <li className="text-xl font-medium text-[#0085FF]">
                          {data?.author?.firstName} {data?.author?.lastName}
                        </li>
                        <li className="text-sm text-[#5F5F5F]">
                          Senior Real Estate Agent
                        </li>
                        <li className="flex gap-x-2 text-sm text-[#5F5F5F] mt-1">
                          <Star /> {data?.author?.rating?.ratingCount || 0}{" "}
                          reviews
                        </li>
                      </ul>
                      <ul className="mt-3 md:mt-0">
                        <li className="flex gap-x-2 text-sm text-[#5F5F5F]">
                          <Mobile /> {data?.author?.phoneNumber || "N/A"}
                        </li>
                        <li className="flex gap-x-2 text-sm text-[#5F5F5F] mt-1">
                          <Email /> {data?.author?.email || "N/A"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-x-7 mt-8">
                <button
                  onClick={handleTourRequestClick}
                  className="w-full bg-[#0085FF] text-white font-medium py-3 rounded-2xl hover:bg-white hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300 cursor-pointer"
                >
                  Request a tour
                </button>
                <button
                  onClick={openMessageModal}
                  className="w-full text-[#0085FF] font-medium py-3 rounded-2xl bg-white border border-[#0085FF] hover:bg-[#0085FF] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Message
                </button>
              </div>
            </div>
          </div>

          {openConverter && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
              <div className="bg-white w-full max-w-[500px] rounded-2xl p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                  onClick={() => {
                    setOpenConverter(false);
                    setConvertedData(null);
                  }}
                  className="absolute right-4 top-4 text-gray-400 hover:text-black transition-colors cursor-pointer"
                >
                  ✕
                </button>

                <h3 className="text-[#0085FF] text-xl font-bold mb-2 flex items-center gap-2">
                  <Converter className="w-6 h-6" /> Currency Converter
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Convert Honduran Lempira (HNL) to US Dollars (USD)
                </p>

                <form onSubmit={handleSubmit(onConvert)} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">
                      Honduran Lempira (HNL)
                    </label>
                    <div className="border border-gray-200 rounded-xl flex items-center overflow-hidden focus-within:border-[#0085FF] transition-colors">
                      <input
                        type="number"
                        step="any"
                        {...register("amount", { required: true })}
                        placeholder="Enter Lempira"
                        className="w-full px-4 py-3.5 outline-none font-medium text-gray-800"
                      />
                      <div className="px-4 bg-gray-50 border-l text-sm text-gray-600 font-bold">
                        HNL
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center -my-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0085FF] border border-blue-100">
                      ⇅
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">
                      US Dollar (USD)
                    </label>
                    <div className="border border-gray-200 bg-gray-50 rounded-xl flex items-center overflow-hidden">
                      <div className="w-full px-4 py-3.5 font-bold text-[#0085FF]">
                        {isConverting
                          ? "Converting..."
                          : convertedData
                            ? convertedData.usd
                            : "0.00"}
                      </div>
                      <div className="px-4 bg-gray-100 border-l text-sm text-gray-600 font-bold">
                        USD
                      </div>
                    </div>
                  </div>

                  {convertedData && (
                    <p className="text-[10px] text-gray-400 text-center italic">
                      Current Exchange Rate: 1 HNL ≈ $
                      {convertedData.rate.toFixed(4)} USD
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isConverting}
                    className="w-full bg-[#0085FF] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:bg-gray-300 cursor-pointer"
                  >
                    {isConverting ? "Fetching Rate..." : "Convert Now"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Lightbox Modal for Images */}
          {lightboxImage && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <div
                className="relative max-w-4xl max-h-[90vh]"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-bold"
                >
                  ✕
                </button>
                <Image
                  src={lightboxImage}
                  alt="Property full view"
                  width={1000}
                  height={800}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          )}
        </Container>
      </section>

      <TourRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        propertyId={data?._id}
      />

      <MessageModal
        userId={data?.author?._id}
        isOpen={isMessageModalOpen}
        onClose={closeMessageModal}
      />
    </>
  );
};

export default BrowseDetails;

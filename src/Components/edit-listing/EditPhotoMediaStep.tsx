import { useEffect, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { ListingFormData } from "@/app/seller/new-listing/page";

interface EditPhotoMediaStepProps {
  data?: any;
}

export default function EditPhotoMediaStep({
  data: listing,
}: EditPhotoMediaStepProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ListingFormData>();

  // State for existing media (Strings from API)
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingVideo, setExistingVideo] = useState<string>("");

  // State for newly uploaded media (Files)
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);

  const watchedPhotos = watch("photos");
  const watchedVideo = watch("video");

  // 1. Initialize API Data
  useEffect(() => {
    if (listing?.media) {
      const imagesFromApi = listing.media
        .filter(
          (m: any) =>
            m.type === "image" || m.url.match(/\.(jpg|jpeg|png|webp)$/i),
        )
        .map((m: any) => m.url);

      const videoFromApi = listing.media.find(
        (m: any) => m.type === "video" || m.url.match(/\.(mp4|mov|avi)$/i),
      )?.url;

      setExistingImages(imagesFromApi);
      setExistingVideo(videoFromApi || "");

      setValue("existingMedia" as any, imagesFromApi);
    }
  }, [listing, setValue]);

  // 2. Handle New Local Image Previews
  useEffect(() => {
    if (watchedPhotos && watchedPhotos instanceof FileList) {
      const files = Array.from(watchedPhotos);
      setNewImages(files);
      const urls = files.map(file => URL.createObjectURL(file));
      setNewImageUrls(urls);
      return () => urls.forEach(url => URL.revokeObjectURL(url));
    }
  }, [watchedPhotos]);

  // Remove Existing Image (API)
  const removeExistingImage = (urlToRemove: string) => {
    const updated = existingImages.filter(url => url !== urlToRemove);
    setExistingImages(updated);
    setValue("existingMedia" as any, updated); 
  };

  // Remove New Image (Local)
  const removeNewImage = (index: number) => {
    const updatedFiles = newImages.filter((_, i) => i !== index);
    const dt = new DataTransfer();
    updatedFiles.forEach(file => dt.items.add(file));
    setValue("photos", dt.files);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <h2 className="text-2xl font-semibold text-gray-900">Photos & Media</h2>
        <div className="absolute left-0 -bottom-1 w-48 h-1 bg-[#0085FF] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <label
          htmlFor="imageRef"
          className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-gray-400 transition"
        >
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload New Photos
          </span>
        </label>

        <label
          htmlFor="videoRef"
          className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-gray-400 transition"
        >
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload New Video
          </span>
        </label>
      </div>

      <input
        id="imageRef"
        type="file"
        accept="image/*"
        multiple
        {...register("photos")}
        className="hidden"
      />
      <input
        id="videoRef"
        type="file"
        accept="video/*"
        {...register("video")}
        className="hidden"
      />

      {/* Media Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
        {existingImages.map((url, index) => (
          <div
            key={`existing-${index}`}
            className="relative group border-2 border-blue-200 rounded-lg p-1"
          >
            <img
              src={url}
              alt="Existing"
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="absolute top-1 left-1 bg-blue-500 text-white text-[10px] px-1 rounded">
              Saved
            </div>
            <button
              type="button"
              onClick={() => removeExistingImage(url)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
            >
              <FiX className="text-red-500 w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Render New Local Images */}
        {newImageUrls.map((url, index) => (
          <div
            key={`new-${index}`}
            className="relative group border-2 border-green-200 rounded-lg p-1"
          >
            <img
              src={url}
              alt="New"
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="absolute top-1 left-1 bg-green-500 text-white text-[10px] px-1 rounded">
              New
            </div>
            <button
              type="button"
              onClick={() => removeNewImage(index)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
            >
              <FiX className="text-red-500 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Video Preview (Existing or New) */}
      {(existingVideo || watchedVideo?.[0]) && (
        <div className="mt-6 relative max-w-xl">
          <p className="text-sm font-medium mb-2">Video Preview:</p>
          <video
            key={
              watchedVideo?.[0]
                ? URL.createObjectURL(watchedVideo[0])
                : existingVideo
            }
            controls
            className="w-full rounded-lg shadow-md"
          >
            <source
              src={
                watchedVideo?.[0]
                  ? URL.createObjectURL(watchedVideo[0])
                  : existingVideo
              }
            />
          </video>
          <button
            type="button"
            onClick={() => {
              setExistingVideo("");
              setValue("video", null);
            }}
            className="absolute top-10 right-2 bg-white rounded-full p-1 shadow-md"
          >
            <FiX className="text-red-500 w-5 h-5" />
          </button>
        </div>
      )}

      {errors.photos && (
        <p className="text-red-500 text-sm mt-4">
          {errors.photos.message as string}
        </p>
      )}
    </div>
  );
}

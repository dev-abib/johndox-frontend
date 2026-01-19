import { useEffect, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { ListingFormData } from "@/app/seller/edit-listing/[id]/page";

export default function EditPhotoMediaStep({ data: listing }: { data?: any }) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ListingFormData>();

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);

  const watchedPhotos = watch("photos");
  const watchedVideo = watch("video");

  useEffect(() => {
    if (listing?.media) {
      const images = listing.media
        .filter((m: any) => m.url.match(/\.(jpg|jpeg|png|webp)$/i))
        .map((m: any) => m.url);
      setExistingImages(images);
      setValue("existingMedia", images);
    }
  }, [listing, setValue]);

  useEffect(() => {
    if (watchedPhotos instanceof FileList) {
      const urls = Array.from(watchedPhotos).map(file =>
        URL.createObjectURL(file),
      );
      setNewImageUrls(urls);
      return () => urls.forEach(url => URL.revokeObjectURL(url));
    }
  }, [watchedPhotos]);

  const removeExistingImage = (url: string) => {
    const updatedUI = existingImages.filter(item => item !== url);
    const updatedDeleted = [...deletedImages, url];

    setExistingImages(updatedUI);
    setDeletedImages(updatedDeleted);

    setValue("existingMedia", updatedUI);
    setValue("deletedImages", updatedDeleted);
  };

  const removeNewImage = (index: number) => {
    if (!watchedPhotos) return;
    const dt = new DataTransfer();
    Array.from(watchedPhotos)
      .filter((_, i) => i !== index)
      .forEach(file => dt.items.add(file));
    setValue("photos", dt.files);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Photos & Media</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <label
          htmlFor="imageRef"
          className="cursor-pointer border-2 border-dashed h-64 flex flex-col items-center justify-center rounded-lg hover:bg-gray-50"
        >
          <FiUpload className="text-4xl text-gray-400 mb-2" />
          <span>Upload Photos</span>
        </label>
        <label
          htmlFor="videoRef"
          className="cursor-pointer border-2 border-dashed h-64 flex flex-col items-center justify-center rounded-lg hover:bg-gray-50"
        >
          <FiUpload className="text-4xl text-gray-400 mb-2" />
          <span>Upload Video</span>
        </label>
      </div>

      <input
        id="imageRef"
        type="file"
        multiple
        accept="image/*"
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

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Existing Images */}
        {existingImages.map((url, i) => (
          <div
            key={i}
            className="relative border-2 border-blue-200 rounded-lg p-1"
          >
            <img
              src={url}
              className="w-full h-32 object-cover rounded-md"
              alt="existing"
            />
            <button
              type="button"
              onClick={() => removeExistingImage(url)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-red-500"
            >
              <FiX />
            </button>
            <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1 rounded">
              Saved
            </span>
          </div>
        ))}

        {/* New Images */}
        {newImageUrls.map((url, i) => (
          <div
            key={i}
            className="relative border-2 border-green-200 rounded-lg p-1"
          >
            <img
              src={url}
              className="w-full h-32 object-cover rounded-md"
              alt="new"
            />
            <button
              type="button"
              onClick={() => removeNewImage(i)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-red-500"
            >
              <FiX />
            </button>
            <span className="absolute bottom-1 left-1 bg-green-500 text-white text-[10px] px-1 rounded">
              New
            </span>
          </div>
        ))}
      </div>

      {errors.photos && (
        <p className="text-red-500 text-sm mt-2">
          {errors.photos.message as string}
        </p>
      )}
    </div>
  );
}

import { FiUpload } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { ListingFormData } from "@/app/seller/new-listing/page";

interface MediaStepProps {
  imagePreviews: string[];
}

export default function MediaStep({ imagePreviews }: MediaStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ListingFormData>();

  return (
    <div className="space-y-8 ">
      {/* Title with blue underline */}
      <div className="relative">
        <h2 className="text-2xl font-semibold text-gray-900">Photos & Media</h2>
        <div className="absolute left-0 -bottom-1 w-48 h-1 bg-[#0085FF] rounded-full"></div>
      </div>

      {/* Required field indicator and description */}
      <div>
        <p className="text-lg font-medium text-gray-900">
          Property Photos <span className="text-red-500">*</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Upload high-quality photos of your property. The first image will be
          the cover photo.
        </p>
      </div>

      {/* Main upload area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Large preview of the first (cover) image */}
        {imagePreviews.length > 0 ? (
          <div className="md:col-span-1">
            <img
              src={imagePreviews[0]}
              alt="Cover preview"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <p className="text-xs text-gray-500 text-center mt-2">
              Cover Photo
            </p>
          </div>
        ) : (
          /* Placeholder for cover when no images */
          <div className="md:col-span-1 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-64">
            <div className="text-center">
              <FiUpload className="mx-auto text-4xl text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Cover Photo</p>
            </div>
          </div>
        )}

        {/* Upload Photo button */}
        <label className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-gray-400 transition">
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload Photo
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            {...register("images", {
              required: "At least one photo is required",
            })}
          />
        </label>

        {/* Upload Video button */}
        <label className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-gray-400 transition">
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload Video
          </span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            {...register("video")}
          />
        </label>
      </div>

      {/* Additional previews (smaller grid below) */}
      {imagePreviews.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
          {imagePreviews.slice(1).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 2}`}
              className="w-full h-32 object-cover rounded-lg shadow-sm"
            />
          ))}
        </div>
      )}

      {/* Error message */}
      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images.message}</p>
      )}

      {/* Upload limits info */}
      <div className="text-sm text-gray-600">
        <p>
          You can upload up to <strong>10 photos</strong> and{" "}
          <strong>1 video</strong>.
        </p>
        <p className="mt-1">
          Recommended size: <strong>1920x1080px</strong>
        </p>
      </div>
    </div>
  );
}

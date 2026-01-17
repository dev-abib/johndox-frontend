import { FiUpload, FiX } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { ListingFormData } from "@/app/seller/new-listing/page";

export default function EditPhotoMediaStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ListingFormData>();

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");

  // Watch registered files
  const watchedImages = watch("photos");
  const watchedVideo = watch("video");

  // Update local state and previews when files change
  useEffect(() => {
    if (watchedImages && watchedImages.length > 0) {
      const files = Array.from(watchedImages);
      setImages(files);

      const urls = files.map(file => URL.createObjectURL(file));
      setImageUrls(urls);
      return () => urls.forEach(url => URL.revokeObjectURL(url));
    } else {
      setImages([]);
      setImageUrls([]);
    }
  }, [watchedImages]);

  useEffect(() => {
    if (watchedVideo && watchedVideo.length > 0) {
      const file = watchedVideo[0];
      setVideo(file);
      setVideoUrl(URL.createObjectURL(file));
    } else {
      setVideo(null);
      setVideoUrl("");
    }
  }, [watchedVideo]);

  // Remove image
  const removeImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);

    const dt = new DataTransfer();
    updatedFiles.forEach(file => dt.items.add(file));
    setValue("photos", dt.files, { shouldValidate: true });
  };

  // Remove video
  const removeVideo = () => {
    setVideo(null);
    setVideoUrl("");
    setValue("video", null, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <h2 className="text-2xl font-semibold text-gray-900">Photos & Media</h2>
        <div className="absolute left-0 -bottom-1 w-48 h-1 bg-[#0085FF] rounded-full"></div>
      </div>

      <div>
        <p className="text-lg font-medium text-gray-900">
          Property Photos <span className="text-red-500">*</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Upload high-quality photos of your property. The first image will be
          the cover photo.
        </p>
      </div>

      {/* Hidden registered inputs */}
      <input
        id="imageRef"
        type="file"
        accept="image/*"
        multiple
        {...register("photos", {
          required: "At least one photo is required",
        })}
        className="hidden"
        onChange={e => {
          register("photos").onChange(e);
          if (e.target.files) {
            console.log(e.target.files[0]);
          }
        }}
      />

      <input
        type="file"
        id="videoRef"
        accept="video/*"
        {...register("video")}
        className="hidden"
        onChange={e => {
          register("video").onChange(e);
          const files = e.target.files;
          if (files && files.length > 0) {
            console.log("Uploaded video:", files[0]);
          }
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Upload Photos Button */}
        <label
          htmlFor="imageRef"
          className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-gray-400 transition"
        >
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload Photos
          </span>
        </label>

        {/* Upload Video Button */}
        <label
          htmlFor="videoRef"
          className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-gray-400 transition"
        >
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload Video
          </span>
        </label>
      </div>

      {/* Image Previews */}
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
          {imageUrls.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <FiX className="text-red-500 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Video Preview */}
      {videoUrl && (
        <div className="mt-6 relative">
          <p className="text-sm font-medium mb-2">Video Preview:</p>
          <video controls className="w-full max-h-96 rounded-lg shadow-md">
            <source src={videoUrl} type={video?.type} />
            Your browser does not support the video tag.
          </video>
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
          >
            <FiX className="text-red-500 w-5 h-5" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {errors.photos && (
        <p className="text-red-500 text-sm mt-4">{errors.photos.message}</p>
      )}

      {/* Info */}
      <div className="text-sm text-gray-600 mt-2">
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

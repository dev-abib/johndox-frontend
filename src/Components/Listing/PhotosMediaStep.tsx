import { FiUpload, FiX } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { ListingFormData } from "@/app/seller/new-listing/page";

export default function MediaStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ListingFormData>();

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [view360, setView360] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [view360Url, setView360Url] = useState<string>("");

  // Watch registered files
  const watchedImages = watch("photos");
  const watchedVideo = watch("video");
  const watched360View = watch("view360");

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

  useEffect(() => {
    if (watched360View && watched360View.length > 0) {
      const file = watched360View[0];
      setView360(file);
      setView360Url(URL.createObjectURL(file));
    } else {
      setView360(null);
      setView360Url("");
    }
  }, [watched360View]);

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
    setValue("video", new DataTransfer().files, { shouldValidate: true });
  };

  // Remove 360 view
  const remove360View = () => {
    setView360(null);
    setView360Url("");
    setValue("view360", new DataTransfer().files, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <h2 className="text-2xl font-semibold text-gray-900">Photos & Media</h2>
        <div className="absolute left-0 -bottom-1 w-48 h-1 bg-[#0085FF] rounded-full"></div>
      </div>

      {/* Photos Section */}
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

      <input
        type="file"
        id="view360Ref"
        accept="image/*,.jp2,.jp3"
        {...register("view360")}
        className="hidden"
        onChange={e => {
          register("view360").onChange(e);
          const files = e.target.files;
          if (files && files.length > 0) {
            console.log("Uploaded 360 view:", files[0]);
          }
        }}
      />

      {/* Upload Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Photos Button */}
        <label
          htmlFor="imageRef"
          className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-blue-400 hover:bg-blue-50 transition"
        >
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload Photos
          </span>
          <span className="text-xs text-gray-500 mt-1">(Required)</span>
        </label>

        {/* Upload Video Button */}
        <label
          htmlFor="videoRef"
          className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-blue-400 hover:bg-blue-50 transition"
        >
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload Video
          </span>
          <span className="text-xs text-gray-500 mt-1">(Optional)</span>
        </label>

        {/* Upload 360 View Button */}
        <label
          htmlFor="view360Ref"
          className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-blue-400 hover:bg-blue-50 transition"
        >
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">360° View</span>
          <span className="text-xs text-gray-500 mt-1">(Optional)</span>
        </label>
      </div>

      {/* Image Previews */}
      {imageUrls.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Photo Previews ({imageUrls.length})
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {imageUrls.map((src, index) => (
              <div key={index} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-sm"
                />
                {index === 0 && (
                  <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Cover
                  </span>
                )}
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
        </div>
      )}

      {/* Video Preview */}
      {videoUrl && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-900 mb-4">
            Video Preview
          </p>
          <div className="relative">
            <video
              controls
              className="w-full max-h-96 rounded-lg shadow-md bg-black"
            >
              <source src={videoUrl} type={video?.type} />
              Your browser does not support the video tag.
            </video>
            <button
              type="button"
              onClick={removeVideo}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <FiX className="text-red-500 w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 360 View Preview */}
      {view360Url && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-900 mb-4">
            360° View Preview
          </p>
          <div className="relative">
            <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img
                src={view360Url}
                alt="360 View"
                className="w-full max-h-96 object-contain"
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              ℹ️ This is a preview of your equirectangular image. It will be
              displayed as an interactive 360° viewer in the listing.
            </p>
            <button
              type="button"
              onClick={remove360View}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <FiX className="text-red-500 w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errors.photos && (
        <p className="text-red-500 text-sm mt-4">{errors.photos.message}</p>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-medium text-gray-900 mb-2">📸 Media Guidelines:</p>
        <ul className="space-y-1 ml-4 list-disc">
          <li>
            <strong>Photos:</strong> Up to 10 high-quality images (1920x1080px
            recommended)
          </li>
          <li>
            <strong>Video:</strong> Optional. MP4, MOV formats supported
          </li>
          <li>
            <strong>360° View:</strong> Optional. Equirectangular JPEG/PNG for
            interactive viewing
          </li>
        </ul>
      </div>
    </div>
  );
}

import { FiUpload, FiX } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { ListingFormData } from "@/app/seller/new-listing/page";
import { useEffect, useState } from "react";

export default function MediaStep() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ListingFormData>();

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const urls = images.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  useEffect(() => {
    if (video) {
      const url = URL.createObjectURL(video);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setVideoUrl("");
    }
  }, [video]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...images, ...newFiles].slice(0, 10);

    setImages(updatedFiles);

    // Convert to real FileList
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach(file => dataTransfer.items.add(file));

    setValue("images", dataTransfer.files, { shouldValidate: true });
  };

  const removeImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach(file => dataTransfer.items.add(file));

    setValue("images", dataTransfer.files, { shouldValidate: true });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    setVideo(file);

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    setValue("video", dataTransfer.files, { shouldValidate: true });
  };

  const removeVideo = () => {
    setVideo(null);
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <label className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-gray-400 transition">
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload Photos
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <label className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-gray-400 transition">
          <FiUpload className="text-4xl text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-700">
            Upload Video
          </span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
          />
        </label>
      </div>

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

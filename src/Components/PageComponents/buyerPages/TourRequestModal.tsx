"use client";

import { FaTimes } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { RequestTour } from "@/Hooks/api/post_api";
import { PiSpinnerBold } from "react-icons/pi";

const RequestTourModal = ({
  isOpen,
  onClose,
  propertyId,
}: {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = RequestTour();

  const onSubmit = (formData: any) => {
    const payload = {
      ...formData,
      propertyId: propertyId,
    };

    mutate(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-[500px] relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold text-[#212B36] mb-4">
          Request a Tour
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm text-[#5F5F5F] mb-2">Name</label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  placeholder="Enter your Full Name"
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label className="block text-sm text-[#5F5F5F] mb-2">
              Phone Number
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  placeholder="(XXX) XXX-XXXX"
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phoneNumber.message as string}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm text-[#5F5F5F] mb-2">
              Signed In Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              }}
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label className="block text-sm text-[#5F5F5F] mb-2">Message</label>
            <Controller
              name="message"
              control={control}
              defaultValue="I would like to schedule a tour."
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              )}
            />
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <label className="block text-sm text-[#5F5F5F] mb-2">
              Preferred Date
            </label>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#0085FF] text-white font-medium py-3 rounded-2xl hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300 disabled:bg-gray-400 disabled:border-gray-400 cursor-pointer"
          >
            {isPending ? (
              <PiSpinnerBold className="animate-spin size-[20px] fill-white mx-auto" />
            ) : (
              "Send tour request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestTourModal;

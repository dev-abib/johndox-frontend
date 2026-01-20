"use client";

import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { RequestTour } from "@/Hooks/api/post_api";
import { PiSpinnerBold } from "react-icons/pi";
import { getItem } from "@/lib/localStorage";

const RequestTourModal = ({
  isOpen,
  onClose,
  propertyId,
}: {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      setToken(getItem("token"));
    }
  }, [isOpen]);

  const { mutate, isPending } = RequestTour(token);

  const onSubmit = (formData: any) => {
    const payload = {
      phoneNumber: formData.phoneNumber,
      message: formData.message,
      propertyId: propertyId,
      date: formData.date,
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
                  placeholder="e.g. 01707104399"
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

          {/* Message Field */}
          <div className="mb-4">
            <label className="block text-sm text-[#5F5F5F] mb-2">Message</label>
            <Controller
              name="message"
              control={control}
              defaultValue="Hello, I am very interested in this property. I would like to schedule a tour and discuss pricing and availability."
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              )}
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message.message as string}
              </p>
            )}
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
              rules={{ required: "Please select a date" }}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">
                {errors.date.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#0085FF] text-white font-medium py-3 rounded-2xl hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300 disabled:bg-gray-400 disabled:border-gray-400 cursor-pointer flex items-center justify-center"
          >
            {isPending ? (
              <PiSpinnerBold className="animate-spin size-[20px] fill-white" />
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

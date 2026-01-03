"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";

const RequestTourModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submittedData, setSubmittedData] = useState<any>(null);

  const onSubmit = (data: any) => {
    setSubmittedData(data);
    console.log(data); // You can send data to your server here
    onClose(); // Close modal after form submission
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[90%] sm:w-[500px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold text-[#212B36] mb-4">
          Request a Tour
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-[#5F5F5F] mb-2">
              Name
            </label>
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
              <p className="text-sm text-red-500">
                {typeof errors.name?.message === "string"
                  ? errors.name.message
                  : "Invalid input"}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm text-[#5F5F5F] mb-2"
            >
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
              <p className="text-sm text-red-500">
                {typeof errors.phoneNumber?.message === "string"
                  ? errors.phoneNumber.message
                  : "Invalid input"}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm text-[#5F5F5F] mb-2"
            >
              Signed In Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
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
              <p className="text-sm text-red-500">
                {typeof errors.email?.message === "string"
                  ? errors.email.message
                  : "Invalid input"}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm text-[#5F5F5F] mb-2"
            >
              Message
            </label>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="I would like to schedule a tour."
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              )}
            />
            {errors.message && (
              <p className="text-sm text-red-500">
                {typeof errors.message?.message === "string"
                  ? errors.message.message
                  : "Invalid input"}
              </p>
            )}
          </div>

          {/* Date Picker */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm text-[#5F5F5F] mb-2">
              Select a preferred date for tour (optional)
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-primary-blue text-white font-medium py-3 rounded-2xl hover:bg-transparent hover:text-primary-blue border border-primary-blue transition-all duration-300"
            >
              Send tour request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestTourModal;

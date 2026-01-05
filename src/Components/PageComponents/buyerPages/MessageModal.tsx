"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";

const MessageModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState<any>(null);

  const onSubmit = (data: any) => {
    console.log(data); // You can send data to your backend here
    setSubmittedData(data); // Optionally store the submitted data
    onClose(); // Close the modal after successful form submission
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

        <h2 className="text-lg font-semibold text-[#212B36] mb-4">Message</h2>

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
            {errors.name && <p className="text-sm text-red-500">{typeof errors.name.message === 'string' ? errors.name.message : 'Name is required'}</p>}
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm text-[#5F5F5F] mb-2">
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
                  placeholder="I'm interested in this property..."
                  className="w-full px-4 py-2 border border-[#E7E7E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              )}
            />
            {errors.message && <p className="text-sm text-red-500">{typeof errors.message.message === 'string' ? errors.message.message : 'Message is required'}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-primary-blue text-white font-medium py-3 rounded-2xl hover:bg-transparent hover:text-primary-blue border border-primary-blue transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageModal;

"use client";
import Link from "next/link";
import React, { useState } from "react";
import Container from "@/Components/Common/Container";
import { useUpdateUserBuyer } from "@/Hooks/api/auth_api";
import { IoIosArrowBack, IoMdCloudUpload, IoMdDocument } from "react-icons/io";

const DocumentVerificationPage = () => {
  const { mutate, isPending } = useUpdateUserBuyer();

  const [documentName, setDocumentName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image (JPEG/PNG) or PDF document.");
      return;
    }

    setSelectedFile(file);
    setDocumentName(file.name);

    // Preview only for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null); // No preview for PDF
    }
  };

  const handleSave = () => {
    if (!selectedFile) {
      alert("Please upload a document first.");
      return;
    }

    const formData = new FormData();
    // BACKEND EXPECTS THIS NAME 👇
    formData.append("identity_document", selectedFile);

    mutate(formData);
  };

  return (
    <section className="mt-10">
      <Container>
        {/* Back Link */}
        <Link
          href="/seller/profile-info"
          className="flex items-center gap-x-2 text-[#0085FF] text-xl sm:text-2xl lg:text-3xl font-medium mb-8 hover:underline"
        >
          <IoIosArrowBack className="size-7 lg:size-9" />
          Return to profile
        </Link>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#101010] mb-10">
          Document Preferences
        </h1>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E5E7EB] p-6 sm:p-8 lg:p-12 mx-auto">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#101010] mb-4">
            Identity Verification
          </h3>
          <p className="text-[#6B7280] text-base sm:text-lg lg:text-xl mb-10">
            Manage and review the documents you have uploaded for identity
            verification.
          </p>

          {/* Document Preview */}
          <div className="flex flex-col mb-12 max-w-[400px]">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl w-full p-8 sm:p-12 text-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Document preview"
                  className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
                />
              ) : (
                <div className="space-y-4">
                  <IoMdDocument className="text-gray-400 text-6xl mx-auto" />
                  <p className="text-gray-600 text-sm sm:text-base font-medium break-all">
                    {documentName || "No document uploaded yet"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex mb-12 max-w-[400px]">
            <label
              htmlFor="document-upload"
              className="flex items-center justify-center gap-3 bg-white border-2 border-dashed border-[#0085FF] text-[#0085FF] px-6 py-4 rounded-xl cursor-pointer hover:bg-[#0085FF]/5 transition font-medium text-base sm:text-lg shadow-sm w-full"
            >
              <IoMdCloudUpload className="text-2xl" />
              <span className="text-center">Update Your Document</span>
              <input
                id="document-upload"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Save Button */}
          <div className="flex max-w-[400px]">
            <button
              onClick={handleSave}
              disabled={!selectedFile || isPending}
              className="bg-[#0085FF] text-white px-12 py-4 rounded-lg text-lg sm:text-xl font-medium hover:bg-[#006edc] transition disabled:bg-gray-300 disabled:cursor-not-allowed w-full cursor-pointer"
            >
              {isPending ? "Uploading..." : "Save"}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DocumentVerificationPage;

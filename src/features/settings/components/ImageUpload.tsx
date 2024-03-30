import React from "react";
import { Icons } from "@/components/icons/icons";
import clsx from "clsx";

type ImageUploadProps = {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileImagePreview: string | undefined | null;
  profile_image_url: string | null | undefined;
  uploadId: string;
  className?: string; // Add className prop
};

export function ImageUpload({
  handleImageChange,
  profileImagePreview,
  profile_image_url,
  uploadId,
  className = "", // Default value for className
}: ImageUploadProps) {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        name={uploadId}
        id={uploadId}
        onChange={handleImageChange}
        className={clsx(
          "mt-1 p-2 border rounded w-full text-sm hidden",
          className
        )}
        // className={`mt-1 p-2 border rounded w-full text-sm hidden ${className}`}
      />
      <label htmlFor={uploadId}>
        <div id={uploadId} className={`relative mb-6 text-center w-full`}>
          <div>
            {profileImagePreview && (
              <img
                src={profileImagePreview}
                alt="small"
                className={clsx(
                  "h-24 w-24 rounded-full object-cover m-auto cursor-pointer",
                  className
                )}
                // className={`h-24 w-24 rounded-full object-cover m-auto cursor-pointer ${className}`}
              />
            )}
            {profile_image_url && (
              <img
                src={profile_image_url}
                alt="small"
                className={clsx(
                  "h-24 w-24 rounded-full object-cover m-auto cursor-pointer",
                  profileImagePreview != null ? "hidden" : "",
                  className
                )}
              />
            )}
            <Icons.upload
              className={clsx(
                "h-24 w-24 rounded-full border p-3 m-auto cursor-pointer",
                profileImagePreview != null || profile_image_url
                  ? "hidden"
                  : "",
                className
              )}
              // className={`h-24 w-24 rounded-full border p-3 m-auto cursor-pointer ${
              //   profileImagePreview != null || profile_image_url ? "hidden" : ""
              // } ${className}`}
            />
            <div
              className={`cursor-pointer absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 ${className}`}
            ></div>
          </div>
        </div>
      </label>
    </>
  );
}

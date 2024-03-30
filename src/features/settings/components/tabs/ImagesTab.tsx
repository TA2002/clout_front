import { ImageUpload } from "../ImageUpload";
import * as React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/lib/AuthContext";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { uploadImages } from "../../api/uploadImage";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/errorMessage";

export const ImagesTab = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { mediakitInfo, getMediakitInfo } = useContext(AuthContext);
  const [profileImagePreview, setProfileImagePreview] = useState<
    string | undefined | null
  >(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<
    string | undefined | null
  >(null);
  const [newProfileImage, setNewProfileImage] = useState<File | null>();
  const [newBackgroundImage, setNewBackgroundImage] = useState<File | null>();
  const { toast } = useToast();

  useEffect(() => {}, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewProfileImage(file);
      setProfileImagePreview(imageURL);
    }
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewBackgroundImage(file);
      setBackgroundImagePreview(imageURL);
    }
  };

  const uploadProfileImage = async () => {
    if (!newProfileImage && !newBackgroundImage) {
      return;
    }

    const formData = new FormData();
    if (newProfileImage) formData.append("profile_image_url", newProfileImage);
    if (newBackgroundImage)
      formData.append("background_image_url", newBackgroundImage);

    setIsLoading(true);
    try {
      if (mediakitInfo?.cloutname) {
        setIsLoading(true); // Set loading state to true
        await uploadImages(formData, mediakitInfo?.unique_id);
        getMediakitInfo();
        toast({
          title: "Successful save",
          description: "Images are saved successfully",
          variant: "success",
        });
      }
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Label className="mb-10">Profile Image</Label>
      {/* <p>fsdfsd</p> */}
      <ImageUpload
        handleImageChange={handleImageChange}
        profileImagePreview={profileImagePreview}
        profile_image_url={mediakitInfo?.profile_image_url}
        uploadId="profile_image_url"
        className=""
      />
      <Label className="">Large Image</Label>
      {/* <Label>Large Image</Label> */}
      <div className=""></div>
      <ImageUpload
        handleImageChange={handleBackgroundImageChange}
        profileImagePreview={backgroundImagePreview}
        profile_image_url={mediakitInfo?.background_image_url}
        uploadId="background_image_url"
        className="w-full h-40 rounded-lg object-cover"
      />
      <div className="w-full flex flex-row justify-start ">
        <Button
          className="w-24"
          onClick={uploadProfileImage}
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
      {/* <input
        type="file"
        accept="image/*"
        name="background_image_url"
        id="background_image_url"
        // onChange={handleImageChange}
        className="mt-1 p-2 border rounded w-full text-sm hidden"
      />
      <label htmlFor="background_image_url">
        <div
          id="background_image_url"
          className="relative mb-6 text-center w-full cursor-pointer"
        >
          <div>
            {mediakitInfo?.profile_image_url && (
              <img
                src={mediakitInfo.background_image_url}
                alt="small"
                className="w-full aspect-[7/3] md:aspect-[8/3] rounded-lg object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </div>
        </div>
      </label> */}
    </>
  );
};

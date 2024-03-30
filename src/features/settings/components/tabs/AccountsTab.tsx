import * as React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/lib/AuthContext";
import { SocialDialogTriggerButton } from "../SocialDialogTriggerButton";
import { usePlatforms } from "@/features/mediakit/api/getPlatforms";
import { LinkedAccount } from "@/features/mediakit/types";
import { LinkedAccountCard } from "../LinkedAccountCard";
import { Icons } from "@/components/icons/icons";
import { Label } from "@/components/ui/label";

export const AccountsTab = () => {
  const [isLoading, _] = React.useState<boolean>(false);
  const { mediakitInfo } = useContext(AuthContext);

  // const platforms = usePlatforms({ cloutname: mediakitInfo?.cloutname ?? "" });
  const {
    data: platformsData,
    isLoading: platformsLoading,
    refetch,
  } = usePlatforms({ cloutname: mediakitInfo?.cloutname ?? "" });

  // const platformsLoading = platforms.isLoading;

  let instagramCount =
    platformsData?.filter(
      (item) => item.mediakit_linked_platform.platform == "instagram"
    ).length ?? 0;

  let tiktokCount =
    platformsData?.filter(
      (item) => item.mediakit_linked_platform.platform == "tiktok"
    ).length ?? 0;

  let youtubeCount =
    platformsData?.filter(
      (item) => item.mediakit_linked_platform.platform == "youtube"
    ).length ?? 0;

  const [tiktokAccount, setTiktokAccount] = useState<LinkedAccount | null>(
    null
  );
  const [youtubeAccount, setYoutubeAccount] = useState<LinkedAccount | null>(
    null
  );
  const [instagramAccount, setInstagramAccount] =
    useState<LinkedAccount | null>(null);

  useEffect(() => {
    if (!platformsLoading) {
      setTiktokAccount(null);
      setInstagramAccount(null);
      setYoutubeAccount(null);
      platformsData?.forEach((item) => {
        if (item.mediakit_linked_platform.platform == "tiktok")
          setTiktokAccount(item.mediakit_linked_platform);
        if (item.mediakit_linked_platform.platform == "instagram")
          setInstagramAccount(item.mediakit_linked_platform);
        if (item.mediakit_linked_platform.platform == "youtube")
          setYoutubeAccount(item.mediakit_linked_platform);
      });
    }
  }, [platformsLoading, platformsData]);

  const refetchPlatforms = () => {
    setInstagramAccount(null);
    setYoutubeAccount(null);
    setTiktokAccount(null);
    refetch();
  };

  return (
    <>
      {platformsLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <div className="flex flex-col gap-10 w-56">
          <div className="w-full flex flex-col gap-2">
            {/* <p className="font-bold">TikTok</p> */}
            <Label>TikTok</Label>
            {tiktokCount == 0 && (
              <SocialDialogTriggerButton
                platform="TikTok"
                isLoading={isLoading}
                onSuccess={refetchPlatforms}
              />
            )}
            {tiktokAccount != null && (
              <LinkedAccountCard
                account={tiktokAccount}
                onSuccess={refetchPlatforms}
              />
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            {/* <p className="font-bold">Instagram</p> */}
            <Label>Instagram</Label>
            {instagramCount == 0 && (
              <SocialDialogTriggerButton
                platform="Instagram"
                isLoading={isLoading}
                onSuccess={refetchPlatforms}
              />
            )}
            {instagramAccount != null && (
              <LinkedAccountCard
                account={instagramAccount}
                onSuccess={refetchPlatforms}
              />
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            {/* <p className="font-bold">Youtube</p> */}
            <Label>Youtube</Label>
            {youtubeCount == 0 && (
              <SocialDialogTriggerButton
                platform="Youtube"
                isLoading={isLoading}
                onSuccess={refetchPlatforms}
              />
            )}
            {youtubeAccount != null && (
              <LinkedAccountCard
                account={youtubeAccount}
                onSuccess={refetchPlatforms}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

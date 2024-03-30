import { useEffect, useState } from "react";
import Loading from "@/loading";
import { useParams } from "react-router-dom";
import { useMediakit } from "../api/getMediakit";
import { usePlatforms } from "../api/getPlatforms";
import { useYoutubeData } from "../api/getYoutubeData";
import { Layout } from "../components/Layout";
import { StatsGrid } from "../components/StatsGrid";
import { useInstagramData } from "../api/getInstagramData";
import { useTiktokData } from "../api/getTiktokData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HorizontalVideoMenu from "../components/HorizontalVideoMenu";
import { useTelegramData } from "../api/getTelegramData";
import { useTranslation } from "react-i18next";

export const MediakitPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  let { cloutname } = useParams();
  const { t } = useTranslation();

  if (!cloutname) {
    return null;
  }

  const mediakit = useMediakit({ cloutname });
  const platforms = usePlatforms({ cloutname });
  const youtubeData = useYoutubeData({ cloutname });
  const instagramData = useInstagramData({ cloutname });
  const tiktokData = useTiktokData({ cloutname });
  const telegramData = useTelegramData({ cloutname });

  const mediakitLoading = mediakit.isLoading;
  const platformsLoading = platforms.isLoading;
  const youtubeDataLoading = youtubeData.isLoading;
  const instagramDataLoading = instagramData.isLoading;
  const tiktokDataLoading = tiktokData.isLoading;
  const telegramDataLoading = telegramData.isLoading;

  useEffect(() => {
    if (
      !mediakitLoading &&
      !platformsLoading &&
      !youtubeDataLoading &&
      !instagramDataLoading &&
      !tiktokDataLoading &&
      !telegramDataLoading
    ) {
      setIsLoading(false);
    }
  }, [
    mediakitLoading,
    platformsLoading,
    youtubeDataLoading,
    instagramDataLoading,
    tiktokDataLoading,
    telegramDataLoading,
  ]);

  let instagramCount =
    platforms.data?.filter(
      (item) => item.mediakit_linked_platform.platform == "instagram"
    ).length ?? 0;

  let tiktokCount =
    platforms.data?.filter(
      (item) => item.mediakit_linked_platform.platform == "tiktok"
    ).length ?? 0;

  let youtubeCount =
    platforms.data?.filter(
      (item) => item.mediakit_linked_platform.platform == "youtube"
    ).length ?? 0;

  let telegramCount =
    platforms.data?.filter(
      (item) => item.mediakit_linked_platform.platform == "telegram"
    ).length ?? 0;

  return (
    <>
      {isLoading || mediakit.data == undefined ? (
        <Loading />
      ) : (
        <Layout mediakit={mediakit.data} accounts={platforms.data ?? []}>
          {/* <LoginForm onSuccess={() => navigate("/app")} /> */}
          <Tabs
            defaultValue={
              instagramCount
                ? "instagram"
                : tiktokCount
                ? "tiktok"
                : youtubeCount
                ? "youtube"
                : "telegram"
            }
            className="w-full"
          >
            <TabsList>
              {instagramCount > 0 && (
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
              )}
              {tiktokCount > 0 && (
                <TabsTrigger value="tiktok">Tiktok</TabsTrigger>
              )}
              {youtubeCount > 0 && (
                <TabsTrigger value="youtube">Youtube</TabsTrigger>
              )}
              {telegramCount > 0 && (
                <TabsTrigger value="telegram">Telegram</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="instagram">
              {instagramData.data?.length && instagramData.data?.length > 0 && (
                <>
                  <StatsGrid
                    tiktokAccount={null}
                    youtubeAccount={null}
                    instagramAccount={instagramData.data[0]}
                    telegramAccount={null}
                    platformName={"instagram"}
                  ></StatsGrid>
                  <div className="w-full flex flex-col mt-10">
                    <div>
                      <h3 className="font-semibold text-xl mb-3">
                        {t("feed")}
                      </h3>
                      <Tabs defaultValue={"posts"} className="w-full">
                        <TabsList>
                          <TabsTrigger value="posts">{t("posts")}</TabsTrigger>
                          <TabsTrigger value="stories">
                            {t("stories")}
                          </TabsTrigger>
                          <TabsTrigger value="reels">{t("reels")}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="posts">
                          <HorizontalVideoMenu
                            platform_name="instagram"
                            videos={
                              instagramData.data[0].instagram_user_last_feeds
                            }
                          />
                        </TabsContent>
                        <TabsContent value="reels">
                          <HorizontalVideoMenu
                            platform_name="instagram"
                            videos={
                              instagramData.data[0].instagram_user_last_reels
                            }
                          />
                        </TabsContent>
                        <TabsContent value="stories">
                          <HorizontalVideoMenu
                            platform_name="instagram"
                            videos={
                              instagramData.data[0]
                                .instagram_user_insights_stories
                            }
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
            <TabsContent value="tiktok">
              <div className="w-full bg-blue-200"></div>
              {tiktokData.data?.length && tiktokData.data?.length > 0 && (
                <StatsGrid
                  tiktokAccount={tiktokData.data[0]}
                  youtubeAccount={null}
                  instagramAccount={null}
                  telegramAccount={null}
                  platformName={"tiktok"}
                ></StatsGrid>
              )}
            </TabsContent>
            <TabsContent value="youtube">
              {youtubeData.data?.length && youtubeData.data?.length > 0 && (
                <StatsGrid
                  tiktokAccount={null}
                  youtubeAccount={youtubeData.data[0]}
                  instagramAccount={null}
                  telegramAccount={null}
                  platformName={"youtube"}
                ></StatsGrid>
              )}
            </TabsContent>
            <TabsContent value="telegram">
              {telegramData.data?.length && telegramData.data?.length > 0 && (
                <StatsGrid
                  tiktokAccount={null}
                  youtubeAccount={null}
                  instagramAccount={null}
                  telegramAccount={telegramData.data[0]}
                  platformName={"telegram"}
                ></StatsGrid>
              )}
            </TabsContent>
          </Tabs>
        </Layout>
      )}
    </>
  );
};

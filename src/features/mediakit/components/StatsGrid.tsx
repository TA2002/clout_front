import * as React from "react";
import { StatsCard } from "./StatsCard";
import { YoutubeData, InstagramData, TiktokData, TelegramData } from "../types";
import { useTranslation } from "react-i18next";

interface StatsGridProps {
  platformName: string | null;
  youtubeAccount: YoutubeData | null;
  tiktokAccount: TiktokData | null;
  instagramAccount: InstagramData | null;
  telegramAccount: TelegramData | null;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  platformName,
  tiktokAccount,
  youtubeAccount,
  instagramAccount,
  telegramAccount,
}) => {
  const { t } = useTranslation();
  // let engagement = null;
  // if (
  //   youtubeAccount &&
  //   youtubeAccount.youtube_channel_insights_last_month.likes != null &&
  //   youtubeAccount.youtube_channel_insights_last_month.comments != null &&
  //   youtubeAccount.youtube_channel_insights_last_month.views != null
  // ) {
  //   engagement =
  //     (youtubeAccount.youtube_channel_insights_last_month?.likes +
  //       youtubeAccount.youtube_channel_insights_last_month?.comments) /
  //     youtubeAccount.youtube_channel_insights_last_month?.views;
  // }
  let statsData = [];
  console.log(platformName);

  if (tiktokAccount) {
    statsData.push(
      {
        name: "followers",
        number: tiktokAccount.tiktok_user_profile?.followers_count,
      },
      {
        name: "profileViewsPerMonth",
        number: tiktokAccount.tiktok_user_insights_last_month?.profile_views,
      },
      {
        name: "viewsPerMonth",
        number: tiktokAccount.tiktok_user_insights_last_month?.video_views,
      },
      {
        name: "likesPerMonth",
        number: tiktokAccount.tiktok_user_insights_last_month?.likes,
      },
      {
        name: "commentsPerMonth",
        number: tiktokAccount.tiktok_user_insights_last_month?.comments,
      }
    );
  }

  if (instagramAccount) {
    statsData.push(
      {
        name: "followers",
        number: instagramAccount.instagram_user_account?.followers_count ?? "-",
      },
      {
        name: "engagedAccounts",
        number:
          instagramAccount.instagram_user_insights_last_month
            ?.accounts_engaged ?? "-",
      },
      {
        name: "reach",
        number:
          instagramAccount.instagram_user_insights_last_month?.reach ?? "-",
      },
      {
        name: "totalPosts",
        number: instagramAccount.instagram_user_account?.media_count ?? "-",
      },
      {
        name: "likesPerMonth",
        number:
          instagramAccount.instagram_user_insights_last_month?.likes ?? "-",
      },
      {
        name: "commentsPerMonth",
        number:
          instagramAccount.instagram_user_insights_last_month?.comments ?? "-",
      }
    );
  }

  // YouTube Account Data Processing (Assuming engagement calculation was provided earlier)
  if (youtubeAccount) {
    let engagement = "-";
    if (
      youtubeAccount.youtube_channel_insights_last_month.likes != null &&
      youtubeAccount.youtube_channel_insights_last_month.comments != null &&
      youtubeAccount.youtube_channel_insights_last_month.views != null
    ) {
      engagement = (
        (youtubeAccount.youtube_channel_insights_last_month.likes +
          youtubeAccount.youtube_channel_insights_last_month.comments) /
        youtubeAccount.youtube_channel_insights_last_month.views
      ).toFixed(2);
    }

    statsData.push(
      {
        name: "subscribers",
        number:
          youtubeAccount.youtube_channel_insights_overall?.subscriber_count ??
          "-",
      },
      {
        name: "engagementPerMonth",
        number: engagement,
      },
      {
        name: "totalViews",
        number:
          youtubeAccount.youtube_channel_insights_overall?.view_count ?? "-",
      },
      {
        name: "totalVideos",
        number:
          youtubeAccount.youtube_channel_insights_overall?.video_count ?? "-",
      },
      {
        name: "likesPerMonth",
        number:
          youtubeAccount.youtube_channel_insights_last_month?.likes ?? "-",
      },
      {
        name: "commentsPerMonth",
        number:
          youtubeAccount.youtube_channel_insights_last_month?.comments ?? "-",
      }
    );
  }

  // Telegram Account Data Processing
  if (telegramAccount) {
    statsData.push(
      {
        name: "followersCount",
        number: telegramAccount.telegram_user_account?.followers_count ?? "-",
      },
      {
        name: "totalPosts",
        number: telegramAccount.telegram_user_account?.total_posts ?? "-",
      },
      {
        name: "averageReach",
        number: telegramAccount.telegram_user_account?.average_reach ?? "-",
      },
      {
        name: "engagementRate",
        number:
          `${telegramAccount.telegram_user_account?.engagement_rate}%` ?? "-",
      },
      {
        name: "readPercentage",
        number:
          `${telegramAccount.telegram_user_account?.read_percentage}%` ?? "-",
      }
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-3">
        {statsData.map((data, index) => (
          <StatsCard
            key={index}
            statsName={t(data.name)}
            statsAge={null}
            statsCountry={null}
            statsGender={null}
            statsNumber={`${data.number}`}
            statsIcon={null}
            statsType="stats"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-3">
        {youtubeAccount &&
          youtubeAccount.youtube_channel_demographic_gender &&
          youtubeAccount.youtube_channel_demographic_gender.gender_rows !=
            null && (
            <StatsCard
              statsName={t("genderDistribution")}
              statsNumber={""}
              statsGender={
                youtubeAccount.youtube_channel_demographic_gender.gender_rows
              }
              statsCountry={null}
              statsAge={null}
              statsIcon={null}
              statsType="genderDistribution"
            />
          )}
        {youtubeAccount &&
          youtubeAccount.youtube_channel_demographic_age &&
          youtubeAccount.youtube_channel_demographic_age.age_rows != null && (
            <StatsCard
              statsName={t("ageDistribution")}
              statsNumber={""}
              statsGender={null}
              statsAge={youtubeAccount.youtube_channel_demographic_age.age_rows}
              statsCountry={null}
              statsIcon={null}
              statsType="ageDistribution"
            />
          )}
        {youtubeAccount &&
          youtubeAccount.youtube_channel_geography_country &&
          youtubeAccount.youtube_channel_geography_country.country_rows !=
            null && (
            <StatsCard
              statsName={t("countryDistribution")}
              statsNumber={""}
              statsCountry={
                youtubeAccount.youtube_channel_geography_country.country_rows
              }
              statsAge={null}
              statsGender={null}
              statsIcon={null}
              statsType="countryDistribution"
            />
          )}

        {tiktokAccount &&
          tiktokAccount.tiktok_user_demographic_gender &&
          tiktokAccount.tiktok_user_demographic_gender.gender_rows != null && (
            <StatsCard
              statsName={t("genderDistribution")}
              statsNumber={""}
              statsGender={
                tiktokAccount.tiktok_user_demographic_gender.gender_rows
              }
              statsCountry={null}
              statsAge={null}
              statsIcon={null}
              statsType="genderDistribution"
            />
          )}
        {tiktokAccount &&
          tiktokAccount.tiktok_user_geography_country &&
          tiktokAccount.tiktok_user_geography_country.country_rows != null && (
            <StatsCard
              statsName={t("countryDistribution")}
              statsNumber={""}
              statsCountry={
                tiktokAccount.tiktok_user_geography_country.country_rows
              }
              statsAge={null}
              statsGender={null}
              statsIcon={null}
              statsType="countryDistribution"
            />
          )}

        {instagramAccount &&
          instagramAccount.instagram_user_demographic_gender &&
          instagramAccount.instagram_user_demographic_gender.gender_rows !=
            null && (
            <StatsCard
              statsName={t("genderDistribution")}
              statsNumber={""}
              statsGender={
                instagramAccount.instagram_user_demographic_gender.gender_rows
              }
              statsAge={null}
              statsCountry={null}
              statsIcon={null}
              statsType="genderDistribution"
            />
          )}

        {instagramAccount &&
          instagramAccount.instagram_user_demographic_country &&
          instagramAccount.instagram_user_demographic_country.country_rows !=
            null && (
            <StatsCard
              statsName={t("countryDistribution")}
              statsNumber={""}
              statsAge={null}
              statsCountry={
                instagramAccount.instagram_user_demographic_country.country_rows
              }
              statsGender={null}
              statsIcon={null}
              statsType="countryDistribution"
            />
          )}
        {instagramAccount &&
          instagramAccount.instagram_user_demographic_age &&
          instagramAccount.instagram_user_demographic_age.age_rows != null && (
            <StatsCard
              statsName={t("ageDistribution")}
              statsNumber={""}
              statsGender={null}
              statsAge={
                instagramAccount.instagram_user_demographic_age.age_rows
              }
              statsCountry={null}
              statsIcon={null}
              statsType="ageDistribution"
            />
          )}

        {telegramAccount &&
          telegramAccount.telegram_user_account &&
          telegramAccount.telegram_user_account.gender_rows != null && (
            <StatsCard
              statsName={t("genderDistribution")}
              statsNumber={""}
              statsGender={telegramAccount.telegram_user_account.gender_rows}
              statsAge={null}
              statsCountry={null}
              statsIcon={null}
              statsType="genderDistribution"
            />
          )}
      </div>
    </>
  );
};

{
  /* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg> */
}

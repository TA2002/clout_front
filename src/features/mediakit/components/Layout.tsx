import * as React from "react";
import Container from "@/components/ui/container";
import { Mediakit } from "@/features/main/types";
import { Account } from "../types";
import { useTheme } from "@/components/ThemeProvider";

import instagram from "@/assets/platforms/instagram.png";
import tiktok from "@/assets/platforms/tiktok.png";
import youtube from "@/assets/platforms/youtube.png";
import telegram from "@/assets/platforms/telegram.png";
import { ShareButton } from "./share-button";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import { nicheOptions } from "@/utils/constants";
import { StatsCard } from "./StatsCard";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

type LayoutProps = {
  mediakit: Mediakit;
  accounts: Account[];
  children: React.ReactNode;
};

interface PlatformDetails {
  url: string;
  image: string;
}

const getPlatformDetails = (
  platform: string,
  username: string,
  platformId?: string
): PlatformDetails => {
  const details: { [key: string]: PlatformDetails } = {
    tiktok: {
      url: `https://www.tiktok.com/@${username}`,
      image: tiktok,
    },
    instagram: {
      url: `https://www.instagram.com/${username}/`,
      image: instagram,
    },
    youtube: {
      url: `https://www.youtube.com/channel/${platformId}`,
      image: youtube,
    },
    telegram: {
      url: `https://t.me/${username}`,
      image: telegram,
    },
  };

  return details[platform] || { url: "#", image: "" };
};

export const Layout = ({ mediakit, accounts, children }: LayoutProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mediakitInfo } = useContext(AuthContext);
  let accountsOverview = null;
  const { theme } = useTheme();

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  if (accounts.length > 0) {
    accountsOverview = accounts.map((item, index) => {
      const platform = item.mediakit_linked_platform?.platform;
      const username = item.mediakit_linked_platform?.username;
      const platformId = item.mediakit_linked_platform?.platform_id;

      if (!platform || !username) return <></>; // Return an empty fragment if platform or username is undefined

      const { url, image } = getPlatformDetails(platform, username, platformId);

      return (
        // <div
        //   className="flex flex-col sm:flex-row items-center justify-center text-center mt-3 md:mt-0 gap-2"
        //   key={index}
        // >
        //   <a
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     href={url}
        //     className="cursor-pointer"
        //   >
        //     <img
        //       src={image}
        //       alt={platform}
        //       className="w-8 h-8 sm:w-6 sm:h-6"
        //       style={theme === "dark" ? { filter: "invert(100%)" } : undefined}
        //     />
        //   </a>
        //   <p className="font-semibold text-base">
        //     {item.mediakit_linked_platform?.subscriber_count}
        //   </p>
        // </div>
        <div
          className="flex flex-row items-center justify-center text-center mt-3 md:mt-0 gap-1 border border-primary p-1 px-2 rounded-md shadow-md shadow-red-300"
          key={index}
        >
          {item.mediakit_linked_platform.platform == "youtube" ? (
            <FaYoutube />
          ) : item.mediakit_linked_platform.platform == "tiktok" ? (
            <FaTiktok />
          ) : (
            <FaInstagram />
          )}
          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href={url}
            className="cursor-pointer"
          >
            <img
              src={image}
              alt={platform}
              // w-8 h-8
              className="sm:w-5 sm:h-5"
              style={theme === "dark" ? { filter: "invert(100%)" } : undefined}
            />
          </a> */}
          <p className="font-bold text-xs text-primary">
            {`${item.mediakit_linked_platform?.subscriber_count} Подписчиков`}
          </p>
        </div>
      );
    });
  }

  return (
    <Container>
      <div className="sm:w-[90%] mx-auto sm:my-10 flex flex-col">
        <div className="ml-auto mb-2 px-4 sm:px-6 lg:px-8 hidden sm:block">
          {mediakitInfo?.cloutname == mediakit.cloutname ? (
            <Button
              variant="outline"
              onClick={() => {
                navigate("/settings");
              }}
            >
              <Icons.edit className="mr-2 h-4 w-4" />
              {/* Edit */}
              {t("edit")}
            </Button>
          ) : (
            <ShareButton cloutname={mediakit.cloutname} />
          )}
        </div>
        <div className="sm:px-6 lg:px-8">
          <div
            id="profile_photo_div"
            className="relative mb-[-65px] sm:mb-5 text-center w-full cursor-pointer"
          >
            <div>
              {mediakit.background_image_url && (
                <img
                  src={mediakit.background_image_url}
                  alt="big"
                  className="relative aspect-[6/3] md:aspect-[8/3] sm:rounded-lg object-cover"
                />
              )}
              {/* <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div> */}
            </div>
          </div>
        </div>
        <div className="absolute right-2 mt-2 block sm:hidden">
          {mediakitInfo?.cloutname == mediakit.cloutname ? (
            <Button
              variant="outline"
              onClick={() => {
                navigate("/settings");
              }}
            >
              <Icons.edit className="mr-2 h-4 w-4" />
              {t("edit")}
              {/* Edit */}
            </Button>
          ) : (
            <ShareButton cloutname={mediakit.cloutname} />
          )}
        </div>
        <div className="flex flex-col px-4 sm:px-6 lg:px-8">
          {mediakit.profile_image_url && (
            <img
              src={mediakit.profile_image_url}
              alt="small"
              className="h-32 w-32 sm:h-24 sm:w-24 relative border-2 border-black rounded-full object-cover block sm:hidden mx-auto mb-3 "
            />
          )}
          <div id="col1" className="w-full">
            <div className="text-center sm:text-left w-full mx-0">
              <div className="flex flex-row gap-4 justify-normal">
                {mediakit.profile_image_url && (
                  // <img
                  //   src={mediakit.profile_image_url}
                  //   alt="small"
                  //   className="relative h-24 w-24 rounded-full object-cover hidden sm:block"
                  // />
                  <div>
                    <div className="w-24 h-24 rounded-full aspect-square overflow-hidden bg-red-300 hidden sm:block">
                      <Avatar>
                        <AvatarImage
                          src={mediakit.profile_image_url}
                          // className="object-fill"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center sm:items-baseline mx-auto sm:mx-0">
                  <div className="flex flex-col sm:flex-wrap items-center ">
                    <h1 className="text-2xl font-semibold">
                      {`${mediakit.display_name}`}
                    </h1>
                    {/* <div className="flex flex-wrap gap-2 ml-1 mt-1">
                    {mediakit.tags
                      ?.split(",")
                      .map((item) => <Badge variant="outline"> {item}</Badge>)}
                  </div> */}
                  </div>
                  <p className="text-sm text-blueGray-500">
                    {mediakit.tags && mediakit.tags?.length > 0 && (
                      <p className="font-medium text-gray-500">{`${mediakit.tags
                        ?.split(",")
                        .map((item) =>
                          t(
                            `categories.${
                              nicheOptions.filter((it) => it.value == item)[0]
                                .value
                            }`
                          )
                        )
                        .join(", ")}`}</p>
                    )}
                  </p>
                  <div className="flex flex-wrap justify-start gap-5 md:mt-2">
                    {accountsOverview}
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-row mt-10">
              <p className="font-medium  text-md mb-1">{"Categories"}</p>
              <div className="flex flex-wrap gap-2 ml-2">
                {mediakit.tags
                  ?.split(",")
                  .map((item) => <Badge variant="outline">{item}</Badge>)}
              </div>
            </div> */}

              <div className="mt-5 sm:mt-10 text-left">
                {/* <h3 className="font-semibold text-xl mb-1">{t("bio")}</h3> */}
                <p className="text-base">{mediakit.about}</p>
              </div>

              <div className="mt-5 sm:mt-10 text-left">
                <h3 className="font-semibold text-xl mb-1">{t("packages")}</h3>
                <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 mt-5 gap-3">
                  {accounts.map((item) => {
                    // Check if platform_price_list and price_list exist before mapping
                    return item.platform_price_list?.price_list?.map(
                      (item2, index2) => (
                        // Assuming you want to display something from item2 inside the div
                        <StatsCard
                          key={index2}
                          statsName={`${capitalizeFirstLetter(
                            item.mediakit_linked_platform.platform
                          )} ${capitalizeFirstLetter(item2.name ?? "NA")}`}
                          statsNumber={`${item2.price} ₸`}
                          statsGender={null}
                          statsCountry={null}
                          statsAge={null}
                          statsIcon={null}
                          statsType="stats"
                        />
                      )
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 sm:mt-10 text-left">
                <h3 className="font-semibold text-xl mb-3">
                  {t("statistics")}
                </h3>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

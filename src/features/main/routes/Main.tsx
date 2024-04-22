import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import Loading from "@/loading";
import { useInfluencers } from "../api/getInfluencers";
import landing from "@/assets/influencers/landing.png";
import landingg from "@/assets/influencers/landingg.png";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import InfluencerList from "@/components/ProductList";
import { Label } from "@/components/ui/label";
import transparency from "@/assets/values/transparency.svg";
import quality from "@/assets/values/quality.svg";
import range from "@/assets/values/range.svg";

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const influencers = useInfluencers();
  // const influencerListRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!influencers.isLoading) {
      setIsLoading(false);
    }
  }, [influencers.isLoading]);

  // const scrollToInfluencerList = () => {
  //   // Function to scroll
  //   influencerListRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {}, []);
  return (
    <>
      {isLoading || influencers.data == undefined ? (
        <Loading />
      ) : (
        <div className="">
          <Container>
            <div className="space-y-10 w-full pb-20">
              <div className="flex flex-col  text-left px-4 sm:px-6 lg:px-8  pt-16 animate-fadeIn duration-1000">
                <div className="flex flex-col mr-auto lg:flex-row items-center gap-14  lg:gap-32">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <p className="text-xs sm:text-md font-medium bg-muted p-2 px-4 rounded-full mb-2">
                        {t("platformNumberOne")}
                      </p>
                    </div>
                    <p className="text-5xl xs:text-6xl font-medium leading-tight">
                      <a href="" className="text-primary">
                        {t("influencersForYourBusiness").split(" ")[0]}
                      </a>
                      {" " +
                        t("influencersForYourBusiness")
                          .split(" ")
                          .slice(1)
                          .join(" ")}
                    </p>
                    <p className="text-md mt-2 text-gray-500">
                      {t("accelerateBusinessGrowth")}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-10">
                      {/* <Button
                        size="lg"
                        className="text-sm sm:text-lg bg-gradient-to-r from-violet-600 to-rose-500"
                        onClick={scrollToInfluencerList}
                      >
                        {t("bloggerList")}
                      </Button> */}
                      <Button
                        size="lg"
                        // variant="secondary"
                        className="text-sm sm:text-lg bg-gradient-to-r from-violet-600 to-rose-500"
                        onClick={() => {
                          window.location.href =
                            "https://forms.gle/DDpxamjssDcFEXtM9";
                        }}
                      >
                        {t("forBrand")}
                      </Button>
                      {/* <Button
                        size="lg"
                        variant="secondary"
                        className="text-sm sm:text-lg border"
                        onClick={() => {
                          window.location.href =
                            "https://forms.gle/DZnLdMiE4P2Xp4UFA";
                        }}
                      >
                        {t("forCreators")}
                      </Button> */}
                    </div>
                  </div>
                  <img
                    src={landing}
                    alt="blogger"
                    className="hidden sm:block px-4 sm:px-6 lg:px-8 mt-0 w-full aspect-square lg:h-96 lg:w-4/6 relative  object-scale-down lg:mx-auto"
                  />
                  <img
                    src={landingg}
                    alt="blogger"
                    className="sm:hidden px-4 sm:px-6 lg:px-8 mt-0 w-full aspect-square lg:h-96 lg:w-4/6 relative  object-scale-down block lg:mx-auto"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <div className="mt-24 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-7 bg-secondary p-8 rounded-xl ">
                    {/* <RiInformationFill className="w-12 h-12" /> */}
                    <img src={transparency} alt="" className="w-12 h-12" />
                    <p className="font-semibold text-2xl">
                      {t("maximumTransparency")}
                    </p>
                    <p className="text-gray-500">
                      {t("transparencyDescription")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-7 bg-secondary p-8 rounded-xl ">
                    <img src={range} alt="" className="w-12 h-12" />
                    <p className="font-semibold text-2xl">
                      {t("wideSelection")}
                    </p>
                    <p className="text-gray-500">{t("selectionDescription")}</p>
                  </div>
                  <div className="flex flex-col gap-7 bg-secondary p-8 rounded-xl ">
                    <img src={quality} alt="" className="w-12 h-12" />
                    <p className="font-semibold text-2xl">{t("workSafety")}</p>
                    <p className="text-gray-500">{t("safetyDescription")}</p>
                  </div>
                </div>
                {/* ref={influencerListRef} */}
                {/* <div className="my-10">
                  <div className="flex flex-col gap-2 mb-6">
                    <p className="text-xl font-medium">{t("inTrend")}</p>
                    <div className="flex flex-row w-full justify-between">
                      <Label className="text-gray-600">
                        {t("hotBloggersOnAllPlatforms")}
                      </Label>
                      <Label className="cursor-pointer">{t("viewAll")}</Label>
                    </div>
                  </div>
                  <InfluencerList items={influencers.data} />
                </div> */}
                {/* <TableDemo residents={influencers.data} /> */}
              </div>
              <div className="px-4 sm:px-6 lg:px-8 text-center">
                <div className="w-full bg-primary p-14 rounded-xl flex flex-col items-center gap-10">
                  <p className="text-4xl text-white font-bold">
                    ГОТОВЫ НАВЕСТИ ШУМ?
                  </p>
                  <Button
                    variant={"outline"}
                    className="font-bold"
                    onClick={() => {
                      window.location.href =
                        "https://forms.gle/DDpxamjssDcFEXtM9";
                    }}
                  >
                    ОСТАВИТЬ ЗАЯВКУ
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

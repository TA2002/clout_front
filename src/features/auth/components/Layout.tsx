import * as React from "react";
import Container from "@/components/ui/container";
// import { buttonVariants } from "@/registry/new-york/ui/button";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
// import i18n from "@/i18n";

type LayoutProps = {
  children: React.ReactNode;
  type: string;
};

export const Layout = ({ children, type }: LayoutProps) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Container>
      <div className="container relative h-full bg-red">
        <div className="lg:p-8">
          <div className="m-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center mt-16">
              <h1 className="text-2xl font-semibold tracking-tight">
                {type == "login" && t("welcomeBack")}
                {type == "register" && t("joinForFree")}
                {type == "cloutname_check" && t("makeMoneyAsACreator")}
                {type == "email_otp" && t("verifyEmail")}
              </h1>
              {type == "cloutname_check" && (
                <Label className="text-md text-muted-foreground font-normal">
                  {t("creatorDescription")}
                </Label>
              )}
              {type == "email_otp" && (
                <Label className="text-md text-muted-foreground font-normal">
                  {t("enterCode")}
                </Label>
              )}
            </div>
            {children}
            <div
              className={`${
                type == "login" ? "flex flex-col gap-2" : "hidden"
              }`}
            >
              <p className="px-8 text-center text-sm text-muted-foreground">
                {t("forgotPassword")}{" "}
                <Link to="/auth/reset" className="text-primary font-bold">
                  {t("resetPassword")}
                </Link>{" "}
              </p>
            </div>
            {type == "register" && (
              <div className={`${"flex flex-col gap-2"}`}>
                <p className="px-8 text-center text-sm text-muted-foreground">
                  {currentLanguage == "en"
                    ? "By clicking continue, you agree to our"
                    : "Нажимая продолжить, вы соглашаетесь с нашими"}
                  <Link
                    to="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {currentLanguage == "en"
                      ? " Terms of Service "
                      : " Условиями обслуживания "}
                  </Link>{" "}
                  {currentLanguage == "en" ? " and " : " и "}
                  <Link
                    to="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {currentLanguage == "en"
                      ? " Privacy Policy"
                      : " Политикой конфиденциальности"}
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

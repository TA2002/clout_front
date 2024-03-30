import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { Icons } from "@/components/icons/icons";
import { LayoutProps } from "@/types";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  instagramOauth,
  tiktokOauth,
  youtubeOauth,
} from "../api/connectAccount";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/errorMessage";

interface SocialDialogProps extends LayoutProps {
  onSuccess: () => void; // Adding the onSuccess prop
}

export function SocialDialog({ children, text, onSuccess }: SocialDialogProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const onSocialClick = async (platform: string) => {
    setIsLoading(true); // Set loading state to true

    // Open a blank popup immediately on user click
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const popup = window.open(
      "",
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    try {
      let response;
      if (platform === "TikTok") response = await tiktokOauth();
      else if (platform === "Instagram") response = await instagramOauth();
      else response = await youtubeOauth();

      // Now navigate the popup to the URL from the async operation
      if (popup) popup.location.href = response.url;

      const checkPopupClosed = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopupClosed);
          onSuccess(); // Callback when popup is closed
        }
      }, 1000);
    } catch (error) {
      // Close the popup and show error if the async operation fails
      if (popup) popup.close();

      toast({
        title: t("connectionFailed"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const icon =
    text == "Instagram" ? (
      <FaInstagram className="mr-2" />
    ) : text == "TikTok" ? (
      <FaTiktok className="mr-2" />
    ) : (
      <FaYoutube className="mr-2" />
    );
  // "agreePolicy": "Нажимая на \"Подключить {{platform}}\", вы соглашаетесь с Политикой конфиденциальности Clout",
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("connectAccount", { platform: text })}</DialogTitle>
          <DialogDescription>
            <p className="mt-2">{t("popupWarning", { platform: text })}</p>
            {text === "Instagram" && (
              <p className="mt-2">{t("instagramPermission")}</p>
            )}
            <div className="flex flex-row justify-end">
              <p className="text-right text-xs mt-14 w-60">
                {currentLanguage == "en"
                  ? "By clicking continue, you agree to our"
                  : "Нажимая продолжить, вы соглашаетесь с"}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700 cursor-pointer"
                >
                  {currentLanguage == "en"
                    ? " End User Privacy Policy "
                    : " Политикой конфиденциальности Clout"}
                </a>{" "}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="secondary"
            onClick={() => {
              if (text) onSocialClick(text);
            }}
          >
            {icon}
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t(`connectPlatform`, { platform: text })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

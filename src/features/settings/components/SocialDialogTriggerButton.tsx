import { SocialDialog } from "./SocialDialog";
import { Button } from "@/components/ui/button";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import { Icons } from "@/components/icons/icons";
import { useTranslation } from "react-i18next";

interface SocialDialogTriggerButtonProps {
  platform: string;
  isLoading: boolean;
  onSuccess: () => void;
}

export function SocialDialogTriggerButton({
  platform,
  isLoading,
  onSuccess,
}: SocialDialogTriggerButtonProps) {
  const { t } = useTranslation();
  return (
    <SocialDialog text={platform} onSuccess={onSuccess}>
      <Button disabled={isLoading} variant="secondary">
        {platform == "TikTok" ? (
          <FaTiktok className="mr-2" />
        ) : platform == "Instagram" ? (
          <FaInstagram className="mr-2" />
        ) : (
          <FaYoutube className="mr-2" />
        )}
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {t(`connectPlatform`, { platform: platform })}
      </Button>
    </SocialDialog>
  );
}

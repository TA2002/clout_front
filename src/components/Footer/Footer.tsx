import { useTranslation } from "react-i18next";
import Container from "../ui/container";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-10">
      <Separator />
      <Container>
        <div className="px-6 lg:px-8 flex h-16 items-center w-full gap-6">
          <Label className="font-normal">{t("copyright")}</Label>

          <a href="/privacy">
            <Label className="font-light cursor-pointer">{t("privacy")}</Label>
          </a>
          <a href="/terms">
            <Label className="font-light cursor-pointer">{t("terms")}</Label>
          </a>
          {/* Additional links or icons can be localized similarly */}
        </div>
      </Container>
    </footer>
  );
};

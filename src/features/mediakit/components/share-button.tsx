import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CopyIcon } from "@radix-ui/react-icons";

export function ShareButton(props: any) {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CopyIcon className="mr-2" /> {t("share")}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[250px] xs:w-[350px] md:w-[520px]"
      >
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">{t("shareProfile")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("shareProfileDescription")}
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              {t("link")}
            </Label>
            <Input
              id="link"
              defaultValue={`https://clout.kz/${props.cloutname}`}
              readOnly
              className="h-9"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://clout.kz/${props.cloutname}`
              );
            }}
          >
            <span className="sr-only">{t("copy")}</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

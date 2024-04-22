import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect, useContext } from "react";
import { updateProfileDetails } from "../../api/updateDetails";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Import TextArea
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons/icons";
import { AuthContext } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/errorMessage";
import { nicheOptions } from "@/utils/constants";
import Select from "react-select";
import { PriceDialogDemo } from "../PricesDialog";

type PricesTabProps = {
  onSuccess: () => void;
};

const schema = z.object({
  cloutname: z.string().min(2).max(30),
  display_name: z.string().min(2).max(60),
  about: z.string().min(30).max(1000),
  tags: z.string().optional(),
});

export const PricesTab = ({ onSuccess }: PricesTabProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mediakitInfo, getMediakitInfo } = useContext(AuthContext);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Define your form with useForm
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      cloutname: "",
      display_name: "",
      about: "",
      tags: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      if (mediakitInfo?.unique_id) {
        setIsLoading(true); // Set loading state to true
        // const tagsString = selectedNicheValues.join(",");
        await updateProfileDetails(
          {
            cloutname: values.cloutname,
            display_name: values.display_name,
            about: values.about,
            tags: selectedOption.map((item) => item.value).join(","),
          },
          mediakitInfo.unique_id
        ); // Call the login function with form values
        setIsLoading(false); // Set loading state to false
        getMediakitInfo();

        toast({
          title: t("detailsTab.successfulUpdate"),
          description: t("detailsTab.profileUpdated"),
          variant: "success",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: t("detailsTab.updateFailed"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Assuming single selection for simplicity
  const [selectedOption, setSelectedOption] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    if (mediakitInfo) {
      form.reset({
        cloutname: mediakitInfo.cloutname,
        display_name: mediakitInfo.display_name,
        about: mediakitInfo.about ?? "",
        tags: mediakitInfo.tags ?? "",
      });

      if (mediakitInfo?.tags && mediakitInfo?.tags?.length > 0) {
        setSelectedOption(
          nicheOptions
            .filter(
              (item) => mediakitInfo.tags?.split(",").includes(item.value)
            )
            .map((option) => {
              return {
                label: t(`categories.${option.value}`),
                value: option.value,
              };
            })
        );
      } else {
        setSelectedOption([]);
      }
    }
  }, [mediakitInfo, form, t]);

  return (
    <div>
      <div className="flex flex-col gap-5"></div>
      <PriceDialogDemo />
    </div>
  );
};

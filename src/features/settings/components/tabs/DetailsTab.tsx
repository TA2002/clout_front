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

type DetailsTabProps = {
  onSuccess: () => void;
};

const schema = z.object({
  cloutname: z.string().min(2).max(30),
  display_name: z.string().min(2).max(60),
  about: z.string().min(30).max(1000),
  tags: z.string().optional(),
});

export const DetailsTab = ({ onSuccess }: DetailsTabProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mediakitInfo, getMediakitInfo } = useContext(AuthContext);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8">
          {/* Username field */}
          <FormField
            control={form.control}
            name="cloutname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("detailsTab.username")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("detailsTab.usernamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display Name field */}
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("detailsTab.displayName")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("detailsTab.displayNamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("detailsTab.displayNameDescription")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio field */}
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("detailsTab.bio")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("detailsTab.bioPlaceholder")}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("detailsTab.bioDescription")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="w-full flex flex-col">
                    <Select
                      className="text-sm rounded-md"
                      options={nicheOptions}
                      defaultValue={selectedTags}
                      isMulti
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  These are the tags that are related to your niche
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="tags"
            render={({}) => (
              <FormItem>
                <FormLabel>{t("detailsTab.tags")}</FormLabel>
                <FormControl>
                  <div className="w-full flex flex-col">
                    <Select
                      className="text-sm rounded-md"
                      options={nicheOptions.map((option) => {
                        return {
                          label: t(`categories.${option.value}`),
                          value: option.value,
                        };
                      })}
                      value={selectedOption}
                      onChange={(selectedOptions) => {
                        const values = selectedOptions.map((option) => {
                          return {
                            label: t(`categories.${option.value}`),
                            value: option.value,
                          };
                        });
                        setSelectedOption(values);
                      }}
                      isMulti
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  {t("detailsTab.tagsDescription")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className="flex flex-col gap-3">
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <div className="w-full flex flex-col">
                <NichePicker
                  title="Tags"
                  options={nicheOptions}
                  initialSelectedValues={form.getValues}
                  onChange={handleSelectedNicheChange}
                />
              </div>
            </FormControl>
            <FormDescription>
              These are the tags that are related to your niche
            </FormDescription>
          </div> */}
          <div>
            {/* <Button type="submit">Submit</Button> */}
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Profile
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

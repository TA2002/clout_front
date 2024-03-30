import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons/icons";
import { Label } from "@/components/ui/label";
import { checkCloutname } from "../api/checkCloutname";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

type CloutnameCheckFormProps = {
  onSuccess: () => void;
};

export const CloutnameCheckForm = ({ onSuccess }: CloutnameCheckFormProps) => {
  const { t } = useTranslation();

  const schema = z.object({
    cloutname: z
      .string()
      .min(2, { message: t("usernameConstraints") }) // Use a key for translation
      .max(30, { message: t("usernameConstraints") }), // Use a key for translation
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      cloutname: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      let response = await checkCloutname(values.cloutname);
      if (response.cloutname_available) {
        navigate(`/auth/register?username=${values.cloutname}`);
        onSuccess();
      } else {
        toast({
          title: t("cloutnameNotAvailable"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("unknownError"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <div className="grid gap-2">
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="cloutname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        // id="cloutname"
                        // name="cloutname"
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background pl-20 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        // className="py-2 pr-4 pl-20 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary focus:ring-primary dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder={t("yourHandle")}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-5">
                        <Label>clout.kz/</Label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("claim")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

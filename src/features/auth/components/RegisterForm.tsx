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
import { registerCreator } from "../api/register";
import { RegisterCredentials } from "../api/register";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/errorMessage";

type RegisterFormProps = {
  onSuccess: (email: string) => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { t } = useTranslation();

  const schema = z
    .object({
      full_name: z
        .string()
        .min(2, { message: t("fullNameMin") })
        .max(60, { message: t("fullNameMax") }),
      email: z
        .string()
        .min(1, { message: t("fieldRequired") })
        .email(t("invalidEmail")),
      password: z.string().min(8, { message: t("passwordMin") }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsMustMatch"),
      path: ["confirmPassword"],
    });

  const params = new URLSearchParams(location.search);
  const usernameParam = params.get("username");
  //   console.log("usernameParam", usernameParam);
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (
      usernameParam == undefined ||
      usernameParam == "" ||
      usernameParam == null
    )
      return;
    console.log(values);
    try {
      setIsLoading(true);
      const credentials: RegisterCredentials = {
        user_type: "creator",
        cloutname: usernameParam,
        full_name: values.full_name,
        email: values.email,
        password: values.password,
      };
      await registerCreator(credentials);
      setIsLoading(false);
      onSuccess(values.email);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: t("unknownError"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <div className="grid gap-2">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("fullName")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Add a new FormField for password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("confirmPassword")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("register")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

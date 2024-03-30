import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/icons";
import { getErrorMessage } from "@/utils/errorMessage";
import { useToast } from "@/components/ui/use-toast";
import { resendOTP, verifyEmail } from "../api/verityEmail";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

type EmailVerifyOTPProps = {
  email: string | null;
  onSuccess: () => void;
};

export const EmailVerifyOTP = ({ email, onSuccess }: EmailVerifyOTPProps) => {
  const { t } = useTranslation();
  if (email == null) {
    return <p>{t("notFound")}</p>;
  }
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const { toast } = useToast();

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      let response = await verifyEmail({ email: email, otp: otp });
      console.log(response);
      setIsLoading(false);
      toast({
        title: t("emailVerifiedSuccess"),
        description: t("logIntoAccount"),
        variant: "success",
      });
      onSuccess();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: t("verificationFailed"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const handleResendClick = async () => {
    try {
      setIsResendDisabled(true);
      await resendOTP(email);
      toast({
        title: t("codeResentSuccess"),
        description: t("checkEmailForNewCode"),
        variant: "success",
      });
    } catch (error) {
      toast({
        title: t("resendingCodeFailed"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsResendDisabled(false);
      }, 60000);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <OtpInput
        value={otp}
        onChange={handleOtpChange}
        numInputs={6}
        renderSeparator={<div className="w-3"></div>}
        renderInput={(props) => (
          <input
            {...props}
            className="border rounded-md text-2xl focus:ring-offset-primary focus:border-primary"
          />
        )}
      />
      <Button
        disabled={isLoading || otp.length != 6}
        className="mt-8 w-full"
        onClick={onSubmit}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {t("verify")}
      </Button>
      <div className="flex flex-row items-center mt-3">
        <Label>{t("didntReceiveCode")} </Label>
        <Button
          disabled={isResendDisabled}
          className="text-blue-600"
          variant="link"
          onClick={handleResendClick}
        >
          {t("resendCode")}
        </Button>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { LinkedAccount } from "@/features/mediakit/types";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useContext, useState } from "react";
import { AuthContext } from "@/lib/AuthContext";
import { deleteAccount } from "../api/deleteAccount";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/errorMessage";
import { Icons } from "@/components/icons/icons";

interface LinkedAccountCardProps {
  account: LinkedAccount;
  onSuccess: () => void;
  //   isLoading: boolean;
}

export function LinkedAccountCard({
  account,
  onSuccess,
}: LinkedAccountCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mediakitInfo } = useContext(AuthContext);
  const { toast } = useToast();
  const { t } = useTranslation();

  const onDeleteClick = async () => {
    try {
      setIsLoading(true);
      if (mediakitInfo?.cloutname) {
        await deleteAccount(
          mediakitInfo.cloutname,
          account.platform,
          account.platform_id
        );
        toast({
          title: t("successfulDisconnection"),
          description: t("successfullyDisconnectedAccount"),
          variant: "success",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: t("disconnectFailed"),
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle className="text-lg">{account.username}</CardTitle>
        <CardDescription>
          {account.subscriber_count} {t("subscribers")}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>{t("disconnect")}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("actionCannotBeUndone")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteClick}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("continue")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

import { BiLogoTiktok } from "react-icons/bi";
import { AiFillYoutube, AiFillInstagram } from "react-icons/ai";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LayoutProps } from "@/types";

export function SocialAlert({ children, text }: LayoutProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex flex-row items-center"></div>
            {`You are about to connect your ${text} account`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            • Clout needs your permission to subscribe and receive webhooks for
            Instagram stories insights.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <Button></Button> */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          <div className="">
            <Button>
              <div className="mr-2">
                {text == "TikTok" ? (
                  <BiLogoTiktok />
                ) : text == "Instagram" ? (
                  <AiFillInstagram />
                ) : (
                  <AiFillYoutube />
                )}
              </div>
              Authenticate
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./sidebar-nav";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import { useTranslation } from "react-i18next";

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// }
const sidebarNavItems = [
  {
    title: "profile",
    href: "/settings",
  },
  {
    title: "statistics",
    href: "/settings/accounts",
  },
  { title: "images", href: "/settings/images" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mediakitInfo } = useContext(AuthContext);

  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block ">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            {t("editYourPage")}
          </h2>
          <Button
            onClick={() => {
              navigate(`/${mediakitInfo?.cloutname}`);
            }}
          >
            {<Icons.eye className="mr-2 h-4 w-4" />}
            {t("viewProfile")}
          </Button>
          {/* <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p> */}
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8">
          {/* lg:flex-row lg:space-x-12 lg:space-y-0  */}
          <aside>
            <SidebarNav
              items={sidebarNavItems.map((item) => ({
                ...item,
                title: t(item.title),
              }))}
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}

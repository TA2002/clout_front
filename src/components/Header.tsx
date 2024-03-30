import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Container from "./ui/container";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useNavigate } from "react-router-dom";
import { UserNav } from "./UserNav/UserNav";
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
// import { ModeToggle } from "./ModeToggle";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./LanguageToggle";

const Header = () => {
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const { t } = useTranslation();

  const routes = [
    {
      href: "/",
      label: t("explore"),
    },
    // {
    //   href: "/",
    //   label: "How it works",
    // },
    // {
    //   href: "/",
    //   label: "On Sale",
    // },
  ];
  return (
    <header className="bg-transparent">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6 mr-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <a key={i} href={route.href} className="">
                      {route.label}
                    </a>
                  ))}
                  {!authenticated && (
                    <a href="/auth/login" className="mt-5 ">
                      <Button variant={"outline"} className="w-full">
                        {t("login")} {/* Translate the button text */}
                      </Button>
                    </a>
                  )}
                  {!authenticated &&
                    null
                    // <a href="/auth/creator">
                    //   <Button className="w-full">
                    //     {t("registerAsCreator")}{" "}
                    //   </Button>
                    // </a>
                  }
                </nav>
              </SheetContent>
            </Sheet>
            <a href="/" className="lg:ml-0">
              <h1 className="text-2xl font-medium">{t("appName")}</h1>{" "}
              {/* App name translation */}
            </a>
          </div>
          <div className="flex gap-2">
            <div className="hidden md:flex items-center gap-3">
              {routes.map((route, i) => (
                <Button asChild variant="ghost" key={i}>
                  <a
                    href={route.href}
                    className="text-sm font-medium transition-colors"
                  >
                    {route.label}
                  </a>
                </Button>
              ))}
              {/* <LanguageToggle /> */}
              {/* <ModeToggle /> */}
              {authenticated ? (
                <div className="flex flex-row items-center gap-3">
                  {/* <LanguageToggle /> */}
                  <UserNav />
                </div>
              ) : (
                <>
                  <Button
                    variant={"outline"}
                    onClick={() => navigate("/auth/login")}
                  >
                    {t("login")} {/* Translate the button text */}
                  </Button>
                  {/* <Button onClick={() => navigate("/auth/creator")}>
                    {t("registerAsCreator")} 
                  </Button> */}
                </>
              )}
            </div>
            {
              authenticated ? (
                <div className="md:hidden flex flex-row items-center gap-3">
                  {/* <LanguageToggle /> */}
                  <UserNav />
                </div>
              ) : null
              // <LanguageToggle />
            }
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

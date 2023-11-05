import { Menu, ShoppingCart } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import ProfileButton from "./ui/ProfileButton";
import { Button } from "./ui/button";
import Container from "./ui/container";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const routes = [
    {
      href: "/",
      label: "Products",
    },
    {
      href: "/",
      label: "Categories",
    },
    {
      href: "/",
      label: "On Sale",
    },
  ];
  return (
    <header>
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <a key={i} href={route.href} className="">
                      {route.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <a href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">Caleb's Store</h1>
            </a>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
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
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <ModeToggle />
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

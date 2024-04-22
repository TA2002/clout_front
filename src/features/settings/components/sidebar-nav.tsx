"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const path = window.location.pathname;
  return (
    // <div className="w-full flex flex-row overflow-x-scroll snap-x snap-mandatory gap-10 pt-3"></div>
    <nav
      className={cn(
        "flex space-x-2 w-full flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-hide",
        // lg:flex-col lg:space-x-0 lg:space-y-1
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            path === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

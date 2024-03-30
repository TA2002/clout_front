import * as React from "react";
import Container from "@/components/ui/container";
// import { buttonVariants } from "@/registry/new-york/ui/button";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <div className="container relative h-full bg-red">
        <div className="lg:p-8">
          <div className="m-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Are you a creator?
              </h1>
              <p className="text-1xl font-semibold tracking-tight text-gray-500">
                Join waitlist to get early access to the best brand deals!
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Container>
  );
};

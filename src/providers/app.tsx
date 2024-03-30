import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";

import { Spinner } from "@/components/Elements";
// import { AuthProvider } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/AuthContext";
import { userStorage } from "@/utils/userStorage";

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button
        className="mt-4"
        onClick={() => {
          userStorage.clearMediakitInfo();
          userStorage.clearTokens();
          userStorage.clearUserInfo();
          window.location.assign(window.location.origin);
        }}
      >
        Refresh
      </button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {/* {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />} */}
            {/* <Notifications /> */}
            <Toaster />
            <I18nextProvider i18n={i18n}>
              <AuthProvider>
                <Router>{children}</Router>
              </AuthProvider>
            </I18nextProvider>
            {/* </QueryClientProvider> */}
            {/* <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />} */}
            {/* <Notifications />
            <AuthProvider>
              
            </AuthProvider> */}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

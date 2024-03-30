import { lazyImport } from "@/utils/lazyImport";

const { AuthRoutes } = lazyImport(
  () => import("@/features/auth"),
  "AuthRoutes"
);

const { MainRoutes } = lazyImport(
  () => import("@/features/main"),
  "MainRoutes"
);

const { SettingsRoutes } = lazyImport(
  () => import("@/features/settings"),
  "SettingsRoutes"
);

const { WaitlistRoutes } = lazyImport(
  () => import("@/features/waitlist"),
  "WaitlistRoutes"
);

// const { MediakitRoutes } = lazyImport(
//   () => import("@/features/mediakit"),
//   "MediakitRoutes"
// );

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "/*",
    element: <MainRoutes />,
  },
  {
    path: "/settings/*",
    element: <SettingsRoutes />,
  },
  {
    path: "/waitlist/*",
    element: <WaitlistRoutes />,
  },
];

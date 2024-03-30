import { useRoutes } from "react-router-dom";
// import { Router } from "react-router-dom";
// import { useAuth } from "@/lib/auth";

// import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  // const auth = useAuth();

  // const commonRoutes = [{ path: "/", element: <Landing /> }];

  const routes = publicRoutes;

  const element = useRoutes([...routes]); //, ...commonRoutes

  return <>{element}</>;
};

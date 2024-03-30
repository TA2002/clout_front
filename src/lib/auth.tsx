// import { configureAuth } from "react-query-auth";

// import { Spinner } from "@/components/Elements";
// import {
//   loginWithEmailAndPassword,
//   getUser,
//   registerWithEmailAndPassword,
//   AuthResponse,
//   LoginCredentials,
//   RegisterCredentials,
//   AuthUser,
// } from "@/features/auth";
// import storage from "@/utils/storage";

// async function handleUserResponse(data: AuthResponse) {
//   const { access, refresh } = data;
//   storage.setToken(access);
//   return { access, refresh };
// }

// async function userFn() {
//   const user = await getUser();
//   return user ?? null;
// }

// async function loginFn(data: LoginCredentials) {
//   const response = await loginWithEmailAndPassword(data);
//   const user = await handleUserResponse(response);
//   return user;
// }

// async function registerFn(data: RegisterCredentials) {
//   const response = await registerWithEmailAndPassword(data);
//   const user = await handleUserResponse(response);
//   return user;
// }

// async function logoutFn() {
//   //   await logout();
// }

// export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
//   configureAuth({
//     userFn,
//     loginFn,
//     registerFn,
//     logoutFn,
//   });

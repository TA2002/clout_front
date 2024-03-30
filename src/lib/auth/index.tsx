// import * as React from "react";
// import {
//   LoginCredentialsDTO,
//   loginWithEmailAndPassword,
//   UserResponse,
// } from "./helpers";
// import storage from "@/utils/storage";
// import { Spinner } from "@/components/Elements";
// import { isTokenExpired } from "./helpers/utils";

// export interface AuthContextProps {
//   user: UserResponse | null;
//   setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
//   login: (data: LoginCredentialsDTO) => Promise<void>;
//   logout: () => void;
//   isLoading: boolean;
//   error: any;
// }

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// const AuthContext = React.createContext<AuthContextProps | undefined>({
//   user: null,
//   setUser: () => {},
//   login: () => Promise.resolve(),
//   logout: () => {},
//   isLoading: false,
//   error: null,
// });

// const handleUserResponse = (response: UserResponse) => {
//   if (response) {
//     storage.setToken(response.token);
//   }
//   return response;
// };

// function AuthProvider(props: AuthProviderProps) {
//   const [user, setUser] = React.useState({});
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [error, setError] = React.useState(null);

//   const loginFn = React.useCallback(
//     (data: LoginCredentialsDTO) => {
//       setIsLoading(true);
//       try {
//         return loginWithEmailAndPassword(data).then((authedUser) => {
//           const userResponse = handleUserResponse(authedUser);
//           setUser(userResponse.token);
//           return userResponse;
//         });
//       } catch (err: Error | any) {
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [setIsLoading, setError, setUser]
//   );

//   const logoutFn = React.useCallback(() => {
//     storage.clearToken();
//     window.location.assign(window.location.origin as unknown as string);
//   }, []);

//   React.useEffect(() => {
//     const loggedInUser = storage.getToken();
//     if (loggedInUser) {
//       const { token } = loggedInUser;
//       const isExpired = isTokenExpired(token);
//       if (isExpired) {
//         logoutFn();
//       }
//     }
//   }, [logoutFn]);

//   const value: any = React.useMemo(() => {
//     return {
//       user,
//       setUser,
//       login: loginFn,
//       logout: logoutFn,
//       isLoading,
//       error,
//     };
//   }, [user, setUser, loginFn, logoutFn, isLoading, error]);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return <AuthContext.Provider value={value} {...props} />;
// }

// const useAuth = () => {
//   const context = React.useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error(`useAuth must be used within a AuthProvider`);
//   }
//   return context;
// };

// export { AuthProvider, useAuth };

import { loginWithEmailAndPassword, LoginCredentials } from "@/features/auth";
import { createContext, ReactNode, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/errorMessage";
import { userStorage } from "@/utils/userStorage";
import { getUser, UserInfo } from "@/features/auth";
import { Mediakit } from "@/features/main/types";
import { getMyMediakit } from "@/features/mediakit/api/getMyMediakit";

type Props = {
  children?: ReactNode;
};

type IToken = {
  access: string;
  refresh: string;
};

type IAuthContext = {
  authenticated: boolean;
  user: UserInfo | null;
  mediakitInfo: Mediakit | null;
  setAuthenticated: (newState: boolean) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  getMediakitInfo: () => Promise<void>;
};

const initialValue = {
  authenticated: false,
  user: null,
  mediakitInfo: null,
  setAuthenticated: () => {},
  login: async () => {},
  logout: () => {},
  getMediakitInfo: async () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );
  const [user, setUser] = useState<UserInfo | null>(null);
  const [mediakitInfo, setMediakit] = useState<Mediakit | null>(null);
  const [token, setToken] = useState<IToken | null>(null);

  const { toast } = useToast();

  // Example login function
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await loginWithEmailAndPassword(credentials);
      console.log(response);
      setAuthenticated(true);
      setToken(token);
      userStorage.setAccessToken(response.access);
      userStorage.setRefreshToken(response.refresh);
      await getUserInfo();
      await getMediakitInfo();
      //   setUser({ username: "as.tarlan02", email: "as.tarlan02@gmail.com" });
      //   setUser(token); // Update with actual user data from response
      //   storage.setToken("access_token", token.access); // Store the token
    } catch (error: any) {
      // Handle authentication errors
      toast({
        title: "Login failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
      // Optionally set an error state and show error messages in your UI
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await getUser();
      userStorage.setUserInfo(response);
      setUser(response);
      //   setUser({ username: "as.tarlan02", email: "as.tarlan02@gmail.com" });
      //   setUser(token); // Update with actual user data from response
      //   storage.setToken("access_token", token.access); // Store the token
    } catch (error: any) {
      // Handle authentication errors
      toast({
        title: "User information retrieval failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
      // Optionally set an error state and show error messages in your UI
    }
  };

  const getMediakitInfo = async () => {
    try {
      const response = await getMyMediakit();
      //   console.log("response", response);
      userStorage.setMediakitInfo(response);
      //   console.log("mediakitInfo", response);
      setMediakit(response);
      // console.log("first mediakit");
      // console.log("get mediakitInfo", mediakitInfo);
      //   userStorage.setMediakitInfo(response);
    } catch (error: any) {
      // Handle authentication errors
      toast({
        title: "Mediakit information retrieval failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
      // Optionally set an error state and show error messages in your UI
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    setToken(null);
    setMediakit(null);
    userStorage.clearTokens();
    userStorage.clearUserInfo();
    userStorage.clearMediakitInfo();
    console.log(userStorage.getMediakitInfo());
  };

  // Persist auth state
  useEffect(() => {
    // const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    //   setAuthenticated(true);
    // }
    const storedAccessToken = userStorage.getAccessToken();
    const storedRefreshToken = userStorage.getRefreshToken();
    const storedUser = userStorage.getUserInfo();
    const storedMediakit = userStorage.getMediakitInfo();
    // console.log(storedAccessToken, storedRefreshToken);
    if (
      storedAccessToken &&
      storedRefreshToken &&
      storedUser &&
      storedMediakit
    ) {
      setAuthenticated(true);
      setToken({ access: storedAccessToken, refresh: storedRefreshToken });
      setUser(storedUser);
      setMediakit(storedMediakit);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        mediakitInfo,
        setAuthenticated,
        login,
        logout,
        getMediakitInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

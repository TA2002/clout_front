// tokenStorage.ts
import { UserInfo } from "@/features/auth";
import { Mediakit } from "@/features/main/types";

class UserStorage {
  // private accessToken: string | null = null;
  // private refreshToken: string | null = null;
  private static USER_INFO_KEY = "userInfo";
  private static MEDIAKIT_INFO_KEY = "mediakitInfo";

  setAccessToken(token: string) {
    window.localStorage.setItem(`access_token`, JSON.stringify(token));
    // this.accessToken = token;
  }

  getAccessToken(): string | null {
    return JSON.parse(window.localStorage.getItem(`access_token`) as string);
  }

  setRefreshToken(token: string) {
    window.localStorage.setItem(`refresh_token`, JSON.stringify(token));
    // this.refreshToken = token;
  }

  getRefreshToken(): string | null {
    return JSON.parse(window.localStorage.getItem(`refresh_token`) as string);
    // return this.refreshToken;
  }

  clearTokens() {
    window.localStorage.removeItem(`access_token`);
    window.localStorage.removeItem(`refresh_token`);
  }

  setUserInfo(userInfo: UserInfo) {
    const userInfoString = JSON.stringify(userInfo);
    window.localStorage.setItem(UserStorage.USER_INFO_KEY, userInfoString);
  }

  getUserInfo(): UserInfo | null {
    const userInfoString = window.localStorage.getItem(
      UserStorage.USER_INFO_KEY
    );
    if (userInfoString) {
      return JSON.parse(userInfoString) as UserInfo;
    }
    return null;
  }

  setMediakitInfo(mediakitInfo: Mediakit) {
    const mediakitInfoString = JSON.stringify(mediakitInfo);
    window.localStorage.setItem(
      UserStorage.MEDIAKIT_INFO_KEY,
      mediakitInfoString
    );
  }

  getMediakitInfo(): Mediakit | null {
    const mediakitInfoString = window.localStorage.getItem(
      UserStorage.MEDIAKIT_INFO_KEY
    );
    if (mediakitInfoString) {
      return JSON.parse(mediakitInfoString) as Mediakit;
    }
    return null;
  }

  clearUserInfo() {
    localStorage.removeItem(UserStorage.USER_INFO_KEY);
  }

  clearMediakitInfo() {
    localStorage.removeItem(UserStorage.MEDIAKIT_INFO_KEY);
  }
}

export const userStorage = new UserStorage();

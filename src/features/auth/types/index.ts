export type AuthUser = {
  // id: string;
  // email: string;
  // firstName: string;
  // lastName: string;
  // bio: string;
  // role: "ADMIN" | "USER";
  access: string;
  refresh: string;
};

export type AuthResponse = {
  // jwt: string;
  // user: AuthUser;
  access: string;
  refresh: string;
};

export type UserInfo = {
  email: string;
  full_name: string;
  unique_id: string;
};

export type Availability = {
  cloutname_available: string;
};

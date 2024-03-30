import { ReactElement } from "react";

export interface VideoInfoStats {
  video_id: string | null;
  title: string | null;
  description: string | null;
  view_count: number | null;
  like_count: number | null;
  dislike_count: number | null;
  favorite_count: number | null;
  comment_count: number | null;
  comments_count: number | null;
  thumbnails_url: string | null;
  thumbnail_url: string | null;
  share_url: string | null;
  embed_url: string | null;
  video_views: number | null;
  plays: number | null;
  likes: number | null;
  reach: number | null;
  comments: number | null;
  permalink: string | null;
  media_url: string | null;
}

export type GenderRow = {
  percentage: number;
  gender: string;
};

export type CountryRow = {
  percentage: number;
  country: string;
};

export type AgeRow = {
  age: string;
  percentage: number;
};

export type CityRow = {
  city: string;
  value: number;
};

export interface LayoutProps {
  children?: React.ReactNode;
  element?: ReactElement;
  isSignInCover?: boolean;
  className?: string;
  href?: string;
  text?: string;
}

export type UserProps = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  retypedPassword?: string;
};
export interface AuthContextProps {
  signOut: () => void;
  signIn: ({ email, password }: UserProps) => any;
  register: ({ first_name, last_name, email, password }: UserProps) => any;
  // currentUser: User | null;
}

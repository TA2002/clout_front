import {
  VideoInfoStats,
  AgeRow,
  GenderRow,
  CityRow,
  CountryRow,
} from "@/types";

export type LinkedAccount = {
  mediakit: number;
  platform: string;
  username: string;
  platform_id: string;
  subscriber_count: number | null;
  update_date: string;
};

export interface PricingModel {
  price_max: number | null;
  price_min: number | null;
  price_list: PricingRow[] | null;
}

export interface PricingRow {
  type: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
}

export type Account = {
  mediakit_linked_platform: LinkedAccount;
  platform_price_list: PricingModel | null;
};

export type YoutubeData = {
  youtube_channel_insights_last_month: any | null;
  youtube_channel_insights_overall: any | null;
  youtube_channel_demographic_gender: any | null;
  youtube_channel_demographic_age: any | null;
  youtube_channel_demographic_age_gender: any | null;
  youtube_channel_geography_country: any | null;
  youtube_channel_last_videos: VideoInfoStats[] | null;
  youtube_channel_popular_videos: VideoInfoStats[] | null;
};

export type TiktokUserProfile = {
  is_business_account: boolean | null;
  username: string | null;
  display_name: string | null;
  profile_image: string | null;
  followers_count: number | null;
  update_date: string | null;
};

export type TiktokData = {
  tiktok_user_profile: TiktokUserProfile | null;
  tiktok_user_video_list: any[] | null;
  tiktok_user_geography_country: any | null;
  tiktok_user_demographic_gender: any | null;
  tiktok_user_insights_last_month: any | null;
};

export type InstagramUserAccount = {
  instagram: number | null;
  biography: string | null;
  followers_count: number | null;
  follows_count: number | null;
  media_count: number | null;
  name: string | null;
  profile_picture_url: string | null;
  username: string | null;
  update_date: string | null;
};

export type InstagramUserDemographicAge = {
  instagram: number | null;
  age_rows: AgeRow[] | null;
  update_date: string | null;
};

export type InstagramUserDemographicCountry = {
  instagram: number | null;
  country_rows: CountryRow[] | null;
  update_date: string | null;
};

export type InstagramUserDemographicGender = {
  instagram: number | null;
  gender_rows: GenderRow[] | null;
  update_date: string | null;
};

export type InstagramUserDemographicCity = {
  instagram: number | null;
  city_rows: CityRow[] | null;
  update_date: string | null;
};

export type InstagramUserInsights = {
  instagram: number | null;
  from_date: string | null;
  to_date: string | null;
  impressions: number | null;
  reach: number | null;
  total_interactions: number | null;
  accounts_engaged: number | null;
  likes: number | null;
  comments: number | null;
  saves: number | null;
  shares: number | null;
  replies: number | null;
  profile_links_taps: number | null;
  website_clicks: number | null;
  profile_views: number | null;
  update_date: string | null;
};

export type InstagramUserLastReel = {
  instagram: number | null;
  media_id: string | null;
  media_product_type: string | null;
  media_type: string | null;
  caption: string | null;
  comments_count: number | null;
  is_comment_enabled: boolean | null;
  like_count: number | null;
  ig_reels_avg_watch_time: number | null;
  ig_reels_video_view_total_time: number | null;
  plays: number | null;
  reach: number | null;
  saved: number | null;
  shares: number | null;
  total_interactions: number | null;
  media_url: string | null;
  permalink: string | null;
  thumbnail_url: string | null;
  timestamp: string | null;
  username: string | null;
  update_date: string | null;
};

export type InstagramUserLastFeed = {
  instagram: number | null;
  media_id: string | null;
  media_product_type: string | null;
  media_type: string | null;
  caption: string | null;
  comments_count: number | null;
  is_comment_enabled: boolean | null;
  like_count: number | null;
  impressions: number | null;
  reach: number | null;
  saved: number | null;
  video_views: number | null;
  total_interactions: number | null;
  media_url: string | null;
  permalink: string | null;
  timestamp: string | null;
  username: string | null;
  update_date: string | null;
};

export type InstagramData = {
  instagram_user_account: InstagramUserAccount | null;
  instagram_user_demographic_age: InstagramUserDemographicAge | null;
  instagram_user_demographic_country: InstagramUserDemographicCountry | null;
  instagram_user_demographic_gender: InstagramUserDemographicGender | null;
  instagram_user_demographic_city: InstagramUserDemographicCity | null;
  instagram_user_insights_last_month: InstagramUserInsights | null;
  instagram_user_insights_last_week: InstagramUserInsights | null;
  instagram_user_last_reels: VideoInfoStats[] | null;
  instagram_user_last_feeds: VideoInfoStats[] | null;
  instagram_user_insights_stories: VideoInfoStats[] | null;
};

export type TelegramUserAccount = {
  user: number;
  mediakit: number;

  total_posts: number | null;
  read_percentage: number | null;
  read_percentage_24_hours: number | null;
  gender_rows: GenderRow[] | null;
  age: string | null;
  average_reach: number | null;
  engagement_rate: number | null;
  biography: string | null;
  followers_count: number | null;
  name: string | null;
  profile_picture_url: string | null;
  username: string | null;
  update_date: Date | string | null; // TypeScript Date or ISO string format
  is_active: boolean;

  // Additional fields from your initial TypeScript object (if needed)
  follows_count?: number | null; // Optional as it's not in the Django model
  media_count?: number | null; // Optional as it's not in the Django model
};

export type TelegramData = {
  telegram_user_account: TelegramUserAccount | null;
};

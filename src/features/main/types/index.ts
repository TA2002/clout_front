export type Mediakit = {
  unique_id: string;
  display_name: string;
  cloutname: string;
  profile_image_url: string | null;
  background_image_url: string | null;
  tags: string | null;
  location: string | null;
  about: string | null;
};

export type Influencer = {
  mediakit_data: Mediakit;
  //   mediakit_linked_accounts: LinkedAccount[] | null;
};

// export interface LinkedAccount {
//   mediakit: number | null;
//   platform: string | null;
//   username: string | null;
//   platform_id: string | null;
//   subscriber_count: number | null;
//   update_date: string | null;
// }

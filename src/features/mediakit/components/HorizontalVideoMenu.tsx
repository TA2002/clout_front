import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { VideoInfoStats } from "@/types";

export default function HorizontalVideoMenu({
  videos,
  platform_name,
}: {
  videos: VideoInfoStats[] | null;
  platform_name: string;
}) {
  return (
    <div className="w-full flex flex-row overflow-x-scroll snap-x snap-mandatory gap-10 pt-3">
      {videos!.map((video, index) => {
        let thumnailURL =
          platform_name == "tiktok" || platform_name == "instagram"
            ? video.thumbnail_url
              ? video.thumbnail_url
              : video.media_url
            : video.thumbnails_url;
        let views =
          platform_name == "tiktok"
            ? video.video_views
            : platform_name == "youtube"
            ? video.view_count
            : video.reach;
        let likes = platform_name == "tiktok" ? video.likes : video.like_count;
        let comments =
          platform_name == "tiktok"
            ? video.comments
            : platform_name == "youtube"
            ? video.comment_count
            : video.comments_count;
        let videoURL =
          platform_name == "tiktok"
            ? video.share_url
            : platform_name == "youtube"
            ? `https://www.youtube.com/watch?v=${video.video_id}`
            : video.permalink;
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={videoURL ?? ""}
            key={index}
          >
            <div className="mb-3 cursor-pointer relative isolate  flex-shrink-0 snap-start h-[300px] w-[200px] flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 shadow-sm">
              <img
                src={
                  thumnailURL ??
                  "https://d36b0zw3cawrft.cloudfront.net/hs76zbx53max42kd94joj4stunmv"
                }
                alt="video thumbnail"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <div className="z-10 flex flex-row overflow-hidden text-sm text-primary-foreground justify-around">
                <div className="flex flex-col items-center gap-2">
                  <AiFillEye />
                  <p>{views ?? "NA"}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AiFillHeart />
                  <p>{likes ?? "NA"}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <FaComment />
                  <p>{comments ?? "NA"}</p>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

// return (
//     <div
//       key={url}
//       className="h-[300px] w-[200px] flex-shrink-0 snap-start bg-gray-800 rounded-xl"
//       style={{ backgroundImage: `url(${url})` }}
//     >
//       <div></div>
//       <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
//         <h2 className="text-2xl font-bold">Your Title</h2>
//       </div>
//     </div>
//   );

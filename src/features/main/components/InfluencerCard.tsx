// import { Card, CardContent2, CardFooter } from "./card";
import { Influencer } from "@/features/main/types";

interface InfluencerCard {
  data: Influencer;
}

const InfluencerCard = ({ data }: InfluencerCard) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`/${data.mediakit_data.cloutname}`}
      //   className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg "
    >
      <div className="flex flex-col gap-2">
        <div className="overflow-hidden rounded-lg">
          {data.mediakit_data.profile_image_url && (
            <img
              src={data.mediakit_data.profile_image_url}
              alt=""
              className="w-full aspect-[7/10] object-cover rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl"
            />
          )}
        </div>
        <div>
          <p className="font-medium text-md">
            {data.mediakit_data.display_name}
          </p>
          <p className="font-medium text-gray-500 text-sm">
            Образ жизни - Путешествия
          </p>
          {/* <p className="font-medium text-gray-500 text-sm">От 2000тг</p> */}
        </div>
      </div>
    </a>
  );
};

export default InfluencerCard;

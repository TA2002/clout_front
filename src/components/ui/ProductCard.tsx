import { Card, CardContent2, CardFooter } from "./card";
import { Influencer } from "@/features/main/types";

interface ProductCard {
  data: Influencer;
}

const ProductCard = ({ data }: ProductCard) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`/${data.mediakit_data.cloutname}`}
      className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg "
    >
      <Card className="rounded-lg">
        <CardContent2 className="">
          <div className="aspect-square relative bg-foreground/5 dark:bg-background overflow-hidden rounded-t-lg">
            {data.mediakit_data.profile_image_url && (
              <img
                src={data.mediakit_data.profile_image_url}
                alt=""
                className="aspect-square object-cover rounded-t-lg transition-all duration-300 hover:scale-105"
              />
            )}
          </div>
        </CardContent2>
        <CardFooter className="flex-col items-start">
          <div className="w-full flex flex-col gap-1">
            <p className="font-semibold text-sm">
              {data.mediakit_data.display_name}
            </p>

            {/* <div className="flex flex-wrap gap-2 mt-3">
              {data.mediakit_data.tags
                ?.split(",")
                .map((item) => <Badge variant="destructive">{item}</Badge>)}
            </div> */}

            <div className="flex flex-row gap-2 justify-between mt-2">
              {/* <p className="text-sm">Abu Dhabi, UAE</p> */}
              {/* <p className="text-sm font-semibold">
                {Math.floor(Math.random() * 6) + 1}00 AED
              </p> */}
            </div>
            {/* {data.mediakit_data.tags} */}
          </div>
          {/* <div className="flex items-center justify-between">{data?.price}</div> */}
        </CardFooter>
      </Card>
    </a>
  );
};

export default ProductCard;

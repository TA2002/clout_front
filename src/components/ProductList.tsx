import ProductCard from "./ui/ProductCard";
import { Influencer } from "@/features/main/types";

interface InfluencerListProps {
  items: Influencer[];
}
const InfluencerList = ({ items }: InfluencerListProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* toReversed() */}
        {items.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default InfluencerList;

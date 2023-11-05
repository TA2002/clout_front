import { Product } from "@/types";
import ProductCard from "./ui/ProductCard";

interface ProductListProps {
  items: Product[];
}
const ProductList = ({ items }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
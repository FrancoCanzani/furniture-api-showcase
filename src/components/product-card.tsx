import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/api";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.discount_price && ((product.price - product.discount_price) / product.price * 100).toFixed(0);

  return (
    <Link to={`/product/${product.sku}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <img 
              src={product.image_path} 
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {discount && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                -{discount}%
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.wood_type} wood, {product.finish} finish</p>
          <div className="flex gap-2 items-center">
            {product.discount_price ? (
              <>
                <span className="text-lg font-bold">${product.discount_price}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-lg font-bold">${product.price}</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { cartAtom } from "@/lib/store";

export function CartButton() {
  const [cart] = useAtom(cartAtom);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Button variant="outline" size="icon" className="relative">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
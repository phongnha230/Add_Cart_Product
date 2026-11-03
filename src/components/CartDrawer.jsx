import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import Cart from './Cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useShop();

  const itemCount = useMemo(() => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  }, [state.cart]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          data-testid="cart-icon"
          variant="outline" 
          className="relative flex items-center gap-2 px-3.5 py-2 h-10 hover:bg-gray-100 transition-colors shadow-sm"
          aria-label="View shopping cart"
          title="View shopping cart"
        >
          <ShoppingBag className="h-5 w-5 text-gray-700" />
          <span className="font-semibold text-sm text-gray-700">Cart</span>
          {itemCount > 0 && (
            <Badge 
              data-testid="cart-badge"
              variant="destructive" 
              className="cart-badge ml-1 px-1.5 py-0.2 min-w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shadow-sm"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-6">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center justify-between text-xl font-bold">
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Shopping Cart
            </span>
            <Badge variant="secondary" className="px-2.5 py-0.5">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden pt-2">
          <Cart isDrawer={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

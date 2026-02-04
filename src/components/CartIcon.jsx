import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';

const CartIcon = () => {
  const { state } = useShop();

  const itemCount = useMemo(() => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  }, [state.cart]);

  return (
    <Button variant="ghost" className="relative p-2 h-10 w-10">
      <ShoppingBag className="h-6 w-6 text-gray-700" />
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full text-[10px]"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

export default CartIcon;

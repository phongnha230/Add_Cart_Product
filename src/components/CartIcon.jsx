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

  const scrollToCart = () => {
    const cartElement = document.getElementById('cart-section');
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Button 
      variant="ghost" 
      className="relative p-2 h-10 w-10 hover:bg-gray-100 transition-colors"
      onClick={scrollToCart}
      aria-label="View shopping cart"
      title="View shopping cart"
    >
      <ShoppingBag className="h-6 w-6 text-gray-700" />
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full text-[10px] font-bold shadow-sm"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

export default CartIcon;

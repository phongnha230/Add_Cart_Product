import React, { useMemo, useCallback } from 'react';
import { useShop } from '../context/ShopContext';
import CartItem from './CartItem';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { state, dispatch } = useShop();

  // useMemo: Calculate Total Price efficiently
  const total = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [state.cart]);

  // Total quantity of items
  const totalItems = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.cart]);

  // useCallback: Memoize these handlers so they don't change on every render
  const handleRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }, [dispatch]);

  const handleUpdateQty = useCallback((id, qty) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: qty } });
  }, [dispatch]);

  if (state.cart.length === 0) {
    return (
      <Card id="cart-section" className="p-8 text-center shadow-lg border-dashed">
        <div className="text-muted-foreground mb-4">
          <ShoppingCart className="h-16 w-16 mx-auto opacity-40" />
        </div>
        <h3 className="text-lg font-bold">Your cart is empty</h3>
        <p className="text-muted-foreground text-sm mt-1">Add some awesome products to get started!</p>
      </Card>
    );
  }

  return (
    <Card id="cart-section" className="sticky top-20 shadow-xl border-gray-200">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping Cart
          </span>
          <Badge variant="secondary" className="px-2.5 py-0.5 font-semibold">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto p-4">
        {state.cart.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onUpdateQty={handleUpdateQty} 
            onRemove={handleRemove} 
          />
        ))}
      </CardContent>

      <CardFooter className="flex-col gap-4 border-t p-4 bg-muted/20">
        <div className="flex justify-between items-center w-full">
          <div>
            <span className="text-sm text-muted-foreground block">Total Cart Value</span>
            <span className="text-xs text-muted-foreground">Includes all items</span>
          </div>
          <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full shadow-md" size="lg">
          Checkout Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;

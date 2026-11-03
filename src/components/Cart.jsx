import React, { useMemo, useCallback } from 'react';
import { useShop } from '../context/ShopContext';
import CartItem from './CartItem';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

const Cart = ({ isDrawer = false }) => {
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
      <div id="cart-section" className="p-8 text-center border-dashed rounded-lg border border-gray-200">
        <div className="text-muted-foreground mb-4">
          <ShoppingCart className="h-16 w-16 mx-auto opacity-40" />
        </div>
        <h3 className="text-lg font-bold">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground mt-1">Giỏ hàng trống. Add some awesome products to get started!</p>
      </div>
    );
  }

  const containerClasses = isDrawer
    ? "flex flex-col h-full"
    : "sticky top-20 shadow-xl border-gray-200";

  return (
    <div id="cart-section" className={containerClasses}>
      {!isDrawer && (
        <CardHeader className="pb-3 border-b px-0">
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
      )}
      
      <div className={`space-y-3 overflow-y-auto ${isDrawer ? 'flex-1 py-4' : 'max-h-[60vh] py-4'}`}>
        {state.cart.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onUpdateQty={handleUpdateQty} 
            onRemove={handleRemove} 
          />
        ))}
      </div>

      <div className="flex-col gap-4 border-t pt-4 bg-background">
        <div className="flex justify-between items-center w-full mb-4">
          <div>
            <span className="text-sm text-muted-foreground block">Total Cart Value</span>
            <span className="text-xs text-muted-foreground">Includes all items</span>
          </div>
          <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full shadow-md" size="lg">
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default Cart;

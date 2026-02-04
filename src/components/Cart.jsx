import React, { useMemo, useCallback } from 'react';
import { useShop } from '../context/ShopContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';

const Cart = () => {
  const { state, dispatch } = useShop();

  // useMemo: Calculate Total Price efficiently
  const total = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
      <Card className="p-8 text-center">
        <div className="text-muted-foreground mb-4">
          <ShoppingCart className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-lg font-bold">Your cart is empty</h3>
        <p className="text-muted-foreground">Add some awesome products!</p>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Shopping Cart
          <Badge variant="secondary">{state.cart.length}</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {state.cart.map(item => (
          <div key={item.id} className="flex gap-4 items-center group">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold truncate">{item.name}</h4>
              <p className="text-primary font-medium">${item.price}</p>
            </div>
            
            <div className="flex items-center gap-2">
               <Button 
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
               >
                <Minus className="h-3 w-3" />
               </Button>
               <span className="w-6 text-center font-medium">{item.quantity}</span>
               <Button 
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
               >
                <Plus className="h-3 w-3" />
               </Button>
            </div>
            
            <Button 
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => handleRemove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-muted-foreground">Total Amount</span>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full" size="lg">
          Checkout Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;

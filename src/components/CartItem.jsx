import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = memo(({ item, onUpdateQty, onRemove }) => {
  const subtotal = item.price * item.quantity;

  return (
    <div 
      data-testid="cart-item"
      className="cart-item flex flex-col sm:flex-row gap-3 sm:items-center justify-between p-3 rounded-lg border border-gray-100 bg-card hover:bg-muted/40 transition-colors"
    >
      {/* Product Image & Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 bg-muted border">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-sm truncate" title={item.name}>
            {item.name}
          </h4>
          <p className="text-xs text-muted-foreground">
            Đơn giá: <span className="font-medium text-foreground">{item.price.toLocaleString('vi-VN')} ₫</span>
          </p>
          <p className="text-xs font-semibold text-primary mt-0.5">
            Thành tiền: {subtotal.toLocaleString('vi-VN')} ₫
          </p>
        </div>
      </div>

      {/* Quantity Controls & Remove Action */}
      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-dashed border-gray-200">
        <div className="flex items-center border rounded-md bg-background px-1">
          <Button 
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-600 hover:text-black"
            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-7 text-center text-xs font-semibold">{item.quantity}</span>
          <Button 
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-600 hover:text-black"
            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <Button 
          data-testid="remove-cart-item-btn"
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1"
          onClick={() => onRemove(item.id)}
          title="Remove item"
          aria-label="Remove item"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Remove</span>
        </Button>
      </div>
    </div>
  );
});

export default CartItem;

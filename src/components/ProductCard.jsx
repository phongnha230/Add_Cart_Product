import React, { memo, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, ShoppingCart, ImageOff } from 'lucide-react';

// Memoized component to prevent unnecessary re-renders
const ProductCard = memo(({ product, onAdd }) => {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    onAdd(product, quantity);
    setQuantity(1); // Reset back to 1 after adding
  };

  return (
    <Card 
      data-testid="product-card"
      className="product-card overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 overflow-hidden bg-muted flex items-center justify-center">
          {!imageError ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <ImageOff className="h-12 w-12 mb-2 opacity-50" />
              <span className="text-xs">Image unavailable</span>
            </div>
          )}
          <Badge className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-bold mb-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">Sản phẩm chính hãng với chất lượng hoàn thiện cao cấp.</p>
          <span className="text-2xl font-bold text-primary">
            {product.price.toLocaleString('vi-VN')} ₫
          </span>
        </CardContent>
      </div>

      <CardFooter className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-5 pt-0">
        {/* Quantity selector */}
        <div className="flex items-center justify-center border border-gray-200 rounded-md bg-background px-1 py-0.5">
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-600 hover:text-black"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-600 hover:text-black"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Add to Cart button */}
        <Button 
          data-testid="add-to-cart-btn"
          onClick={handleAddToCart}
          className="shadow-md flex-1 sm:flex-initial gap-1.5"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
});

export default ProductCard;

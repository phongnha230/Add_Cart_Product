import React, { memo, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ImageOff } from 'lucide-react';

// Memoized component to prevent unnecessary re-renders
const ProductCard = memo(({ product, onAdd }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
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
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">This is a premium product with excellent build quality.</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-5 pt-0">
        <span className="text-xl font-bold text-primary">${product.price}</span>
        <Button 
          onClick={() => onAdd(product)}
          className="shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
});

export default ProductCard;

import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { useProductSearch } from '../hooks/useProductSearch';
import ProductCard from './ProductCard';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ProductList = () => {
  const { state, dispatch } = useShop();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Custom Hook for filtering
  const filteredProducts = useProductSearch(state.products, search, category);

  // Extract unique categories using useMemo to avoid recalculation
  const categories = useMemo(() => {
    return ['All', ...new Set(state.products.map(p => p.category))];
  }, [state.products]);

  // Handler for adding to cart
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (state.isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4 sticky top-4 z-10 bg-background/80 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setCategory(cat)}
                variant={category === cat ? 'default' : 'outline'}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ProductList;

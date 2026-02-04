import { useMemo } from 'react';

// Custom Hook Demo
export const useProductSearch = (products, query, category) => {
  // useMemo: Only re-filter when products, query, or category changes.
  // This prevents expensive filtering operations on every render.
  const filteredProducts = useMemo(() => {
    console.log("Filtering products..."); 
    return products.filter(product => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  return filteredProducts;
};

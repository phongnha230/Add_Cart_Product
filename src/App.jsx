import React from 'react';
import { ShopProvider } from './context/ShopContext';
import ProductList from './components/ProductList';
import CartIcon from './components/CartIcon';

function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col justify-between">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-3.5 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Shop
            </h1>
            <div className="flex items-center gap-4">
              <CartIcon />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Featured Products</h2>
              <p className="text-gray-600">Explore our premium collection of accessories and electronics.</p>
            </div>
            <ProductList />
          </div>
        </main>
        
        <footer className="mt-12 py-8 text-center text-gray-500 text-sm border-t border-gray-200 bg-white/60">
          Nhà phát triển: Trần Đỗ Phong Nhã - 2026
        </footer>
      </div>
    </ShopProvider>
  );
}

export default App;

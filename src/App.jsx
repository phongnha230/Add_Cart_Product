import React from 'react';
import { ShopProvider } from './context/ShopContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartIcon from './components/CartIcon';

function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Shop
            </h1>
            <div className="flex items-center gap-4">
             
              <CartIcon />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Side: Product List */}
            <div className="flex-1 w-full">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
                <p className="text-gray-600">Explore our premium collection of accessories and electronics.</p>
              </div>
              <ProductList />
            </div>

            {/* Right Side: Cart (Sticky on desktop) */}
            <div className="w-full lg:w-96 lg:sticky lg:top-24">
              <Cart />
            </div>
          </div>
        </main>
        
        <footer className="mt-12 py-8 text-center text-gray-500 text-sm">
          Nhà phát triển: Trần Đỗ Phong Nhã - 2026
        </footer>
      </div>
    </ShopProvider>
  )
}

export default App;

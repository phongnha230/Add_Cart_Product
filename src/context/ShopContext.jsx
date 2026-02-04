import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 1. Create Context
const ShopContext = createContext();

// Initial State
const getSavedCart = () => {
  try {
    const savedCart = localStorage.getItem('shopping-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to parse cart from local storage", error);
    return [];
  }
};

const initialState = {
  products: [],
  cart: getSavedCart(),
  isLoading: true,
};

// Reducer for complex state logic
const shopReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, cart: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, isLoading: false };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
            item.id === action.payload.id 
            ? { ...item, quantity: Math.max(0, action.payload.quantity) } 
            : item
        ).filter(item => item.quantity > 0)
      };
    default:
      return state;
  }
};

// Provider Component
export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Save cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const mockProducts = [
        { id: 1, name: "Premium Wireless Headphones", price: 250, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
        { id: 2, name: "Minimalist Watch", price: 120, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
        { id: 3, name: "Ergonomic Chair", price: 300, category: "Furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80" },
        { id: 4, name: "Mechanical Keyboard", price: 150, category: "Electronics", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" },
        { id: 5, name: "Designer Sunglasses", price: 180, category: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80" },
        { id: 6, name: "Smart Speaker", price: 90, category: "Electronics", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80" },
      ];
      dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
    }, 1000);
  }, []);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom Hook to use the context
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

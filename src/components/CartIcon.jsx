import React from 'react';
import CartDrawer from './CartDrawer';

// Re-export CartDrawer as CartIcon for backward compatibility and test runner expectations
const CartIcon = () => {
  return <CartDrawer />;
};

export default CartIcon;

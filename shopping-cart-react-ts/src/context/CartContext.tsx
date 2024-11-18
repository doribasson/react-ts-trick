// src/context/CartContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

// Define the shape of the product
interface Product {
  id: number;
  name: string;
  price: number;
}

// Define the shape of the cart item
interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the context
interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

// Create the context
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Define the actions
type Action = { type: 'ADD_TO_CART'; payload: Product } | { type: 'REMOVE_FROM_CART'; payload: number };

// Define the reducer function
const cartReducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
};

// Define the CartProvider component
export const CartProvider: React.FC = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};

// Define a custom hook for using the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;

};
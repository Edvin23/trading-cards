// context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Card {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface CartContextType {
  cart: Card[];
  addToCart: (card: Card) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Card[]>([]);

  const addToCart = (card: Card) => {
    setCart((prevCart) => [...prevCart, card]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

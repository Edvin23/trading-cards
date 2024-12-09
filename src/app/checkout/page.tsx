'use client'

import { LogoTicker } from '../sections/LogoTicker';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const [cart, setCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);

    // Calculate the total price
    const total = storedCart.reduce((acc: number, card: any) => acc + parseFloat(card.price), 0);
    setTotalPrice(total);
  }, []);

  // Remove item from the cart
  const handleRemoveFromCart = (cardId: string) => {
    const updatedCart = cart.filter((card) => card.id !== cardId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  // Handle checkout process (for now just simulate success)
  const handleCheckout = () => {
    alert('Thank you for your purchase! Your order is confirmed.');
    localStorage.removeItem('cart'); // Clear the cart after purchase
    setCart([]); // Clear state
    router.push('/profile'); // Redirect to home page
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        
        {cart.length > 0 ? (
          <div>
            <div className="space-y-4">
              {cart.map((card) => (
                <div key={card.id} className="flex items-center justify-between border-b pb-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <img src={card.imageUrl} alt={card.title} className="w-20 h-20 object-contain" />
                    <div>
                      <h3 className="font-semibold">{card.title}</h3>
                      <p>{card.description}</p>
                      <p>${card.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(card.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="font-semibold text-lg">Total: ${totalPrice.toFixed(2)}</div>
              <button
                onClick={handleCheckout}
                className="px-6 py-3 bg-[#001E80] text-white rounded hover:bg-blue-700"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty. Please add some items to proceed with the checkout.</p>
        )}
      </div>
    </div>
  );
}

'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]); // Change to array for multiple cards
  const router = useRouter();

  useEffect(() => {
    // Get the cart data from localStorage
    const storedCart = localStorage.getItem('cart'); // Changed to 'cart' to hold multiple cards
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Handle removing a card from the cart
  const removeFromCart = (cardId: string) => {
    const updatedCart = cart.filter((card) => card.id !== cardId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update cart in localStorage
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{card.description}</p>
              <p className="text-xl font-bold text-gray-900 mt-4">${card.price}</p>

              <button
                onClick={() => removeFromCart(card.id)}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-4">Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={() => router.push('/checkout')}
            className="bg-[#001E80] text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

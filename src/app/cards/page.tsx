
'use client';

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function page(){
  const [cards, setCards] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cards'), (snapshot) => {
      const fetchedCards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(fetchedCards);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleAddToCart = (card: any) => {
    // Store the card in sessionStorage or localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    storedCart.push(card); // Add card to cart
    localStorage.setItem('cart', JSON.stringify(storedCart)); // Update the cart in localStorage

    // Redirect to the shopping cart page
    router.push('/shoppingcart');
  };

  return (
    <div className="flex min-h-screen">
      
      <aside className="w-64 bg-[#001E80] text-white flex flex-col">
        <div className="p-4 text-center text-2xl font-bold">All Cards</div>
        <nav className="flex-1">
          <ul className="space-y-4 p-4">
            <li>
              <button
                onClick={() => router.push('/profile')}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
              >
                YuGiOh
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/magic')}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
              >
                Magic Cards
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/onepiece')}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
              >
                One Piece Cards
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/sports')}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
              >
                Sport Cards
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/pokemon')}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
              >
                Pokémon Cards
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/shoppingcart')}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
              >
                Shopping Cart
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

     
      <div className="flex-1 flex flex-col">
       
        <div className="bg-[#001E80] text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Trading Cards</h1>
          
        </div>

       
        <main className="flex-1 bg-gray-100 p-6">
          <h2 className="text-xl font-bold mb-4">Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
                onClick={() => router.push(`/cards/${card.id}`)}
              >
                
                <div className="relative w-full h-48 bg-gray-200 flex justify-center items-center">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

              
                <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{card.description}</p>
                <p className="text-sm text-gray-600 mt-2">${card.price}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    handleAddToCart(card); // Add card to cart and redirect
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};



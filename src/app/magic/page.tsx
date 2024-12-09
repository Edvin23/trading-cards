'use client'

import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'firebase/auth';

export default function page() {
   
  const [magicCards, setMagicCards] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Filter brings "Pokemon" from backend
    const q = query(collection(db, 'cards'), where('title' , '==', 'Magic The Gathering'));
    const unsubscribe = onSnapshot(q,(snapshot) => {
      const fetchedCards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMagicCards(fetchedCards);
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
    <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-[#001E80] text-white flex flex-col">
        <div className="p-4 text-center text-2xl font-bold">Trading Cards</div>
        <nav className="flex-1">
          <ul className="space-y-4 p-4">
            <li>
              <button
                onClick={() => router.push('/cards')}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
              >
                Marketplace
              </button>
            </li>
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
      
     
     
      <main className="flex-1 p-6">
       
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Magic The Gathering Cards</h1>
        </div>


        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {magicCards.length > 0 ? (
            magicCards.map((card) => (
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
            ))
          ) : (
            <p className="text-gray-600">No Magic cards found in the "Magic The Gathering" category.</p>
          )}
        </div>
      </main>
    </div>
  
  );
};


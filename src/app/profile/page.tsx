'use client'

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [cards, setCards] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Set up real-time listener for Firestore to get updates when cards change
    const unsubscribe = onSnapshot(collection(db, 'cards'), (snapshot) => {
      const fetchedCards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(fetchedCards);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs before adding card to Firestore
    if (!title || !description || !imageUrl || !price) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Add the new card to the 'cards' collection in Firestore
      await addDoc(collection(db, 'cards'), {
        title,
        description,
        imageUrl,
        price,
      });

      // Clear the form after submission
      setPrice('');
      setTitle('');
      setDescription('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  // Handle the "Add to Cart" action
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
      {/* Sidebar */}
      <aside className="w-64 bg-[#001E80] text-white flex flex-col">
        <div className="p-4 text-center text-2xl font-bold">My Cards</div>
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

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Add a New Card</h2>
        <form onSubmit={handleAddCard} className="space-y-4 bg-white p-4 rounded shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Card
          </button>
        </form>

        {/* Cards Display */}
        <h2 className="text-xl font-bold mt-8">Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
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
  );
}

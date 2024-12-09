'use client'

import React from 'react'
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import router, { Router } from 'next/router';


export default function page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
            if(userCredential.user){
                await updateProfile(userCredential.user, {displayName: name});
                alert("Account created");
            }
        } catch (err: any){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-gray-900"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-gray-900"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          disabled={loading}
        > 
          {loading ? "Creating Account..." : "Sign Up"}
          
        </button>
        
      </form>
      
      <div className="text-center text-sm text-gray-500">
        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log In</a> 
        <div className="text-center text-sm text-gray-500">
            Return to the Home Page <a href="/" className="text-blue-500 hover:underline">Go Back</a>
        </div>
      </div>
    </div>
  </div>
  )
};

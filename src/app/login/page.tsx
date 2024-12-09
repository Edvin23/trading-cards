'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import Link from "next/link";
import Head from "next/head";

export default function page() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                router.push("/profile");
            }
        });
        return () => unsubscribe();
    }, [router]);
//handle
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
    //try
    try {
        await signInWithEmailAndPassword(auth, email, password);
       
    } catch(err: any){
        setError("Failed to log in.")
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Log In</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
          <div className="text-center text-gray-600">
            Return to the Home Page{" "}
            <Link href="/" className="text-blue-500 hover:underline">
                Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

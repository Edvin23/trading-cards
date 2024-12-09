import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDf8P3xMdDEu8bvdxGqRPboK21dPUIDyMQ",
    authDomain: "final-project-88320.firebaseapp.com",
    projectId: "final-project-88320",
    storageBucket: "final-project-88320.firebasestorage.app",
    messagingSenderId: "575209409223",
    appId: "1:575209409223:web:1ede409816abe3cb4d4ce2",
    measurementId: "G-B28XLN3WZ6"
  };


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app);
export const db = getFirestore(app);
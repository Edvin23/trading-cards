import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/sections/Header"
import { Hero } from "@/app/sections/Hero"
import { LogoTicker } from "./sections/LogoTicker";

export default function Home() { 

  return (
    
        <>
        <Header/>
        <Hero/>
        <LogoTicker/>
        </>
    
  );
}

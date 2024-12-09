'use client'
import charizard from "@/app/assets/newCharizard.png"
import topps from "@/app/assets/newTopps.png"
import luffy from "@/app/assets/newLuffy.jpeg"
import Image from "next/image"
import { motion , useScroll, useTransform, useMotionValueEvent} from 'framer-motion';
import { useRef } from "react";
import Link from "next/link"


export const Hero = () =>{
    const heroRef = useRef(null);
    const {scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"],
    });
    const translateY = useTransform(scrollYProgress, [0,1],[150,-150]);    

    return (
    <section  ref={heroRef} className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"> 
        <div className="container">
            <div className="md:flex items center">
            <div className="md:w-[478px]">
                <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
                     Version 2.0
                     </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
                    Trading Cards: Enhance Your Trading Card Experience
                    </h1>
                <p className="text-xl text-[#010D3E] tracking-tight mt-6">
                    Welcome to Trading Cards!
                </p>
                <div className="flex gap-1 items-center mt-[30px]">
                    <button className="btn btn-primary">
                        <Link href="/signup">
                        Sign Up </Link></button>
                    <button className="btn btn-text"> 
                     <Link href="/login">
                        Log in </Link></button>
                </div>
            </div>
            <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
                <motion.img src={charizard.src} alt="Charizard" 
                className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-40 "
                animate={{
                    translateY: [-30,30],
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 3,
                    ease: "easeInOut"
                }}/>
                <motion.img src={topps.src} width={220} height={220}
                alt="Wemby"
                className="hidden md:block -top8 -left-50 md:absolute"
                style={{
                    translateY: translateY,
                }}/>
                <motion.img src={luffy.src} width={220} alt="Yugioh" className="hidden lg:block absolute top-[524px] left-[448px] torate-30"
                style={{
                    rotate: 30,
                    translateY: translateY,
                }}/>
            </div>
            </div>
        </div>
    </section>
    )
}
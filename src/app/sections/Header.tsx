import React from 'react'
import Logo from "@/app/assets/Yugioh_Card_Back copy.jpg";
import Image from 'next/image';
import Link from 'next/link';
import pokemonLogo from '@/app/assets/International_Pokémon_logo.svg.png';
import onePieceLogo from '@/app/assets/onePieceLogo.jpeg';
import magicTheGatheringLogo from '@/app/assets/magic.png';
import yugiohLogo from '@/app/assets/yugiohLogo.jpeg';
import topsLogo from '@/app/assets/topsLogo.png';
import prizmLogo from '@/app/assets/prizmLogo.png'
import { motion } from 'framer-motion';

export const Header = () => {
    return (
        <header className="sticky top-0 backdrop-blur-sm z-20">
        <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
            <p className="text-white/60 hidden md:block">
                  Trading Cards: Enhance Your Trading Card Experience
            </p>
            <div className="inline-flex gap-1 items-center">
            <Link href="/signup">
            <p> Get Started</p>
            </Link>
            </div>
        </div>
        </header>

    ) ;
}

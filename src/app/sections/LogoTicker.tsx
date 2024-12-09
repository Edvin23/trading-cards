'use client'
import React from 'react'
import pokemonLogo from '@/app/assets/International_Pokémon_logo.svg.png';
import onePieceLogo from '@/app/assets/onePieceLogo.jpeg';
import magicTheGatheringLogo from '@/app/assets/magic.png';
import yugiohLogo from '@/app/assets/yugiohLogo.jpeg';
import topsLogo from '@/app/assets/topsLogo.png';
import prizmLogo from '@/app/assets/prizmLogo.png'
import Image from 'next/image';
import { motion } from 'framer-motion';

export const LogoTicker = () => {
    return (
     <div className="py-8 md:py-12 bg-white">
         <div className="container">
             <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)] ">
                <motion.div className="flex gap-14 flex-none pr-14"
                 animate={{
                    translateX: "-40%"
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}>
                    <Image src={pokemonLogo} alt="Pokemon" className="logo-ticker-image"/>
                    <Image src={onePieceLogo} alt="onePiece" className='logo-ticker-image'/>
                    <Image src={magicTheGatheringLogo} alt="Magic" className='logo-ticker-image'/>
                    <Image src={yugiohLogo} alt="YugiOh" className='logo-ticker-image'/>
                    <Image src={topsLogo} alt="Topps" className='logo-ticker-image'/>
                    <Image src={prizmLogo} alt="Prizm" className='logo-ticker-image'/>
                    {/*second set*/}
                    <Image src={pokemonLogo} alt="Pokemon" className="logo-ticker-image"/>
                    <Image src={onePieceLogo} alt="onePiece" className='logo-ticker-image'/>
                    <Image src={magicTheGatheringLogo} alt="Magic" className='logo-ticker-image'/>
                    <Image src={yugiohLogo} alt="YugiOh" className='logo-ticker-image'/>
                    <Image src={topsLogo} alt="Topps" className='logo-ticker-image'/>
                    <Image src={prizmLogo} alt="Prizm" className='logo-ticker-image'/>

                    <Image src={pokemonLogo} alt="Pokemon" className="logo-ticker-image"/>
                    <Image src={onePieceLogo} alt="onePiece" className='logo-ticker-image'/>
                    <Image src={magicTheGatheringLogo} alt="Magic" className='logo-ticker-image'/>
                    <Image src={yugiohLogo} alt="YugiOh" className='logo-ticker-image'/>
                    <Image src={topsLogo} alt="Topps" className='logo-ticker-image'/>
                    <Image src={prizmLogo} alt="Prizm" className='logo-ticker-image'/>

                 </motion.div>
             </div>
        </div>

     </div>
    );
}
 
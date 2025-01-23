import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Spotify } from 'react-spotify-embed';

export default function Song({songURL, songMessage}) {
   const container = useRef(null);
   const { scrollYProgress } = useScroll({
           target: container,
           offset: ["start end", "end start"]
       })
 
   useEffect( () => {
       const lenis = new Lenis()

       function raf(time) {
           lenis.raf(time)
           requestAnimationFrame(raf)
       }
       requestAnimationFrame(raf)
   }, [])

   const goRight = useTransform(scrollYProgress, [0, 0.3, 1], [-600, 50, 600])
   const goRightM = useTransform(scrollYProgress, [0, 0.3, 1], [1200, 750, -600])
   const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

   const variants = { 
    initial: {
        x: -200,
        opacity: 0
    },
    animate: {
        x: [300, 0],
        opacity: [0, 1],
        transition: {
            duration: 1,
        },
    }
   }

    return (
        <>
        <div className='hidden md:block'>
            <div ref={container} className='bg-gradient-to-b to-dimred from-lightred h-screen w-screen overflow-hidden flex flex-col justify-center'>
                <div>
                <motion.div style={{x: goRight, opacity: opacity}} className="">
                    <Spotify wide className='h-56 w-[70%] px-4' link = {songURL}/>
                </motion.div>
                <motion.div style={{x: goRightM, opacity: opacity}} className=''>
                    <div className='md:text-4xl text-darkred text-center font-bold w-[50%]'>{songMessage}</div>
                </motion.div>
            </div>  
            </div>
        </div>
        <div className='md:hidden block'>
            <div className='bg-gradient-to-b to-dimred from-lightred h-screen w-screen overflow-hidden flex flex-col items-center justify-center'>
                <motion.div 
                variants={variants}
                whileInView="animate"
                viewport={{
                    once: false
                }}
                className="">
                    <Spotify className='' link = {songURL}/>
                </motion.div>
                <div className='text-darkred text-center font-bold w-[70%]'>{songMessage}</div>
            </div>
        </div>
        
        </>
   )
}
  
//   const Section1 = ({ scrollYProgress, url, photoMessage }) => {
//             const goRight = useTransform(scrollYProgress, [0, 0.5, .8], [-300, 0, 300])
//         return (
//             <motion.div style={{x: goRight}} className=" max-w-screen-lg h-screen overflow-hidden flex flex-col items-center justify-center">
//                 <Spotify wide className=' mt-20 h-64 w-[90%] px-4' link = {url}/>
//                 <div className='text-4xl ml-12 text-white font-bold'>{photoMessage}</div>
//             </motion.div>
  
//         );
//       };
      
      
       
      
     
    //   const Section4 = ({ scrollYProgress, url }) => {
    //     const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.5]);
    //     const rotate = useTransform(scrollYProgress, [0, 1], [10, 0]);
      
    //     return (
    //       <motion.div style={{ scale, rotate }} className="relative h-screen bg-[#2ecc71]">
    //         <div className="absolute inset-0 flex justify-center items-center">
    //           <p className="text-4xl text-white">Thank You for Being Amazing!</p>
    //         </div>
    //       </motion.div>
    //     );
    //   };

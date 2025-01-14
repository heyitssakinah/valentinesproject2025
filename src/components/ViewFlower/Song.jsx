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
   console.log(songURL)
   useEffect( () => {
       const lenis = new Lenis()

       function raf(time) {
           lenis.raf(time)
           requestAnimationFrame(raf)
       }
       requestAnimationFrame(raf)
   }, [])

   const goRight = useTransform(scrollYProgress, [0, 0.3, 1], [-400, 0, 600])
   const goRightM = useTransform(scrollYProgress, [0, 0.3, 1], [-300, 0, 500])

    return (
        <div ref={container} className='bg-red-950 h-screen w-screen overflow-hidden flex flex-col justify-center'>
            <motion.div style={{x: goRight}} className="">
                <Spotify wide className='h-56 w-[70%] px-4' link = {songURL}/>
            </motion.div>
            <motion.div style={{x: goRightM}} className=''>
                <div className='text-4xl ml-12 text-white text-center font-bold w-[40%]'>{songMessage}</div>
            </motion.div>
        </div>
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

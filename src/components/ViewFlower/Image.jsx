import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function Image({src, name, sender}) {
    const senderName = sender.split("_")[0]
    // console.log(senderName)
   const container = useRef(null);
   const { scrollYProgress } = useScroll({
           target: container,
           offset: ["start end", "end end"]
       })
   useEffect( () => {
       const lenis = new Lenis()

       function raf(time) {
           lenis.raf(time)
           requestAnimationFrame(raf)
       }
       requestAnimationFrame(raf)
   }, [])

   const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '360deg'])
   const rotate2 = useTransform(scrollYProgress, [0, 1], ['150deg', '360deg'])
   const rotate3 = useTransform(scrollYProgress, [0, 1], ['1000deg', '360deg'])
   const fall = useTransform(scrollYProgress, [.5, 1], [0, 200])
   const rise = useTransform(scrollYProgress, [0.5, 1], [0, -200])
//    const goUpMain = useTransform(scrollYProgress, [0, 1], [-400, 0])
//    const big = useTransform(scrollYProgress, [0, 1], [-400, 10])

    return (
        <div className='bg-red-950 relative h-screen text-white text-5xl flex flex-col justify-center items-center overflow-hidden'>
        <div ref={container} className='h-screen absolute inset-0 z-20 flex justify-center items-center'>
            <motion.div 
            style={{ rotate, y: rise}} 
            className="w-52"
            >
               <img src={src} alt='img1' className='scale-150'/>
            </motion.div>

            <motion.div style={{rotate: rotate3, y: fall}} className="w-52">
               <img src={src}/>
            </motion.div>
            <motion.div style={{rotate: rotate2, y: rise}} className="w-52">
               <img src={src} alt='img2' className='scale-125'/>
            </motion.div>
            <motion.div style={{rotate: rotate, y: fall}} className="w-52">
               <img src={src} className='scale-150'/>
            </motion.div>
        </div>
        <div className='flex absolute z-10 justify-center items-center'>
            <p>
            <strong>From:</strong> {senderName} <br />
            <strong>To:</strong> {name}
            </p>
            {/* <p>We hope you have a great day and enjoy your flowers. Please feel free to contact us if you need any help or guidance.</p> */}
        </div>
        <div className='flex absoute z-0'>
            <img src='/heart3.gif' className=''/>
        </div>
        </div>
   )
}

import React, { useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function Image({src, name, sender}) {
    const [click, setClick] = useState(false);
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

   const rotate = useTransform(scrollYProgress, [0, .9], ['0deg', '360deg'])
   const rotate2 = useTransform(scrollYProgress, [0, .8], ['150deg', '360deg'])
   const rotate3 = useTransform(scrollYProgress, [0, .9], ['1000deg', '360deg'])
   const fall = useTransform(scrollYProgress, [.5, .8], [0, 200])
   const rise = useTransform(scrollYProgress, [0.5, .8], [0, -200])
//    const goUpMain = useTransform(scrollYProgress, [0, 1], [-400, 0])
//    const big = useTransform(scrollYProgress, [0, 1], [-400, 10])

    return (
        <div className='bg-dimred relative h-screen text-darkred text-5xl flex flex-col justify-center items-center overflow-hidden'>
        {!click &&
        <div ref={container} className='h-screen absolute inset-0 z-20 flex justify-center items-center'>
            <motion.div 
            style={{ rotate, y: rise}} 
            className="w-52"
            >
               <img src={src} alt='img1' className='scale-100'/>
            </motion.div>

            <motion.div style={{rotate: rotate3, y: fall}} className="w-52">
               <img src={src} className='scale-125'/>
            </motion.div>
            <motion.div style={{rotate: rotate2, y: rise}} className="w-52">
               <img src={src} alt='img2' className='scale-125'/>
            </motion.div>
            <motion.div style={{rotate: rotate, y: fall}} className="w-52">
               <img src={src} className='scale-100  hover:scale-125 transition duration-100' onClick={() => setClick(true)}/>
            </motion.div>
        </div>
    }
        <div className='flex absolute z-10 justify-center items-center'>
        <div className='flex absoute z-10'>
            <img src='/heart3.gif' className='m-1 scale-50'/>
        </div>
            <p>
            <strong>From:</strong> {sender} <br />
            <strong>To:</strong> {name}
            </p>
            {/* <p>We hope you have a great day and enjoy your flowers. Please feel free to contact us if you need any help or guidance.</p> */}
        <div className='flex absoute z-10'>
            <img src='/heart3.gif' className='m-10 scale-50'/>
        </div>
        </div>
        { click &&
        <div className='flex absoute z-0'>
            <img src='/heart1.gif' className='m-10 w-[100vw]'/>
        </div>
        }   
        </div>
   )
}

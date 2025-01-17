import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef,useEffect } from 'react';
import Lenis from 'lenis';


export default function Message({Message}) {
  useEffect( () => {
    const lenis = new Lenis()
  
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])
    const container = useRef(null);

    const { scrollYProgress } = useScroll({ 
        target: container,
        offset: ["start end", "start 0.3"]
    })
    console.log(Message)
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    const moveLeft = useTransform(scrollYProgress, [0, 1], [300,0])
return (
  <div className='bg-gradient-to-b from-darkred to-barnred to-80% h-screen w-screen flex items-center justify-center overflow-hidden '>
  <motion.p 
  ref={container}         
  className='px-20 max-w-[60vw] text-2xl text-mywhite whitespace-pre-wrap overflow-hidden text-left'
  style={{opacity: opacity, x: moveLeft}}
  >
  {Message}
  </motion.p>
  </div>
  )
}


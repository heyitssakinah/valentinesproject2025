import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
export default function Trial({photourl, photoMessage}) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
            target: container,
            offset: ["start start", "end end"]
        })
    
    useEffect( () => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }, [])

  return (
    <main ref={container} className="relative h-[200vh] bg-slate-400">
        <Section1 scrollYProgress={scrollYProgress} url={photourl} photoMessage={photoMessage}/>
        <Section2 scrollYProgress={scrollYProgress} url={photourl} />
    </main>
  )
}

  const Section1 = ({scrollYProgress, url, photoMessage}) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.1]);
    return (
        <motion.div style={{scale, rotate, opacity}} className="sticky top-0 h-screen w-screen bg-red-950 font-serif text-4xl font-bold flex flex-col items-center justify-center text-white pb-[10vh]">
          <div className="flex gap-12 items-center mx-24 ">
                <div>
                <p>{photoMessage}</p>
                </div>
            <div className="relative">
              <img 
                src={url}
                alt="img"
                placeholder="blur"
                className='max-w-96'
              />
            </div>
          </div>
        </motion.div>
      )
      }

      const Section2 = ({scrollYProgress, url}) => {

        const scale = useTransform(scrollYProgress, [0, .8], [0.6, 1]);
        const rotate = useTransform(scrollYProgress, [0, .7], [5, 0])
      
        return (
          <motion.div style={{scale, rotate}} className="h-[100vh] flex items-center justify-center relative">
            <img 
              src={url}
              alt="img"
              placeholder="blur"
              className='max-h-[80vh] max-w-[72vw] border-double border-yellow-500 border-8 p-6'
            />
          </motion.div>
        )
      }
import React, { useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function Image({ src, name, sender }) {
  const [click, setClick] = useState(false);
  // console.log(senderName)
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 0.9], ["0deg", "360deg"]);
  const rotate2 = useTransform(scrollYProgress, [0, 0.8], ["150deg", "360deg"]);
  const rotate3 = useTransform(
    scrollYProgress,
    [0, 0.9],
    ["1000deg", "360deg"]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="bg-dimred h-screen w-screen text-mywhite text-5xl sm:flex flex-col justify-center items-center overflow-hidden">
      <div className="hidden sm:flex justify-center items-center h-screen">
        {!click && (
          <>
        <div className="flex flex-col relative justify-center items-center space-y-10">
          <div className="">
            <p className="sm:text-3xl text-2xl text-center">
              <strong>From:</strong> {sender} <br />
            </p>
          </div>
          <motion.div ref={container} style={{ scale: scale, transformOrigin: "center" }} 
                transition={{ duration: 0.3 }}>
              <img
                src={src}
                onClick={() => setClick(true)}
                className="w-[120%] shadow-xl hover:scale-90 transition duration-100"
              />
            </motion.div>
            <p className="sm:text-3xl text-2xl text-center">
            <strong>To:</strong> {name}
            </p>
          {/* <p>We hope you have a great day and enjoy your flowers. Please feel free to contact us if you need any help or guidance.</p> */}
        </div>
        </>
        )}
        {click && (
          <div className="h-screen w-screen flex absolute z-30 justify-center items-center overflow-hidden">
            <div className="flex absoute z-30">
              <img src="/rainhearts.gif" className="w-screen" />
            </div>
            <div className="flex absolute z-40">
              <img src="/heartcute.gif" className=""></img>
            </div>
          </div>
        )}
      </div>
      
      {/* small screen */}
      {!click && (
      <div className="sm:hidden flex-col-reverse flex justify-center items-center h-screen">
        {/* <div className="flex relative z-0 h-screen items-center justify-center"> */}
          <div className="w-[75vw]">
            <p className="sm:text-4xl text-2xl text-center text-mywhite text-shadow-lg py-4">
              <strong>From:</strong> {sender} <br />
              <strong>To:</strong> {name}
            </p>
          </div>
          <div className="relative z-0">
            <img
                    src={src}
                    className="shadow-xl max-h-[50vh] max-w-[75vw] animate-pulse"
                    onClick={() => setClick(true)}
                />
          </div>
        </div>
         )}
        {click && (
          <div className="h-screen w-screen flex absolute z-30 justify-center items-center overflow-hidden">
            <div className="flex absoute z-30">
              <img src="/rainhearts.gif" className="w-screen scale-[200%]" />
            </div>
            <div className="flex absolute z-40">
              <img src="/heartcute.gif" className=""></img>
            </div>
          </div> )}
      </div>
    // </div>
  );
}

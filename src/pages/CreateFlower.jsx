import { WriteProse } from "../components/createFlower/WriteProse"
import { useParams } from "react-router-dom";
import Meme from "../components/createFlower/Meme";
import Song from "../components/createFlower/Song";
import Photo from "../components/createFlower/Photo";
import { useRef } from "react";
import { useState } from "react";
import Confirm from "../components/createFlower/Confirm";

export function CreateFlower() {
    const { Name } = useParams();
    const [submitAll, setSubmitAll] = useState(false);

    const proseRef = useRef(null);
    const memeRef = useRef(null);
    const songRef = useRef(null);
    const photoRef = useRef(null);
    const confirmRef = useRef(null);
    const handleScroll = (ref) => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
          }
          

    return (
        <div className="font-serif bg-gradient-to-tl from-red-500 via-pink-900 via 75% to-red-950 snap-y snap-mandatory overflow-hidden h-screen">
             <div ref={proseRef} className='snap-center snap-always '>
            <WriteProse handleScroll={handleScroll} toRef={memeRef} Name={Name} submitAll={submitAll} ></WriteProse>
             </div>

            <div ref={memeRef} className="snap-center h-screen">
            <Meme Name={Name} handleScroll={handleScroll} toRef={songRef} toPrevRef={proseRef} submitAll={submitAll} ></Meme>
            </div>

            <div ref={songRef} className='snap-center snap-always'>
            <Song Name={Name} submitAll={submitAll} handleScroll={handleScroll} toRef={photoRef} toPrevRef={memeRef} className='w-screen'></Song>
            </div>

            <div ref={photoRef} className='w-screen snap-center snap-always'>
            <Photo Name={Name} handleScroll={handleScroll} toRef={confirmRef} toPrevRef={songRef}submitAll={submitAll}></Photo>
            </div>

            <div ref={confirmRef} className='w-screen snap-center snap-always'>
            <Confirm Name={Name} setSubmitAll={setSubmitAll} ></Confirm>
            </div>
        </div>
    )
}
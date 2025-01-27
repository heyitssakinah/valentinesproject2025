import { WriteProse } from "../components/createFlower/WriteProse"
import { useParams } from "react-router-dom";
import Meme from "../components/createFlower/Meme";
import Song from "../components/createFlower/Song";
import Photo from "../components/createFlower/Photo";
import { useRef } from "react";
import { useState } from "react";
import Confirm from "../components/createFlower/Confirm";

export function CreateFlower() {
    const { NameWithID } = useParams();
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
        <div className="font-valiny snap-y snap-mandatory overflow-hidden h-screen">
             <div ref={proseRef} className='snap-center snap-always '>
            <WriteProse handleScroll={handleScroll} toRef={memeRef} Name={NameWithID} submitAll={submitAll} ></WriteProse>
             </div>

            <div ref={memeRef} className="snap-center h-screen">
            <Meme Name={NameWithID} handleScroll={handleScroll} toRef={songRef} toPrevRef={proseRef} submitAll={submitAll} ></Meme>
            </div>

            <div ref={songRef} className='snap-center snap-always'>
            <Song Name={NameWithID} submitAll={submitAll} handleScroll={handleScroll} toRef={photoRef} toPrevRef={memeRef} className='w-screen'></Song>
            </div>

            <div ref={photoRef} className='w-screen snap-center snap-always'>
            <Photo Name={NameWithID} handleScroll={handleScroll} toRef={confirmRef} toPrevRef={songRef}submitAll={submitAll}></Photo>
            </div>

            <div ref={confirmRef} className='w-screen snap-center snap-always'>
            <Confirm Name={NameWithID} setSubmitAll={setSubmitAll} handleScroll={handleScroll} toPrevRef={photoRef} ></Confirm>
            </div>
        </div>
    )
}
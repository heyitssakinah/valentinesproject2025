import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import ValentineWrapped from '../components/ViewFlower/ValentineWrapped';
import Card from './Card';
import { getDownloadURL } from 'firebase/storage';
import { getStorage, listAll, ref as storRef } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


function Bouquet() {
    const { Name } = useParams();
    const [allImages, setAllImages] = useState([]);
    const navigate = useNavigate();

    const storage = getStorage();
    const storageRef = storRef(storage, `PersonalImages/${Name}`)

    const location = useLocation();
    const wrappedRef = useRef(null);
    const lovedRef = useRef(null);
    const cardsRef = useRef(null);


  useEffect(() => {
    // Check if there's a hash in the URL and scroll to the element with that ID
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch all items in the storage reference
                const response = await listAll(storageRef);

                // Map each item to a promise that resolves its URL and name
                const imagePromises = response.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    console.log("Fetched URL:", url); // Log each URL
                    return {
                        url,
                        name: item.fullPath.split('/').pop()
                    }
                })
                // Resolve all promises and update state
                const images = await Promise.all(imagePromises);
                setAllImages(images);
            } catch (error) {
                console.log('error fetching images', error)}
                return false
        }
        fetchImages();
},[]);

const variant1 = {
    animate: {
        opacity: [0, 1],
        transition: { duration: .5,},
        y: [80,0]
    }}
const variant2 = {
    animate: {
        opacity: [0, 1],
        y: [60,0],
        transition: { duration: .5, delay: .5},
    }}
// console.log(getMetadata(storageRef))
  return (
    <div className='font-serif bg-gradient-to-tl from-darkred via-myred via-30% to-lightred snap-y snap-mandatory overflow-y-scroll w-screen h-screen'>
        <div className="flex flex-col items-center justify-center h-screen w-screen text-center snap-center snap-always">
            <motion.p 
            className="text-4xl shadow-myblack text-shadow sm:text-8xl font-black text-mywhite m-5"
            variants={variant1}
            whileInView="animate"
            viewport={{
                once: true
            }}
            > HAPPY VALENTINE <br></br> </motion.p>
            <motion.p 
            className="text-4xl shadow-myblack text-shadow sm:text-8xl font-black text-mywhite m-5"
            variants={variant2}
            whileInView="animate"
            
            viewport={{
                once: true
            }}
            >{Name} </motion.p>
        </div>
            
        <div ref={wrappedRef} className="snap-center h-screen w-screen ">
            <ValentineWrapped
            name={Name}
            >

            </ValentineWrapped>
        </div>

        <div ref={lovedRef} className="snap-center h-[100vh] w-screen ">
            <div className="flex flex-col items-center justify-center h-screen text-center font-black text-mywhite m-10 sm:m-24">
            <p className='text-4xl  sm:text-7xl'>You are sooo cherished and loved this valentines &lt;3</p>
            </div>
        </div>

        <div id='cardsRef' ref={cardsRef} className="snap-center h-screen p-12">
            <div className="snap-center h-screen flex flex-wrap justify-center overflow-scroll items-center gap-6 p-4">
            {allImages.map((image, index) => (
                <div
                    key={index}
                    className="w-72 h-52 shadow-lg transform hover:scale-105 transition duration-300"
                >
                <img
                    src={image.url}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                    onClick={() => {
                        navigate(`/Bouquet/${Name}/${image.name}`)
                    }}
                />
                </div>
            ))}
            </div>
        </div>

    </div>
  )
}

export default Bouquet
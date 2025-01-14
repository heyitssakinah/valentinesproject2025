import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import ValentineWrapped from '../components/ViewFlower/ValentineWrapped';
import Card from './Card';
import { getDownloadURL } from 'firebase/storage';
import { getStorage, listAll, ref as storRef } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Bouquet() {
    const { Name } = useParams();
    console.log('name', Name)
    const [allImages, setAllImages] = useState([]);
    const navigate = useNavigate();

    const storage = getStorage();
    const storageRef = storRef(storage, `PersonalImages/${Name}`)
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
        }
        fetchImages();
},[]);

const wrappedRef = useRef(null);
const lovedRef = useRef(null);
const cardsRef = useRef(null);

// console.log(getMetadata(storageRef))
  return (
    <div className='font-serif bg-gradient-to-tl from-red-950 via-pink-900 via 75% to-red-500 snap-y snap-mandatory overflow-y-scroll w-screen h-screen'>
        <div className="flex flex-col items-center justify-center h-screen w-screen text-center snap-center snap-always">
            <p className="text-4xl sm:text-7xl font-black text-white m-5"> HAPPY VALENTINE <br></br> {Name} </p>
        </div>
            
        <div ref={wrappedRef} className="snap-center h-screen w-screen ">
            <ValentineWrapped></ValentineWrapped>
        </div>

        <div ref={lovedRef} className="snap-center h-[100vh] w-screen ">
            <div className="flex flex-col items-center justify-center h-screen text-center font-black text-white m-5">
            <p className='sm:text-4xl text-2xl max-w-[80%] m-4'>A total of $$ people thought about you this valentines</p>
            <p className='text-4xl  sm:text-7xl'>You are sooo cherished and loved</p>
            </div>
        </div>

        <div ref={cardsRef} className="snap-center h-screen p-12">
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
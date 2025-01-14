import { getStorage } from 'firebase/storage'
import { useEffect, useState } from 'react';
import React from 'react'
import { listAll, getDownloadURL, ref as storRef } from 'firebase/storage'
import { getDatabase, set, ref as dbRef } from 'firebase/database';
import { app } from '../../configuration';
import { useAuth } from '../../contexts/authContext';

export default function Meme({Name, submitAll, handleScroll, toRef, toPrevRef}) {
  const [image, setImage] = useState([]); //object images from storage
  const [display, setDisplay] = useState(true);
  const [chosenImage, setChosenImage] = useState(''); //url
  const {currentUser} = useAuth();
  const storage = getStorage();
  const storageRef = storRef(storage, 'Memes/')
  
  useEffect(() => {
  listAll(storageRef).then((response) =>
  response.items.forEach((element) => {
    getDownloadURL(element).then((url) =>
          setImage((prev) => [...prev, url])
        );}))},[]);
  
  useEffect(() => {
    const db = getDatabase(app);
    const dataref = dbRef(db, `Bouquets/${Name}/${currentUser.displayName}_${currentUser.uid}/Meme`);
    if(submitAll) {
      set(dataref, {
        MemeURL: chosenImage
      })
      .catch((err) => {
        console.error('err submitting', err);
      })
    }},[submitAll])

  const handleClick = ((chosenImage) => {
    if (chosenImage.trim() !=='') {
      setDisplay(false);
      setChosenImage(chosenImage)
    } else {
      alert('Please enter valid data.');
  }
   })

   const handleSubmit = () => {
    if(chosenImage === '') {
      alert('Please choose a meme.');
      ///dont go next page
    } else {
      handleScroll(toRef)
    }
   }

  return (
    <div className='flex flex-col items-center justify-around h-screen w-screen'>
      {display && (
        <div className='flex flex-col items-center -mt-4 mx-4 h-screen w-screen'>
          <h1 className="mt-14 text-center mx-10 mb:4 sm:mb-8 text-2xl sm:text-3xl text-white ">Add a Meme For The Giggles?</h1>
          <div className=' border-2 p-6 border-gray-400/30 rounded-xl grid grid-cols-1 overflow-scroll sm:grid-cols-3 gap-8 sm:gap-16 my-10 justify-center mx-6'>
              {display && image.slice(0,9).map((image) => {
              return (
                <img 
                  className='w-72 max-h-52 sm:w-72 sm:h-52 hover:border-4 border-transparent' 
                  src={image} 
                  alt="" 
                  onClick={() => handleClick(image)}
                  />
              )})}
          </div>
        </div>
      )}  
      {!display && (
          <div className='flex flex-col items-center w-screen h-screen'>
            <h1 className='mt-14 mb-10 text-2xl sm:text-3xl text-white' >nice! you're a funny guy</h1>
            <img 
            src={chosenImage}
            className='max-w-[70%] max-h-[50%] mx-20'
            />
          <button
            className="text-gray-300 hover:text-gray-400 mt-8 mb-12 underline"
            onClick={() => {setDisplay(true); setChosenImage('')}}
          >Choose a different meme button</button>
           <div className='flex w-full space-x-[30%] justify-center'>
            <button 
            onClick={() => handleScroll(toPrevRef)}
            className='px-4 py-2 text-center text-white bg-red-700 rounded-md hover:bg-red-800'
            >Prev
            </button>
           <button
              onClick={handleSubmit}
              className='px-4 py-2 text-center w-auto text-white bg-red-700 rounded-md hover:bg-red-800'
              >Next</button>
            </div>
          </div>
        )}
    </div>

  )
}

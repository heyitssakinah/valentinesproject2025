import React, { useEffect, useState } from 'react'
import FileUploader from '../FileUploader'
import Popup from '../Popup'
import { ref, getDatabase, set } from 'firebase/database';
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import { app } from '../../configuration';
import { useAuth } from '../../contexts/authContext';
//add auth information
function Photo({Name, submitAll, handleScroll, toRef, toPrevRef}) {
  const [triggerPopup, setTriggerPopup] = useState(false);
  const [triggerEmbed, setTriggerEmbed] = useState(false);
  const [message, setMessage] = useState('');
  const [photoURL, setURL] = useState('https://via.placeholder.com/200x150?text=Loading...');
  const [image, setImage] = useState([]);
  const [hcp, sethcp] = useState(false);

  const {currentUser} = useAuth();
  const storage = getStorage()
  const imgRef = storeRef(storage, `PersonalImages/${Name}/${currentUser.displayName}_${currentUser.uid}`)

  useEffect(() => {
    if(submitAll) {
      const db = getDatabase(app);
      const dataref = ref(db, `Bouquets/${Name}/${currentUser.displayName}_${currentUser.uid}/Photo`);
        set(dataref, {
          PhotoMessage: message,
          PhotoURL: photoURL
        }).catch((err) => {
          console.error('err submitting', err);
        })
      }
    }, [submitAll])


  const handleUpdateStorage = (e) => {
     const imageUploaded = e.target.files[0];
        const maxSize = 5 * 1024 * 1024
        if (imageUploaded.size > maxSize) {
            alert("Please upload an image with size < 5MB (later they charge me for storage...im broke...)");
            return;
        }
        uploadBytes(imgRef, imageUploaded)
            .then(() => { 
                console.log('Upload successful');
                fetchImage();
            })
  }

  const fetchImage = () => {
    getDownloadURL(imgRef) 
        .then((url) => {
            setURL(url);
            console.log('fetching img', url);
        })
        .catch((err) => {console.error("Error fetching image:", err);}
        )
}

  const handleSubmit = ((input) => {
    handleUpdateStorage(image);
    if (input.trim() !=='') {
    // alert("Submitted successfully");
    setTriggerPopup(false);
    setTriggerEmbed(true);
    setMessage(input);
    } else {
      alert('write something sweet hmm?');
  }
  })

  const handleSubmitPhoto = (() => {
    if(image === null) {
      alert('Please select an image first');
      return;
    } else {
      handleScroll(toRef)
    }
  })



  return (
    <div className='flex flex-col items-center justify-around h-screen w-screen'>
      {!triggerEmbed && (
        <div className='flex flex-col items-center -mt-24 sm:-mt-30'>
        <h1 className='mt-14 mb-10 text-2xl sm:text-3xl text-white text-center mx-10' >Finally, Add Your Favourite Photo Together!</h1>
          <FileUploader 
            className='w-full h-full' 
            setTriggerPopup={setTriggerPopup} 
            setImage={setImage} 
            handleClosePopup={hcp} 
            setHandleClosePopup={sethcp}/>
         </div>
         )}
        <Popup
          name={Name} 
          trigger={triggerPopup} 
          setTrigger={setTriggerPopup}
          handleSubmit={handleSubmit}
          setHandleClosePopup={sethcp}>
          <p className='text-lg mb-3'>Send a short message with the photo:</p>
        </Popup>
        {
        triggerEmbed && (
          <>
            <div className='flex flex-col items-center w-screen h-screen'>
              <h1 className='mt-14 mb-10 text-2xl sm:text-3xl text-white text-center mx-10' >You LOOK SO GOOD TOGETHER</h1>
              <img className='max-w-[60%] max-h-[40%] mx-20 mb-4' src={photoURL}/>
              <div className='max-w-[80%] sm:max-w-[40%] bg-white/10 text-white py-3 rounded-2xl shadow-md px-6'>{message}</div>
          <button
            className="text-gray-200 hover:text-gray-400 mb-16 mt-4 underline"
            onClick={() => {
              setTriggerEmbed(false)
              setTriggerPopup(false)
              setImage(null)
              setMessage('')
            }}
          >Choose a different photo button</button>
          <div className='flex w-full space-x-[30%] justify-center'>
            <button 
            onClick={() => handleScroll(toPrevRef)}
            className='px-4 py-2 text-center text-white bg-red-700 rounded-md hover:bg-red-800'
            >Prev
            </button>
           <button
              onClick={handleSubmitPhoto}
              className='px-4 py-2 text-center w-auto text-white bg-red-700 rounded-md hover:bg-red-800'
              >Next</button>
            </div>
            </div>
        </>

        )}
    </div>
  )
}

export default Photo
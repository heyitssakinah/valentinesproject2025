import React, { useEffect, useState } from 'react'
import FileUploader from '../FileUploader'
import Popup from '../Popup'
import { ref, getDatabase, set } from 'firebase/database';
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import { app } from '../../configuration';
import { useAuth } from '../../contexts/authContext';
//add auth information
function Photo({Name, submitAll, handleScroll, toRef, toPrevRef}) {
  const name = Name.split("_")[0];
  const [triggerPopup, setTriggerPopup] = useState(false);
  const [triggerEmbed, setTriggerEmbed] = useState(false);
  const [message, setMessage] = useState('');
  const [photoURL, setURL] = useState('');
  const [image, setImage] = useState([]);
  const [hcp, sethcp] = useState(false);
  const [loading, setLoadPhoto] = useState(true)

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

  console.log("load", loading)



  return (
    <div className='flex flex-col items-center justify-around h-screen w-screen bg-myred'>
      {!triggerEmbed && (
        <div className='flex flex-col items-center -mt-24 sm:-mt-30'>
        <h1 className='mt-14 mb-10 text-2xl sm:text-3xl text-mywhite text-center mx-10' >Finally, Add Your Favourite Photo Together!</h1>
          <FileUploader 
            className='w-full h-full text-mywhite' 
            setTriggerPopup={setTriggerPopup} 
            setImage={setImage} 
            handleClosePopup={hcp} 
            setHandleClosePopup={sethcp}/>
         </div>
         )}
        <Popup
          name={name}
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
              <h1 className='mt-14 mb-10 text-2xl sm:text-3xl text-mywhite text-center mx-10' >You LOOK SO GOOD TOGETHER</h1>
              <img className={`${loading ? "hidden" : "max-w-[60%] max-h-[40%] mx-20 mb-4"}`} src={photoURL} onLoad={() => setLoadPhoto(false)}/>
              <div className='max-w-[80%] text-center sm:max-w-[40%] bg-mywhite/10 text-mywhite py-3 rounded-2xl shadow-md px-6'>{message}</div>
          <button
            className="text-mywhite hover:text-mywhite/50 mb-16 mt-4 underline"
            onClick={() => {
              setTriggerEmbed(false)
              setTriggerPopup(false)
              setImage(null)
              setURL('')
              setMessage('')
              setLoadPhoto(true)
            }}
          >Choose a different photo button</button>
              <div
          class={`${
            loading
              ? "w-auto"
              : "hidden"
          }`}
        >
          {/* From Uiverse.io by themrsami */}
          <button
            className="inline-block mb-4 rounded-full border-2 border-myred text-myred focus:border-myred focus:text-myred active:border-rose-800 active:text-rose-800 dark:border-rose-300 dark:text-rose-300 dark:hover:hover:bg-rose-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
            type="button"
          >
            <div
              role="status"
              className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            Loading
          </button>
        </div>
          <div className='flex w-full space-x-[30%] justify-center'>
            <button 
            onClick={() => handleScroll(toPrevRef)}
            className='px-4 py-2 text-center text-mywhite bg-red-700 rounded-md hover:bg-barnred'
            >Prev
            </button>
           <button
              onClick={handleSubmitPhoto}
              className='px-4 py-2 text-center w-auto text-mywhite bg-red-700 rounded-md hover:bg-barnred'
              >Next</button>
            </div>
            </div>
        </>

        )}
    </div>
  )
}

export default Photo
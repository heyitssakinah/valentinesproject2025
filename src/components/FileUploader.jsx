import { useEffect, useRef } from "react";

export default function FileUpload({setImage, setTriggerPopup, handleClosePopup, setHandleClosePopup}) {
    const fileInputRef = useRef(null);
    const handleUpload = (e) => {
        setImage(e)
        setTriggerPopup(true);
        setHandleClosePopup(false);
    }
    console.log('hcp', handleClosePopup)
    useEffect(() => {
        if(handleClosePopup) {
        setImage(null);
         fileInputRef.current.value = "";
        }
    }, [handleClosePopup]);

    return (
        <div className='flex flex-col w-screen justify-center items-center '>
            <input 
                type="file" 
                id="fileUpload"
                ref={fileInputRef} 
                onChange={handleUpload}
                accept='image/jpeg, image/jpg, image/png'
                className='ml-28 hidden'/>
                
            <label
            htmlFor="fileUpload"
            className="cursor-pointer px-4 py-2 bg-red-400/20 text-white rounded hover:bg-red-400/80"
            >Choose File </label>
            <p className="text-white mt-2"> No Photo Chosen</p>
        </div>
    )
}
// // w/o server n backend
//     // useEffect(() => {
//     //     if (file) {
//     //     const cachedFile = URL.createObjectURL(file);
//     //     setImagePreview(cachedFile);
//     //     } 
//     // }, [file])

//   return (
//     <div>
//         <img src={imagePreview || defaultImage} alt="preview" width="200px" />
//         <input 
//         type="file" 
//         accept="image/jpeg, image/jpg, image/png"
//         onChange={handleFileUpload}
//         />
//     </div>
//   )
// }

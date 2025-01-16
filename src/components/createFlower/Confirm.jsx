import React from 'react'
import { get, update, ref, getDatabase, set } from 'firebase/database';
import Popup from '../Popup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Confirm({Name, setSubmitAll, checkAllInputs, handleScroll, toPrevRef}) {
  const [triggerPopup, setTriggerPopup] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const flowerUpdate = async () => {
    //Number of Flowers to update
    const db = getDatabase();
    const dataref = ref(db, `Bouquets/${Name}`)
    const snapshot = await get(dataref);
    const existingFlowers = snapshot.val().Flowers || 0;
    const updatedFlowers = existingFlowers + 1
    update(dataref, {
        Flowers: updatedFlowers
    })

}
console.log(checkAllInputs)
  return (
    <div className='flex w-screen h-screen items-center justify-center bg-gradient-to-b from-myred to-darkred to-60%'>
      <div className=''>
      <button
        onClick={() => setTriggerPopup(true)}
        className=" h-12 w-32 text-center text-white bg-red-700 rounded-md hover:bg-red-800"
      >Submit</button>
      </div>
      {/* <Summary>

      </Summary> */}
      {
        triggerPopup &&
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] sm:w-[90%] max-w-md text-center">
              {
                !confirm? (
              <>
                <p>Send flower confirms?</p>
                <div className='flex mt-6'>
                <button
                  onClick={() => { 
                    setTriggerPopup(false)
                    handleScroll(toPrevRef)
                  }}
                  className="w-full px-4 py-2 text-red-800 font-medium rounded-lg"
                >
                  Wait go back
                </button>
                <button
                  onClick={() => {
                    setSubmitAll(true)
                    flowerUpdate()
                    setConfirm(true)
                }}
                  className="w-full px-4 py-2 text-red-800 font-medium rounded-lg"
                >
                  Confirm
                </button>
                </div>
              </> 
              ): (
                <>
                   <p>Thank you for sending a flower to {Name}!</p>
                    <button
                      onClick={() => {
                        setSubmitAll(false)
                        navigate("/")}}
                      className="w-full px-4 py-2 text-red-800 font-medium rounded-lg"
                    >
                      Back to Valentine Bouquets
                    </button>
                  </>
              )}
          </div>
        </div>
      }
    </div>
  )
}

export default Confirm
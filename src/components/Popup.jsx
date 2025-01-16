import React, { useEffect } from 'react'
import InputBox from './InputBox'
import { useState } from 'react';
function Popup({handleSubmit, trigger, children, setTrigger, setHandleClosePopup}) {
    
    const [input, setInput] = useState('');

    useEffect(() => {
        if(!trigger) {
        setInput('')
    }},[trigger])

  return (trigger) ? (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
    <div className="bg-mywhite rounded-lg shadow-lg p-6 w-[80%] sm:w-[90%] max-w-md text-center text-myblack">
    <h3 className='mb-5'> {children} </h3>
        <InputBox 
            styleType={'other'}
            onChange={(val) => setInput(val.target.value)}/>
        <div className="flex justify-around mt-4">
        <button 
            className='bg-mywhite'
            onClick={() => handleSubmit(input)}
            >yessir</button>
        <button 
            className='bg-mywhite '
            onClick= {() => {setTrigger(false); setHandleClosePopup(true)}}
            >jamkkanman go back</button>
        </div>
    </div>
    </div>
  ) : '';
  }
    

export default Popup
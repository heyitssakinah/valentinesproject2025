import React from 'react'
import { Spotify } from 'react-spotify-embed'

function Embed(props) {
  return (
    <div className='flex flex-col items-center -mt-16 sm:-mt-24 justify-center h-screen w-screen'>
    <h1 className='mt-14 mb-10 text-2xl sm:text-3xl text-mywhite' >what a romantic you are</h1>
    <Spotify className='max-w-[40%] h-52 -mb-10 hidden sm:block' wide link = {props.songDetails.songURL}/>
    <Spotify className='sm:hidden' link = {props.songDetails.songURL}/>
    <div className='max-w-[80%] sm:max-w-[40%] bg-white/10 text-mywhite p-4 rounded-2xl shadow-lg px-6'>{props.message}</div>
    <button
        className="text-mywhite hover:text-mywhite/50 mt-4 underline" onClick={() => (props.handleDifSong())}>Choose a different song button</button>
        
  </div> 
    
  )
}


export default Embed
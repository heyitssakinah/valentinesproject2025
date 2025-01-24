import React, { useEffect, useState } from 'react'
import Popup from '../Popup';
import Embed from '../Embed';
import {ref, set, getDatabase} from "firebase/database";
import { app } from '../../configuration';
import { useAuth } from '../../contexts/authContext';

//fix ui, auth page, global spotify playlist add
// url into playlist and link the song inside the playlist
//dont ask me why the popoup handles the backend.... i dont know...
export default function Song({Name, submitAll, handleScroll, toRef, toPrevRef}) {
  const CLIENT_ID='bc4184851ea64b2d889a2ed5849167a2'
  const CLIENT_SECRET ='56d208a71b764c0fb729abc603cbc23f'
  const [accessToken, setAccessToken] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [trackData, setTrackData] = useState([]);
  const [triggerPopup, setTriggerPopup] = useState(false);
  const [triggerEmbed, setTriggerEmbed] = useState(false);
  const [hcp, sethcp] = useState(false);
  const {currentUser} = useAuth();
  const [songDetails, setSongDetails] = useState({
    track:'',
    artist:'',
    songURL:'',
    image:'',
   });
  const [message, setMessage] = useState('')
  useEffect(() => {
    var authParam = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }
      fetch('https://accounts.spotify.com/api/token', authParam)
        .then(res => res.json())
        .then(data => setAccessToken(data.access_token))
  }, [])

  useEffect(() => {
    if(submitAll) {
      const db = getDatabase(app);
      const dataref = ref(db, `Bouquets/${Name}/${currentUser.displayName}_${currentUser.uid}/Song`);
      set(dataref, {
            Songhehehaha: message,
            SongName: songDetails
        })
        .catch((error) => {
          console.error('Error Adding song to database bro...', error);}
        )
    }
  }, [submitAll])

  async function Search() {
    console.log(`Searching... ${searchInput}`)
    //submit get request to get track 
    var trackParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    var track = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=30`, trackParam)
      .then(response => response.json())
      .then((data) => {
        console.log(data.tracks.items);
        const uniqueKey = [];
        const filteredTracks = [];

        data.tracks.items.forEach((track) => {
          const unique = `${track.name.toLowerCase()} - ${track.artists
          .map((artist) => artist.name.toLowerCase())
          .sort()
          .join(',')}
          `
          if (!uniqueKey.includes(unique)) {
            uniqueKey.push(unique);
            filteredTracks.push(track);
          }
        });
      console.log(filteredTracks);
      setTrackData(filteredTracks);
      })

      // .then(data => {
      //   console.log(data.tracks.items);
      //   setTrackData(data.tracks.items);
      // })
    //display
  }
  
    const handleSubmit = ((input) => { 
      if (input.trim() !== '') { //check empty data
        // alert("Submitted successfully");
        setTriggerPopup(false);
        setTriggerEmbed(true);
        setMessage(input);
    } else {
        alert('cmon im sure you have something to say...');
    }
  })

  const handleSubmitSong = () => {
    if(songDetails.track === '') {
      alert('Please select a song');
    } else {
      handleScroll(toRef)
    }
  }

  const handleDifSong = () => {
    setTriggerEmbed(false)
    setTriggerPopup(false)
    setMessage('')
    setSongDetails({
      track: '',
      artist: '',
      songURL: '',
      image: '',
    })
  }

  return (
    <div className='h-screen w-screen bg-gradient-to-b from-darkred to-myred to-60%'>
    {!triggerEmbed && (
    <div className='flex flex-col items-center h-screen w-screen'>
        <h1 className="mt-14 mb-10 text-2xl sm:text-3xl text-mywhite">Link a Song For The Feels?</h1>
          <div className='flex items-start border-1 backdrop-blur-sm bg-mywhite/20 rounded-xl w-[75%] sm:w-[50%] text-left'>
            <input 
                type='text' 
                placeholder="I Love You, I'm Sorry Gracie Abrahms"
                className='bg-transparent pl-5 py-4 w-full text-mywhite placeholder-mywhite/90'
                onChange={(val) => setSearchInput(val.target.value)}/> 
            <button
                onClick={Search}
                className=" py-2 px-4 m-2 text-center text-mywhite bg-barnred rounded-md hover:bg-red-700"
            >Search</button>
          </div>
          <div className='flex border-1 backdrop-blur-sm bg-transparent border-2 border-mywhite rounded-xl w-[85%] md:w-[65%] h-[60%] sm:h-[50%] overflow-scroll mt-6 '>
            {/* LARGE SCREEN TABLE AHHHHH */}
            <div className='hidden md:block md:w-full'>
              <table className='w-full'>
                <thead className='bg-mywhite/70 sticky'>
                  <tr>
                    {/* <th className='w-0 -col-start-1'></th> */}
                    <th className='py-5 backdrop-blur-sm flex-1 w-80 text-myblack'>Track</th>
                    <th className='backdrop-blur-md text-myblack'>Artist</th>                  
                  </tr>
                </thead>
                <tbody>
                  {trackData.map((track) => {
                    return (
                      <tr onClick={() => {
                        setTriggerPopup(true); 
                        setSongDetails((prevDetails) =>  ({
                        ...prevDetails,
                        track:track.name,
                        artist:track.artists.map((artist) => artist.name).join(" - "),
                        songURL: track.external_urls.spotify,
                        image: track.album.images.map((img) => img.url)[0],
                      }));
                    }}
                      className='hover:backdrop-contrast-50 group'>
                        {/* <div className='flex'> */}
                          {/* <td className='flex-none w-8 h-8'> */}
                          {/* </td> */}
                          <td className='py-1 w-52 text-mywhite text-left group-hover:bg-barnred'>
                            <div className='flex mt-2 mr-4 items-center'>
                              <img className='mx-4 w-14 h-14' src={track.album.images.map((img) => img.url)[0]}/>
                              <p>{track.name}</p>
                            </div>
                          </td>
                          <td className='w-52 mx-4 text-mywhite text-center group-hover:bg-barnred '>{track.artists.map((artist) => artist.name).join(", ")}</td>
                        {/* </div> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* small screen table ahhh */}
            <div className='block sm:hidden'>
                  {trackData.map((track) => {
                    return (
                      <div onClick={() => {
                        setTriggerPopup(true); 
                        setSongDetails((prevDetails) =>  ({
                        ...prevDetails,
                        track:track.name,
                        artist:track.artists.map((artist) => artist.name).join(" - "),
                        songURL: track.external_urls.spotify,
                        image: track.album.images.map((img) => img.url)[0],
                      }));
                    }}
                      className='hover:backdrop-contrast-50 group'>
                        <div className='flex m-4 items-center'>
                          <img className='w-[20%] h-[20%]' alt='album cover' src={track.album.images.map((img) => img.url)[0]}/>
                            <div>
                              <p className='px-4 text-mywhite group-hover:bg-barnred'>{track.name}</p>
                              <p className='px-4 text-mywhite text-xs group-hover:bg-barnred'>{track.artists.map((artist) => artist.name).join(", ")}</p>
                            </div>
                          </div>
                        </div>
                    );
                  })}
              </div>
          </div>
    </div> )}

    <Popup 
      trigger={triggerPopup} 
      setTrigger={setTriggerPopup}
      handleSubmit={handleSubmit}
      setHandleClosePopup={sethcp}>
      <p className='text-lg mb-3'>Send a short message with the song:</p>
      <p className='underline '>{songDetails.track} by {songDetails.artist}</p>
    </Popup>

    {triggerEmbed && (
      <div className='flex flex-col items-center justify-center'>
      <Embed
        songDetails = {songDetails}
        trigger = {triggerEmbed}
        setTrigger={setTriggerEmbed}
        message={message}
        handleDifSong={handleDifSong}>
      </Embed>
           <div className='flex -mt-8 sm:mt-0 w-full space-x-[30%] justify-center'>
            <button 
              onClick={() => handleScroll(toPrevRef)}
              className='px-4 py-2 text-center text-white bg-red-700 rounded-md hover:bg-red-800'
              >Prev
            </button>
            <button
              onClick={handleSubmitSong}
              className='px-4 py-2 text-center w-auto text-white bg-red-700 rounded-md hover:bg-red-800'
              >Next
            </button>
            </div>
      </div>
    )}

    </div>
  );
}

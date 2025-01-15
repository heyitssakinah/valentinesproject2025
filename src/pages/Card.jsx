import { getDatabase } from 'firebase/database';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { app } from '../configuration';
import { Spotify } from 'react-spotify-embed';
import Message from '../components/ViewFlower/Message';
import Trial from '../components/ViewFlower/Trial';
import Song from '../components/ViewFlower/Song';
import Image from '../components/ViewFlower/Image';

function Card() {
  const { Name, Sender } = useParams();
  const SenderName = Sender.split('_')[0]
  console.log(Name, Sender, SenderName)

  const db = getDatabase(app)
  const dataref = ref(db, `Bouquets/${Name}/${Sender}`)

  const [message, setMessage] = useState('');
  const [song, setSong] = useState();
  const [photo, setPhoto] = useState({
    PhotoMessage: '',
    PhotoURL: '',
  });
  const [meme, setMemeURL] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const sent = onValue(dataref, (snapshot) => {
      if (snapshot.val()) {
        setMessage(snapshot.val().Message);
        setSong({
          SongURL: snapshot.val().Song.SongName.songURL,
          Songhehehaha: snapshot.val().Song.Songhehehaha
        });
        setPhoto({
          PhotoURL: snapshot.val().Photo.PhotoURL,
          PhotoMessage: snapshot.val().Photo.PhotoMessage,
        });
        setMemeURL(snapshot.val().Meme);
        setLoading(false);
      }
    });
    return () => sent(); // Clean up the listener when the component unmounts
  },[])

  console.log(message)

  if (isLoading) {
    return <div className='text-center'>Customising your letter tehee</div>;
  }

  return (
    <div className='font-serif bg-red-950 w-screen h-screen'>
        
        <div className="flex items-center justify-center h-screen w-screen">
          <img src={photo?.PhotoURL} className='max-w-96'/>
          <p className='text-4xl ml-12 text-white font-bold'> {SenderName} <br></br>sent you a flower!</p>
        </div>

        <div style={{height: "100vh"}}>
          <Message Message={message?.Message}>
          </Message>      
        </div>
        

        <div className='flex h-[200vh]'>
          <Trial photourl={photo?.PhotoURL} 
          photoMessage={photo?.PhotoMessage} 
          message={message?.Message} 
           >
          </Trial>
        </div>

        <div className=''>
            <Song
            songURL={song?.SongURL}
            songMessage={song?.Songhehehaha}
            >
            </Song>
        </div>

        <div>
          <Image
          src={meme.MemeURL}
          sender={SenderName}
          name={Name}>
          </Image>
        </div>

        <div className="bg-red-950 flex flex-col items-center justify-center h-screen w-screen overflow-hidden">

          <div className='flex mt-12 mb-2 p-4 bg-white/30 rounded-lg text-center text-white text-xl w-[80vw]'>
            <p>{message?.Message}</p>
          </div>

          <div className='max-w-[80vw] flex justify-center items-center m-4 mb-12 space-x-6'>

            <div className='flex flex-col items-center justify-center'>
              <Spotify className='px-4 w-96' link = {song?.SongURL}/>
              <p className='bg-white/30 text-white p-4 rounded-md max-w-96'> {song?.Songhehehaha}</p>
            </div>

          <div className='flex flex-col items-center justify-center text-white text-3xl text-center'>
            <p>
            <strong>From:</strong>{SenderName} <br />
            <strong>To:</strong> {Name}
            </p>
            <img src={meme?.MemeURL} alt='img1' className='max-w-96 backdrop:shadow-lg rounded-3xl p-4 mt-10'/>
          </div>

            <div className='flex flex-col items-center justify-center'>
              <img 
              src={photo?.PhotoURL}
              alt="img"
              placeholder="blur"
              className=' max-w-96 backdrop:shadow-lg p-4 m-4 rounded-3xl'/>
              <p className='bg-white/30 text-white p-4 rounded-md text-center max-w-96'> {photo?.PhotoMessage}</p>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Card
            {/* <img src='/envelopeOpen.png' alt='open-envelope' className={`absolute bottom-[15%] left-20 w-72 m-44 transition-opacity duration-200 ease-in ${openMessage ? 'opacity-100' : 'opacity-0'}`}/> */}
            {/* // <button
            //     onClick={() => setOpenMessage(true)}
            //     className=" w-60 h-40 absolute bottom-[40%] z-20 opacity-0 mt-4 p-2 bg-blue-500 text-white rounded"
            //   >
            //     Toggle Image
            //   </button> */}
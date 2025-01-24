import { getDatabase } from "firebase/database";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { app } from "../configuration";
import { Spotify } from "react-spotify-embed";
import Message from "../components/ViewFlower/Message";
import Trial from "../components/ViewFlower/Trial";
import Song from "../components/ViewFlower/Song";
import Image from "../components/ViewFlower/Image";

function Card() {
  const { Name, Sender } = useParams();
  const SenderName = Sender.split("_")[0];
  const navigate = useNavigate();
  const db = getDatabase(app);
  const dataref = ref(db, `Bouquets/${Name}/${Sender}`);

  const [message, setMessage] = useState("");
  const [song, setSong] = useState();
  const [photo, setPhoto] = useState({
    PhotoMessage: "",
    PhotoURL: "",
  });
  const [meme, setMemeURL] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [loading, setLoadPhoto] = useState(true);

  useEffect(() => {
    const sent = onValue(dataref, (snapshot) => {
      if (snapshot.val()) {
        setMessage(snapshot.val().Message);
        setSong({
          SongURL: snapshot.val().Song.SongName.songURL,
          Songhehehaha: snapshot.val().Song.Songhehehaha,
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
  }, []);

  console.log(message);

  if (isLoading) {
    return <div className="text-center">Customising your letter tehee</div>;
  }

  return (
    <div className="font-serif bg-gradient-to-b to-darkred via-30% via-barnred from-red-950 w-screen h-screen">
      <div className="flex md:flex-row flex-col items-center justify-center h-screen w-screen">
        <img
          src={photo?.PhotoURL}
          className={`${
            loading
              ? "hidden"
              : "max-w-[80vw] max-h-[60vh] md:max-w-96 md:max-h-96"
          }`}
          onLoad={() => setLoadPhoto(false)}
        />

        <div
          class={`${
            loading
              ? "w-auto"
              : "hidden"
          }`}
        >
          {/* From Uiverse.io by themrsami */}
          <button
            class="inline-block rounded-full border-2 border-myred text-myred focus:border-myred focus:text-myred active:border-rose-800 active:text-rose-800 dark:border-rose-300 dark:text-rose-300 dark:hover:hover:bg-rose-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
            type="button"
          >
            <div
              role="status"
              class="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            Loading
          </button>
        </div>
        <p className="text-4xl mt-12 md:ml-12 text-mywhite font-bold text-center md:text-left">
          {" "}
          {SenderName} <br></br>sent you a flower!
        </p>
      </div>

      <div style={{ height: "100vh" }}>
        <Message Message={message?.Message}></Message>
      </div>

      <div className="flex h-[200vh]">
        <Trial
          photourl={photo?.PhotoURL}
          photoMessage={photo?.PhotoMessage}
          message={message?.Message}
        ></Trial>
      </div>

      <div className="">
        <Song songURL={song?.SongURL} songMessage={song?.Songhehehaha}></Song>
      </div>

      <div>
        <Image src={meme.MemeURL} sender={SenderName} name={Name}></Image>
      </div>

      {/* Overview of flower */}
      <div className="bg-gradient-to-b from-dimred to-darkred flex flex-col flex-wrap items-center justify-center h-screen w-screen overflow-hidden">
        <div className="max-w-[85vw] h-[90vh] flex flex-col md:flex-row justify-center items-center m-4 md:space-x-6 text-xs">
          <div className="max-h-50vw max-w-75vw flex mt-4 md:mt-4 mb-4 py-6 px-8 border-2 border-lightred rounded-lg text-left whitespace-pre-wrap overflow-scroll text-mywhite md:h-[90vh] md:text-xl md:w-[35vw]">
            <p>{message?.Message}</p>
          </div>

          <div className="flex flex-col-reverse md:flex-col space-y-5">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={photo?.PhotoURL}
                  alt="img"
                  placeholder="blur"
                  className=" md:max-w-72 max-h-32 max-w-44 md:max-h-60 backdrop:shadow-lg mx-4 my-4 rounded-2xl"
                />
                <p className="underline text-xs md:text-lg text-mywhite max-w-60 text-center">
                  {" "}
                  {photo?.PhotoMessage}
                </p>
              </div>
              <div className="">
                <img
                  src={meme?.MemeURL}
                  alt="img1"
                  className="md:max-w-72 backdrop:shadow-lg max-h-32 md:max-h-64 max-w-44 rounded-3xl p-4"
                />
                <div className="text-mywhite text-xs md:text-xl text-center">
                  <p>
                    <strong>From: </strong>
                    {SenderName} <br />
                    <strong>To: </strong>
                    {Name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Spotify
                className="px-4 my-0 md:my-4 h-24 w-[90vw] md:h-40 md:w-[42vw]"
                link={song?.SongURL}
              />
              <div className="underline text-xs md:text-lg text-mywhite w-75vw md:w-[35vw] mb-6 md:mb-0 text-center">
                {" "}
                {song?.Songhehehaha}
              </div>
            </div>
            <button
              onClick={() => navigate(`/Bouquet/${Name}#cardsRef`)}
              className="hidden md:block mt-12 scale-90 ml-[80%] text-xs md:text-base px-4 py-2 hover:text-darkred hover:bg-mywhite shadow-xl rounded-md w-40 text-mywhite bg-darkred"
            >
              Back
            </button>
          </div>
          <button
            onClick={() => navigate(`/Bouquet/${Name}#cardsRef`)}
            className="md:hidden block mt-10 scale-90 text-xs md:text-base px-4 py-2 hover:text-darkred hover:bg-mywhite shadow-xl rounded-md w-40 text-mywhite bg-darkred"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
{
  /* <img src='/envelopeOpen.png' alt='open-envelope' className={`absolute bottom-[15%] left-20 w-72 m-44 transition-opacity duration-200 ease-in ${openMessage ? 'opacity-100' : 'opacity-0'}`}/> */
}
{
  /* // <button
            //     onClick={() => setOpenMessage(true)}
            //     className=" w-60 h-40 absolute bottom-[40%] z-20 opacity-0 mt-4 p-2 bg-blue-500 text-white rounded"
            //   >
            //     Toggle Image
            //   </button> */
}

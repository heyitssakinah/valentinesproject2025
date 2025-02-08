import BouquetTable from "../components/BouquetTable";
import SearchInput from "../components/SearchInput";
import { useState, useEffect, useRef } from "react";
import { getDatabase, get, ref, set, child } from "firebase/database";
import { listAll } from "firebase/storage";
import { app } from "../configuration";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../contexts/auth";
import { useTransform, useScroll, motion } from "framer-motion";
import Lenis from "lenis";
import { v4 as uuidv4 } from 'uuid';

export default function SecretHomePage() {
  const [bouquet, setBouquet] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [triggerPopup, setTriggerPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const handleError = (message) => {
    setErrorMessage(message);
    setShowError(true);

    // Auto-hide the error message after 3 seconds
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  };

  //get persons with bouquet data
  useEffect(() => {
    const db = getDatabase();
    // Reference to the specific collection in the database
    const dataref = ref(db, "Bouquets");

    const fetchBouquets = async () => {
      try {
        const data = await get(dataref);
        if (data.exists()) {
          // Convert the object into an array (if the data is an object)
          const allBouquets = Object.values(data.val());
          setBouquet(allBouquets); // Set the bouquet state
        } else {
          console.log("No bouquets found");
        }
      } catch (error) {
        console.error("Error fetching bouquet:", error);
      }
    };
    fetchBouquets();
  }, []);

  //search for existing persons with bouquet
  function handleSearch(e) {
    setInputSearch(e.target.value);
  }

  //filter bouquets based on search input
  const filteredBouquet = bouquet.filter(
    (Person) =>
      Person.Name.toLowerCase().includes(inputSearch.toLowerCase()) ||
      Person.Email.toLowerCase().includes(inputSearch.toLowerCase())
  );

  //create a new persons bouquet
  const handleCreateNew = () => {
    if (newName.trim() === "" || email.trim() === "") {
      handleError("Please enter their full name and email");
      // alert('Please enter their full name and email');
    } else {
      const newNameLC = newName
        .toLowerCase()
        .split(" ")
        .reduce(
          (acc, name) => acc + name[0].toUpperCase() + name.slice(1) + " ",
          ""
        ).trim();

      const checkEmail = async () => {
        try {
          console.log("checkeamil");
          const db = getDatabase(app);
          const dbRef = ref(db);
          // Fetch all users from "Bouquets"
          const snapshot = await get(child(dbRef, "Bouquets"));
          if (snapshot.exists()) {
            console.log(snapshot);
            const allBouquets = snapshot.val();
            //Extract Emails
            const allEmails = Object.values(allBouquets).map(
              (bouquet) => bouquet.Email
            );
            //fetch email for each item
            if (allEmails.includes(email)) {
              console.log(allEmails.includes(email));
              handleError("A bouquet already exists for this person!");
              return;
            }
          }
          const ID = uuidv4().toUpperCase();
          console.log(ID)
          const dataref = ref(db, `Bouquets/${newNameLC}_${ID}`);
          await set(dataref, {
            //initialise data set for bouquet
            Name: newNameLC,
            Flowers: 0,
            Email: email,
            ID: ID
          }).catch((err) => {
            console.error("Error submitting to database", err);
          });
          navigate(`/createFlower/${newNameLC}_${ID}/`);
        } catch (error) {
          console.log("error checking email", error);
        }
        return false;
      };
      checkEmail();
    }
  };

  //list of items on page 2
  const list = [
    "Join or create a bouquet for someone special.",
    "Personalise your flower with a heartfelt letter",
    "Customize with meaningful photos and a favorite song",
    "Submit! Your friends will receive their bouquet of messages on the 14th!",
  ];

  const variant1 = {
    animate: {
      opacity: [0, 1],
      transition: { duration: 1 },
      y: [50, 0],
    },
  };
  const variants = {
    initial: {
      x: 0,
      opacity: 0,
    },
    animate: {
      x: [300, 0],
      opacity: [0, 1],
      transition: { duration: 1 },
    },
  };

  return (
    <div className="font-valiny snap-y snap-mandatory overflow-y-scroll bg-gradient-to-tl from-darkred via-myred via-30% to-lightred">
      {/* <button
        onClick={() => {
          doSignOut().then(() => {
            navigate("/login");
          });
        }}
        className="text-sm text-blue-600 underline"
      >
        Logout
      </button> */}
      <div className="overflow-hidden">
        {/* <img src='./flower1.png' className='absolute bottom-0 w-[50%] opacity-20'/> */}
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-screen snap-center snap-always">
        <p className="text-5xl sm:text-9xl shadow-myblack text-shadow md:text-shadow-lg font-black text-mywhite mb-4">
          {" "}
          VALENTINE{" "}
        </p>
        <motion.p
          className="relative self-center text-mywhite"
          variants={variant1}
          whileInView="animate"
          viewport={{
            once: true,
          }}
        >
          Write a message for someone you love.
        </motion.p>
        <p className="text-5xl sm:text-9xl shadow-myblack text-shadow md:text-shadow-lg font-black text-mywhite mt-4 sm:mt-6">
          {" "}
          BOUQUETS{" "}
        </p>
      </div>

      <div className="flex flex-col items-center justify-evenly h-screen w-screen snap-center snap-always">
        <p className="text-mywhite block w-[90vw] sm:w-[60vw] sm:text-lg text-left">
        Lately, I’ve been thinking about the friendships that have shaped me—the ones that feel effortless, the ones that slipped away too soon, the ones I should have appreciated more in the moment. Somewhere along the way, between deadlines and obligations, it became easier to assume that the people who mattered would always be there. That they knew. That words weren’t necessary.
        <br></br><br></br>
But they are.
<br></br><br></br>
I built this website as a small way to remind myself—and maybe you—that friendship deserves to be celebrated, not just remembered in passing. That Valentine’s Day isn’t just for romance but for the people who make life lighter: the friend who made you laugh when you needed it most, the suitemate who left the light on, the coursemate who pulled you through a tough semester. The ones you see every day and the ones who were part of your life for only a brief moment, but left something behind.
<br></br><br></br>
So take the time. Say it out loud. Not just in your head, not just in the spaces between messages left on read. Tell them they matter. Because they do. And because we don’t say it enough.
        
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="text-right">
            <a href="https://www.linkedin.com/in/heyitssakinah" target="_blank" rel="noreferrer noopener" className=" hover:text-mywhite/70 hover:underline">Sakinah</a>
            , Valentines 2025 &lt;3
          </div>
        </p>
      </div>

      <div className="flex flex-col items-center justify-evenly h-screen w-screen snap-center snap-always">
        <ol className="list-decimal text-xl sm:text-2xl max-w-[70%] sm:max-w-[40%] text-mywhite space-y-5">
          {list.map((item, i) => {
            return (
              <motion.li
                key={i}
                // style={{y: goUp}}
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                // transition={{delay: i * 1}}
                className=" shadow-sm shadow-lightred p-4 rounded-lg"
              >
                {item}
              </motion.li>
            );
          })}
        </ol>
      </div>

      <div className="flex w-screen h-screen justify-center snap-center snap-always">
        <div className="mx-auto text-darkred w-screen h-screen overflow-hidden">
          <SearchInput search={inputSearch} handleSearch={handleSearch} />
          <BouquetTable filteredBouquet={filteredBouquet} />
          <div className="flex w-full justify-center my-6 mb-14">
            <button
              onClick={() => setTriggerPopup(true)}
              className=" text-sm sm:text-base px-4 py-2 hover:text-darkred hover:bg-mywhite shadow-xl rounded-md text-mywhite bg-darkred"
            >
              Create new Bouquet
            </button>
          </div>
        </div>

        {triggerPopup && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
            <div className="bg-mywhite rounded-lg shadow-lg p-6 w-[80%] sm:w-[90%] max-w-md text-center">
              <p>Create A new Bouquet for:</p>
              <input
                onChange={(val) => setNewName(val.target.value)}
                type="text"
                placeholder="Enter recipient's FULL name"
                className="w-full px-4 pt-4 mt-4 text-myblack border-2 border-myblack/70 bg-mywhite rounded-md placeholder-myblack/70 focus:outline-none"
              />
              <input
                onChange={(val) => setEmail(val.target.value)}
                type="email"
                autoComplete="email"
                required
                placeholder="Enter recipient's email (eg.sakinah@u.nus.edu)"
                className="w-full px-4 pt-4 mt-4 text-myblack border-2 border-myblack/70 bg-mywhite rounded-md placeholder-myblack/70 focus:outline-none"
              />
              {showError && (
                <div
                  className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg flex items-center justify-between sm:w-96"
                  role="alert"
                >
                  <span>{errorMessage}</span>
                  <button
                    onClick={() => setShowError(false)}
                    className="ml-4 text-red-500 font-bold hover:text-red-700 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="flex mt-6">
                <button
                  onClick={() => {
                    setTriggerPopup(false);
                    setNewName("");
                    setEmail("");
                  }}
                  className="w-full px-4 py-2 text-darkred font-medium rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={() => handleCreateNew()}
                  className="w-full px-4 py-2 text-darkred font-medium rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
}

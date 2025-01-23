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

export default function SecretHomePage() {
  const [bouquet, setBouquet] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [createNew, setCreate] = useState(false);
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
    const db = getDatabase(app);
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
  const filteredBouquet = bouquet.filter((Person) =>
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
          );

      const checkEmail = async () => {
        try{
          console.log("checkeamil")
          const db = getDatabase(app);
          const dbRef = ref(db)
          // Fetch all users from "Bouquets"
          const snapshot = await get(child(dbRef, "Bouquets"))
          if (snapshot.exists()) {
          console.log(snapshot)
          const allBouquets = snapshot.val();
          //Extract Emails
          const allEmails = Object.values(allBouquets).map((bouquet) => bouquet.Email)
          //fetch email for each item
           if(allEmails.includes(email)) {
            console.log(allEmails.includes(email))
             handleError("A bouquet already exits for this person!");
             // alert('Email already exists. Please use a different email');
             return;
           }
          }
           const dataref = ref(db, `Bouquets/${newNameLC}`);
           await set(dataref, {
             Name: newNameLC,
             Flowers: 0,
             Email: email,
           }).catch((err) => {
             console.error("Error submitting to database", err);
           });
           navigate(`/createFlower/${newNameLC}/`);
        } catch (error){
            console.log('error checking email', error)}
            return false;
        }
      checkEmail();
    }
  };
  //initialise data set for bouquet

  //list of items on page 2
  const list = [
    "Join or create a bouquet for someone special.",
    "Personalise your flower with a heartfelt letter",
    "Customize with meaningful photos and a favorite song",
    "Submit!",
  ];

  //background colour scroll animation
  //   const container = useRef(null);
  //   const { scrollYProgress } = useScroll({
  //     target: container,
  //     offset: ["start end", "end start"]
  //   })

  //   const rotate = useTransform(scrollYProgress, [0,1], ['0deg', '360deg'])
  //   const goUp = useTransform(scrollYProgress, [0.5, 1], [0, -500])
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
    // <div className='flex relative justify-center items-center w-screen h-[300vh] overflow-hidden'>
    //     <motion.div
    //     ref='background'
    //     style={{}}
    //     className='flex h-[300vh] absolute inset-0 z-0 bg-repeat bg-gradient-to-tl from-darkred via-myred via-30% to-lightred'>
    //     </motion.div>
    <div className="font-valiny snap-y snap-mandatory overflow-y-scroll bg-gradient-to-tl from-darkred via-myred via-30% to-lightred">
      <button
        onClick={() => {
          doSignOut().then(() => {
            navigate("/login");
          });
        }}
        className="text-sm text-blue-600 underline"
      >
        Logout
      </button>
      <div className="overflow-hidden">
        {/* <img src='./flower1.png' className='absolute bottom-0 w-[50%] opacity-20'/> */}
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-screen snap-center snap-always">
        <p className="text-5xl sm:text-9xl shadow-myblack text-shadow-lg font-black text-mywhite mb-4">
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
          Gift a flower to someone you love.
        </motion.p>
        <p className="text-5xl sm:text-9xl shadow-myblack text-shadow-lg font-black text-mywhite mt-4 sm:mt-6">
          {" "}
          BOUQUET{" "}
        </p>
      </div>

      <div className="flex flex-col items-center justify-evenly h-screen w-screen snap-center snap-always">
        <p className="text-mywhite block w-[80vw] sm:w-[60vw] sm:text-lg text-center">
          Welcome to Valentine Bouqeuts. This website was created to revive the
          spirit of appreaciating your friends which is often lost in the ferver
          of adulthood and romance. Sometimes its the people closest to you that
          you often take for granted. VB believes that valentines belongs to
          everyone not just the lovers. So take time to show gratitude to your
          girlies even the ones you only see once a year or the ones you only
          knew for a short while on that overseas trip. Take time to say i love
          you to your friends, suitemates, and tutorial groups that hard carried
          you last semester. Make this a valentines to remember.
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          love, Sakinah &lt;3
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
                    setNewName("")
                    setEmail("")
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

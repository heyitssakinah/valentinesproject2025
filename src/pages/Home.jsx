import BouquetTable from '../components/BouquetTable';
import SearchInput from '../components/SearchInput'; 
import { useState, useEffect } from 'react';
import { getDatabase, get, ref, set } from 'firebase/database';
import { app } from '../configuration';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom'
import { doSignOut } from '../contexts/auth';

export function Home() {
  const [bouquet, setBouquet] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [createNew, setCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [email, setEmail] = useState('');
  const [triggerPopup, setTriggerPopup] = useState(false);

  const { userLoggedIn } = useAuth()
  const navigate = useNavigate()

  //get persons with bouquet data
  useEffect(() => {
    const db = getDatabase(app);
    // Reference to the specific collection in the database
    const dataref = ref(db, "Bouquets");
    
    const fetchBouquets = async () => {
      try{
        const data = await get(dataref);
        if (data.exists()) {
          // Convert the object into an array (if the data is an object)
          const allBouquets = Object.values(data.val());
          setBouquet(allBouquets);  // Set the bouquet state
        } else {
          console.log("No bouquets found");
        }
      }catch(error)
      {
        console.error("Error fetching bouquet:", error);
      }
    };
    fetchBouquets();

  }, [])

  //search for existing persons with bouquet
  function handleSearch(e) {
    setInputSearch(e.target.value);
  }

  //filter bouquets based on search input
  const filteredBouquet = bouquet.filter((Person) => 
    Person.Name.toLowerCase().includes(inputSearch.toLowerCase())
  );

  //create a new persons bouquet
  const handleCreateNew = () => {
    if(newName.trim() === '' || email.trim() === '') {
      alert('Please enter their full name and email username');
    } else navigate(`/createFlower/${newName}/`)
    setCreate(true);
  }
console.log('check %d %d', newName)
  //initialise data set for bouquet
  useEffect(() => {
    if(createNew) {
    const db = getDatabase(app);
    const dataref = ref(db, `Bouquets/${newName}`)
    set(dataref, {
      Name: newName,
      Flowers: 0,
      Email: email,
    })
      .catch((err) =>{
      alert("Failed to submit");
      console.error('Error submitting to database', err);
  });}
  }, [createNew])

  
  return (
    <>
      {!userLoggedIn ? (
        navigate('/login')
      ) : (
          
        <div className='font-serif bg-gradient-to-tl from-red-950 via-pink-900 via 75% to-red-500 snap-y snap-mandatory overflow-y-scroll h-screen '>
            <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
            <div className="flex flex-col items-center justify-center h-screen w-screen snap-center snap-always">
                <p className="text-4xl sm:text-8xl font-black text-white m-5"> VALENTINE </p>
                <p className="relative self-center text-white"> Gift a flower to someone you love.</p>
                <p className="text-4xl sm:text-8xl font-black text-white m-5"> BOUQUET </p>
            </div>

            <div className='flex flex-col items-center justify-evenly h-screen w-screen snap-center snap-always'>
                <ol className="list-decimal text-xl sm:text-3xl max-w-[40%] text-white space-y-5">
                <li> Join or create a bouquet for your loved one</li>
                <li> Personalise your flower with a heartfelt letter</li>
                <li> Customise further with meaningful pictures and song</li>
                <li> Submit!</li>
                </ol>     
            </div>

            <div className='flex w-screen h-screen justify-center snap-center snap-always'>
                <div className='mx-auto text-white'>
                    <SearchInput search={inputSearch} handleSearch={handleSearch} />
                    <BouquetTable filteredBouquet={filteredBouquet} />
                    <div className='flex w-full justify-center my-6'>
                    <button
                      onClick={() => setTriggerPopup(true)}
                      className=' text-sm sm:text-base px-4 py-2 text-white bg-pink-900 rounded-md hover:bg-red-800'
                      >Create new Bouquet</button>
                      </div>
                      </div>
                    

                { triggerPopup && (
                  <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] sm:w-[90%] max-w-md text-center">
          
                      <p>Create A new Bouquet for:</p>
                      <input
                        onChange={(val) => setNewName(val.target.value)}
                        type="text"
                        placeholder="Enter recipient's FULL name"
                        className="w-full px-4 pt-6 text-gray-700 bg-white rounded-md focus:outline-none"
                      />
                      <input
                        onChange={(val) => setEmail(val.target.value)}
                        type="email"
                        autoComplete='email'
                        required
                        placeholder="Enter recipient's email (eg.heyitssakinah@gmail.com)"
                        className="w-full px-4 pt-6 text-gray-700 bg-white rounded-md focus:outline-none"
                      />
                      <div className='flex mt-6'>
                      <button
                        onClick={() => {setTriggerPopup(false)}}
                        className="w-full px-4 py-2 text-red-800 font-medium rounded-lg"
                      >Back</button>
                      <button
                        onClick={() =>  handleCreateNew()}
                        className="w-full px-4 py-2 text-red-800 font-medium rounded-lg"
                      >Confirm</button>
                        </div>
                    </div>
                  </div>
                  )}
              </div>
          </div>)}
        </>
      );
}

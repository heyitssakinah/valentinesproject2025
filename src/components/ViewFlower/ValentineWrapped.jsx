import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { app } from "../../configuration";

function ValentineWrapped({name}) {
  const [flowers, setFlowers] = useState('')

  useEffect(() => {
    const db = getDatabase(app)
    const dataref = ref(db, `Bouquets/${name}/Flowers`)
    const getFlowers = onValue(dataref, (snapshot) => 
      {
        setFlowers(snapshot.val())
      }
    )
    return () => getFlowers()} 
  ,[])
  
  return (
    <div className='flex items-center justify-center m-10 space-x-8 h-screen max-w-screen'>
      {/* <div className='shadow-md rounded-lg bg-barnred/40 px-8 w-96 h-96 text-2xl sm:text-3xl text-center text-mywhite py-6'
      >describe them in 3 words //100% of them want to spend more time with you</div> */}
      <div className='flex flex-col font-bold items-center shadow-md rounded-lg bg-barnred/40 px-8 w-64 h-64 sm:w-96 sm:h-96 text-xl sm:text-3xl text-center text-mywhite py-8'
      ><p>
        You've received a total of <br></br>
        </p> 
        <p className='sm:p-6 py-5 sm:pb-12 font-extrabold text-6xl sm:text-9xl'>{flowers} <br></br>
          </p>
        <p>
        Flowers 
          </p>
      
      </div>
      {/* <div className='shadow-md rounded-lg bg-barnred/40 px-8 w-96 h-96 text-2xl sm:text-3xl text-center text-mywhite py-6'
      >The longest message you received was [number of words] words long, from [Name].</div> */}
    </div>
  )
}

export default ValentineWrapped
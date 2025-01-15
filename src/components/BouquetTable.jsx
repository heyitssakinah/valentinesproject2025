
import { getDatabase } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { app } from '../configuration';
import { ref, get, child } from 'firebase/database';
function BouquetTable({filteredBouquet}) {
  const [prevMessageExists, setPrevMessageExists] = useState(false)
  const { currentUser } = useAuth();
  const navigate = useNavigate();

    // function checkPath({Person, currentUser}) {
    //   const db = getDatabase(app);
    //   const dbref = ref(db)
    //   const path = `Bouquets/${Person.Name}/${currentUser.displayName}_${currentUser.uid}`
    //   const snapshot = get(child(dbref, path))
    //   console.log('ref', dbref)
    //   console.log(get(child(dbref, path)))
    //   return snapshot.exists
      
    // } 
    const currUser = `${currentUser.displayName}_${currentUser.uid}`

    return (
        <div className='flex justify-center items-center w-screen font-valiny mb-8'>
            <table className='border-2 w-[90%] sm:w-[75%] shadow-xl border-mywhite '>
              <thead>
                <tr className='text-center font-bold text-xs sm:text-base bg-mywhite text-darkred'> 
                  <th className='py-1 '> Name </th>
                  <th className='py-1 '> Email </th>
                  <th className='py-1 '> Flowers Received </th>
                </tr>
              </thead>
              <tbody>
                {filteredBouquet.map((Person) => {
                  console.log('cu', currUser)
                  console.log('bool',Person.hasOwnProperty(currUser))
                  return (
                    <tr 
                    key={Person.Name} className='group border-t font-extrabold text-mywhite group'
                    onClick={ () => {
                      if (Person.hasOwnProperty(currUser)) {
                        alert("You have already sent a flower to this person.")
                      } else {
                        navigate(`/createFlower/${Person.Name}`)
                      }}}
                      > 
                      <td className='p-2 text-xs sm:text-base text-center group-hover:bg-mywhite/60'
                      > {Person.Name} </td>
                      <td className='p-2 text-xs sm:text-base text-center group-hover:bg-mywhite/60'>{Person.Email}</td>
                      <td className='p-2 text-xs sm:text-base text-center group-hover:bg-mywhite/60'>{Person.Flowers}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
    );
}

export default BouquetTable;

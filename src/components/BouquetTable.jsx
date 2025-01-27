
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../contexts/authContext';
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
        <div className='flex justify-center items-center font-valiny mb-8'>
          <div className='overflow-scroll w-[90vw] sm:w-auto max-h-[60vh]'>
            <table className='border-2 m-2 shadow-xl max-w-[200vw] sm:w-[75vw] border-mywhite'>
              <thead className='sticky top-0'>
                <tr className='text-center font-bold text-xs sm:text-base bg-mywhite text-darkred'> 
                  <th className='py-1 px-5 '> Name </th>
                  <th className='py-1 hidden md:table-cell '> Email </th>
                  <th className='py-1 px-5'> Flowers </th>
                </tr>
              </thead>
              <tbody>
                {filteredBouquet.map((Person) => {
                  return (
                    <tr 
                    key={Person.Name} className='group border-t font-extrabold text-mywhite group'
                    onClick={ () => {
                      if (Person.hasOwnProperty(currUser)) {
                        alert("You have already sent a flower to this person.")
                      } else {
                        navigate(`/createFlower/${Person.Name}_${Person.ID}`)
                      }}}
                      > 
                      <td className='p-2 px-2 text-xs w-[30%] sm:text-base text-center group-hover:bg-mywhite/30'
                      > {Person.Name} </td>
                      <td className='py-2 hidden md:table-cell text-xs sm:text-base w-[40%] text-center group-hover:bg-mywhite/30'>{Person.Email}</td>
                      <td className='p-2 px-2 text-xs sm:text-base w-[30%] text-center group-hover:bg-mywhite/30'>{Person.Flowers}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </div>
    );
}

export default BouquetTable;

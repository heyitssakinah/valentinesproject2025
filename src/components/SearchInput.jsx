
function SearchInput({handleSearch}) {
    return (
          <div className='w-full flex text-mywhite justify-center items-center mt-0 mb-6 font-valiny'>
              <input 
                type='text' 
                placeholder='Search name or email' 
                onChange={handleSearch} 
                className='border-mywhite border-2 w-[70vw] sm:w-[30vw] bg-transparent placeholder:text-sm placeholder:italic mt-36 mb-6 sm:mt-20 placeholder:text-mywhite placeholder:font-valiny block py-2 pl-3 pr-3 text-center border-1 rounded-3xl shadow-lg '/> 
          </div>
 
    );
}

export default SearchInput;